// import { useEffect } from "react";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import Head from "next/head";
import Hero from "../components/homePage/Hero";
import ContainerBlock from "@/components/homePage/ContainerBlock";
import Pricing from "@/components/homePage/Pricing";
import SubMain from "@/components/homePage/SubMain";

export default function Home() {
  //   useEffect(() => {
  //     // <!--Start of Tawk.to Script-->
  // {/* <script type="text/javascript"> */}
  // var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
  // (function(){
  // var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
  // s1.async=true;
  // s1.src='https://embed.tawk.to/65203706eb150b3fb99ed20e/1hc2tdsvd';
  // s1.setAttribute('crossorigin','*');
  // s0.parentNode.insertBefore(s1,s0);
  // })();
  // // </script>
  // // <!--End of Tawk.to Script-->

  //   }, [])

  return (
    <div>
      <Head>
        <title>Wondersdata || App</title>
        <meta name="description" content="Best Data and airtime Website" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ContainerBlock
        title="Wondersdata - Home of Data"
        description="Data and Airtime website where I can make huge sales"
      >
        <Hero />
        <Pricing />
        <SubMain />
      </ContainerBlock>
    </div>
  );
}
