import React, { useEffect, useState } from 'react';
import { LineChart, YAxis, Line, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import styled from 'styled-components';

import { fetchUserAverageSessions } from '../../Services/apiService';
import { SessionData } from '../../Models/DataModels';

import useIsMobile from '../../Hooks/useIsMobile';

const ChartContainer = styled.div`
  width: 258px;
  height: 263px;
  background-color: red;
  position: relative;
  border-radius: 5px;

  @media (max-width: 1028px) {
    max-width: 1028px;
    width: 100%;
    height: 540px;
  }
`;

const Title = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  width: calc(100% - 79px - 10px);
  color: #FFFFFF;
  font-weight: 500;
  font-size: ${props => props.fontSize};
  opacity: 0.5;
`;

const Legend = styled.div`
  position: absolute;
  bottom: 5px;
  left: 5px;
  width: calc(100% - 10px);
  color: #FFFFFF;
  opacity: 0.5;
  display: flex;
  justify-content: space-between;
  font-size: ${props => props.fontSize};
  font-weight: 500;
`;

const AverageSessionDuration = () => {
    const isMobile = useIsMobile();
    const userId = 12;
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchUserAverageSessions(userId)
            .then(response => {
                const sessionData = new SessionData(response.data);
                setData(sessionData.getTransformedData());
            })
            .catch(error => {
                console.log("Error fetching data", error);
            });
    }, [userId]);

    return (
        <ChartContainer>
            <Title fontSize={isMobile ? '25px' : '15px'}>Durée moyenne des sessions</Title>
            <Legend fontSize={isMobile ? '28px' : '12px'}>
                <span>L</span>
                <span>M</span>
                <span>M</span>
                <span>J</span>
                <span>V</span>
                <span>S</span>
                <span>D</span>
            </Legend>
            <ResponsiveContainer width="100%" height={isMobile ? "80%" : "100%"}>
                <LineChart
                    data={data}
                    margin={{ top: 40, right: 0, left: 0, bottom: isMobile ? 50 : 30 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4032)" />
                            <stop offset="100%" stopColor="#FFFFFF" />
                        </linearGradient>
                    </defs>
                    <YAxis
                        hide
                        tickLine={false}
                        tick={false}
                        domain={['dataMin', 'dataMax']}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="url(#colorUv)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, fill: "#FFF" }}
                    />
                    <Tooltip
                        content={<CustomTooltipContent />}
                        formatter={(value) => [`${value} min`, 'Durée']}
                        itemStyle={{ color: 'black' }}
                        cursor={<CustomCursor isMobile={isMobile} />}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

//Customized popup on hover
const CustomTooltipContent = (props) => {
    const { active, payload } = props;
    if (!active) return null;
    const data = payload && payload[0];
    return (
        <div style={{backgroundColor: 'white', padding: '5px', border: '1px solid #ccc'}}>
            {data ? `${data.value} min` : ""}
        </div>
    );
};

//Black rectangle on the right of the tooltip
const CustomCursor = ({ points, isMobile }) => (
    isMobile ? null : <Rectangle fill="black" opacity={0.1} x={points[1].x} width={500} height={300} />
);

export default AverageSessionDuration;
