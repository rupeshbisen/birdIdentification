"use client";
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '@/context';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import InputComponent from '@/components/formElements/InputComponent';
import { loginFormControls } from '@/utils';
import loginUserTypes from '@/types/loginUserTypes';
import { login } from '@/service/login';
import Cookies from "js-cookie"
import ComponentLevelLoader from '@/components/loader/ComponentLevelLoader';
import Notification from '@/components/Notification';


const initialFormdata: loginUserTypes = {
    email: "",
    password: "",
};
export default function Login() {

    const [formData, setFormData] = useState(initialFormdata);
    const {
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        componentLevelLoader,
        setComponentLevelLoader,
    } = useContext(GlobalContext);

    const router = useRouter();

    function isValidForm() {
        return formData &&
            formData.email &&
            formData.email.trim() !== "" &&
            formData.password &&
            formData.password.trim() !== ""
            ? true
            : false;
    }

    async function handleLogin() {
        setComponentLevelLoader({ loading: true, id: "" });
        const res = await login(formData);

        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setIsAuthUser(true);
            setUser(res?.data?.user);
            setFormData(initialFormdata);
            Cookies.set("token", res?.data?.token);
            localStorage.setItem("user", JSON.stringify(res?.data?.user));
            setComponentLevelLoader({ loading: false, id: "" });
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setIsAuthUser(false);
            setComponentLevelLoader({ loading: false, id: "" });
        }
    }

    useEffect(() => {
        if (isAuthUser) router.push("/");
    }, [isAuthUser, router]);

    return (
        <div className="bgImg relative">
            <div className="flex flex-col items-center justify-between pt-0 pb-0 px-4 md:px-10 mt-8 mr-auto xl:px-5 lg:flex-row">
                <div className="flex flex-col justify-center items-center w-full lg:flex-row">
                    <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                        <div className="flex flex-col items-center justify-start p-5 md:p-10 bg-white shadow-2xl rounded-xl relative z-10">
                            <p className="w-full text-4xl font-medium text-center font-serif">
                                Login
                            </p>
                            <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-6">
                                {loginFormControls.map((controlItem) =>
                                    controlItem.componentType === "input" ? (
                                        <InputComponent
                                            key={controlItem.id}
                                            type={controlItem.type}
                                            placeholder={controlItem.placeholder}
                                            label={controlItem.label}
                                            value={formData[controlItem.id] as string}
                                            onChange={(event) => {
                                                setFormData({
                                                    ...formData,
                                                    [controlItem.id]: event.target.value,
                                                });
                                            }}
                                        />
                                    ) : null
                                )}
                                <button
                                    className="disabled:opacity-50 inline-flex w-full rounded items-center justify-center bg-blue-600 p-2 text-base	 
                                    text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                                    disabled={!isValidForm()}
                                    onClick={handleLogin}
                                > 
                                    {componentLevelLoader && componentLevelLoader.loading ? (
                                        <ComponentLevelLoader
                                            text={"Logging In"}
                                            color={"#ffffff"}
                                            loading={
                                                componentLevelLoader && componentLevelLoader.loading
                                            }
                                        />
                                    ) : (
                                        "Login"
                                    )}
                                </button>
                                <div className="flex flex-col gap-2 ">
                                    <p className='text-gray-800' >New to website ?</p>
                                    <button
                                        className="inline-flex w-full items-center rounded justify-center bg-blue-600 p-2 text-base	
                                         text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                                        onClick={() => router.push("/register")}
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Notification />
        </div>
    )
}
