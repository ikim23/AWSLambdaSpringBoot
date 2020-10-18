import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './SearchBox.scss';

const SearchBox = ({ value, onChange, onSubmit, onClear }) => {
  const clazz = classNames('search-box', { 'search-box--show-clear': value });
  return (
    <div className={clazz}>
      <TextField
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        onKeyDown={e => {
          if (e.keyCode == 13) onSubmit(value);
        }}
      />
      <Icon className="search-box__clear" iconName="Cancel" onClick={onClear} />
    </div>
  );
};

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired
};

export default SearchBox;
