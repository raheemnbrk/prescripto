import Banner from "@/components/home/banner";
import Footer from "@/components/home/footer";
import Hero from "@/components/home/hero";
import Specialization from "@/components/home/specialization";
import TopDoctors from "@/components/home/topDoctor";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <Hero />
      <Specialization />
      <TopDoctors />
      <Banner />
      <Footer/>
    </div>
  );
}
