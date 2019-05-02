import config from '@/config';

const getHoursAgo = (timestamp) => {
  const ONE_HOUR = 60 * 60 * 1000;
  const diffDate = Date.now() - timestamp;

  return Math.ceil(diffDate / ONE_HOUR);
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

export default getDateLabel;
