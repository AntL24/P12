import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import styled from 'styled-components';
import { fetchUserData } from '../../Services/apiService';
import { UserScoreData } from '../../Models/DataModels';

import useIsMobile from '../../Hooks/useIsMobile';

const ChartContainer = styled.div`
    width: 258px;
    height: 263px;
    background-color: #FBFBFB; 
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;

    @media (max-width: 1400px) {
        width: 33%;
        max-width: 100%;
    }
    @media (max-width: 1128px) {
        max-width: 1028px;
        width: 100%;
        height: 540px;
    }
`;

const PieChartWrapper = styled.div`
    width: 160px;
    height: 160px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 1028px) {
        width: 400px;
        height: 400px;
    }
`;

const ScoreLabel = styled.span`
    position: absolute;
    left: 5px; 
    top: 5px; 
    font-size: 16px;
    font-weight: bold;
    color: black;

    @media (max-width: 1028px) {
        font-size: 32px;
        top: 10px;
        left: 15px;
    }
`;

const ScoreChart = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isMobile = useIsMobile();
    const userId = 12;

    useEffect(() => {
        //Fetch the data with the imported function from apiService
        const fetchData = async () => {
            try {
                const response = await fetchUserData(userId);
                const data = new UserScoreData(response.data.todayScore, response.data.score);
                setUserData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);


    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;
    if (!userData) return <div>Données non trouvées</div>;

    const data = [{ name: 'Score', value: userData.displayScore }];

    return (
        <ChartContainer>
            <PieChartWrapper>
                <PieChart width={isMobile ? 450 : 200} height={isMobile ? 450 : 200}>
                    <Pie
                        data={data}
                        cx={isMobile ? 225 : 100}
                        cy={isMobile ? 225 : 100}
                        innerRadius={isMobile ? 192 : 80}
                        outerRadius={isMobile ? 218 : 90}
                        paddingAngle={5}
                        dataKey="value"
                        startAngle={90}
                        endAngle={90 + (3.6 * data[0].value)}
                        stroke="none"
                        cornerRadius={10}
                    >
                        <Cell fill="red" />
                    </Pie>
                    <text x={isMobile ? 225 : 100} y={isMobile ? 155 : 70} textAnchor="middle" dominantBaseline="central" style={{ fontSize: isMobile ? '50px' : '26px', fontWeight: '700', fill: '#282D30' }}>
                        {userData.displayScore}
                    </text>
                    <text x={isMobile ? 225 : 100} y={isMobile ? 225 : 100} textAnchor="middle" dominantBaseline="central" style={{ fontSize: isMobile ? '30px' : '16px', fontWeight: '500', fill: '#74798C' }}>
                        de votre
                    </text>
                    <text x={isMobile ? 225 : 100} y={isMobile ? 270 : 125} textAnchor="middle" dominantBaseline="central" style={{ fontSize: isMobile ? '30px' : '16px', fontWeight: '500', fill: '#74798C' }}>
                        objectif
                    </text>
                </PieChart>
                <ScoreLabel>
                    Score
                </ScoreLabel>
            </PieChartWrapper>
        </ChartContainer>
    );
}

export default ScoreChart;
