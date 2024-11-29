export default interface User {
    name: string
    email: string
    role: UserRole
}

export type UserRole = 'Regular' | 'Moderator' | 'Admin'