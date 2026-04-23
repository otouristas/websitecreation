import type { ReactElement } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GetStartedClient } from "@/app/get-started/get-started-client";

export default function GetStartedPage(): ReactElement {
  return (
    <>
      <Header />
      <GetStartedClient />
      <Footer />
    </>
  );
}
