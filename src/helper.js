const isBefore = (actual, compare) => parseInt(actual) < parseInt(compare);

const isEqual = (actual, compare) => parseInt(actual) == parseInt(compare);

const isAfter = (actual, compare) => parseInt(actual) > parseInt(compare);

const isWildcard = (char) => char === "*";

const formatInt = (val) => parseInt(val).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

const buildOutputTime = (hour, minute, day) => `${hour}:${formatInt(minute)} ${day}`;

module.exports = { isBefore, isEqual, isAfter, isWildcard, buildOutputTime };