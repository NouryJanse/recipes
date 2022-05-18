interface CloudinaryImageWithRecipeId extends CloudinaryImage {
  recipeId: number
}
interface Recipe {
  id: number
  name?: string
  description?: string
  authorId: string
  course?: string
  createdAt?: string
  updatedAt?: string
  images?: Image[]
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

interface RecipeFormProps {
  name: string
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
