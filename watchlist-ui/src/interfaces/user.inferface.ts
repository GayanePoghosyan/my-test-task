export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
}
export interface UserState {
    user: IUser,
    accessToken: string,
    loading: boolean,
    error: string
}