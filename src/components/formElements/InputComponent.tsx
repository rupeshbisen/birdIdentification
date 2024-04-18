import React, { ChangeEvent, useState } from 'react';

interface InputComponentProps {
    label: string;
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    type?: string;
}

export default function InputComponent(InputComponentProps: InputComponentProps) {
    const { label, placeholder, onChange, value, type, } = InputComponentProps
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <div className="relative">
            <p className="pr-2 pl-2 absolute -mt-2 ml-2 text-sm  font-medium text-gray-600 bg-white">
                {label}
            </p>
            <input
                placeholder={placeholder}
                type={type === "password" ? visible ? "text" : "password" : type}
                onChange={onChange}
                className="border placeholder-gray-400 text-gray-800 text-sm focus:outline-none focus:border-black w-full p-2 text-base block bg-white border-gray-300 rounded-md"
            />
            {type === "password" && <span onClick={() => setVisible(!visible)} className="absolute right-2 top-2 ps-3 font-medium text-gray-600 bg-white" >
                {visible ?
                    <i className="fa-solid fa-eye"></i>
                    :
                    <i className="fa-solid fa-eye-slash"></i>
                }
            </span>}
        </div>
    );
}