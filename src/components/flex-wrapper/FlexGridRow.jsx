import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Col, Row } from 'antd';

const AntdBoxes = 24; // By Design in AntD (24 boxes - 12 Columns)

/**
 * Generate `Col` wrapper with calculated size according to number of wrapped elements (i.e: `props.children`)
 * @param children
 * @return {Array<*>}
 */
const ChildrenGen = (children) => {
  const childrenMap = React.Children.toArray(children);
  const childrenCount = React.Children.count(children);

  /**
   * Calculate the box size according to provided breakpoint space used and count of other Col components
   * @param breakpoint
   * @param count
   * @return {number}
   */
  const boxByCountSize = (breakpoint, count) => {
    if (!breakpoint || !count) {
      return ((AntdBoxes / childrenCount) >= AntdBoxes) ? AntdBoxes : AntdBoxes / childrenCount;
    }
    const reminderCount = childrenCount - count;
    const reminderBoxes = (AntdBoxes - breakpoint) === 0 ? AntdBoxes : AntdBoxes - breakpoint;
    return ((reminderBoxes / reminderCount) >= reminderBoxes) ? reminderBoxes : reminderBoxes / reminderCount;
  };

  if (childrenMap.find(child => child instanceof Col) !== -1) {
    const columns = childrenMap
      .filter(child => child.type === Col)
      .reduce((total, col) => {
          total.count++;
          total.xs += col.props.xs;
          total.sm += col.props.sm;
          total.md += col.props.md;
          total.lg += col.props.lg;
          total.xl += col.props.xl;
          total.xxl += col.props.xxl;

          return total;
        },
        {
          count: 0,
          xs: 0,
          sm: 0,
          md: 0,
          lg: 0,
          xl: 0,
          xxl: 0,
        });

    const generatedChildren = [];
    childrenMap.map((child, index) => {
      if (child.type === Col) {
        generatedChildren.push(child);
      } else {
        generatedChildren.push(
          <Col
            key={uuid()}
            xs={boxByCountSize(columns.xs, columns.count)}
            sm={boxByCountSize(columns.sm, columns.count)}
            md={boxByCountSize(columns.md, columns.count)}
            lg={boxByCountSize(columns.lg, columns.count)}
            xl={boxByCountSize(columns.xl, columns.count)}
            xxl={boxByCountSize(columns.xxl, columns.count)}
          >
            {child}
          </Col>
        );
      }
    });
    return generatedChildren;
  }
  return childrenMap.map((child, index) => {
    return (
      <Col
        key={uuid()}
        xs={AntdBoxes} sm={AntdBoxes}
        md={boxByCountSize()}
        span={boxByCountSize()}
        lg={boxByCountSize()}
      >
        {child}
      </Col>
    );
  });
};

/**
 * FlexGridRow component
 * @param {Number} gutter
 * @param {boolean} justify
 * @param {Array<Node>} children
 */
const FlexGridRow = ({ gutter, justify, align, children }) => {
  return (
    <Row
      type="flex"
      justify={justify}
      align={align}
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
  align: 'middle',
  children: null,
};

export default FlexGridRow;
