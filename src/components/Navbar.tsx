'use client'
import React, { useContext, } from 'react'
import { GlobalContext } from '@/context'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function Navbar() {
    const {
        setUser,
        isAuthUser,
        setIsAuthUser,
    } = useContext(GlobalContext);

    const router = useRouter();

    const handelLogout = () => {
        setIsAuthUser(false);
        setUser(null);
        Cookies.remove("token");
        localStorage.clear();
        router.push("/");
    }

    return (
        <>
            <nav className='bg-slate-900 fixed w-full z-20 top-0 left-0'>
                <div className='max-w-screen-xl text-white flex flex-wrap items-center justify-between mx-auto p-4 '>
                    <div onClick={() => router.push('/')} className='flex items-center cursor-pointer p-2 rounded hover:bg-white hover:text-black '>
                        BIRD AUDIO DETECTION
                    </div>
                    <div className='flex md:order-2 gap-2'>

                        <ul className={`flex flex-col font-medium p-4 md:p-0 mt-4 bg-white shadow-lg shadow-slate-500/50 rounded-lg md:flex-row md:space-x-8 md:bg-transparent md:shadow-none  md:mt-0 md:border-0 `}>
                            <li>
                                <a href="/"
                                    className="block py-2 pl-3 pr-4 rounded hover:bg-white hover:text-black"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="register"
                                    className="block py-2 pl-3 pr-4 rounded hover:bg-white hover:text-black"
                                >
                                    Sign up
                                </a>
                            </li>
                        </ul>

                        {
                            isAuthUser ?
                                <button onClick={handelLogout} className='mx-1 md:mx-3'>
                                    <p className='block py-2 pl-3 pr-4 rounded hover:bg-white hover:text-black'>log out</p>
                                </button>
                                :
                                <button onClick={() => router.push("/login")} className='mx-1 md:mx-3'>
                                    <p className='block py-2 pl-3 pr-4 rounded hover:bg-white hover:text-black'>Sign in</p>
                                </button>
                        }
                    </div>

                </div>
            </nav>
        </>
    )
}
