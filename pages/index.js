import Featured from "@/components/Featured";
import Header from "@/components/Header";
import LatestProducts from "@/components/LatestProducts";
import Layout from "@/components/Layout";
import dbConnect from "@/lib/dbConnect";
import { productModel } from "@/models/Product";


export default function Home({product, latestProducts}) {
  console.log(latestProducts)
  return (
    <Layout>
      <Featured product={product}/>
      <LatestProducts newProducts={latestProducts}/>
    </Layout>
  );
}

export async function getServerSideProps(){
  const featuredProductId = '676c24258536a581690bfc15';
  await dbConnect();
  const featuredProduct = await productModel.findById(featuredProductId)
  const newProducts = await productModel.find({},null,{sort: {'_id':-1}})
  return {
    props: {
      product: JSON.parse(JSON.stringify(featuredProduct)),
      latestProducts: JSON.parse(JSON.stringify(newProducts))
    }

  }
}