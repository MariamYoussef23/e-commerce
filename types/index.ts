export interface Product {
  id?: string
  name: string
  href: string
  color?: string
  price: string
  availableQty?: string
  trending?: string
  imageSrc?: string
  imageAlt?: string
  images?: Image[]
}
export interface Image {
  id?: string
  src: string
  alt: string
  productId?: number
}
export interface CartItem extends Product {
  quantity?: number
}

export interface Collection {
  id:string
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

