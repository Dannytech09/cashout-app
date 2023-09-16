import React from "react";
import ContainerBlock from "../components/homePage/ContainerBlock";
import AboutUs from "../components/homePage/AboutUs";
import { ThemeProvider } from "next-themes";

export default function about() {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
    <ContainerBlock>
      <AboutUs />
    </ContainerBlock>
     </ThemeProvider>
  );
}
