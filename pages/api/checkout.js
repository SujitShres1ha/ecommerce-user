import dbConnect from "@/lib/dbConnect";
import { orderModel } from "@/models/Order";
import { productModel } from "@/models/Product";
import { ObjectId } from "mongodb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handle(req, res) {
  if (req.method !== "POST") {
    res.json("must be a POST request");
    return;
  }

  try {
    await dbConnect();

    const {
      name,
      email,
      firstAddress,
      secondAddress,
      city,
      state,
      productCart,
    } = req.body;
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
          productName: productInfo.name,
          productId: product.id,
          quantity: product.quantity,
          price: productInfo.price,
          totalPrice: product.quantity * productInfo.price,
        });
      }
    }
    // need to check stock before order
   

    const orderDoc = await orderModel.create({
      items: line_items,
      shippingDetails: {
        name,
        email,
        address: `${firstAddress} ${secondAddress}`,
        city,
        state,
      },
      totalPrice: line_items.reduce(
        (acc, product) => acc + product.quantity * product.price,
        0
      ),
    });

    // console.log(line_items);

    //after order i need to make sure that the product stock is decreased.
    try {
      const bulkOps = line_items.map((item) => ({
        updateOne: {
          filter: { _id: new ObjectId(item.productId) },
          update: { $inc: { stock: -item.quantity, sold: item.quantity } },
        },
      }));
    
      // console.log('Bulk operations:', JSON.stringify(bulkOps, null, 2));
      const result = await productModel.bulkWrite(bulkOps);
      console.log('Bulk write result:', result);
    } catch (error) {
      console.error("Error updating product stock:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const stripeLineItems = line_items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.productName,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: stripeLineItems,
      mode: "payment",
      customer_email: email,
      success_url: "http://localhost:3000/cart?success=1",
      cancel_url: "http://localhost:3000/cart?canceled=1",
      metadata: { orderId: orderDoc._id.toString() },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
