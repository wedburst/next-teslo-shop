import { Typography } from '@mui/material'
import { ShopLayouts } from 'components/layouts'
import { ProductList } from 'components/products'
import { FullScreenLoading } from 'components/ui'
import { useProducts } from 'hooks'

const kidPage = () => {

  const {products, isLoading} = useProducts('/products?gender=kid');

  return (
    <ShopLayouts title={'Tesla-Shop - Kids'} pageDescription={'Los mejores productos de Niños'}>
      <Typography variant="h1" component="h1">Kids</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>Todos los productos para niños</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }
    </ShopLayouts>
  )
}

export default kidPage