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
  max-width: 1440px;
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


  @media (max-width: 1028px) {
    // margin-left: 141px;
    flex-direction: column-reverse;
    padding-right: 0px;

  }

  @media (max-width: 1300px) {
    margin-left: 101px;
  }

  @media (max-width: 1028px) {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
  }
`;

const ChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-left: 60px;

  @media (max-width: 1400px) {
    margin-left: 118px;
  }

  @media (max-width: 1028px) {
    margin-left: 100px;
  }

`;

const LowerChartsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 1028px) {
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

