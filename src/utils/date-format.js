import config from '@/config';

const getWithZero = (value) => {
  if (value < 10) return `0${value}`;

  return value;
};

const getHoursAgo = (timestamp) => {
  const ONE_HOUR = 60 * 60 * 1000;
  const diffDate = Date.now() - timestamp;

  return Math.ceil(diffDate / ONE_HOUR);
};

const getDateTime = (timestamp) => {
  const date = new Date(timestamp);
  const hh = date.getHours();
  const mm = date.getMinutes();

  return `${getWithZero(hh)}:${getWithZero(mm)}`;
};

const getDateLabel = (value) => {
  const timestamp = Date.parse(value);
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.toLocaleDateString(config.date_locale, { month: 'short' });
  const year = date.getFullYear();

  const hoursAgo = getHoursAgo(timestamp);

  if (hoursAgo < 24) {
    return `${hoursAgo} ${hoursAgo > 1 ? 'hours' : 'hour'} ago`;
  }
  // TODO add days and months ago

  return `on ${day} ${month} ${year}`;
};

export default { getDateLabel, getDateTime };
