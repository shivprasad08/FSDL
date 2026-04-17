export interface Product {
  _id: string;
  name: string;
  subtitle: string;
  price: number;
  availableSizes: string[];
  detailImages?: string[];
  rating?: number;
  reviewCount?: number;
  originCountry?: string;
  styleCode?: string;
  colours: { name: string; code: string }[];
  category: string;
  imageUrl: string;
  description?: string;
  isFeatured: boolean;
  isNew: boolean;
  stock: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  size: string;
}
