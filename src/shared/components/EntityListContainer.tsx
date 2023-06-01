import { Col, Row } from 'antd';
import { v4 as uuid } from 'uuid';
import React from 'react';

type EntityListContainerProps = {
  form?: React.ReactNode;
  filters?: React.ReactNode[];
  list: React.ReactNode;
  pagination?: React.ReactNode;
};

const EntityListContainer: React.FC<EntityListContainerProps> = ({ form, filters, list, pagination }) => {
  return (
    <Row gutter={[0, 16]}>
      {form ? (
        <Col
          span={24}
          key='form'>
          <Row gutter={[16, 0]}>
            <Col
              span={8}
              key='form'>
              {form}
            </Col>
          </Row>
        </Col>
      ) : null}
      {filters ? (
        <Col
          span={24}
          key='filters'>
          <Row gutter={[16, 16]}>
            {filters.map((node, index) => (
              <Col
                style={{ display: 'flex', alignItems: 'flex-end' }}
                span={8}
                key={index}>
                {node}
              </Col>
            ))}
          </Row>
        </Col>
      ) : null}
      <Col
        span={24}
        key='list'>
        {list}
      </Col>
      {pagination ? (
        <Col
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          span={24}
          key='pagination'>
          {pagination}
        </Col>
      ) : null}
    </Row>
  );
};

export { EntityListContainer };
