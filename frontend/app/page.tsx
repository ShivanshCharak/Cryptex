import Image from "next/image";
import { Markets } from "./components/Markets";
import HeroPage from "./components/HeroPage";
import { UserProvider } from "./utils/context/UserProvider";
import Carousel from "./components/home/Caraousel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
          {/* <HeroPage/> */}
          <Carousel/>
          <Markets/>
    </main>
  );
}
