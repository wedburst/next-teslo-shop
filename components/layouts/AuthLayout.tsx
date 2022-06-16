import Head from "next/head";

import { Box } from "@mui/material";

interface Props {
  title: string;
  children?: React.ReactNode;
}

export const AuthLayout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}
        >
          {children}
        </Box>
      </main>
    </>
  );
};
