import {loadContacts, saveContacts} from "@/app/utils/storage";
import { Contact } from "../models/Contact";
import { v4 as uuidV4 } from 'uuid';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export class ContactService {
    static getAllContacts(): Contact[] {
        return loadContacts()
    }

    static getContactById(id: string): Contact {
        return <Contact>loadContacts().find((contact) => contact.id === id);
    }

    static createContact(contact: Contact | undefined): void {
        if (contact === undefined) {
            return;
        }

        const contacts =  loadContacts();
        contacts.push({...contact, id: uuidV4()});
        saveContacts(contacts);
    }

    static updateContact(contact: Contact | undefined): void {
        if (contact === undefined) {
            return;
        }

        const contacts = this.getAllContacts();
        const index = contacts.findIndex(c => c.id === contact.id);

        contacts[index] = { ...contacts[index], ...contact };

        saveContacts(contacts);
    }


    static deleteContact(id: string): void {
        const contacts = this.getAllContacts();
        const indexToRemove = contacts.findIndex(contact => contact.id === id);
        contacts.splice(indexToRemove, 1);
        saveContacts(contacts);
    }

    static filterContacts(query: string): Contact[] {
        const lowerQuery = query.toLowerCase();
        return this.getAllContacts().filter(
            (c) =>
                c.name.toLowerCase().includes(lowerQuery) ||
                c.email?.toLowerCase().includes(lowerQuery) ||
                c.phone?.toLowerCase().includes(lowerQuery) ||
                c.address?.toLowerCase().includes(lowerQuery)
        );
    }

    static exportToExcel(contacts: Contact[]): void {
        const worksheet = XLSX.utils.json_to_sheet(contacts);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const blob = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });

        saveAs(blob, "address_book.xlsx");
    }
}