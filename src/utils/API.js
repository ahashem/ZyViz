import 'whatwg-fetch';
import { OK, CREATED } from 'http-status';

/**
 *
 * @param url
 * @param method
 * @param data
 * @return {Promise<any>}
 */
const realAPIRequest = (url, method = 'GET', data = {}) => {
  return new Promise((resolve, reject) => {

    const options = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET,POST,HEAD,OPTIONS,PUT,DELETE',
      },
    };
    // If there is data passed assign it to the request body
    if (Object.keys(data).length > 0) options.body = data;

    // Add token to every request if there's at localStorage
    fetch(url, options)
      .then((response) => {

        // Format response
        return {
          status: response.status,
          text: response.statusText,
          url: response.url,
          data: response.json(),
        };

      })
      .then((response) => {
        switch (response.status) {
          case OK:
          case CREATED:
            resolve(response.data);
            break;
          case /^4[0-9][0-9]$/:
          case /^5[0-9][0-9]$/:
            return response.data
              .then((res) => {
                const error = {
                  errorCode: response.status,
                  errorMsg: res.error || res.message,
                };
                throw new Error(JSON.stringify(error));
              })
              .catch(error => reject(error));
          default:
            resolve(response.data);
            break;
        }
      })
      .catch(error => reject(error));
  });
};

const mockRequest = (mockDataPath) => {
  return new Promise((resolve, reject) => resolve(mockDataPath));
};

const request = (url, method = 'GET', data = {}) => {
  return (process.env.REACT_APP_MOCK_API) ? mockRequest(url) : realAPIRequest(url, method = 'GET', data = {});
};


// APIs
const OrdersAPI = {
  getOrders() {
    return request(require('./mock-orders'));
  },
};

export { request as default, OrdersAPI };
