import React from "react";
import { ContactType, useContacts } from "../../../contexts/ContactsProvider";

import styles from './contacts.module.sass';


type ContactsProps = {};

export const Contacts = ({ }: ContactsProps) => {

    const { contacts } = useContacts()

    return (
        <ul className={styles.container}>
            {contacts.map((contact: ContactType) =>
                <li key={contact.id} className={styles.contactCard}>
                    {contact.name}
                </li>
            )}
        </ul>
    )
}