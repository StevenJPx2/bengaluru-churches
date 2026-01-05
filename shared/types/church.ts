export interface Church {
  id: number
  name: string
  denomination: string
  address: string
  area: string
  coordinates: [number, number]
  established: number | null
  services: string[] | null
  phone: string | null
  website: string | null
}
