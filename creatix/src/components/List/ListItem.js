import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import './ListItem.scss';

const ListItem = ({ children, iconName, iconStyle, onClick }) => {
  return (
    <div className="list-item" onClick={onClick}>
      {children}
      {iconName && <Icon iconName={iconName} style={iconStyle} />}
    </div>
  );
};

ListItem.propTypes = {
  children: PropTypes.element.isRequired,
  iconName: PropTypes.string,
  iconStyle: PropTypes.shape(),
  onClick: PropTypes.func
};

ListItem.defaultProps = {
  iconName: null,
  iconStyle: null,
  onClick: () => {}
};

export default ListItem;
