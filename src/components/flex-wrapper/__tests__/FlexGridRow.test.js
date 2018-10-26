import React from 'react';
import { shallow } from 'enzyme';
import FlexGridRow from '../FlexGridRow';

describe('<FlexGridRow /> component', () => {
  it('should render `Col` according to children nodes count and single `Row`', () => {
    const children = Array(4).fill(<div/>);

    const rendered = shallow(
      <FlexGridRow>
        {children}
      </FlexGridRow>
    );

    expect(rendered.find('Row')).toHaveLength(1);
    expect(rendered.find('Col')).toHaveLength(4);
  });

});

