import { Typography } from '@mui/material'
import { FullScreenLoading } from 'components/ui'
import { useProducts } from 'hooks'
import type { NextPage } from 'next'
import { ShopLayouts } from 'components/layouts'
import { ProductList } from 'components/products'
import { initialData } from 'database/products'


const SearchPage: NextPage = () => {
  
  const {products, isLoading} = useProducts('/products');
 
  return (
    <ShopLayouts title={'Tesla-Shop - Search'} pageDescription={'Los mejores productos de Teslo'}>
      <Typography variant="h1" component="h1">Buscar productos</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>abc</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }
    </ShopLayouts>
  )
}

export default SearchPage
