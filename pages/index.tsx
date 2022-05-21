import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayouts } from '../components/layouts'

const Home: NextPage = () => {
  return (
    <ShopLayouts title={'Tesla-Shop - Home'} pageDescription={'Los mejores productos de Teslo'}>
      <Typography variant="h1" component="h1">Tienda</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>Todos los productos</Typography>
    </ShopLayouts>
  )
}

export default Home
