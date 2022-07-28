import { Fragment, useContext, useId } from "react";
import NextLink from "next/link";
import { CartContext } from "context";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { initialData } from "../../database/products";
import { ItemCounter } from "../ui";
import { ICartProduct } from "interfaces";

const productsIncart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  initialData.products[3],
];

interface Props {
  editable?: boolean;
}

export const CartList = ({ editable }: Props) => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContext);

  const onUpdateNewQuantity = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  return (
    <>
      {cart.map((product) => (
        <Grid container spacing={2} key={product._id + product.size} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            {/* TODO: llevar a la página del producto */}
            <NextLink href={ `/product/${product.slug}` } passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla: <strong>{product.size}</strong>
              </Typography>

              {/* Condicional */}
              {editable ? (
                <ItemCounter currentValue={product.quantity} maxvalue={15} updateQuantity={(value) => onUpdateNewQuantity(product, value)} />
              ) : (
                <Typography>{product.quantity} {product.quantity > 1 ? "productos" : "producto"}</Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="subtitle1">{`$${product.price}`}</Typography>
            {/* Editable */}
            {editable && (
              <Button variant="text" color="secondary" onClick={() => removeCartProduct(product)}>
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
