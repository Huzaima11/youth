import { useState } from "react";
import { UserIcon, EnvelopeIcon, PhoneIcon, ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui";
import { Listbox } from "@headlessui/react";

const Form = () => {
    // Example JSON data
    const genderOptions = [
        { id: "male", label: "Male" },
        { id: "female", label: "Female" },
        { id: "other", label: "Other" },
    ];

    const maritalOptions = [
        { id: "single", label: "Single" },
        { id: "married", label: "Married" },
        { id: "divorced", label: "Divorced" },
    ];

    const countries = [
        { id: "us", label: "United States" },
        { id: "uk", label: "United Kingdom" },
        { id: "pk", label: "Pakistan" },
    ];

    const [gender, setGender] = useState(genderOptions[0]);
    const [marital, setMarital] = useState(maritalOptions[0]);
    const [country, setCountry] = useState(countries[0]);

    const renderSelect = (label: string, value: any, setValue: any, options: any[]) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <Listbox value={value} onChange={setValue}>
                <div className="relative">
                    <Listbox.Button className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm">
                        <span>{value.label}</span>
                        <ChevronUpDownIcon className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg focus:outline-none sm:text-sm z-10">
                        {options.map((option) => (
                            <Listbox.Option
                                key={option.id}
                                value={option}
                                className={({ active }) =>
                                    `relative cursor-pointer select-none py-2 pl-3 pr-10 ${active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                                    }`
                                }
                            >
                                {({ selected }) => (
                                    <>
                                        <span className={`${selected ? "font-medium" : "font-normal"}`}>{option.label}</span>
                                        {selected && (
                                            <span className="absolute inset-y-0 right-3 flex items-center text-blue-600">
                                                <CheckIcon className="h-5 w-5" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
        </div>
    );

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Personal Information</h1>
                <p className="text-gray-600">
                    Please provide your personal information in order to complete your KYC
                </p>
            </div>

            <div className="space-y-6">
                {/* First + Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                            <Input type="text" placeholder="Enter First Name" className="pl-10" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                            <Input type="text" placeholder="Enter Last Name" className="pl-10" />
                        </div>
                    </div>
                </div>

                {/* Middle Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Middle Name <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                        <Input type="text" placeholder="Enter Middle Name" className="pl-10" />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Enter Email</label>
                    <div className="relative">
                        <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                        <Input type="email" placeholder="Enter Email Address" className="pl-10" />
                    </div>
                </div>

                {/* Gender + Marital Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderSelect("Gender", gender, setGender, genderOptions)}
                    {renderSelect("Marital Status", marital, setMarital, maritalOptions)}
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                        <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                        <Input type="tel" placeholder="Enter Phone Number" className="pl-10" />
                    </div>
                </div>

                {/* Country */}
                {renderSelect("Country", country, setCountry, countries)}
            </div>
        </div>
    );
};

export default Form;
