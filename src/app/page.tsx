import { getAllUsers } from "~/libs/data";
import PageContainer from "../components/layouts/PageContainer";
import SectionContainer from "~/components/layouts/SectionContainer";

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