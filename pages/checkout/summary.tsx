import NextLink from "next/link";
import dynamic from 'next/dynamic'
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material";

import { ShopLayouts } from "../../components/layouts/ShopLayouts";

import { OrderSummary } from "../../components/cart";

const CartList = dynamic(() => import("../../components/cart").then(i => i.CartList), {
    ssr: false,
  });

const SummaryPage = () => {
  return (
    <ShopLayouts title="Resumen de orden" pageDescription="Resumen de la orden">
      <Typography variant="h1" component="h1">
        Resumen de la orden
      </Typography>
      <Grid container mt={4}>
        <Grid item sm={12} md={7}>
            <CartList/>
        </Grid>
        <Grid item sm={12} md={5}>
            <Card className="sumary-card">
                <CardContent>
                    <Typography variant="h2" mb={2}>
                        Resumen (3 productos)
                    </Typography>

                    <Divider sx={{ my: 3 }}/>

                    <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Dirección de entrega</Typography>
                        <NextLink href="/checkout/address" passHref>
                            <Link underline="always">
                                Editar
                            </Link>
                        </NextLink>
                    </Box>

                    <Typography>Jhon Abou</Typography>
                    <Typography>323 Algun lugar</Typography>
                    <Typography>Kissemme, HYA 23S</Typography>
                    <Typography>Canada</Typography>
                    <Typography>+1 123 1232232</Typography>

                    <Divider sx={{ my: 3 }}/>

                    <Box display="flex" justifyContent="end">
                        <NextLink href="/cart" passHref>
                            <Link underline="always">
                                Editar
                            </Link>
                        </NextLink>
                    </Box>


                    <OrderSummary/>

                    <Box sx={{ mt: 3}}>
                        <Button color="secondary" className="circular-btn" fullWidth>
                            Confirmar Orden
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
      </Grid>
    </ShopLayouts>
  );
};

export default SummaryPage;
