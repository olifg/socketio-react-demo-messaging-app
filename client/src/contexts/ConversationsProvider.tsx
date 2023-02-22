import React, { Dispatch, SetStateAction, useContext, useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ContactType, useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

export const ConversationsContext = React.createContext<ConversationsContextType>({} as ConversationsContextType);

type ConversationsProviderProps = {
    children: React.ReactNode;
    userId: string;
}

export type Message = {
    senderId: string;
    text: string;
    fromMe: boolean;
    senderName: string;
}

export type ConversationType = {
    recipients: ContactType[];
    selected: boolean;
    messages: Message[];
}

type ConversationsContextType = {
    conversations: ConversationType[],
    createConversation: (recipients: string[]) => void;
    selectConversationIndex: Dispatch<SetStateAction<number>>;
    selectedConversation: ConversationType;
    sendMessage: (recipients: ContactType['id'][], text: string) => void;
}

interface IAddMessageToConversation {
    recipients: ContactType['id'][],
    text: string;
    senderId: ContactType['id'];
}

export const useConversations = () => {
    return (useContext(ConversationsContext))
}

export const ConversationsProvider = ({ children, userId }: ConversationsProviderProps) => {
    const [conversations, setConversations] = useLocalStorage('conversations', []);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState<number>(-1)

    const { contacts } = useContacts();
    const socket = useSocket();

    const createConversation = (recipients: ContactType['id'][]) => {
        setConversations((prevConversations: any) => {
            return [...prevConversations, { recipients, messages: [] }]
        })
    }


    const addMessageToConversation = useCallback(({ recipients, text, senderId }: IAddMessageToConversation) => {
        console.log('Adding message to conversation');
        setConversations((prevConversations: ConversationType[]) => {
            let madeChange = false;
            const newMessage = { senderId, text };
            const newConversations = prevConversations.map((conversation) => {
                if (arrayEquality(conversation.recipients, recipients)) {
                    madeChange = true;
                    return { ...conversation, messages: [...conversation.messages, newMessage] }
                }

                return conversation;
            })

            if (madeChange) {
                return newConversations
            } else {
                return [...prevConversations, { recipients, messages: [newMessage] }]
            }
        })
    }, [setConversations]);

    useEffect(() => {
        if (!socket) return;
        console.log('useEffect socket:', socket);
        socket.on('receive-message', addMessageToConversation);

        return () => {
            socket.off('receive-message');
        }
    }, [socket, addMessageToConversation])

    const sendMessage = (recipients: ContactType['id'][], text: Message['text']) => {
        if (!socket) return;
        console.log('sending message..')
        socket.emit('send-message', { recipients, text })
        addMessageToConversation({ recipients, text, senderId: userId })
    }

    const formattedConversations = (conversations).map((conversation: ConversationType, index: number) => {
        const recipients = conversation.recipients.map((recipient) => {
            const contact = contacts.find(contact => {
                return contact.id === recipient.toString();
            })

            const name = (contact && contact.name) || recipient
            return { id: recipient, name };
        })

        const messages = conversation.messages.map((message) => {
            const contact = contacts.find(contact => {
                return contact.id === message.senderId;
            })
            const name = (contact && contact.name) || message.senderId
            const fromMe = userId === message.senderId;
            return { ...message, senderName: name, fromMe }
        });


        const selected = index === selectedConversationIndex
        return { ...conversation, messages, recipients, selected }
    })

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        selectConversationIndex: setSelectedConversationIndex,
        createConversation,
        sendMessage
    }

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>

    )
}

const arrayEquality = (a: any[], b: any[]) => {
    if (a.length !== b.length) return false;

    a.sort()
    b.sort()

    return a.every((element, index) => {
        return element === b[index]
    })
}