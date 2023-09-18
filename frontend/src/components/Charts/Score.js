import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import styled from 'styled-components';
import { fetchUserData } from '../../Services/apiService';
import { UserScoreData } from '../Models/DataModels';

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

    @media (max-width: 1028px) {
        width: 1028px;
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
`;

const ScoreLabel = styled.span`
    position: absolute;
    left: 5px; 
    top: 5px; 
    font-size: 16px;
    font-weight: bold;
    color: black;
`;

const ScoreChart = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = 12;

    useEffect(() => {
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
                <PieChart width={200} height={200}>
                    <Pie
                        data={data}
                        cx={100}
                        cy={100}
                        innerRadius={80}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        startAngle={90}
                        endAngle={90 + (3.6 * data[0].value)}
                        stroke="none"
                        cornerRadius={10}
                    >
                        <Cell fill="red" />
                    </Pie>
                    <text x={100} y={70} textAnchor="middle" dominantBaseline="central" style={{ fontSize: '26px', fontWeight: 'bold', fill: '#282D30' }}>
                        12%
                    </text>
                    <text x={100} y={100} textAnchor="middle" dominantBaseline="central" style={{ fontSize: '16px', fontWeight: 'bold', fill: '#74798C' }}>
                        de votre
                    </text>
                    <text x={100} y={125} textAnchor="middle" dominantBaseline="central" style={{ fontSize: '16px', fontWeight: 'bold', fill: '#74798C' }}>
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
