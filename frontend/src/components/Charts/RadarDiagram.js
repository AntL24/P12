import React, { useEffect, useState, useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Text } from 'recharts';
import styled from 'styled-components';
import { fetchUserPerformance } from '../../Services/apiService';
import { PerformanceData } from '../Models/DataModels';

const ChartContainer = styled.div`
    width: 258px;
    height: 263px;
    background-color: #2c2c2c; 
    position: relative;
    border-radius: 5px;
    
    @media (max-width: 1028px) {
        width: 1028px;
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
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1028);
    const userId = 12;

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

        // Use matchMedia to actively listen for viewport changes
        const mobileQuery = window.matchMedia('(max-width: 1028px)');
        const handleViewportChange = (e) => {
            setIsMobile(e.matches);
        }
        mobileQuery.addListener(handleViewportChange);
        // Initialize state based on the current viewport
        handleViewportChange(mobileQuery);

        // Cleanup on component unmount
        return () => mobileQuery.removeListener(handleViewportChange);

    }, [userId, orderedSubjects, translationMap]);

    // Derived state
    const fontSize = isMobile ? 23 : 12;
    const mobilePolarRadius = [0, 30, 60, 100, 150];
    const desktopPolarRadius = [0, 15, 30, 50, 72];
    const currentPolarRadius = isMobile ? mobilePolarRadius : desktopPolarRadius;

    //Customize the polar angle axis
    function renderPolarAngleAxis({ payload, x, y, cx, cy, ...rest }) {
        if (!isMobile) return <text {...rest} x={x} y={y}>{payload.value}</text>;
        return (
            <Text
                {...rest}
                verticalAnchor="middle"
                y={y + (y - cy) / 9}
                x={x + (x - cx) / 9}
            >
                {payload.value}
            </Text>
        );
    }

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
