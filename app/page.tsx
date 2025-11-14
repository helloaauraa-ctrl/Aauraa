import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Why from "@/components/Why";
import Connect from "@/components/Connect";
import MadeForEveryone from "@/components/MadeForEveryone";
import Footer from "@/components/Footer";
import Popup from "@/components/Popup";

export default function Home() {
  return (
    <>
      <Popup />
      <Hero />
      <Story />
      <Connect />
      <Why />
      <MadeForEveryone />
      <Footer />
    </>
  );
}
