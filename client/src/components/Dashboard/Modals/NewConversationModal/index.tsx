import React, { FormEvent, useState } from "react";
import { ContactType, useContacts } from "../../../../contexts/ContactsProvider";
import { useConversations } from "../../../../contexts/ConversationsProvider"

import styles from '../modal.module.sass';

type NewConversationModalProps = {
    closeModal: () => void;
};

export const NewConversationModal = ({
    closeModal
}: NewConversationModalProps) => {
    const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
    const { contacts } = useContacts();
    const { createConversation } = useConversations();

    const handleCheckboxChange = (contactId: string) => {
        setSelectedContactIds(prevSelectedContactIds => {
            if (prevSelectedContactIds.includes(contactId)) {
                return prevSelectedContactIds.filter(prevId => {
                    return contactId !== prevId
                })
            } else {
                return [...prevSelectedContactIds, contactId]
            }
        })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(selectedContactIds.length === 0) return;
        createConversation(selectedContactIds);
        closeModal();
    }

    return (
        <>
            <div className={styles.header}>
                <span>
                    Select as many contacts as you wish to add to the new conversation
                </span>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.checkBoxContainer}>
                    {contacts.map((contact: ContactType) => (
                        <div className={styles.inputGroup}>
                            <input
                                className={styles.checkBox}
                                onChange={() => handleCheckboxChange(contact.id)}
                                type="checkbox"
                                name={contact.name}
                                id={contact.name}
                                value={selectedContactIds.includes(contact.id) ? contact.id : undefined}
                            />
                            <label
                                htmlFor={contact.name}
                                className={styles.label}
                            >{contact.name}</label>
                        </div>
                    ))}
                </div>
                <div className={styles.footer}>
                    <button className={styles.modalPrimaryButton} type="submit">Create</button>
                </div>
            </form>
        </>
    )
}