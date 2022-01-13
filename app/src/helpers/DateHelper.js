const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

const currentTimeZone = 'Europe/Amsterdam';
const nlFormat = 'DD-MM-YYYY HH:mm:ss';
const longFormat = 'YYYY-MM-DD HH:mm:ss.SSSSSS';
const shortFormat = 'HH:mm:ss';
dayjs.tz.setDefault(currentTimeZone);

export const getDateTime = () => {
  return dayjs().tz().format(longFormat);
};

export const formatDateTime = (date) => {
  if (date) {
    return dayjs.tz(date, currentTimeZone).format(longFormat);
  }
  return;
};

export const formatNLDateTime = (date) => {
  if (date) {
    return dayjs(date).tz(currentTimeZone).format(nlFormat);
  }
  return;
};

export const formatUTCDateTime = (date) => {
  if (date) {
    return dayjs(date).tz(currentTimeZone).format(longFormat);
  }
  return;
};

export const getTime = () => {
  dayjs.tz.setDefault(currentTimeZone);
  return dayjs().tz().format(shortFormat);
};

export const getTodayMinusDays = (days) => {
  if (days) {
    return dayjs.tz().endOf('day').subtract(days, 'days').format(longFormat);
  }
  return;
};
