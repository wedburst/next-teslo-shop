import { Typography } from '@mui/material';
import { ShopLayouts } from 'components/layouts';
import { ProductList } from 'components/products';
import { FullScreenLoading } from 'components/ui';
import { useProducts } from 'hooks';

const MenPage = () => {

  const {products, isLoading} = useProducts('/products?gender=men');

  return (
    <ShopLayouts title={'Tesla-Shop - Men'} pageDescription={'Los mejores productos de Hombres'}>
      <Typography variant="h1" component="h1">Hombres</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>Todos los productos para hombres</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }
    </ShopLayouts>
  )
}

export default MenPage;