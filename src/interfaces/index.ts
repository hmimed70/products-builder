export interface IProduct {
    id?: string | undefined;
    title: string;
    description: string;
    price: string;
    category: {
      name: string;
      imageURL: string;
    };
    imageURL?: string;
    colors: string[];
  }
  export interface IFormInput {
    id: string;
    name: 'title' | 'description' | 'imageURL' | 'price';
    label: string;
    type: string;
  }
