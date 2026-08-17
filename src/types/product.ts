export interface IProduct {
  id: string;
  slug: string;
  name: string;
  category: "divan" | "uglovoy-divan" | "matras" | "krovat" | "korpusnaya";
  price: number;
  oldPrice?: number;
  inStock: boolean;
  customOrder: boolean;
  manufacturer: string;
  description: string;
  specs: Record<string, string>;
  images: string[];
  createdAt: string;
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ILead {
  id: string;
  name: string;
  phone: string;
  product?: string;
  message?: string;
  createdAt: string;
}

export interface IOrder {
  id: string;
  items: { productId: string; qty: number; price: number }[];
  name: string;
  phone: string;
  address: string;
  total: number;
  status: "new" | "processing" | "delivered" | "cancelled";
  createdAt: string;
}
