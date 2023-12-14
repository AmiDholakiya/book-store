export type BookType = {
    id:string | any | undefined;
    name:string | undefined;
    price:number | undefined;
    category:string | undefined;
    description:string | undefined;
}

export type AddBookType = {
    name:string;
    price:number;
    category:string;
    description:string;
}

export interface FormState {
    [key: string]: string | undefined;
}