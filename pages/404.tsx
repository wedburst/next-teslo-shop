import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ShopLayouts } from "../components/layouts";

const Page404 = () => {
  return (
    <ShopLayouts
      title={"Page not found"}
      pageDescription={"There are nothing to show!"}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: {xs: "column", md: "row"} }}
      >
        <Typography variant="h1" component="h1" fontSize={50} fontWeight={200}>
          404 |
        </Typography>
        <Typography marginLeft={2}>There are nothing to show!</Typography>
      </Box>
    </ShopLayouts>
  );
};

export default Page404;
