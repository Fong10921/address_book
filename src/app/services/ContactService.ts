import {loadContacts, saveContacts} from "@/app/utils/storage";
import { Contact } from "../models/Contact";
import { v4 as uuidV4 } from 'uuid';
import ExcelJS from "exceljs";
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

    static async exportToExcel(contacts: Contact[]): Promise<void> {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Contacts");

        if (contacts.length > 0) {
            worksheet.columns = Object.keys(contacts[0]).map((key) => ({
                header: key,
                key: key,
                width: 20,
            }));

            contacts.forEach((contact) => {
                worksheet.addRow(contact);
            });
        }

        const buffer = await workbook.xlsx.writeBuffer();

        const blob = new Blob([buffer], {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(blob, "address_book.xlsx");
    }
}