/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { FC, createContext, useState, Dispatch, SetStateAction, useEffect } from 'react';
import Cookies from 'js-cookie';
import registerUserType from '@/types/registerUserType';
import { AddProductTypes, } from '@/types/productTypes';
import { usePathname, useRouter } from 'next/navigation';

interface ComponentLevelLoader {
    loading: boolean;
    id: string;
}

interface GlobalContextProps {
    showNavModal: boolean;
    setShowNavModal: Dispatch<SetStateAction<boolean>>;
    pageLevelLoader: boolean;
    setPageLevelLoader: Dispatch<SetStateAction<boolean>>;
    componentLevelLoader: ComponentLevelLoader;
    setComponentLevelLoader: Dispatch<SetStateAction<ComponentLevelLoader>>;
    isAuthUser: boolean;
    setIsAuthUser: Dispatch<SetStateAction<boolean>>;
    user: registerUserType | null;
    setUser: Dispatch<SetStateAction<registerUserType | null>>;
    currentUpdatedProduct: AddProductTypes | null;
    setCurrentUpdatedProduct: Dispatch<SetStateAction<AddProductTypes | null>>;
}

export const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps);



const protectedRoutes = ["cart", "checkout", "account", "orders", "admin-view"];

const protectedAdminRoutes = [
    "/admin-view",
    "/admin-view/add-product",
    "/admin-view/all-products",
];
interface GlobalStateProps {
    children: React.ReactNode;
}

const GlobalState: FC<GlobalStateProps> = ({ children }) => {
    const [showNavModal, setShowNavModal] = useState<boolean>(false);
    const [pageLevelLoader, setPageLevelLoader] = useState<boolean>(false);
    const [componentLevelLoader, setComponentLevelLoader] = useState<ComponentLevelLoader>({
        loading: false,
        id: "",
    });
    const [isAuthUser, setIsAuthUser] = useState<boolean>(false);
    const [user, setUser] = useState<registerUserType | null>(null);
    const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState<AddProductTypes | null>(null);


    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        if (Cookies.get('token') !== undefined) {
            setIsAuthUser(true);
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            setUser(userData);
        } else {
            setIsAuthUser(false);
            setUser({} as registerUserType); //unauthenticated user
        }
    }, [Cookies]);

    useEffect(() => {
        if (
            pathName !== "/register" &&
            !pathName.includes("product") &&
            pathName !== "/" &&
            user &&
            Object.keys(user).length === 0 &&
            !protectedRoutes.includes(pathName)
        )
            router.push("/login");
    }, [user, pathName]);

    useEffect(() => {
        if (
            user !== null &&
            user &&
            Object.keys(user).length > 0 &&
            user?.role !== "admin" &&
            protectedAdminRoutes.indexOf(pathName) > -1
        )
            router.push("/unauthorized-page");
    }, [user, pathName]);


    return (
        <GlobalContext.Provider
            value={{
                showNavModal,
                setShowNavModal,
                pageLevelLoader,
                setPageLevelLoader,
                componentLevelLoader,
                setComponentLevelLoader,
                isAuthUser,
                setIsAuthUser,
                user,
                setUser,
                currentUpdatedProduct,
                setCurrentUpdatedProduct,
            }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalState;
