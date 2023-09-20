import React, { useEffect, useState, useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Text } from 'recharts';
import styled from 'styled-components';
import { fetchUserPerformance } from '../../Services/apiService';
import { PerformanceData } from '../../Models/DataModels';

import useIsMobile from '../../Hooks/useIsMobile';

const ChartContainer = styled.div`
    width: 258px;
    height: 263px;
    background-color: #2c2c2c; 
    position: relative;
    border-radius: 5px;
    @media (max-width: 1400px) {
        width: 33%;
        max-width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: 
        // height: 540px;
        }
    @media (max-width: 1128px) {
        max-width: 1028px;
        width: 100%;
        height: 540px;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }

    & svg {
        margin: auto;
        display: block;
    }
`;

const SessionRadarChart = () => {
    const [performanceData, setPerformanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isMobile = useIsMobile();
    const userId = 12;

    //UseMemo is used to avoid the recreation of the array at each render
    const orderedSubjects = useMemo(() => [
        'Intensité', 'Vitesse', 'Force', 'Endurance', 'Énergie', 'Cardio'
    ], []);

    const translationMap = useMemo(() => ({
        intensity: orderedSubjects[0],
        speed: orderedSubjects[1],
        strength: orderedSubjects[2],
        endurance: orderedSubjects[3],
        energy: orderedSubjects[4],
        cardio: orderedSubjects[5]
    }), [orderedSubjects]);

    //Fetch the data with the imported function from apiService
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchUserPerformance(userId);
                const fetchedData = response.data;

                const dataItems = fetchedData.data;

                const unorderedData = dataItems.map(item =>
                    new PerformanceData(translationMap[fetchedData.kind[item.kind]], item.value)
                );

                const orderedData = orderedSubjects.map(subject =>
                    unorderedData.find(data => data.subject === subject)
                );

                setPerformanceData(orderedData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();

    }, [userId, orderedSubjects, translationMap]); //Dependency : the hook will be called when the userId changes.


    //Change the font size of the polar angle axis depending on the viewport
    const fontSize = isMobile ? 23 : 12;
    const mobilePolarRadius = [0, 30, 60, 100, 150];
    const desktopPolarRadius = [0, 15, 30, 50, 72];
    const currentPolarRadius = isMobile ? mobilePolarRadius : desktopPolarRadius;

    //Customize the polar angle axis so that there isn't any overlap
    function renderPolarAngleAxis({ payload, x, y, cx, cy, ...rest }) {
        if (!isMobile) return <text {...rest} x={x} y={y}>{payload.value}</text>;
        return (
            <Text
                {...rest}
                verticalAnchor="middle"
                y={y + (y - cy) / 9} //This formula means that the text will be placed at 1/9 of the distance between the center and the point
                x={x + (x - cx) / 9}
            >
                {payload.value}
            </Text>
        );
    }

    //Display the chart if the data is loaded, else display a message
    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;
    if (performanceData.length === 0) return <div>Données non trouvées</div>;

    return (
        <ChartContainer>
            <ResponsiveContainer width="99%" height="100%">
                <RadarChart data={performanceData} outerRadius="75%">
                    <PolarGrid gridType='polygon' radialLines={false} polarRadius={currentPolarRadius} stroke="white" />
                    <PolarAngleAxis dataKey="subject" stroke="white" tickLine={false} fontSize={fontSize}
                        fontWeight="500" tick={renderPolarAngleAxis} />
                    <Radar name="Session" dataKey="fullMark" stroke="#FF0000" fill="#FF0000" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}

export default SessionRadarChart;
