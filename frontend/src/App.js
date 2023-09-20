import logo from './logo.svg';
import './App.css';

import HorizontalNavbar from './Layout/HorizontalNavbar';
import VerticalNavbar from './Layout/VerticalNavbar';
import WelcomeHeader from './components/OtherComponents/WelcomeHeader';
import FoodIntakeOfTheDay from './components/OtherComponents/FoodIntakeOfTheDay';
import DailyActivity from './components/Charts/DailyActivity';
import AverageSessionDuration from './components/Charts/AverageSessionDuration';
import RadarDiagram from './components/Charts/RadarDiagram';
import Score from './components/Charts/Score';
import styled from 'styled-components';


const MainContainer = styled.main`
  position: absolute;
  width: 100%;
  max-width: 1420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const LowerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 160px;
  width: calc(100% - 205px);
  padding-bottom: 40px;
  padding-right: 40px;

  @media (max-width: 1670px) {
    width: calc(100% - 505px);
    margin-left: 100px;


  @media (max-width: 1400px) {
    flex-direction: column-reverse;
    width: calc(100% - 350px);
    margin-left: 150px;
    padding-right: 0px;

  }

  @media (max-width: 1300px) {
    margin-left: 101px;
  }

  @media (max-width: 1128px) {
    margin-left: 200px;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
  }
`;

const ChartsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 30px;
  margin-left: 60px;

  @media (max-width: 1630px) {
    max-width: 100%;
    margin-left: 60;
  }
  @media (max-width: 1028px) {
    margin-left: 100px;
  }

`;

const LowerChartsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 30px;
  align-items: start;
  @media (max-width: 1630px) {
    width:100%;
    max-width: 1028px;

  }

  @media (max-width: 1128px) {
    display: flex;
    flex-direction: column;
  }
`;

function App() {
  return (
    <div className="App">
      <MainContainer>
        <HorizontalNavbar />
        <VerticalNavbar />
        <WelcomeHeader />

        <LowerContainer>
          <ChartsContainer>
            <DailyActivity />
            <LowerChartsContainer>
              <AverageSessionDuration />
              <RadarDiagram />
              <Score />
            </LowerChartsContainer>
          </ChartsContainer>
          <FoodIntakeOfTheDay />
        </LowerContainer>
        
      </MainContainer>
    </div>
  );
}

export default App;

