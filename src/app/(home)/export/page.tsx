"use client";

import React, {useEffect, useState} from "react";
import {ContactService} from "@/app/services/ContactService";
import {Contact} from "@/app/models/Contact";
import {FileSpreadsheet, User} from "lucide-react";
import Link from "next/link";

export default function ExportPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState<Contact[]>([]);

    useEffect(() => {
        const all = ContactService.getAllContacts();
        setContacts(all);
        setFiltered(all);
    }, []);

    useEffect(() => {
        const result = ContactService.filterContacts(query);
        setFiltered(result);
    }, [query]);

    const handleExport = () => {
        ContactService.exportToExcel(filtered)
    };

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <FileSpreadsheet className="w-7 h-7 text-green-600" />
                Export Address Book
            </h1>

            <div className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name, email, phone..."
                    className="w-full sm:w-80 border border-gray-300 rounded-lg p-3"
                />
                <button
                    onClick={handleExport}
                    className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Export to Excel
                </button>
                <Link
                    href="/"
                    className="bg-blue-600 inline-flex items-center text-white px-5 py-2.5 mx-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                    Back to Home
                </Link>
            </div>

            <div className="border-t pt-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-700">Preview ({filtered.length} results)</h2>

                {filtered.length === 0 ? (
                    <p className="text-gray-500">No contacts match your search.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className={"p-2 border"}>Avatar</th>
                                <th className={"p-2 border"}>Name</th>
                                <th className={"p-2 border"}>Email</th>
                                <th className={"p-2 border"}>Phone</th>
                                <th className={"p-2 border"}>Address</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filtered.map((contact) => (
                                <tr key={contact.id} className={"hover:bg-gray-50"}>
                                    <td className="p-2 border">
                                        {contact.avatar ? (
                                            <img src={contact.avatar} alt="" />
                                        ) : (
                                            <User className={"w-6 h-6 text-blue-800"} />
                                        )}
                                    </td>
                                    <td className={"p-2 border"}>{contact.name}</td>
                                    <td className={"p-2 border"}>{contact.email}</td>
                                    <td className={"p-2 border"}>{contact.phone}</td>
                                    <td className={"p-2 border"}>{contact.address}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
