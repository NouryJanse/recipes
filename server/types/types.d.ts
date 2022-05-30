interface FastifyRecipeBody {
  name: string
  description: string
  authorId: number
  course: string
  images: []
}

interface FastifyRecipeParams {
  id: string
}

declare module '*.json' {
  const value: any
  export default value
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
  position?: number
}
