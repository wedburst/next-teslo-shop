import { useMemo, useState } from "react";
import NextLink from "next/link";

import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { IProduct } from "../../interfaces";

interface Props {
  product: IProduct;
}

export const ProductCard = ({ product }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoader, setIsImageLoader] = useState(false);

  const productImage = useMemo(() => {
    return isHovered
      ? `/products/${product.images[0]}`
      : `/products/${product.images[1]}`;
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
        <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
          {/* as={`/products/${product.slug}`} */}
          <Link>
            <CardActionArea>
              <CardMedia
                className="fadeIn"
                component="img"
                image={productImage}
                alt={product.title}
                onLoad={() => setIsImageLoader(true)}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box sx={{ mt: 1, display: isImageLoader ? 'block' : 'none' }} className="fadeIn">
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>{`$${product.price}`}</Typography>
      </Box>
    </Grid>
  );
};
