import { ThemeProvider } from "@/components/theme-provider";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <head>
        <title>Fluently</title>
        <meta name="description" content="Uma solução para escolas de idiomas gerir seu ecosistema de forma fácil e eficiente!" />
      </head>
      <body className="antialiased">
        <ThemeProvider
                    defaultTheme="light"
                  >
        <Main />
        <NextScript />
        </ThemeProvider>
      </body>
    </Html>
  );
}
