import axios from 'axios';

const baseURL = 'http://localhost:3000/user/';


export const fetchUserActivity = async (userId) => {
    try {
        const response = await axios.get(`${baseURL}${userId}/activity`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchUserData = async (userId) => {
    try {
        const response = await axios.get(`${baseURL}${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchUserPerformance = async (userId) => {
    try {
        const response = await axios.get(`${baseURL}${userId}/performance`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchUserAverageSessions = async (userId) => {
    try {
        const response = await axios.get(`${baseURL}${userId}/average-sessions`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

