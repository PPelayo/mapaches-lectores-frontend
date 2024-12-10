import {create} from "zustand";
import User from "../definitions/user";

type UserStore = {
    user : User | null
    setUser : (user : User) => void,
    clearUser : () => void,
    isLoadingUser : boolean,
    setIsLoadingUser : (bool : boolean) => void
}

export const useUserStore = create<UserStore>()((set) => ({
    user: null,
    setUser: (newUser : User) => set({user: newUser}),
    clearUser: () => set({user: null}),
    isLoadingUser: false,
    setIsLoadingUser: (bool : boolean) => set({isLoadingUser: bool})
}))