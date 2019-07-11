import React from 'react';
import styled from 'styled-components';
import C3Chart from 'react-c3js';
import 'c3/c3.css';

import { DonutCardPropTypes, CardPropTypes } from '../../constants/PropTypes';
import { CARD_SIZES } from '../../constants/LayoutConstants';
import Card from '../Card/Card';

const ContentWrapper = styled.div`
  margin: 0 16px 16px 16px;
  padding-bottom: 8px;
`;

const DonutCard = ({ title, content, content: { data }, size, ...others }) => {
  const chart = {
    data: {
      columns: data.map(i => [i.label, i.value]),
      colors: data.reduce(
        (acc, curr) => Object.assign({}, acc, curr.color ? { [curr.label]: curr.color } : {}),
        {}
      ),
      type: 'donut',
    },
    donut: {
      title: content.title,
      label: {
        format: value => value,
      },
    },
    legend: {
      position: 'right',
    },
    tooltip: {
      format: {
        value: value => value,
      },
    },
    padding: {
      top: 10,
      right: 20,
      left: 20,
    },
  };
  return (
    <Card title={title} size={size} {...others}>
      {!others.isLoading ? (
        <ContentWrapper>
          <C3Chart {...chart} style={{}} />
        </ContentWrapper>
      ) : null}
    </Card>
  );
};

DonutCard.propTypes = { ...CardPropTypes, ...DonutCardPropTypes };

DonutCard.defaultProps = {
  size: CARD_SIZES.MEDIUM,
};

export default DonutCard;