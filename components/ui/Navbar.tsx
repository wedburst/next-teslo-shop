import { useContext } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { UiContext } from "context";

import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Box,
  Button,
  IconButton,
  Badge,
} from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Router, ShoppingCartOutlined } from "@mui/icons-material";

export const Navbar = () => {

  const { asPath } = useRouter();

  const activeLink = (href: string) => href === asPath ? 'primary' : 'info';

  const { toggleSideMenu } = useContext(UiContext)
  return (
    <AppBar>
      <Toolbar>
        <NextLink href={"/"} passHref>
          <Link display="flex" alignItems="center" sx={{color: "black"}}>
            <Typography variant="h6" component="h6" fontWeight={700}>Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Box sx={{display: {xs: 'none', sm: 'block'}}}>
          <NextLink href="/category/men" passHref>
            <Link>
              <Button color={activeLink('/category/men')}>Hombres</Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Link>
              <Button color={activeLink('/category/women')}>Mujeres</Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kid" passHref>
            <Link>
              <Button color={activeLink('/category/kid')}>Niños</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        <IconButton>
          <SearchOutlinedIcon />
        </IconButton>

        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={4} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toggleSideMenu}>
            Menú
        </Button>
      </Toolbar>
    </AppBar>
  );
};
