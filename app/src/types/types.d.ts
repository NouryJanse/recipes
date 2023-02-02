declare module 'DateHelper'
declare module '*.woff'
declare module '*.woff2'

interface Image {
  id: number
  url: string
  width: number
  height: number
  position: number
  recipeId: number
  cloudinaryPublicId: string
}

interface Recipe {
  id: number
  name?: string
  description?: string
  authorId: string
  course?: string
  createdAt: string
  updatedAt: string
  images?: Image[]
  ingredients: Ingredient[]
}
interface Ingredient {
  id: number
  name?: string
  unit: string
  published: boolean
  calorieCount: number
  createdAt: string
  updatedAt: string
}

type RecipeIngredient = {
  authorId: string
  recipeId: number
  ingredientId: number
  amount: number
  unit: string
}

interface Option {
  id: number
  text: string
  value: string
  disabled: boolean
}

interface CloudinaryImage {
  access_mode: string
  asset_id: string
  bytes: number
  created_at: Date
  etag: string
  folder: string
  format: string
  height: number
  pages: number
  placeholder: boolean
  public_id: string
  resource_type: string
  tags: []
  type: string
  url: string
  version: number
  version_id: string
  width: number
}

interface CloudinaryImageWithRecipeId extends CloudinaryImage {
  recipeId: number
}

interface RecipeFormProps {
  name: string
}

interface User {
  name: string
  token: string
  sub: string
}

interface Auth0Interface {
  redirect_uri?: string
  scope?: string
  token?: string
  auth0Client?: Auth0Client
  user?: object
  error?: string
  isLoading?: boolean
  isAuthenticated?: boolean
  login: () => void
  logout: () => void
}

interface Error {
  error: string
}

interface ImageData {
  id?: number
  name?: string
  width?: number
  height?: number
  url?: string
  path?: string
  size?: string
  type?: string
  data?: string | undefined
  position?: number
  cloudinaryId?: string
}

type AuthProps = {
  auth0: Auth0Interface
}
