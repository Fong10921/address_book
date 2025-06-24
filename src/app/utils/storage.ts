import {Contact} from "@/app/models/Contact";

const STORAGE_KEY = 'contacts';

export const loadContacts = (): Contact[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveContacts = (contacts: Contact[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
};
