import dbConnect from '@/lib/dbConnect';
import { productModel } from '@/models/Product';

export default async function handle(req, res) {
  if (req.method === 'GET') {
    try {
      console.log(req.method)
      await dbConnect();
      const id = req.query.id;
      console.log(id);

      const response = await productModel.findById(id);

      if (response) {
        return res.status(200).json(response);
      } else {
        return res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  if (req.method === 'POST'){
    try {
      await dbConnect();
      const {cart} = req.body
    } catch (error) {
      
    }
  }
}