export type BookType = {
    id:string | any | null;
    name:string | null;
    price:number | null;
    category:string | null;
    description:string | null;
}

export type AddBookType = {
    name:string;
    price:number;
    category:string;
    description:string;
}

export interface FormState {
    [key: string]: string | null;
}