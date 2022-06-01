import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayouts } from '../components/layouts'
import { ProductList } from '../components/products'
import { initialData } from '../database/products'

const Home: NextPage = () => {
  return (
    <ShopLayouts title={'Tesla-Shop - Home'} pageDescription={'Los mejores productos de Teslo'}>
      <Typography variant="h1" component="h1">Tienda</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>Todos los productos</Typography>

      <ProductList products={initialData.products as any} />
    </ShopLayouts>
  )
}

export default Home
