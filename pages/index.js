import Featured from "@/components/Featured";
import Header from "@/components/Header";
import LatestProducts from "@/components/LatestProducts";
import Layout from "@/components/Layout";
import dbConnect from "@/lib/dbConnect";
import { productModel } from "@/models/Product";


export default function Home({products, latestProducts}) {
  // console.log(latestProducts)
  return (
    <Layout>
      <Featured products={products}/>
      <LatestProducts newProducts={latestProducts}/>
    </Layout>
  );
}

export async function getServerSideProps(){
  const featuredProductIds = ['676c24258536a581690bfc15','679442d978877e2ac019f502'];
  await dbConnect();
  const featuredProducts = []
  for (const id of featuredProductIds){
    const product = await productModel.findById(id)
    if (product) {
      featuredProducts.push(product)
    }
  }
  const newProducts = await productModel.find({},null,{sort: {'_id':-1}})
  return {
    props: {
      products: JSON.parse(JSON.stringify(featuredProducts)),
      latestProducts: JSON.parse(JSON.stringify(newProducts))
    }

  }
}