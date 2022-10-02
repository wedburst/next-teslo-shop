import NextLink from "next/link";
import { Box, Link, Typography } from "@mui/material";

import { ShopLayouts } from "../../components/layouts";

import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const emptyPage = () => {
  return (
    <ShopLayouts
      title={`Carrito - vacío`}
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
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <RemoveShoppingCartIcon sx={{ fontSize: 80 }} />
          <Box marginTop={3} textAlign="center">
            <Typography variant="h4">Carrito vacío</Typography>
            <Typography>
              Tenemos ofertas y oportunidades únicas, ¿te las vas a perder?
            </Typography>
          </Box>
          <NextLink href="/" passHref>
            <Link
              color="secondary"
              marginTop={3}
              display="flex"
              alignItems="center"
            >
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
