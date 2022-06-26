import Head from "next/head";
import Navbar from "./Navbar";
const Layout = ({ children, title, description, keywords }) => {
  return (
    <>
      <Head>
        <title>{title ? title + "- eCare" : "Care Management System"}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-between flex-col h-screen items-center">
        <Navbar />
        <main className="w-full h-full">{children}</main>
        <footer>footer</footer>
      </div>
    </>
  );
};

export default Layout;
