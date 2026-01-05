export interface Church {
  id: number
  name: string
  denomination: string
  address: string
  area: string
  coordinates: [number, number]
  established?: number | null
  services?: string[]
  phone?: string | null
  website?: string | null
}
