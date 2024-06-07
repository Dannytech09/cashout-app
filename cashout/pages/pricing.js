import React from "react";
import ContainerBlock from "../components/homePage/ContainerBlock";
import Pricing from "../components/homePage/Pricing";
import { ThemeProvider } from "next-themes";

export default function experience() {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <ContainerBlock title="Pricing - Wondersdata">
        <Pricing />
      </ContainerBlock>
    </ThemeProvider>
  );
}
