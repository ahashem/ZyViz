import React from 'react';
import App from '../App';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme/build';


it('should render children', () => {
  const MockStore = {
    loading: false,
    error: false,
    errorMes: '',
  };
  const mockStore = configureStore();
  const store = mockStore({ MockStore });

  const rendered = shallow(<App store={store} />);

  expect(rendered).toMatchSnapshot();
});
