// import {Product} from "@/models/Product";
// import {mongooseConnect} from "@/lib/mongoose";
// import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

// export default async function handle(req, res) {
//   const {method} = req;
//   await mongooseConnect();
//   await isAdminRequest(req,res);

//   if (method === 'GET') {
//     if (req.query?.id) {
//       res.json(await Product.findOne({_id:req.query.id}));
//     } else {
//       res.json(await Product.find());
//     }
//   }

//   if (method === 'POST') {
//     const {title,description,price,images,category,properties} = req.body;
//     const productDoc = await Product.create({
//       title,description,price,images,category,properties,
//     })
//     res.json(productDoc);
//   }

//   if (method === 'PUT') {
//     const {title,description,price,images,category,properties,_id} = req.body;
//     await Product.updateOne({_id}, {title,description,price,images,category,properties});
//     res.json(true);
//   }

//   if (method === 'DELETE') {
//     if (req.query?.id) {
//       await Product.deleteOne({_id:req.query?.id});
//       res.json(true);
//     }
//   }
// }


import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  try {
    await mongooseConnect();
    await isAdminRequest(req, res);

    if (method === 'GET') {
      if (req.query?.id) {
        const product = await Product.findOne({ _id: req.query.id });
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        return res.json(product);
      } else {
        const products = await Product.find();
        res.json(products);
      }
    }

    if (method === 'POST') {
      const { title, description, price, images, category, properties } = req.body;
      const productDoc = await Product.create({
        title,
        description,
        price,
        images,
        category,
        properties,
      });
      res.json(productDoc);
    }

    if (method === 'PUT') {
      const { title, description, price, images, category, properties, _id } = req.body;
      const product = await Product.findByIdAndUpdate(_id, {
        title,
        description,
        price,
        images,
        category,
        properties,
      }, { new: true });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    }

    if (method === 'DELETE') {
      if (req.query?.id) {
        const product = await Product.findByIdAndDelete(req.query.id);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
      } else {
        res.status(400).json({ error: 'Product ID is required' });
      }
    }

  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
