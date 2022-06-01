import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { IProduct } from "../../interfaces";

interface Props {
  product: IProduct;
}

export const ProductCard = ({ product }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const productImage = useMemo(() => {
    return isHovered
      ? `products/${product.images[0]}`
      : `products/${product.images[1]}`
  }, [isHovered, product.images]);

  return (
    <Grid 
      item 
      xs={6} 
      sm={4} 
      md={4} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
      <Card>
        <CardActionArea>
          <CardMedia
            className="fadeIn"
            component="img"
            image={productImage}
            alt={product.title}
            onLoad={() => console.log('cargo')}
          />
        </CardActionArea>
      </Card>

      <Box sx={{ mt: 1 }} className="fadeIn">
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>{`$${product.price}`}</Typography>
      </Box>
    </Grid>
  );
};
