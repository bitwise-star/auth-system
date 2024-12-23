interface IUserRegisterData {
    username: string,
    email: string,
    password: string
}

interface IUserLoginData {
    email: string,
    password: string
}

interface IUserData {
    id: number,
    username: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
}

export type { IUserData, IUserRegisterData, IUserLoginData };