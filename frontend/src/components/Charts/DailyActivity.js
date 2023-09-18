import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { fetchUserActivity } from '../../Services/apiService';
import {ActivityData} from '../Models/DataModels';

const TabContainer = styled.div`
     width: 100%;
     height: 100%;
     background-color: #fbfbfb;
     border-radius: 5px;
     display: flex;
     flex-direction: column;
     @media (max-width: 1028px) {
         width: 1028px;
     }
`;

const TabGraph = styled.div`
    width: 835px;
    height: 320px; 
    background-color: #fff;
    border-radius: 5px;
    margin: 0 auto; 
`;

const axisStyle = {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: '14px',
    fill: '#9B9EAC'
  };
  

const renderLegend = (props) => {
    const { payload } = props;
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', marginTop: '15px', paddingLeft: '20px' }}>
            <span style={{ fontSize: '15px', color: '#20253A', fontWeight: '500', fontFamily: 'Roboto' }}>Activité quotidienne</span>
            <ul style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: 0, padding: 0 }}>
                {payload.map((entry, index) => (
                    <li key={`item-${index}`} style={{ listStyle: 'none', display: 'inline-flex', alignItems: 'center', marginRight: '20px' }}>
                        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: entry.color, marginRight: '5px' }}></span>
                        <span style={{ fontSize: (entry.value === "Poids (kg)" || entry.value === "Calories brûlées (kcal)") ? '14px' : '14px', color: (entry.value === "Poids (kg)" || entry.value === "Calories brûlées (kcal)") ? '#74798C' : '#74798C', fontWeight: (entry.value === "Poids (kg)" || entry.value === "Calories brûlées (kcal)") ? '500' : '500', fontFamily: (entry.value === "Poids (kg)" || entry.value === "Calories brûlées (kcal)") ? 'Roboto' : 'inherit' }}>{entry.value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};


const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ backgroundColor: '#E60000', padding: '10px' }}>
                <p style={{ margin: '0', color: 'white' }}>{`${payload[0].value}kg`}</p>
                <div style={{ height: '20px' }}></div>
                <p style={{ margin: '0', color: 'white' }}>{`${payload[1].value}kcal`}</p>
            </div>
        );
    }
    return null;
};

const DailyActivityTab = () => {
    const [data, setData] = useState([]);
    const userId = 12;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchUserActivity(userId);
                if (response.data.sessions.length) {
                    const firstDate = new Date(response.data.sessions[0].day);

                    const activityData = response.data.sessions.map(session => {
                        const sessionDate = new Date(session.day);
                        const dayNumber = Math.floor((sessionDate - firstDate) / (24 * 60 * 60 * 1000)) + 1;
                        return new ActivityData(dayNumber, session.kilogram, session.calories);
                    });
                    
                    setData(activityData);
                }
            } catch (error) {
                console.error("Error fetching user activity:", error);
            }
        };
        fetchData();
    }, [userId]);

    return (
        <TabContainer>
            <TabGraph>
                <ResponsiveContainer>
                <BarChart barCategoryGap={8} data={data} style={{ backgroundColor: '#fbfbfb' }} margin={{ top: 20, right: 30, bottom: 30, left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis dataKey="day" tickMargin={20} tick={axisStyle} />

                        <YAxis dataKey="calories" orientation="right" axisLine={false} tickLine={false} tick={axisStyle} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={renderLegend} layout="horizontal" verticalAlign="top" align="right" />
                        <Bar dataKey="kilogram" name="Poids (kg)" fill="#282D30" radius={[10, 10, 0, 0]} barSize={7} />
                        <Bar dataKey="calories" name="Calories brûlées (kcal)" fill="#E60000" radius={[10, 10, 0, 0]} barSize={7} />
                    </BarChart>
                </ResponsiveContainer>
            </TabGraph>
        </TabContainer>
    );
}

export default DailyActivityTab;
