import { utc } from 'moment';

/**
 *
 * @param amount
 * @param min
 * @param max
 * @return {*|boolean}
 */
const filterAmountRange = (amount, min, max) => amount && amount > min && amount <= max;

/**
 *
 * @param date
 * @param min
 * @param max
 * @return {boolean}
 */
const filterDayTimeRange = (date, min, max) => {
  const hour = utc(date).hours();
  return hour > min && hour <= max;
};


/**
 * Generate Referenced Dimensions from Crossfilter data
 * @param crossedOrdersData
 * @return {Object<crossfilter.Dimension<T, *>>}
 */
const GenerateDimensions = (crossedOrdersData) => {
  // Orders by paymentMethod
  const ordersByPaymentMethod = crossedOrdersData.dimension(record => record.paymentMethod);

  // Orders by Branch
  const ordersByBranch = crossedOrdersData.dimension(record => record.branch);

  // Orders by Delivery Area
  const ordersByDeliveryArea = crossedOrdersData.dimension(record => record.deliveryArea);

  // Orders by orderAmount
  // Less than $10, $10-$20, $20-40, $40-$70, $70 or more
  const ordersBySize = crossedOrdersData.dimension(record => {
    const amount = record.orderAmount;

    switch (true) {
      case filterAmountRange(amount, 10, 20):
        return '$10-$20';
      case filterAmountRange(amount, 20, 40):
        return '$20-$40';
      case filterAmountRange(amount, 40, 70):
        return '$40-$70';
      case filterAmountRange(amount, 70, Infinity):
        return '$70 or more';
      case filterAmountRange(amount, -Infinity, 10):
        return 'Less than $10';
      default:
        return 'N/A';
    }
  });

  // Orders by Order time of day
  // Morning 6am-12pm, Afternoon 12-5pm, Evening 5-8pm, Night 8pm-6am
  const ordersByTimeOfDay = crossedOrdersData.dimension(record => {
    const date = record.orderdate;

    switch (true) {
      case filterDayTimeRange(date, 6, 12):
        return 'Morning';
      case filterDayTimeRange(date, 12, 17):
        return 'Afternoon';
      case filterDayTimeRange(date, 17, 20):
        return 'Evening';
      case filterDayTimeRange(date, 0, 6):
      case filterDayTimeRange(date, 20, 23):
        return 'Night';
      // TODO: issue with some date filters!
      default:
        return 'N/A';
    }
  });

  // Orders by Day of Week
  const ordersByWeekDay = crossedOrdersData.dimension(record => {
    const date = record.orderdate;
    const weekDays = ['N/A', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays', 'Sundays'];

    const weekDayIndex = utc(date).isoWeekday();
    return weekDays[weekDayIndex];

  });

  // Orders by Date
  const ordersByDate = crossedOrdersData.dimension(record => {
    const isValid = (date) => date !== 'Invalid Date';

    const date = record.orderdate;
    const momentDate = new Date(date);

    if (isValid(momentDate)) {
      momentDate.setHours(0);
      momentDate.setMinutes(0);
      momentDate.setSeconds(0);
      momentDate.setMilliseconds(0);
      return momentDate;
    }
    return null;
  });

  return {
    ordersByPaymentMethod,
    ordersBySize,
    ordersByTimeOfDay,
    ordersByWeekDay,
    ordersByDate,
    ordersByBranch,
    ordersByDeliveryArea,
  };

};

export default GenerateDimensions;
