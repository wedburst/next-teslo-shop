import { useEffect, useContext } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { CartContext } from "../../context/cart/CartContext";

import { ShopLayouts } from "../../components/layouts/ShopLayouts";
import { OrderSummary } from "../../components/cart";

import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const CartList = dynamic(
  () => import("../../components/cart").then((i) => i.CartList),
  {
    ssr: false,
  }
);

const CartPage = () => {
  const { numberOfItems, isLoaded , cart} = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace('cart/empty')
    }
  }, [isLoaded, cart, router]);

   if (!isLoaded || cart.length === 0) {
    return <></>
   }
  function CartListRender() {
    if (numberOfItems < 1) {
      return (
        <>
          <ShopLayouts
            title={`Carrito - ${numberOfItems > 9 ? "+9" : numberOfItems}`}
            pageDescription="Carrito de compras"
          >
            <Typography variant="h1" component="h1">
              Carrito de compras
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="calc(100vh - 200px)"
              sx={{ flexDirection: { xs: "column", md: "row" } }}
            >
              <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
              <RemoveShoppingCartIcon sx={{ fontSize: 80 }}/>
                <Box marginTop={3} textAlign="center">
                <Typography variant="h4">Carrito vacío</Typography>
                <Typography>Tenemos ofertas y oportunidades únicas, ¿te las vas a perder?</Typography>
                </Box>
                <NextLink href="/" passHref>
                  <Link color="secondary" marginTop={3} display="flex" alignItems="center">
                    <KeyboardBackspaceIcon />
                    <Typography marginLeft={1}>Regresar</Typography>
                  </Link>
                </NextLink>
              </Box>
            </Box>
          </ShopLayouts>
        </>
      );
    }
    return (
      <ShopLayouts
        title={`Carrito - ${numberOfItems > 9 ? "+9" : numberOfItems}`}
        pageDescription="Carrito de compras"
      >
        <Typography variant="h1" component="h1">
          Carrito de compras
        </Typography>
        <Grid container mt={4}>
          <Grid item sm={12} md={7}>
            <CartList editable />
          </Grid>
          <Grid item sm={12} md={5}>
            <Card className="sumary-card">
              <CardContent>
                <Typography variant="h2" mb={2}>
                  Orden
                </Typography>
                <Divider />

                <OrderSummary />

                <Box sx={{ mt: 3 }}>
                  <Button color="secondary" className="circular-btn" fullWidth href='/checkout/address'>
                    Checkout
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ShopLayouts>
    );
  }

  return <CartListRender />;
};

export default CartPage;
