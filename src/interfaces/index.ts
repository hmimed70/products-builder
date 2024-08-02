import {  TProductName } from "../types";

export interface IProduct {
    id?: string | undefined;
    title: string;
    description: string;
    price: string;
    category: {
      name: string;
      imageURL: string;
    };
    imageURL: string;
    colors: string[];
  }
  export interface IFormInput {
    id: string;
    name: TProductName;
    label: string;
    type: string;
  }
export interface ICategory {
  id: string;
  name: string;
  imageURL: string;
}