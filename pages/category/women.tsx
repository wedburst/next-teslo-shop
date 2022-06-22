import { Typography } from '@mui/material';
import { ShopLayouts } from 'components/layouts';
import { ProductList } from 'components/products';
import { FullScreenLoading } from 'components/ui';
import { useProducts } from 'hooks';

const WomanPage = () => {
  const {products, isLoading} = useProducts('/products?gender=women');

  return (
    <ShopLayouts title={'Tesla-Shop - Women'} pageDescription={'Los mejores productos de Mujeres'}>
      <Typography variant="h1" component="h1">Mujeres</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>Todos los productos para mujeres</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }
    </ShopLayouts>
  )
}

export default WomanPage