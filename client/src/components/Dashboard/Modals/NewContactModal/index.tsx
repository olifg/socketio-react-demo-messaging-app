import React, { FormEvent, useRef } from "react";
import { useContacts } from '../../../../contexts/ContactsProvider'

import styles from '../modal.module.sass';

type NewContactModalProps = {
    closeModal: () => void;
};

export const NewContactModal = ({
    closeModal
}: NewContactModalProps) => {

    const idRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const { createContact } = useContacts();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (idRef.current && nameRef.current) {
            if(!idRef.current.value || !nameRef.current.value) return;
            createContact(idRef.current.value.trim(), nameRef.current.value.trim())
            closeModal();
        }
    }

    return (
        <>
            <div className={styles.header}>
                <span>
                    To create a new contact add the Id, Name and click 'Create'.
                </span>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.checkBoxContainer}>
                    <div className={styles.inputContainer}>
                        <label className={styles.label} >Id</label>
                        <input className={styles.modalInput} type="text" ref={idRef} required></input>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.label} >Name</label>
                        <input className={styles.modalInput} type="text" ref={nameRef} required></input>
                    </div>
                </div>
                <div className={styles.footer}>
                    <button className={styles.modalPrimaryButton} type="submit">Create</button>
                </div>
            </form>
        </>
    )
}