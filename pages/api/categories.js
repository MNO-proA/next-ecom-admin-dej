// import {Category} from "@/models/Category";
// import {mongooseConnect} from "@/lib/mongoose";
// import {getServerSession} from "next-auth";
// import {authOptions, isAdminRequest} from "@/pages/api/auth/[...nextauth]";

// export default async function handle(req, res) {
//   const {method} = req;
//   await mongooseConnect();
//   await isAdminRequest(req,res);

//   if (method === 'GET') {
//     res.json(await Category.find().populate('parent'));
//   }

//   if (method === 'POST') {
//     const { name, parentCategory, properties, images = [] } = req.body;
//     const categoryDoc = await Category.create({
//       name,
//       parent: parentCategory || undefined,
//       properties,
//       images,
//     });
//     console.log(req.body)
//     console.log(categoryDoc);
//     res.json(categoryDoc);
   
//   }

//   if (method === 'PUT') {
//     const { name, parentCategory, properties, images = [] } = req.body;
//     const categoryDoc = await Category.updateOne({_id},{
//       name,
//       parent: parentCategory || undefined,
//       properties,
//       images,
//     });
//     res.json(categoryDoc);
//   }

//   if (method === 'DELETE') {
//     const {_id} = req.query;
//     await Category.deleteOne({_id});
//     res.json('ok');
//   }
// }

import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions, isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;

  try {
    await mongooseConnect();
    await isAdminRequest(req, res);

    if (method === 'GET') {
      const categories = await Category.find().populate('parent');
      res.json(categories);
    }

    if (method === 'POST') {
      const { name, parentCategory, properties, images = [] } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
      }

      const categoryDoc = await Category.create({
        name,
        parent: parentCategory || undefined,
        properties,
        images,
      });

      console.log(req.body)
      console.log(categoryDoc);

      res.json(categoryDoc);
    }

    if (method === 'PUT') {
      const { name, parentCategory, properties, images = [] } = req.body;
      const { _id } = req.query;

      if (!_id) {
        return res.status(400).json({ error: 'Category ID is required for updating' });
      }

      const categoryDoc = await Category.updateOne({ _id }, {
        name,
        parent: parentCategory || undefined,
        properties,
        images,
      });

      if (categoryDoc.nModified === 0) {
        return res.status(404).json({ error: 'Category not found or no changes made' });
      }

      res.json(categoryDoc);
    }

    if (method === 'DELETE') {
      const { _id } = req.query;

      if (!_id) {
        return res.status(400).json({ error: 'Category ID is required for deletion' });
      }

      const result = await Category.deleteOne({ _id });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }

      res.json({ message: 'Category deleted successfully' });
    }

  } catch (error) {
    console.error("Error in category route:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
