import { create } from "zustand";
import User from "../definitions/user";

type UserStore = {
    user : User | null
    setUser : (user : User) => void
}

export const useUserStore = create<UserStore>()((set) => ({
    user: null,
    setUser: (newUser : User) => set({user: newUser})
}))