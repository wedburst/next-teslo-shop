import NextLink from "next/link";
import { Box, Link, Typography } from "@mui/material";

import { ShopLayouts } from "../../components/layouts";

import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const emptyPage = () => {
  return (
    <ShopLayouts
      title="Carrito vacío"
      pageDescription="No hay productos en el carrito de compra"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: "column", md: "row" } }}
      >
        <RemoveShoppingCartIcon sx={{ fontSize: 60 }} />
        <Box display="flex" flexDirection="column" marginLeft={2}>
          <Typography variant="h5">Carrito vacío</Typography>
          <NextLink href="/" passHref>
            <Link color="secondary" display="flex" alignItems="center">
              <KeyboardBackspaceIcon />
              <Typography marginLeft={1}>Regresar</Typography>
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayouts>
  );
};

export default emptyPage;
