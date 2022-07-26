import { useState, useContext } from 'react';
import { useRouter } from "next/router";
import {
  NextPage,
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
} from "next";
import { CartContext } from '../../context/cart/CartContext';
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ShopLayouts } from "../../components/layouts";
import { dbProducts } from "database";
import { ProductSlideShow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { ICartProduct, IProduct, ISize } from "../../interfaces";

// const product = initialData.products[0];

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const { addProductToCart } = useContext( CartContext );
  // const { products: product, isLoading } = useProducts(`/products/${router.query.slug}`);

  // console.log({product})

  // if( isLoading ) return <h1>Cargando</h1>
  // if( !product ) return <h1>No Existe</h1>

  const [temCartProduct, setTemCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })
  
  const selectedSize = (size: ISize) => {
    setTemCartProduct( currentProduct => (
      {
        ...currentProduct,
        size
    }))
    // setTemCartProduct({
    //   ...temCartProduct,
    //   size: size
    // })
  }

  const onUpdateQuantity = (quantity: number) => {
    setTemCartProduct( currentProduct => (
      {
        ...currentProduct,
        quantity
    }))
  }

  const onAddProduct  = () => {
    if ( !temCartProduct.size ) return;

    addProductToCart(temCartProduct);
    router.push("/cart")
  }

  return (
    <ShopLayouts title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          {/* Slideshow */}
          <ProductSlideShow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          {/* Product info */}
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography
              variant="subtitle1"
              component="h2"
            >{`$${product.price}`}</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2" component="h2">
                Cantidad
              </Typography>
              {/* ItemCounter */}
              <ItemCounter 
                currentValue={temCartProduct.quantity}
                updateQuantity={onUpdateQuantity}
                maxvalue={ product.inStock}
                //limite de compra
                // maxvalue={ product.inStock > 5 ? 5 : product.inStock}
              />
              <SizeSelector
                // selectedSize={ product.sizes[0] }
                sizes={product.sizes}
                selectedSize={ temCartProduct.size }
                onSelectedSize={selectedSize}
              />
            </Box>

            {/* Agregar al carrito */}
            {product.inStock > 0 ? (
              <Button 
                color="secondary" 
                className="circular-btn"
                onClick={onAddProduct}  
              >
                {
                  temCartProduct.size 
                    ? 'Agregar al carrito'
                    : 'Seleccione una talla'
                }
                
              </Button>
            ) : (
              <Chip
                label="No hay disponible"
                color="error"
                variant="outlined"
              />
            )}

            {/* Descripción */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripción:</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {product.description}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayouts>
  );
};

// getServerSideProps
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// No Usar Esto
// export const getServerSideProps: GetServerSideProps = async ({params}) => {
// console.log(params)
//   const  { slug = '' } = params as {slug:string};
//   const product = await dbProducts.getProductsBySlug(slug)

//   if ( !product ){
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }
//   return {
//     props: {
//       product
//     }
//   }
// }

// getStaticPaths... Todos los paths
// blocking

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};

// getStaticProps... Es quien eventualmente manda el producto arriba!
// revalidar cada 24 horas

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await dbProducts.getProductsBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};
export default ProductPage;
