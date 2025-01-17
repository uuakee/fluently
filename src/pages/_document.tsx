import { ThemeProvider } from "@/components/theme-provider";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
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
