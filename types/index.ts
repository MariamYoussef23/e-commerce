export interface Product {
  id: number
  name: string
  href: string
  color: string
  price: string
  availableQty: number
  trending: string
  images: Image[]
}
export interface Image {
  id: number
  src: string
  alt: string
  productId: number
}
export interface CartItem extends Product {
  quantity: number
}

export interface Collection {
  id:number
  name: string
  imageSrc: string
  imageAlt: string
}

export type Category = {
  name: string
  featured: Product[]
}
export type AppStateType = {
  products: Product[]
  categories: Category[]
  cart: CartItem[]
  images: Image[]
}

export type Page = {
    name: string;
    href: string;
}
export type Navigation = {
  categories: Category[]
}

