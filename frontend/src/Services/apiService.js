import axios from 'axios';
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from './mockedData.js';

const baseURL = 'http://localhost:3000/user/';

let useMockData = false; //=>True = use mock data// =>False = try to use API data//

//Error notification
let notificationShown = false;

const showNotification = () => {
    if (!notificationShown) {
        setTimeout(() => {
            alert("L'API étant actuellement indisponible, un mock des données est utilisé pour remplir les graphiques.");
        }, 0);
        notificationShown = true;
    }
};


//Return either the data from the API, or the mock data, and send a notification if the API is down
const fetchFromAPIOrMock = async (url, type, userId) => {
    if (useMockData) {
        return handleMockData(type, userId);
    }

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        showNotification();
        return handleMockData(type, userId);
    }
};

//Return the mock data for the given type
const handleMockData = (type, userId) => {
    let data;
    switch (type) {
        case "activity":
            data = USER_ACTIVITY.find(user => user.userId === userId);
            break;
        case "data":
            data = USER_MAIN_DATA.find(user => user.id === userId);
            break;
        case "performance":
            data = USER_PERFORMANCE.find(user => user.userId === userId);
            break;
        case "averageSessions":
            data = USER_AVERAGE_SESSIONS.find(user => user.userId === userId);
            break;
        default:
            throw new Error("Unknown data type");
    }
    return { data: data };
};


//API calls
export const fetchUserActivity = async (userId) => {
    return fetchFromAPIOrMock(`${baseURL}${userId}/activity`, "activity", userId);
};

export const fetchUserData = async (userId) => {
    return fetchFromAPIOrMock(`${baseURL}${userId}`, "data", userId);
};

export const fetchUserPerformance = async (userId) => {
    return fetchFromAPIOrMock(`${baseURL}${userId}/performance`, "performance", userId);
};

export const fetchUserAverageSessions = async (userId) => {
    return fetchFromAPIOrMock(`${baseURL}${userId}/average-sessions`, "averageSessions", userId);
};
