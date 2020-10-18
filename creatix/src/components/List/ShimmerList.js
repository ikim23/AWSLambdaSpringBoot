import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List } from 'office-ui-fabric-react/lib/List';
import ListItemShimmer from './ListItemShimmer';

export default class ShimmerList extends PureComponent {
  forceUpdate = () => this.list && this.list.forceUpdate();

  renderShimmer = () => <ListItemShimmer />;

  render() {
    const { showShimmer, onRenderCell } = this.props;
    const items = showShimmer ? new Array(7) : this.props.items;
    const renderCell = showShimmer ? this.renderShimmer : onRenderCell;
    return (
      <div>
        {showShimmer || items.length ? (
          <List
            ref={ref => (this.list = ref)}
            items={items}
            onRenderCell={renderCell}
          />
        ) : (
          <h2 style={{ textAlign: 'center' }}>No items found</h2>
        )}
      </div>
    );
  }
}

ShimmerList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onRenderCell: PropTypes.func.isRequired,
  showShimmer: PropTypes.bool
};

ShimmerList.defaultProps = {
  showShimmer: false
};
