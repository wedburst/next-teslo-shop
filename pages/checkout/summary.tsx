import { useContext } from "react";
import NextLink from "next/link";
import { CartContext } from "context";
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

import { ShopLayouts } from "../../components/layouts/ShopLayouts";

import { OrderSummary } from "../../components/cart";
import { countries } from "utils";

const CartList = dynamic(
  () => import("../../components/cart").then((i) => i.CartList),
  {
    ssr: false,
  }
);

const SummaryPage = () => {
  const { shippingAddress, numberOfItems } = useContext(CartContext);

  if (!shippingAddress) {
    return <></>;
  }

  const { firstName, lastName, address, address2, city, zip, country, phone } =
    shippingAddress;

  return (
    <ShopLayouts title="Resumen de orden" pageDescription="Resumen de la orden">
      <Typography variant="h1" component="h1">
        Resumen de la orden
      </Typography>
      <Grid container mt={4}>
        <Grid item sm={12} md={7}>
          <CartList />
        </Grid>
        <Grid item sm={12} md={5}>
          <Card className="sumary-card">
            <CardContent>
              <Typography variant="h2" mb={2}>
                Resumen ({numberOfItems}{" "}
                {numberOfItems === 1 ? "producto" : "productos"})
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography>
                {address} {address2 ? address2 : ''}
              </Typography>
              <Typography>
                {city}, {zip}
              </Typography>
              <Typography>{countries.find( c => c.code === country)?.name}</Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 3 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
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
