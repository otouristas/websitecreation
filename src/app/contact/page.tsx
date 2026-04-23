import type { ReactElement } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContactFormClient } from "@/app/contact/contact-form-client";

export default function ContactPage(): ReactElement {
  return (
    <>
      <Header />
      <ContactFormClient />
      <Footer />
    </>
  );
}
