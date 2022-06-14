import { Divider, Grid, Typography } from '@mui/material'

export const OrderSummary = () => {
  return (
    <Grid container sx={{mt: 2}}>
        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>3 items</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>{`$${155.36}`}</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Impuestos (15%)</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>{`$${35.34}`}</Typography>
        </Grid>

        <Divider />

        <Grid item xs={6} mt={2}>
            <Typography variant='subtitle1'>Total:</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end" mt={2}>
            <Typography variant='subtitle1'>{`$${188.34}`}</Typography>
        </Grid>
    </Grid>
  )
}
