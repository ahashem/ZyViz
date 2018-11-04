import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import CrossVisualizer from '../CrossVisualizer';
import { crossFilterMock } from '../../../utils/test-utils';

describe('<CrossVisualizer /> Component', () => {
  test('should render children and match snapshot', () => {
    const crossVisualizer = {
      loading: false,
      error: false,
      errorMes: '',
      ordersData: crossFilterMock,
    };
    const mockStore = configureStore();
    const store = mockStore({ crossVisualizer });

    const rendered = shallow(<CrossVisualizer store={store}/>);

    expect(rendered).toMatchSnapshot();
  });

  describe('<CrossVisualizer /> Component UI', () => {
    describe('UI during loading', () => {
      let wrapper;

      beforeAll(() => {
        const crossVisualizer = {
          loading: true,
        };
        const mockStore = configureStore();
        const store = mockStore({ crossVisualizer });

        wrapper = mount(<CrossVisualizer store={store}/>);
      });

      test('it should render loading spinner while loading', () => {
        const spinner = wrapper.find('[data-test="loading"]');
        expect(spinner.exists()).toBe(true);
      });

      test('it should not render other elements', () => {
        const spinner = wrapper.find('[data-test="loading"]');
        expect(spinner.exists()).toBe(true);
      });

    });

  });
});
