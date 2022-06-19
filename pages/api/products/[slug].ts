import { db } from 'database'
import { IProduct } from 'interfaces'
import { Product } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
| { message: string }
| IProduct[]

export default function hanldlre(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch( req.method ){
        case 'GET':
            return getProductBySlug(req, res)

        default:
            return res.status(405).json({ message: 'Method not allowed' })
    }
}

async function getProductBySlug(req: NextApiRequest, res: NextApiResponse<Data>) {
    await db.connect();
    
    const products = await Product
        .find()
        .select('slug -_id')
        .lean();

    await db.disconnect();

    return res.status(200).json(products);
}
