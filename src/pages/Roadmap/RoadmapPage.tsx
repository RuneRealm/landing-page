import styled from "styled-components";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import Roadmap from "../../shared/components/Roadmap";


const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const RoadmapPage: React.FC = () => {
  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>
        <Roadmap />
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default RoadmapPage;
