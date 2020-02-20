const { isBefore, isEqual, isAfter, isWildcard, buildOutputTime } = require('./helper');

const TOMORROW = "tomorrow";
const TODAY = "today";

const buildOutputForNextHour = (hour, minute) => {
    const [resultHour, day] = hour == 23 ? ["00", TOMORROW] : [parseInt(hour) + 1, TODAY];
    return buildOutputTime(resultHour, minute, day)
}

const wildcardHourAndSpecificMinute = (cronMinute, currentHour, currentMinute) => {
    return isAfter(cronMinute, currentMinute) 
            ? buildOutputTime(currentHour, cronMinute, TODAY)
            : buildOutputForNextHour(currentHour, cronMinute)
};

const handleWildcardHourCron = ({cronMinute, currentHour, currentMinute}) => {
    return isWildcard(cronMinute) || isEqual(cronMinute, currentMinute) 
            ? buildOutputTime(currentHour, currentMinute, TODAY)
            : wildcardHourAndSpecificMinute(cronMinute, currentHour, currentMinute)
};

const buildOutputForSameHour = ({cronHour, cronMinute, currentMinute}) => {

    const resultMinute = isWildcard(cronMinute) ? currentMinute : cronMinute;
    const resultDay = isWildcard(cronMinute) || !isBefore(cronMinute, currentMinute)  ? TODAY : TOMORROW;

    return buildOutputTime(cronHour, resultMinute, resultDay);
};

const buildOutputForDifferentHour = ({cronHour, cronMinute, currentHour}) => {

    const resultMinute = isWildcard(cronMinute) ? "00" : cronMinute;
    const resultDay = isAfter(cronHour, currentHour) ? TODAY : TOMORROW;

    return buildOutputTime(cronHour, resultMinute, resultDay);
};

const handleSpecificHourCron = (data) => {
    const handler = isEqual(data.cronHour, data.currentHour) ? buildOutputForSameHour : buildOutputForDifferentHour;
    return handler(data);
};

const getOutputTime = (data) => {
    const handler = isWildcard(data.cronHour) ? handleWildcardHourCron : handleSpecificHourCron;
    return handler(data);
};

const handleInput = (input, currentTime) => {
    
    const [cronMinute, cronHour, command] = input.split(" ");
    const [currentHour, currentMinute] = currentTime.split(":");
    
    const inputData = { cronHour, cronMinute, currentHour, currentMinute };

    return `${getOutputTime(inputData)} - ${command}`;
};

module.exports = handleInput;
