import { useContext, useState } from "react";
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
  Input,
  InputAdornment,
} from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  ClearOutlined,
  Router,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";

export const Navbar = () => {
  const { asPath, push } = useRouter();

  const activeLink = (href: string) => (href === asPath ? "primary" : "info");

  const { toggleSideMenu } = useContext(UiContext);
  // Reutilizar
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;

    push(`/search/${ searchTerm }`);
  };

  const handleClear = () => {
    setSearchTerm("");
  }

  return (
    <AppBar>
      <Toolbar>
        <NextLink href={"/"} passHref>
          <Link display="flex" alignItems="center" sx={{ color: "black" }}>
            <Typography variant="h6" component="h6" fontWeight={700}>
              Teslo |
            </Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Box sx={{ display: isSearchVisible ? 'none' : { xs: "none", sm: "block" } }}
        className="fadeIn">
          <NextLink href="/category/men" passHref>
            <Link>
              <Button color={activeLink("/category/men")}>Hombres</Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Link>
              <Button color={activeLink("/category/women")}>Mujeres</Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kid" passHref>
            <Link>
              <Button color={activeLink("/category/kid")}>Niños</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        {/* Pantallas grandes */}

        {
          isSearchVisible
            ? (
              <Input
              sx={{ display: { xs: "none", sm: "flex" } }}
                className="fadeIn"
                autoFocus
                value={searchTerm}
                onChange={({ target }) => setSearchTerm(target.value)}
                onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
                type="text"
                placeholder="Buscar..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setIsSearchVisible(false)}>
                      <ClearOutlined onClick={handleClear}/>
                    </IconButton>
                  </InputAdornment>
                }
              />
            )
            :
            (
              <IconButton 
                className="fadeIn"
                onClick={() => setIsSearchVisible(true)}
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
              <SearchOutlinedIcon />
            </IconButton>
            )
        }

        {/* Pantallas pequeñas */}
        <IconButton
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={toggleSideMenu}
        >
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

        <Button onClick={toggleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
