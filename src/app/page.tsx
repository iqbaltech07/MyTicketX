import PageContainer from "../components/layouts/PageContainer";
import SectionContainer from "~/components/layouts/SectionContainer";
import { Metadata } from "next";
import BannerSection from "~/components/section/BannerSection";
import LatestSection from "~/components/section/LatestSection";
import UpcomingSection from "~/components/section/UpcomingSection";

export const metadata: Metadata = {
  title: "MyTicketX - Home",
  description: "Welcome to MyTicketX, your go-to platform for buying and selling event tickets effortlessly.",
  keywords: ["tickets", "events", "buy tickets", "sell tickets"],
};

const Home = async () => {
  // const users = await getAllUsers()
  // console.log(users);
  return (
    <PageContainer withNavbar withFooter className="bg-[#1A1A1F]">
      <SectionContainer className="h-[600px]">
        <BannerSection />
      </SectionContainer>
      <SectionContainer>
        <LatestSection />
      </SectionContainer>
      <SectionContainer className="mt-10">
        <UpcomingSection />
      </SectionContainer>
    </PageContainer>
  );
}

export default Home;