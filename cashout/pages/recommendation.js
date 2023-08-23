import React from "react";
import ContainerBlock from "../components/homePage/ContainerBlock";
import Recommendation from "../components/homePage/Recommendation";
import { ThemeProvider } from "next-themes";

export default function experience() {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
    <ContainerBlock title="Recommendation - Wondersdata">
      <Recommendation />
    </ContainerBlock>
    </ThemeProvider>
  );
}
