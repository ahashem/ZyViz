import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import CrossVisualizerTabbed from '../CrossVisualizerTabbed';
import { crossFilterMock } from '../../../utils/test-utils';

describe('<CrossVisualizerTabbed /> Component', () => {
  test('should render children and match snapshot', () => {
    const crossVisualizerTabbed = {
      loading: false,
      error: false,
      errorMsg: '',
      ordersData: crossFilterMock,
    };
    const mockStore = configureStore();
    const store = mockStore({ crossVisualizerTabbed });

    const rendered = shallow(<CrossVisualizerTabbed store={store}/>);

    expect(rendered).toMatchSnapshot();
  });

  describe('<CrossVisualizerTabbed /> Component UI', () => {
    describe('UI during loading', () => {
      let wrapper;

      beforeAll(() => {
        const crossVisualizerTabbed = {
          loading: true,
        };
        const mockStore = configureStore();
        const store = mockStore({ crossVisualizerTabbed });

        wrapper = mount(<CrossVisualizerTabbed store={store}/>);
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
