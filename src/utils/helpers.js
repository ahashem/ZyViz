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

export { shortenWeekDay };
