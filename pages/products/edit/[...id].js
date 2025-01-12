// import Layout from "@/components/Layout";
// import {useRouter} from "next/router";
// import {useEffect, useState} from "react";
// import axios from "axios";
// import ProductForm from "@/components/ProductForm";

// export default function EditProductPage() {
//   const [productInfo, setProductInfo] = useState(null);
//   const router = useRouter();
//   const {id} = router.query;
//   useEffect(() => {
//     if (!id) {
//       return;
//     }
//     axios.get('/api/products?id='+id).then(response => {
//       setProductInfo(response.data);
//     });
//   }, [id]);
//   return (
//     <Layout>
//       <h1>Edit product</h1>
//       {productInfo && (
//         <ProductForm {...productInfo} />
//       )}
//     </Layout>
//   );
// }

import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/products?id=' + id)
      .then(response => {
        setProductInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        alert('Failed to fetch product details. Please try again later.');
      });
  }, [id]);

  return (
    <Layout>
      <h1>Edit product</h1>
      {productInfo ? (
        <ProductForm {...productInfo} />
      ) : (
        <p>Loading product details...</p>
      )}
    </Layout>
  );
}
