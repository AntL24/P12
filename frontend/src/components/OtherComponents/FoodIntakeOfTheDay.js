import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchUserData } from '../../Services/apiService';
import { FoodIntakeData } from '../../Models/DataModels';


const FoodIntakeCard = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 4fr);
    gap: 32px;
    justify-items: stretch;
    align-items: flex-start;
    margin-left: 75px;
    box-sizing: border-box;
    width: 10px;
    
    @media (max-width: 1028px) {
        margin-top: 0px;
        width: 100%;
       margin-right: 0px;
       margin-bottom: 40px;
       margin-left: 100px;
       grid-template-columns: 1fr 1fr 1fr 1fr;
       grid-template-rows: 1fr;
      }
`;


const CaloryIntakeCategory = styled.div`
display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 0, 0, 0.0661); 
    font-size: 18px;
    line-height: 24px;
    width: 60px;
    height: 60px;
    border-radius: 10px;
`;

const ProteinIntakeCategory = styled.div`
display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: rgba(74, 184, 255, 0.0661);
    font-size: 18px;
    line-height: 24px;
    width: 60px;
    height: 60px;
    border-radius: 10px;
`;

const CarbohydrateIntakeCategory = styled.div`
display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(249, 206, 35, 0.0661);
    font-size: 18px;
    line-height: 24px;
    width: 60px;
    height: 60px;
    border-radius: 10px;
`;

const LipidIntakeCategory = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(253, 81, 129, 0.0661);
    font-size: 18px;
    line-height: 24px;
    width: 60px;
    height: 60px;
    border-radius: 10px;
`;

const IntakeContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 258px;
    min-height: 124px;
    flex-grow: 1;
    box-shadow: 0px 2px 4px 0px #00000005;
    background-color: #fbfbfb;
    border-radius: 10px;
    padding-right: 36px;
    padding-left: 36px;
    @media (max-width: 1028px) {
        width: 160px;
    }
`;

const IntakeQty = styled.div`
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    color: #282D30;
`;

const IntakeType = styled.div`
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #74798C;
`;

const IntakeValuesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 20px;
`;

const FoodIntakeOfTheDay = () => {
    const [foodIntake, setFoodIntake] = useState(new FoodIntakeData({}));
    const userId = 12;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchUserData(userId);
                const intakeData = new FoodIntakeData(response.data.keyData);
                setFoodIntake(intakeData);
            } catch (error) {
                console.error("Erreur lors de la récupération des données d'apport alimentaire:", error);
            }
        }
        fetchData();
    }, [userId]);

    return (
        <FoodIntakeCard>
            <IntakeContainer>
                <CaloryIntakeCategory>
                    <img src={process.env.PUBLIC_URL + '/energy.svg'} alt="calories" />
                </CaloryIntakeCategory>
                <IntakeValuesContainer>
                    <IntakeQty>
                        {new Intl.NumberFormat("en-IN", {
                            maximumSignificantDigits: 3,
                        }).format(foodIntake.calorieCount || 0)}Kcal
                    </IntakeQty>
                    <IntakeType>Calories</IntakeType>
                </IntakeValuesContainer>
            </IntakeContainer>

            <IntakeContainer>
                <ProteinIntakeCategory>
                    <img src={process.env.PUBLIC_URL + '/chicken.svg'} alt="protéines" />
                </ProteinIntakeCategory>
                <IntakeValuesContainer>
                    <IntakeQty>
                        {new Intl.NumberFormat("en-IN", {
                            maximumSignificantDigits: 3,
                        }).format(foodIntake.proteinCount || 0)}g
                    </IntakeQty>
                    <IntakeType>Protéines</IntakeType>
                </IntakeValuesContainer>
            </IntakeContainer>

            <IntakeContainer>
                <CarbohydrateIntakeCategory>
                    <img src={process.env.PUBLIC_URL + '/apple.svg'} alt="glucides" />
                </CarbohydrateIntakeCategory>
                <IntakeValuesContainer>
                    <IntakeQty>
                        {new Intl.NumberFormat("en-IN", {
                            maximumSignificantDigits: 3,
                        }).format(foodIntake.carbohydrateCount || 0)}g
                    </IntakeQty>
                    <IntakeType>Glucides</IntakeType>
                </IntakeValuesContainer>
            </IntakeContainer>

            <IntakeContainer>
                <LipidIntakeCategory>
                    <img src={process.env.PUBLIC_URL + '/cheeseburger.svg'} alt="lipides" />
                </LipidIntakeCategory>
                <IntakeValuesContainer>
                    <IntakeQty>
                        {new Intl.NumberFormat("en-IN", {
                            maximumSignificantDigits: 3,
                        }).format(foodIntake.lipidCount || 0)}g
                    </IntakeQty>
                    <IntakeType>Lipides</IntakeType>
                </IntakeValuesContainer>
            </IntakeContainer>
        </FoodIntakeCard>
    );
}

export default FoodIntakeOfTheDay;