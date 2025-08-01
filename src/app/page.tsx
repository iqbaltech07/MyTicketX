import { Suspense } from "react";
import PageContainer from "../components/layouts/PageContainer";
import SectionContainer from "~/components/layouts/SectionContainer";
import { Metadata } from "next";
import LatestSection from "~/components/section/LatestSection";
import UpcomingSection from "~/components/section/UpcomingSection";
import SearchSection from "~/components/section/SearchSection";
import CategorySection from "~/components/section/CategorySection";
import BannerSwiper from "~/components/ui/BannerSwiper";
import { SkeletonCategory, SkeletonSwiper } from "~/components/ui/Skeletons";

export const metadata: Metadata = {
  title: "MyTicketX - Home",
  description: "Welcome to MyTicketX, your go-to platform for buying and selling event tickets effortlessly.",
  keywords: ["tickets", "events", "buy tickets", "sell tickets"],
};

const Home = () => {
  return (
    <PageContainer withNavbar withFooter className="bg-[#1A1A1F]">
      <div className="relative h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 bg-black/60" />
        <div className="absolute inset-0 z-0">
          <BannerSwiper />
        </div>
        <SearchSection />
      </div>

      <SectionContainer className="mt-16">
        <Suspense fallback={<SkeletonCategory />}>
          <CategorySection />
        </Suspense>
      </SectionContainer>

      <SectionContainer className="mt-16">
        <Suspense fallback={<SkeletonSwiper />}>
          <LatestSection />
        </Suspense>
      </SectionContainer>

      <SectionContainer className="mt-16">
        <Suspense fallback={<SkeletonSwiper />}>
          <UpcomingSection />
        </Suspense>
      </SectionContainer>
    </PageContainer>
  );
}

export default Home;