export interface LoginInput {
    mail: string;
    contraseña: string;
}

export interface DecodedToken {
    id: number;
    mail: string;
    tipo: string;
}
