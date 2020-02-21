/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

// import dos layouts padroes
import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { signed } = store.getState().auth;

  // verifica se o usuario esta logado
  // se nao ele redireciona para o login
  if (!signed && isPrivate) return <Redirect to="/" />;

  // se nao ele redireciona para a pagina "inicial"
  if (signed && !isPrivate) return <Redirect to="/deliveries" />;

  const Layout = signed ? DefaultLayout : AuthLayout;

  // renderizar uma pagina "padrao"
  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

// definir os proptypes
RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
