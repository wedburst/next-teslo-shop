import { db } from "database";
import { IProduct } from "interfaces";
import { Product } from "models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IProduct;

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
  const { id } = req.query;
  await db.connect();

  const product = await Product.findById(id);

  await db.disconnect();

  if (!product) {
    return res
      .status(400)
      .json({ message: "No hay entradas con este ID: " + id });
  }

  return res.status(200).json(product);
}
