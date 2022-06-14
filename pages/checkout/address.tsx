import { ShopLayouts } from "components/layouts";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const addressPage = () => {
  return (
    <ShopLayouts title={""} pageDescription={""}>
      <Typography variant="h1" component="h1">
        Dirección
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="Nombre" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Apellido" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Dirección" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Dirección (opcional)" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Codigo Postal" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Ciudad" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select variant="filled" label="Pais" value={"1"}>
              <MenuItem value={1}>Costa Rica</MenuItem>
              <MenuItem value={2}>Nicaragua</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Teléfono" variant="filled" fullWidth />
        </Grid>
      </Grid>

      <Box sx={{mt: 5}} display="flex" justifyContent="center">
        <Button color="secondary" className="circular-btn" size="large">
          Revisar pedido
        </Button>
      </Box>
    </ShopLayouts>
  );
};

export default addressPage;
