import { Typography } from '@mui/material';
import { ShopLayouts } from 'components/layouts';
import { ProductList } from 'components/products';
import { FullScreenLoading } from 'components/ui';
import { useProducts } from 'hooks';

const KidPage = () => {
  const {products, isLoading} = useProducts('/products?gender=women');

  return (
    <ShopLayouts title={'Tesla-Shop - Kid'} pageDescription={'Los mejores productos de niños'}>
      <Typography variant="h1" component="h1">Niños</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>Todos los productos para niños</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }
    </ShopLayouts>
  )
}

export default KidPage