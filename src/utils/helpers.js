/**
 * Provide shortened version (3 letters) of the provided Day of Week
 * @param weekDay
 * @return {string} shortened weekday
 */
const shortenWeekDay = (weekDay) => {
  const weekDays = {
    'Mondays': 'Mon',
    'Monday': 'Mon',
    'Tuesdays': 'Tue',
    'Tuesday': 'Tue',
    'Wednesdays': 'Wed',
    'Wednesday': 'Wed',
    'Thursdays': 'Thu',
    'Thursday': 'Thu',
    'Fridays': 'Fri',
    'Friday': 'Fri',
    'Saturdays': 'Sat',
    'Saturday': 'Sat',
    'Sundays': 'Sun',
    'Sunday': 'Sun',
  };

  return weekDays[`${weekDay}`];
};

/**
 * Format currency with USD
 * @param amount
 * @return {string}
 */
const currencyTickFormat = (amount) => (((amount / 1000) >= 1) ? `$${(amount / 1000)}K` : `$${amount}`);

export { shortenWeekDay, currencyTickFormat };
