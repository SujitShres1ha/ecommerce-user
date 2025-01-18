import dbConnect from "@/lib/dbConnect";
import { productModel } from "@/models/Product";

export default async function handle(req, res){
  await dbConnect()
  const {ids} = req.body
  console.log(ids)
  const products = (await productModel.find({}))

  res.send(ids.length && products.filter(product => ids.includes(product._id.toString())))
  // res.send(products)
}