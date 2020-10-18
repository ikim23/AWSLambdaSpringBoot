import React from 'react';
import {
  Shimmer,
  ShimmerElementType as ElemType
} from 'office-ui-fabric-react/lib/Shimmer';
import './ListItem.scss';

const rand = (lowerBound, upperBound) =>
  lowerBound + Math.random() * (upperBound - lowerBound);

const ListItemShimmer = () => (
  <div className="list-item">
    <Shimmer
      shimmerElements={[
        { type: ElemType.circle, height: 40 },
        { type: ElemType.gap, width: 16, height: 40 },
        {
          type: ElemType.line,
          width: rand(100, 200),
          height: 16,
          verticalAlign: 'center'
        },
        { type: ElemType.gap, width: '100%' }
      ]}
    />
  </div>
);

export default ListItemShimmer;
