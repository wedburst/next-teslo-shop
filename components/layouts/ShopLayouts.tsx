import Head from "next/head";
import { Navbar } from "../ui";
import SideMenu from "../ui/SideMenu";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children?: any;
}

export const ShopLayouts = ({
  children,
  title = "Shop Layouts",
  pageDescription,
  imageFullUrl,
}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />

        {
          imageFullUrl && (
            <meta name="og:image" content={ imageFullUrl } />
          )
        }
      </Head>

      <nav>
          {/* Navbar */}
          <Navbar/>
      </nav>

      <SideMenu />

      <main style={{
          margin: '80px auto',
          maxWidth: '1440',
          padding: '0px 30px'
      }}>
          { children }
      </main>

      <footer>
          {/* Footer */}
      </footer>
    </>
  );
};
