const { isBefore, isEqual, isAfter, isWildcard, buildOutputTime } = require('./helper');

const TOMORROW = "tomorrow";
const TODAY = "today";

const wildcardHourAndSpecificMinute = ({cronMinute, currentHour, currentMinute}) => {
    
    let resultHour, day;

    if(isBefore(cronMinute, currentMinute)){
        [resultHour, day] = currentHour == 23 ? ["00", TOMORROW] : [parseInt(currentHour) + 1, TODAY];
    }

    if(isAfter(cronMinute, currentMinute)){
        resultHour = currentHour;
        day = TODAY;
    }

    return buildOutputTime(resultHour, cronMinute, day);

};

const handleCronForWildcardHour = (data) => {
    return isWildcard(data.cronMinute) || isEqual(data.cronMinute, data.currentMinute) 
            ? buildOutputTime(data.currentHour, data.currentMinute, TODAY)
            : wildcardHourAndSpecificMinute(data)
};


const buildOutputForSameHour = ({cronHour, cronMinute, currentMinute}) => {

    const resultMinute = isWildcard(cronMinute) ? currentMinute : cronMinute;
    const resultDay = isWildcard(cronMinute) || isAfter(cronMinute, currentMinute) ? TODAY : TOMORROW;

    return buildOutputTime(cronHour, resultMinute, resultDay);
};

const buildOutputForDifferentHour = ({cronHour, cronMinute, currentHour}) => {

    const resultMinute = isWildcard(cronMinute) ? "00" : cronMinute;
    const resultDay = isAfter(cronHour, currentHour) ? TODAY : TOMORROW;

    return buildOutputTime(cronHour, resultMinute, resultDay);
};

const handleCronForSpecificHour = (data) => {
    const handler = isEqual(data.cronHour, data.currentHour) ? buildOutputForSameHour : buildOutputForDifferentHour;
    return handler(data);
};

const handleSchedule = (data) => {
    const handler = isWildcard(data.cronHour) ? handleCronForWildcardHour : handleCronForSpecificHour;
    return handler(data);
};

const handleInput = (input, currentTime) => {
    
    const [cronMinute, cronHour, command] = input.split(" ");
    const [currentHour, currentMinute] = currentTime.split(":");
    
    const inputData = { cronHour, cronMinute, currentHour, currentMinute };

    return `${handleSchedule(inputData)} - ${command}`;
};

module.exports = handleInput;
