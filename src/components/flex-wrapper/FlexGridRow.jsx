import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Col, Row } from 'antd';

const AntdBoxes = 24; // By Design in AntD (24 boxes - 12 Columns)

/**
 * Generate `Col` wrapper with calculated size according to number of wrapped elements (i.e: `props.children`)
 * @param children
 * @return {*[]}
 * @constructor
 */
const ChildrenGen = (children) => {
  const childrenMap = React.Children.toArray(children);
  const childrenCount = React.Children.count(children);

  const boxByCountSize = ((AntdBoxes / childrenCount) >= AntdBoxes) ? AntdBoxes : AntdBoxes / childrenCount;

  return childrenMap.map((child, index) => {
    return (
      <Col
        key={uuid()}
        xs={AntdBoxes} sm={AntdBoxes}
        md={boxByCountSize}
        span={boxByCountSize}
        lg={boxByCountSize}
      >
        {child}
      </Col>
    );
  });
};

const FlexGridRow = ({ gutter, justify, children }) => {
  return (
    <Row
      type="flex"
      justify={justify}
      gutter={gutter || AntdBoxes}
    >
      {ChildrenGen(children)}
    </Row>
  );
};

FlexGridRow.propTypes = {
  gutter: PropTypes.number,
  justify: PropTypes.string,
  children: PropTypes.node,
};

FlexGridRow.defaultProps = {
  gutter: AntdBoxes,
  justify: 'space-around',
  children: null,
};

export default FlexGridRow;
