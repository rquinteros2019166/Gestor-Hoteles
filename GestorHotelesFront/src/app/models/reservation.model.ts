export class Reservetion{
  constructor(
    public _id: String,
    public dateDeperture: String,
    public dateArrival: String,
    public services: [{
      service: String,
      nameService: String,
      price: Number
    }],
    public userId: String

  ){}
}
