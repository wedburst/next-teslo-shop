import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";

import { ShopLayouts } from "../../components/layouts/ShopLayouts";
import { OrderSummary } from "../../components/cart";
const CartList = dynamic(() => import("../../components/cart").then(i => i.CartList), {
  ssr: false,
});

import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import dynamic from "next/dynamic";

const OrderPage = () => {
  return (
    <ShopLayouts
      title="Resumen de la orden 21212"
      pageDescription="Resumen de la orden"
    >
      <Typography variant="h1" component="h1">
        Orden ABC123
      </Typography>

      {/* <Chip
        sx={{ padding: 2, mt: 2 }}
        label="Pendiente de pago"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      /> */}

      <Chip
        sx={{ padding: 2, mt: 2 }}
        label="Orden ya fue pagada"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />

      <Grid container mt={4}>
        <Grid item sm={12} md={7}>
          <CartList />
        </Grid>
        <Grid item sm={12} md={5}>
          <Card className="sumary-card">
            <CardContent>
              <Typography variant="h2" mb={2}>
                Resumen (3 productos)
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

              <Typography>Jhon Abou</Typography>
              <Typography>323 Algun lugar</Typography>
              <Typography>Kissemme, HYA 23S</Typography>
              <Typography>Canada</Typography>
              <Typography>+1 123 1232232</Typography>

              <Divider sx={{ my: 3 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Typography variant="h1">Pagar</Typography>
                <Chip
                  sx={{ padding: 2, mt: 2 }}
                  label="Orden ya fue pagada"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayouts>
  );
};

export default OrderPage;
