import React, { useState, useEffect } from 'react';
import { fetchUserData } from '../../Services/apiService';
import styled from 'styled-components';
import { UserData } from '../Models/DataModels';

const HeaderContent = styled.header`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 225px;
    margin-top: 150px;
    margin-bottom: 50px;
    box-sizing: border-box;
`;

const WelcomeMessage = styled.h1`
    color: #000000;
    font-size: 48px;
    line-height: 24px;
    font-weight: 500;
    margin: 0;
    margin-bottom: 2rem;
    margin-left: -3.5px;
    display: inline;
`;

const PerformanceAssessment = styled.div`
    background-color: #ffffff;
    front-size: 18px;
    line-height: 24px;

`;

const UserName = styled.p`
    color: red;
    font-size: 48px;
    margin: 0;
    display: inline;
`;

const WelcomeHeader = () => {
    const [userData, setUserData] = useState(null);
    const userId = 12; 

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchUserData(userId);
                const user = new UserData(response.data);
                setUserData(user);
            } catch (error) {
                console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
            }
        }
        fetchData();
    }, [userId]);

    if (!userData) return <div>Chargement...</div>;

    return (
        <HeaderContent>
            <WelcomeMessage>
                Bonjour <UserName>{userData.firstName} {userData.lastName}</UserName>
            </WelcomeMessage>
            <PerformanceAssessment>
                Félicitation ! Vous avez explosé vos objectifs hier 👏
            </PerformanceAssessment>
        </HeaderContent>
    )
}


export default WelcomeHeader;