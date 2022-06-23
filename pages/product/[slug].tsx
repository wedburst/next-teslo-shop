import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { dbProdcuts } from 'database';
import { NextPage, GetServerSideProps } from 'next';
import { ShopLayouts } from '../../components/layouts'
import { ProductSlideShow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { IProduct } from '../../interfaces';

// const product = initialData.products[0];

interface Props {
  product: IProduct
}

const ProductPage:NextPage<Props> = ({ product }) => {
  // const router = useRouter();
  // const { products: product, isLoading } = useProducts(`/products/${router.query.slug}`);

  // console.log({product})

  // if( isLoading ) return <h1>Cargando</h1>
  // if( !product ) return <h1>No Existe</h1>
  
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
            <Typography variant="h1" component="h1">{product.title}</Typography>
            <Typography variant="subtitle1" component="h2">{`$${product.price}`}</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2" component="h2">Cantidad</Typography>
              {/* ItemCounter */}
              <ItemCounter />
              <SizeSelector 
                // selectedSize={ product.sizes[0] }
                sizes={ product.sizes }
               />
            </Box>

            {/* Agregar al carrito */}
            <Button color="secondary" className='circular-btn'>
              Agregar al carrito
            </Button>

            {/* <Chip label="No hay disponible" color="error" variant="outlined"/> */}
            <Box sx={{mt: 3}}>
              <Typography variant="subtitle2">Descripción:</Typography>
              <Typography variant="body2" sx={{mt: 1}}>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayouts>
  )
}

// getServerSideProps
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({params}) => {
console.log(params)
  const  { slug = '' } = params as {slug:string};
  const product = await dbProdcuts.getProductsBySlug(slug)

  if ( !product ){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {
      product
    }
  }
}

export default ProductPage