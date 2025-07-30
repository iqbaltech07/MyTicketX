import PageContainer from "../components/layouts/PageContainer";
import SectionContainer from "~/components/layouts/SectionContainer";
import { Metadata } from "next";
import LatestSection from "~/components/section/LatestSection";
import UpcomingSection from "~/components/section/UpcomingSection";
import SearchSection from "~/components/section/SearchSection";
import CategorySection from "~/components/section/CategorySection";
import BannerSwiper from "~/components/ui/BannerSwiper";

export const metadata: Metadata = {
  title: "MyTicketX - Home",
  description: "Welcome to MyTicketX, your go-to platform for buying and selling event tickets effortlessly.",
  keywords: ["tickets", "events", "buy tickets", "sell tickets"],
};

const Home = async () => {
  return (
    <PageContainer withNavbar withFooter className="bg-[#1A1A1F]">
      <div className="relative h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 bg-black/60" />
        <div className="absolute inset-0 z-0">
          <BannerSwiper />
        </div>
        <SectionContainer className="relative z-20">
            <SearchSection />
        </SectionContainer>
      </div>

      <SectionContainer className="mt-16">
        <CategorySection />
      </SectionContainer>

      <SectionContainer className="mt-16">
        <LatestSection />
      </SectionContainer>
      
      <SectionContainer className="mt-16">
        <UpcomingSection />
      </SectionContainer>
    </PageContainer>
  );
}

export default Home;