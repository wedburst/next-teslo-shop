import { db } from "database";
import { Product } from "models";
import type { NextApiRequest, NextApiResponse } from "next";
import { IProduct } from '../../../interfaces/products';

type Data = 
| { message: string; }
| IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return searchProducts(req, res);

    default:
      return res.status(405).json({
        message: "Method not allowed",
      });
  }
}

async function searchProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  let { q = "" } = req.query;

  if (q.length === 0) {
    return res.status(400).json({
      message: "Query must be at least 3 characters long",
    });
  }

  q = q.toString().toLowerCase();

  await db.connect();
  const products = await Product.find({
    $text: { $search: q },
  })
  .select('title image price inStock slug -_id')
  .lean();

  await db.disconnect();

  // return res.status(200).json({
  //   message: q.toString(),
  // })

  return res.status(200).json(products);
    
}
