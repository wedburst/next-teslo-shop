import { useContext } from "react";
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { CartContext } from '../../context/cart/CartContext';

import { ShopLayouts } from "../../components/layouts/ShopLayouts";
import { CartList, OrderSummary } from "../../components/cart";

const CartPage = () => {
  const { cart } = useContext(CartContext);

  return (
    <ShopLayouts title={`Carrito - ${cart.length}`} pageDescription="Carrito de compras">
      <Typography variant="h1" component="h1">
        Carrito de compras
      </Typography>
      <Grid container mt={4}>
        <Grid item sm={12} md={7}>
            <CartList editable/>
        </Grid>
        <Grid item sm={12} md={5}>
            <Card className="sumary-card">
                <CardContent>
                    <Typography variant="h2" mb={2}>
                        Orden
                    </Typography>
                    <Divider />

                    <OrderSummary/>

                    <Box sx={{ mt: 3}}>
                        <Button color="secondary" className="circular-btn" fullWidth>
                            Checkout
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
      </Grid>
    </ShopLayouts>
  );
};

export default CartPage;
