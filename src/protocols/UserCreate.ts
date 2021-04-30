import { UserTypes } from "./UserTypes";

export interface IUserCreate {
    name: string,
    email: string,
    password: string,
    repeatPassword: string,
    master_id?: string,
    admin_id?: string,
    cpf_cnpj?: string,
    phone?: string,
    type?: UserTypes,
}