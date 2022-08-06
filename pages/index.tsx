import { Typography } from '@mui/material'
import { FullScreenLoading } from 'components/ui'
import { useProducts } from 'hooks'
import type { NextPage } from 'next'
import { ShopLayouts } from 'components/layouts'
import { ProductList } from 'components/products'
import { initialData } from 'database/seed-data'


const HomePage: NextPage = () => {
  
  const {products, isLoading} = useProducts('/products');
 
  return (
    <ShopLayouts title={'Tesla-Shop - Home'} pageDescription={'Los mejores productos de Teslo'}>
      <Typography variant="h1" component="h1">Tienda</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>Todos los productos</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }
    </ShopLayouts>
  )
}

export default HomePage
