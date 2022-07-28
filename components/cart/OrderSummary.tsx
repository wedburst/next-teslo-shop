import { useContext } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import { CartContext } from '../../context/cart/CartContext';
import { currency } from "utils";

export const OrderSummary = () => {
  const { numberOfItems, subTotal, total, tax } = useContext(CartContext);

  return (
    <Grid container sx={{ mt: 2 }}>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {numberOfItems} {numberOfItems > 1 ? "items" : "item"}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`${currency.format(subTotal)}`}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`${currency.format(tax)}`}</Typography>
      </Grid>

      <Divider />

      <Grid item xs={6} mt={2}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" mt={2}>
        <Typography variant="subtitle1">{`${currency.format(total)}`}</Typography>
      </Grid>
    </Grid>
  );
};
