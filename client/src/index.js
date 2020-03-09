import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ApolloClient from 'apollo-boost'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import config from './utils/config'
import { PublicRoute, PrivateRoute } from './components/Authentication/authWrapper'
import Auth from './pages/Auth'
import App from './pages/App'
import NoMatch404 from './pages/NoMatch404'
import 'bootstrap/dist/css/bootstrap.min.css'

const client = new ApolloClient({
  uri: config.SERVER_HOST,
  credentials: 'include'
})

const Root = () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <PublicRoute exact path={['/', '/auth/:mode(login|register)']}><Auth /></PublicRoute>
        <PrivateRoute exact path='/app/:mode(home|vote)'><App /></PrivateRoute>
        <Route component={NoMatch404} />
      </Switch>
    </Router>
  </ApolloProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
