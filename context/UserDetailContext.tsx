import { createContext, Dispatch, SetStateAction } from "react";
import { Id } from "@/convex/_generated/dataModel";

interface UserDetails {
    id?: Id<"users">;
    name: string;
    imageUrl: string;
    email: string;
}

interface UserDetailContextType {
    userDetail: UserDetails | null;
    setUserDetail: Dispatch<SetStateAction<UserDetails | null>>;
}

export const UserDetailContext = createContext<UserDetailContextType | null>(null)

export type { UserDetails, UserDetailContextType };
