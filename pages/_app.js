import App from "next/app";
import Layout from "../components/_App/Layout";
import { parseCookies, destroyCookie } from "nookies";
import { redirectUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import cookies from "next-cookies";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = cookies(ctx);

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (!token) {
      const isProtectedRoute =
        ctx.pathname === "/account" || ctx.pathname === "/create";
      if (isProtectedRoute) {
        redirectUser(ctx, "/login");
      }
    } else {
      try {
        console.log("hey2");
        const payload = { headers: { Authorization: token } };
        const url = `${baseUrl}/api/account`;
        const { data } = await axios.get(url, payload);
        const isRoot = data.role === "root";
        const isAdmin = data.role === "admin";
        const isNotPermitted =
          !(isRoot || isAdmin) && ctx.pathname === "/create";
        if (isNotPermitted) {
          redirectUser(ctx, "/");
        }
        pageProps.user = data;
      } catch (err) {
        destroyCookie(ctx, "token");
        redirectUser(ctx, "/login");
        console.error("Error getting current user", err);
      }
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
