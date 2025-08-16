import { createContext, Dispatch, SetStateAction } from "react";

interface UserDetails {
    id?: string;
    name: string;
    imageUrl: string;
    email: string;
}

interface UserDetailContextType {
    userDetail: UserDetails | null;
    setUserDetail: Dispatch<SetStateAction<UserDetails | null>>;
}

export const UserDetailContext = createContext<any | null>(null)