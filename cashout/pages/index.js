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
        <meta name="description" content="Best Data and airtime Website" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ContainerBlock title="Wondersdata - Home of Data" description="Data and Airtime website where I can make huge sales">
        <Hero />
        <Pricing />
        <SubMain />
      </ContainerBlock>
    </div>
  );
}
