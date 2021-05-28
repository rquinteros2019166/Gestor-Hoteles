export class Hotel{
  constructor(
    public _id: String,
    public name: String,
    public address: String,
    public phone: String,
    public email: String,
    public adminUserHotel:String,
    public images:[],
    public reservations:Number,
  ){}
}
