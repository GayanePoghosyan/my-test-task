export interface IUser {
    _id?: string,
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
    googleId?:string,

}
export interface UserState {
    user: IUser,
    accessToken: string,
    loading: boolean,
    error: string
}