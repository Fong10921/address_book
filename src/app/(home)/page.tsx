"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import {ContactService} from "@/app/services/ContactService";
import {Contact} from "@/app/models/Contact";
import {LucideHome, LucideMail, LucidePhone, Pencil, Trash2, User} from "lucide-react";

export default function Home() {
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        setContacts(ContactService.getAllContacts());
    }, []);

    const handleDelete = (id: string) => {
        ContactService.deleteContact(id);
        setContacts(ContactService.getAllContacts());
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <header className="flex items-center justify-between mb-8 w-full">
                <h1 className="text-4xl font-bold text-gray-900 w-full">Address Book</h1>
                <div className="flex items-center w-full justify-end">
                    <Link
                        href="/form"
                        className="bg-blue-600 text-white px-5 py-2.5 mx-2 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        + Add Address Book
                    </Link>
                    <Link
                        href="/export"
                        className="bg-green-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-green-700 transition"
                    >
                        Export
                    </Link>
                </div>

            </header>

            {contacts.length === 0 ? (
                <p className="text-center text-gray-500 mt-12">No contacts found. Add some to get started!</p>
            ) : (
                <div className="grid gap-6">
                    {contacts.map((contact) => (
                        <div
                            key={contact.id}
                            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-xl transition"
                        >
                            <div className="flex items-start gap-4 w-full md:w-auto">
                                <div className="bg-blue-100 text-blue-800 p-3 rounded-full">
                                    <User className="w-6 h-6"/>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">{contact.name}</h2>
                                    <div className={`flex flex-col items-baseline justify-start`}>
                                        <p className="text-black inline-flex items-center gap-1">
                                            <span><LucideMail className="text-yellow-500"/></span>
                                            {contact.email}
                                        </p>
                                        <p className="text-black inline-flex items-center gap-1">
                                            <span><LucidePhone className="text-red-500"/></span>
                                            {contact.phone}
                                        </p>
                                        <p className="text-black inline-flex items-center gap-1"><span><LucideHome
                                            className={`text-blue-500`}/></span> {contact.address}</p>
                                    </div>

                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Link
                                    href={`/form/${contact.id}`}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-blue-700 border border-blue-700 rounded hover:bg-blue-700 hover:text-white transition"
                                >
                                    <Pencil className="w-4 h-4"/>
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(contact.id)}
                                    className="inline-flex cursor-pointer items-center gap-1 px-3 py-1.5 text-sm text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition"
                                >
                                    <Trash2 className="w-4 h-4"/>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
