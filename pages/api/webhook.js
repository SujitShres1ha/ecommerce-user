import dbConnect from "@/lib/dbConnect";
import { orderModel } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { buffer } from "micro";

const endpointSecret =
  "whsec_0288b0af5f99646b3c80ec38a10d7b039d51bd6cf5f59701133578ebee82d8d9";
export default async function handler(req, res) {
  await dbConnect();
  let event = req.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        await buffer(req),
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId
      const paymentStatus = data.payment_status === 'paid'
      if (orderId && paymentStatus){
        try {
          await orderModel.findByIdAndUpdate(orderId, {paymentStatus: 'Paid'})
        } catch (error) {
          console.error('Error updating order: ',error.message)
          return res.status(200)
        }
      }
      
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }


  res.status(200).send('ok');
}

export const config = {
  api: {
    bodyParser: false,
  },
};
