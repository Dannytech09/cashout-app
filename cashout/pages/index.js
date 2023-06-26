import Head from "next/head";
import Hero from "../components/homePage/Hero";
import ContainerBlock from "@/components/homePage/ContainerBlock";
import Pricing from "@/components/homePage/Pricing";
import SubMain from "@/components/homePage/SubMain";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Wondersdata || App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContainerBlock title="Wondersdata - Home of Data" description="Data">
        <Hero />
        <Pricing />
        <SubMain />
      </ContainerBlock>
    </div>
  );
}
