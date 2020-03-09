import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { IS_LOGIN } from '../../utils/graphql'
import Loading from '../../pages/Loading'

export function PrivateRoute ({ children, ...rest }) {
  const { loading, error, data } = useQuery(IS_LOGIN, { fetchPolicy: 'no-cache' })
  if (loading || error) return <Loading auth error={error} />
  return (
    <Route
      {...rest}
      render={() =>
        data.isLogin === true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/auth/login'
            }}
          />
      )}
    />
  )
}

export function PublicRoute ({ children, ...rest }) {
  const { loading, error, data } = useQuery(IS_LOGIN, { fetchPolicy: 'no-cache' })
  if (loading || error) return <Loading error={error} />
  return (
    <Route
      {...rest}
      render={() =>
        data.isLogin === false ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/app/home'
            }}
          />
      )}
    />
  )
}
