'use client'

import React, {useEffect, useState, use} from 'react'
import {Contact} from '@/app/models/Contact'
import {ContactService} from '@/app/services/ContactService'
import {useRouter} from 'next/navigation'
import {LucideHome, LucideMail, LucidePhone, User} from 'lucide-react'
import Link from "next/link";

interface PageProps {
    params: Promise<{ contactId: string }>
}

const Page: React.FC<PageProps> = (props) => {
    const router = useRouter()
    const {contactId} = use(props.params)
    const id = Array.isArray(contactId) ? contactId[0] : contactId
    const editing = !!id

    const [form, setForm] = useState<Contact>({
        id: id ?? '',
        name: '',
        email: '',
        phone: '',
        address: '',
        avatar: '',
    })

    const [formErrors, setFormErrors] = useState<Record<string, string>>({})
    const [touched, setTouched] = useState<Record<string, boolean>>({})

    useEffect(() => {
        if (editing) {
            const contact = ContactService.getContactById(id!)
            if (contact) setForm(contact)
        }
    }, [id, editing])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm((prev) => ({...prev, [name]: value}))
        setTouched((prev) => ({...prev, [name]: true}))
        if (value.trim() !== '') {
            setFormErrors((prev) => ({...prev, [name]: ''}))
        }
    }

    const validate = () => {
        const requiredFields: (keyof Contact)[] = ['name', 'email', 'phone', 'address']
        const errors: Record<string, string> = {}

        requiredFields.forEach((field) => {
            if (!form[field] || form[field].trim() === '') {
                errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
            }
        })

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = () => {
        if (!validate()) return

        if (editing) {
            ContactService.updateContact(form)
        } else {
            ContactService.createContact(form)
        }

        router.push('/')
    }

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-8">
            <div>
                <h2 className="text-4xl font-bold mb-6 text-gray-900 w-full">
                    {editing ? 'Edit' : 'Add'} Contact
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-1 font-medium text-gray-700">
                            Name<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            required
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className={`border rounded-lg p-3 w-full text-gray-700 focus:outline-none focus:ring-2 ${
                                formErrors.name ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-500'
                            }`}
                            placeholder="Name"
                        />
                        {formErrors.name && (
                            <span className="text-red-500 text-sm mt-1">{formErrors.name}</span>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 font-medium text-gray-700">
                            Email<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            required
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className={`border rounded-lg p-3 w-full text-gray-700 focus:outline-none focus:ring-2 ${
                                formErrors.email ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-500'
                            }`}
                            placeholder="Email"
                        />
                        {formErrors.email && (
                            <span className="text-red-500 text-sm mt-1">{formErrors.email}</span>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="phone" className="mb-1 font-medium text-gray-700">
                            Phone<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            required
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className={`border rounded-lg p-3 w-full text-gray-700 focus:outline-none focus:ring-2 ${
                                formErrors.phone ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-500'
                            }`}
                            placeholder="Phone"
                        />
                        {formErrors.phone && (
                            <span className="text-red-500 text-sm mt-1">{formErrors.phone}</span>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="address" className="mb-1 font-medium text-gray-700">
                            Address<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            required
                            id="address"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            className={`border rounded-lg p-3 w-full text-gray-700 focus:outline-none focus:ring-2 ${
                                formErrors.address ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-500'
                            }`}
                            placeholder="Address"
                        />
                        {formErrors.address && (
                            <span className="text-red-500 text-sm mt-1">{formErrors.address}</span>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="avatar" className="mb-1 font-medium text-gray-700">
                            Avatar
                        </label>
                        <input
                            id="avatar"
                            name="avatar"
                            value={form.avatar}
                            onChange={handleChange}
                            className={`border rounded-lg p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Avatar URL"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-1 w-full justify-end">
                    <Link
                        href="/"
                        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Back to Home
                    </Link>

                    <button
                        onClick={handleSubmit}
                        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Save Contact
                    </button>
                </div>

            </div>

            <div className="pt-6 border-t">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Preview</h3>
                <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-start gap-4 w-full md:w-auto">
                        <div className="bg-blue-100 text-blue-800 p-3 rounded-full">
                            {form.avatar ? (
                                <img
                                    src={form.avatar}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            ) : (
                                <User className="w-6 h-6 text-blue-800"/>
                            )}
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800">
                                {form.name || 'Name'}
                            </h4>
                            <div className={`flex flex-col items-baseline justify-start`}>
                                <p className="text-black inline-flex items-center gap-1">
                                    <span><LucideMail className="text-yellow-500"/></span>
                                    {form.email || 'Email'}
                                </p>
                                <p className="text-black inline-flex items-center gap-1">
                                    <span><LucidePhone className="text-red-500"/></span>
                                    {form.phone || 'Phone Number'}
                                </p>
                                <p className="text-black inline-flex items-center gap-1"><span><LucideHome
                                    className={`text-blue-500`}/></span> {form.address || 'Address'}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
