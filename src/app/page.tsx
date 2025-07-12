import { getAllUsers } from "~/libs/data";
import PageContainer from "../components/layouts/PageContainer";
import SectionContainer from "~/components/layouts/SectionContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyTicketX - Home",
  description: "Welcome to MyTicketX, your go-to platform for buying and selling event tickets effortlessly.",
  keywords: ["tickets", "events", "buy tickets", "sell tickets"],
};

const Home = async () => {
  const users = await getAllUsers()
  console.log(users);
  return (
    <PageContainer>
      <SectionContainer>
        <h2>Test</h2>
      </SectionContainer>
    </PageContainer>
  );
}

export default Home;