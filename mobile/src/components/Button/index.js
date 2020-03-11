import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function Button({
  children,
  loading,
  color,
  background,
  ...rest
}) {
  return (
    <Container background={background} {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color={color} />
      ) : (
        <Text color={color}>{children}</Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
  color: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
};
