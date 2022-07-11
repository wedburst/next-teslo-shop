import { Typography, Box } from "@mui/material";
import type { NextPage, GetServerSideProps } from "next";
import { ShopLayouts } from "components/layouts";
import { ProductList } from "components/products";
import { dbProducts } from "database";
import { IProduct } from "interfaces";

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
    console.log(products, foundProducts, query)
  return (
    <ShopLayouts
      title={"Tesla-Shop - Search"}
      pageDescription={"Los mejores productos de Teslo"}
    >
      <Typography variant="h1" component="h1">
        Buscar productos
      </Typography>
      {
        foundProducts
            ?
                <Typography variant="h2" sx={{ mb: 1 }} textTransform="uppercase">Termino: {query} </Typography>
            : (
                <Box display="flex">
                    <Typography variant="h2" sx={{ mb: 1 }}> No encontramos ningun producto </Typography>
                    <Typography variant="h2" sx={{ ml: 1 }} color="secondary" textTransform="uppercase"> {query} </Typography>
                </Box>
            )
      }
      {/* <Typography variant="h2" sx={{ mb: 1 }}>
        {`${query} ${foundProducts ? '' : ('No encontrado')} `}
      </Typography> */}

      <ProductList products={products} />
    </ShopLayouts>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { query = '' } = params as { query: string };

    if ( query.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    // y no hay productos
    let products = await dbProducts.getProductsByTerm( query );
    const foundProducts = products.length > 0;

    // TODO: retornar otros productos
    if ( !foundProducts ) {
        // products = await dbProducts.getAllProducts(); 
        products = await dbProducts.getProductsByTerm('shirt');
    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}

export default SearchPage;
