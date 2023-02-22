import React, { FormEvent, useState, useCallback } from "react";
import { Message, useConversations } from "../../../contexts/ConversationsProvider";

import conversationStyles from './open-conversation.module.sass';


type OpenConversationProps = {};

export const OpenConversation = ({ }: OpenConversationProps) => {
    const [text, setText] = useState<string>('')
    const { sendMessage, selectedConversation } = useConversations();

    const setRef = useCallback((node: HTMLDivElement) => {
        if (node)
            node.scrollIntoView({
                behavior: 'smooth'
            })
    }, [])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (text.trim() === '') return;
        sendMessage(selectedConversation.recipients.map(recipient =>
            recipient.id),
            text
        )
        setText('');
    }
    return (
        <div className={conversationStyles.container}>
            <div className={conversationStyles.messagesContainer}>
                <div className={conversationStyles.messages} >
                    {selectedConversation.messages.map((message: Message, index: number) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index;
                        return (
                            <div
                                ref={lastMessage ? setRef : null}
                                key={index}
                                className={`${conversationStyles.message} ${message.fromMe ? `${conversationStyles.messageFromMe} ${conversationStyles.alignEnd}` : ''
                                    }`}
                            >
                                <div
                                    className={conversationStyles.messageBubble}
                                >
                                    <span>{message.text}</span>
                                </div>
                                <div
                                    className={`${conversationStyles.messageAuthor} ${message.fromMe ? `${conversationStyles.alignEnd}` : ''}`}
                                >
                                    {message.fromMe ? 'You' : message.senderName}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <form className={conversationStyles.form} onSubmit={handleSubmit} >
                <div className={conversationStyles.formInner}>
                    <textarea
                        placeholder="Type a message"
                        rows={1}
                        autoFocus
                        className={conversationStyles.formInput}
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                    <button className={`${conversationStyles.formSubmit} ${text ? `${conversationStyles.submitEnabled}` : ''}`} type={"submit"}>Send</button>
                </div>
            </form>
        </div>
    );
};