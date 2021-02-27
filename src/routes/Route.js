import React from 'react';
import {
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

const Route = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { role } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={(props) => {
        return isPrivate === !!role ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/auth" : "/admin",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;