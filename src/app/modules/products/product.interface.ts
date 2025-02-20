export type TProduct = {
  name: string;
  brand: string;
  price: number;
  category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
  image: string | File;
  description : string,
  quantity : number,
  inStock : boolean,
  createdAt?: Date; 
  updatedAt?: Date; 
};
