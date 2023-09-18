// Data Models for the charts and graphs
// Externalized to ensure consistency across the application
// If API data is not consistent, we can adapt the models here

export class SessionData {
    constructor(rawData) {
        this.rawData = rawData;
    }

    getTransformedData() {
        return this.rawData.sessions.map(session => ({
            name: this.convertDayNumberToName(session.day),
            value: session.sessionLength
        }));
    }

    convertDayNumberToName(dayNumber) {
        const days = ["", "L", "M", "M", "J", "V", "S", "D"];
        return days[dayNumber];
    }
}

export class ActivityData {
    constructor(day, kilogram, calories) {
        this.day = day;
        this.kilogram = kilogram;
        this.calories = calories;
    }

}

export class PerformanceData {
    constructor(kind, value) {
        this.subject = kind;
        this.fullMark = value;
    }
}

export class UserScoreData {
    constructor(todayScore, score) {
        this.todayScore = todayScore || 0;
        this.score = score || 0;
    }

    get displayScore() {
        return Math.round((this.todayScore || this.score) * 100); //todayScore or score are used in the api, so we need to check both
    }
}

export class FoodIntakeData {
    constructor(data) {
        this.calorieCount = data.calorieCount || 0;
        this.proteinCount = data.proteinCount || 0;
        this.carbohydrateCount = data.carbohydrateCount || 0;
        this.lipidCount = data.lipidCount || 0;
    }
}

export class UserData {
    constructor(data) {
        this.firstName = data.userInfos.firstName;
        this.lastName = data.userInfos.lastName;
    }
}