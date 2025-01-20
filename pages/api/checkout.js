import dbConnect from "@/lib/dbConnect";
import { orderModel } from "@/models/Order";
import { productModel } from "@/models/Product";
import { ObjectId } from "mongodb";

export default async function handle(req, res) {

  if (req.method !== "POST") {
    res.json("must be a POST request");
    return;
  }

  await dbConnect();

  const { name, email, firstAddress, secondAddress, city, state, productCart } = req.body;
  const productInfos = await productModel.find({
    _id: productCart.map((product) => product.id),
  });

  const line_items = [];
  for (const product of productCart) {
    const productInfo = productInfos.find(
      (p) => p._id.toString() === product.id
    );
    if (productInfo) {
      line_items.push({
        productId: product.id,
        quantity: product.quantity,
        price: product.quantity * productInfo.price,
      });
    }
  }

  const orderDoc = await orderModel.create({
    items: line_items,
    shippingDetails: {
      name,
      email,
      address: `${firstAddress} ${secondAddress}`,
      city,
      state,
    },
    totalPrice: line_items.reduce((acc, product) => acc + product.price, 0),
  });


}
