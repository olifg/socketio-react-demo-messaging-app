import React from "react";
import { ConversationType, useConversations } from "../../../contexts/ConversationsProvider";

import styles from './conversations.module.sass'

type ConversationsProps = {};

export const Conversations = ({ }: ConversationsProps) => {

    const { conversations, selectConversationIndex } = useConversations();

    return (
        <ul className={styles.container}>
            {conversations.map((conversation: ConversationType, index) =>
                <li key={index}
                    className={`${styles.conversationCard} ${conversation.selected ? `${styles.active}` : `` }`}
                    onClick={() => selectConversationIndex(index)}
                >
                    {conversation.recipients.map(recipient => {
                        return recipient.name
                    }
                    ).join(', ')}
                </li>
            )}
        </ul>
    )
}