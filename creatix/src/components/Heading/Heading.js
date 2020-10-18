import React from 'react';
import PropTypes from 'prop-types';

const Heading = ({ text }) => <h1>{text}</h1>;

Heading.propTypes = {
  text: PropTypes.string.isRequired
};

export default Heading;
