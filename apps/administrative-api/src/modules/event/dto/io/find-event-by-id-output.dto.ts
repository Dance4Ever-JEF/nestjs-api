export type FindEventByIdOutputDTO = {
  id: number,
  title: string,
  description: string | null,
  date: Date,
  location: string,
  capacity: number,
  price: number,
  createdAt: Date,
  updatedAt: Date
}
