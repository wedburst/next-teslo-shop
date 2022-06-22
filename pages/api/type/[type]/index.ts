import { db } from "database";
import { IProduct } from "interfaces";
import { Product } from "models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IProduct[];

export default function hanldler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProductBySlug(req, res);

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

async function getProductBySlug(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    let { type } = req.query;

  if (type.length === 0) {
    return res.status(400).json({
      message: "type must be at least 3 characters long",
    });
  }

  type = type.toString().toLowerCase();

  await db.connect();
  const products = await Product.find({
    $text: { $search: type },
  })
  .select('title image price inStock slug type -_id')
  .lean();

  await db.disconnect();

  // return res.status(200).json({
  //   message: q.toString(),
  // })

  return res.status(200).json(products);
}
