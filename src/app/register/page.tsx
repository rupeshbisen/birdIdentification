"use client";
import React, { useContext, useEffect, useState } from 'react'
import { registrationFormControls } from '@/utils';
import InputComponent from '@/components/formElements/InputComponent';
import { useRouter } from 'next/navigation';
import { GlobalContext } from '@/context';
import { toast } from 'react-toastify';
import registerUserType from '@/types/registerUserType';
import { registerNewUser } from '@/service/register';
import ComponentLevelLoader from '@/components/loader/ComponentLevelLoader';
import Notification from '@/components/Notification';

const initialFormData: registerUserType = {
    name: "",
    email: "",
    mobile: "",
    password: "",
}
export default function Register() {

    const [formData, setFormData] = useState(initialFormData);
    const [isRegistered, setIsRegistered] = useState(false);
    const { pageLevelLoader, setPageLevelLoader, isAuthUser } = useContext(GlobalContext);

    const router = useRouter()

    function isFormValid() {
        return formData &&
            formData.name &&
            formData.name.trim() !== "" &&
            formData.email &&
            formData.email.trim() !== "" &&
            formData.mobile &&
            formData.mobile.trim() !== "" &&
            formData.mobile.match(/^[6-9]\d{9}$/) &&
            formData.password &&
            formData.password.trim() !== ""
            ? true
            : false;
    }

    async function handleRegisterOnSubmit() {
        setPageLevelLoader(true);
        const data = await registerNewUser(formData);

        if (data.success) {
            toast.success(data.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setIsRegistered(true);
            setPageLevelLoader(false);
            setFormData(initialFormData);
        } else {
            toast.error(data.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setPageLevelLoader(false);
            setFormData(initialFormData);
        }
    }

    useEffect(() => {
        if (isAuthUser) router.push("/");
    }, [isAuthUser, router]);

    return (
        <div className="bgImg relative">
            <div className="flex items-center justify-between h-screen pt-0 pb-0 px-4 md:px-10 mr-auto xl:px-5">
                <div className="flex justify-center items-center w-full">
                    <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                        <div className="flex flex-col items-center justify-start p-5 md:p-10 bg-white shadow-2xl rounded-xl relative z-10">
                            <p className="w-full text-4xl text-black font-medium text-center font-serif">
                                {isRegistered
                                    ? "Registration Successfull !"
                                    : "Sign up for an account"}
                            </p>
                            {isRegistered ? (
                                <button
                                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                                    text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                                    onClick={() => router.push('/login')}
                                >
                                    Login
                                </button>
                            ) : (
                                <div className="w-full mt-6 relative space-y-4">
                                    {registrationFormControls.map((controlItem) =>
                                        <InputComponent
                                            key={controlItem.id}
                                            type={controlItem.type}
                                            placeholder={controlItem.placeholder}
                                            label={controlItem.label}
                                            onChange={(event) => {
                                                setFormData({
                                                    ...formData,
                                                    [controlItem.id]: event.target.value,
                                                });
                                            }}
                                            value={formData[controlItem.id] as string}
                                        />
                                    )}
                                    <button
                                        className=" disabled:opacity-50 inline-flex w-full items-center rounded justify-center bg-blue-600 p-3 text-lg 
                                    text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                                        disabled={!isFormValid()}
                                        onClick={handleRegisterOnSubmit}
                                    >
                                        {pageLevelLoader ? (
                                            <ComponentLevelLoader
                                                text={"Registering"}
                                                color={"#ffffff"}
                                                loading={pageLevelLoader}
                                            />
                                        ) : (
                                            "Register"
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Notification />
        </div>
    )
}