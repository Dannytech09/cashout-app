import React from "react";
import ContainerBlock from "../components/homePage/ContainerBlock";
import Contact from "../components/homePage/Contact";
import { ThemeProvider } from "next-themes";

export default function contact() {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <ContainerBlock>
        <Contact />
      </ContainerBlock>
    </ThemeProvider>
  );
}
