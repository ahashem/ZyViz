/**
 * Convert currency strings into primitive Numbers
 * @param {*|string} value
 * @return {number}
 */
const currencyParser = (value) => {
  if (!value || typeof value === 'number') {
    return value;
  }
  return parseFloat(value.replace(/[$,]+/g, ''));
};

/**
 * Normalize data for Crossfilter usage
 * @param dataRows
 * @return {*}
 */
const NormalizeData = (dataRows) => {
  if (!dataRows || !dataRows.length) {
    return null;
  }

  dataRows.forEach(row => {
    // Convert string currency to primitive numbers
    row.orderAmount = currencyParser(row.orderAmount);
  });

  return dataRows;
};


export default NormalizeData;
