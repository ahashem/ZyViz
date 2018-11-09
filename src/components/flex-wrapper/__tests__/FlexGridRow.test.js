import React from 'react';
import { shallow } from 'enzyme';
import { Col } from 'antd';
import FlexGridRow from '../FlexGridRow';

describe('<FlexGridRow /> component', () => {
  it('should render single `Row` component wrapping all children', () => {
    const children = Array(4).fill(<div/>);

    const rendered = shallow(
      <FlexGridRow>
        {children}
      </FlexGridRow>
    );

    expect(rendered.find('Row')).toHaveLength(1);
  });

  it('should render children with `Col` wrapper according to children nodes count', () => {
    const children = Array(4).fill(<div/>);

    const rendered = shallow(
      <FlexGridRow>
        {children}
      </FlexGridRow>
    );

    expect(rendered.find('Col')).toHaveLength(4);
  });

  it('should render `Col` children as is', () => {
    const children = Array(4).fill(<div/>);

    const rendered = shallow(
      <FlexGridRow>
        <Col
          nativeCol
        >
          <div/>
        </Col>
        {children}
      </FlexGridRow>
    );
    expect(rendered.find('[nativeCol]')).toBeDefined();
    expect(rendered.find('Col')).toHaveLength(5);
  });

  it('render Col children with provided Col layout attributes', () => {

    const rendered = shallow(
      <FlexGridRow>
        <Col
          nativeCol
          xs="8"
          sm="8"
          md="8"
          lg="8"
        >
          <div id="ColChild"/>
        </Col>
        <div id="child1"/>
        <div id="child2"/>
        <div id="child3"/>
        <div id="child4"/>
      </FlexGridRow>
    );

    expect(rendered.find('[nativeCol]')).toBeDefined();
    expect(rendered.contains(
      <Col
        nativeCol
        xs="8"
        sm="8"
        md="8"
        lg="8"
      >
        <div id="ColChild"/>
      </Col>
    ))
      .toEqual(true);
  });

  it('should render Col adjacent children aligned with the remaining space in the flexRow', () => {

    const rendered = shallow(
      <FlexGridRow>
        <Col
          nativeCol
          xs={8}
          sm={8}
          md={8}
          lg={8}
          xl={8}
          xxl={8}
        >
          <div/>
        </Col>
        <div id="child1"/>
        <div id="child2"/>
        <div id="child3"/>
        <div id="child4"/>
      </FlexGridRow>
    );

    const xs = rendered.find('Col').reduce((xs, col) => xs + col.prop('xs'), 0);

    expect(rendered.find('#child1').parent().is('Col')).toEqual(true);
    expect(rendered.find('#child1').parent().prop('xs')).toEqual(4);
    expect(rendered.find('#child1').parent().prop('sm')).toEqual(4);
    expect(rendered.find('#child1').parent().prop('md')).toEqual(4);
    expect(rendered.find('#child1').parent().prop('lg')).toEqual(4);
    expect(rendered.find('#child1').parent().prop('xl')).toEqual(4);
    expect(rendered.find('#child1').parent().prop('xxl')).toEqual(4);
    expect(xs).toEqual(24); // Antd boxes default to 24 columns
  });
});
