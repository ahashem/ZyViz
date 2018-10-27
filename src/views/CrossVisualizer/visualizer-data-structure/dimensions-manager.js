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
 *
 * @param crossedOrdersData
 * @return {{ordersByPaymentMethod: crossfilter.Dimension<T, *> | *, ordersBySize: crossfilter.Dimension<T, crossfilter.NaturallyOrderedValue> | CrossFilter.Dimension<T, any> | *, ordersByTimeOfDay: crossfilter.Dimension<T, crossfilter.NaturallyOrderedValue> | CrossFilter.Dimension<T, any> | *}}
 * @constructor
 */
const GenerateDimensions = (crossedOrdersData) => {

  // Serialize and group data using crossfilter to be
  // for-example: {key: 'paymentMethod', value: 20}

  // Orders by paymentMethod
  const ordersByPaymentMethod = crossedOrdersData.dimension(record => record.paymentMethod);

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
  // Morning 6am-12pm, Afternoon 12-5pm, Evening 5-8pm, Night 8pm-6am
  const ordersByWeekDay = crossedOrdersData.dimension(record => {
    const date = record.orderdate;
    const weekDays = ['N/A', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays', 'Sundays'];

    const weekDayIndex = utc(date).isoWeekday();
    return weekDays[weekDayIndex];

  });

  return {
    ordersByPaymentMethod,
    ordersBySize,
    ordersByTimeOfDay,
    ordersByWeekDay,
  };

};

export default GenerateDimensions;
