import React, { useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ContactsContext = React.createContext<ContactsContextType>({} as ContactsContextType);

type ContactsProviderProps = {
    children: React.ReactNode;
}

type ContactsContextType = {
    contacts: ContactType[],
    createContact: (id: string, name: string) => void;
}

export type ContactType = { id: string, name: string };

export const useContacts = () => {
    return (useContext(ContactsContext))
}

export const ContactsProvider = ({ children }: ContactsProviderProps) => {
    const [contacts, setContacts] = useLocalStorage('contacts', []);

    const createContact = (id: string, name: string) => {
        setContacts((prevContacts: ContactType[]) => {
            return [...prevContacts, { id, name }]
        })
    }

    return (
        <ContactsContext.Provider value={{ contacts, createContact }}>
            {children}
        </ContactsContext.Provider>

    )
}