'use client'
import React, { useContext, useState, } from 'react'
import { GlobalContext } from '@/context'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Link from 'next/link'

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
        setNavClick(!navClick);
    }
    const [navClick, setNavClick] = useState(false);

    const onMenuClick = () => {
        setNavClick(!navClick);
    }

    return (
        <>
            <nav className='bg-slate-900 fixed w-full z-20 top-0 left-0'>
                <div className='max-w-screen-xl text-white flex flex-wrap items-center justify-between mx-auto p-4 '>
                    <div onClick={() => router.push('/')} className='flex items-center cursor-pointer p-2 rounded hover:bg-white hover:text-black '>
                        BIRD AUDIO DETECTION
                    </div>
                    <button data-collapse-toggle="navbar-user" type="button"
                        onClick={(e) => { e.preventDefault(); onMenuClick() }}
                        className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden`}
                        aria-controls="navbar-user" aria-expanded="false">
                        {!navClick &&
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        }
                        {navClick &&
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                    </button>
                    <div className={`items-center justify-between w-full md:flex md:w-auto ${navClick ? '' : 'hidden'}`} id="navbar-user">
                        <ul className={`flex flex-col font-medium p-4 md:p-0 mt-4  md:flex-row md:space-x-8   md:mt-0 md:border-0 `}>
                            <li>
                                <Link href="/" onClick={() => { router.push("/"); onMenuClick() }}
                                    className="block py-2 pl-3 pr-4 rounded hover:bg-white hover:text-black"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="register" onClick={() => { router.push("/register"); onMenuClick() }}
                                    className="block py-2 pl-3 pr-4 rounded hover:bg-white hover:text-black"
                                >
                                    Sign up
                                </Link>
                            </li>
                            <li>
                                {
                                    isAuthUser ?
                                        <button onClick={handelLogout} >
                                            <p className='block py-2 pl-3 pr-4 rounded hover:bg-white hover:text-black'>log out</p>
                                        </button>
                                        :
                                        <button onClick={() => { router.push("/login"); onMenuClick() }} >
                                            <p className='block py-2 pl-3 pr-4 rounded hover:bg-white hover:text-black'>Sign in</p>
                                        </button>
                                }
                            </li>
                        </ul>

                    </div>

                </div>
            </nav>
        </>
    )
}
