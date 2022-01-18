import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as ROUTES from './constants/routes'
const login = lazy(() => import('./pages/login/login'))
const signup = lazy(() => import('./pages/signup/signup'))
const notFound = lazy(() => import('./pages/not-found/not-found'))
const dashboard = lazy(() => import('./pages/dashboard/dashboard'))
function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.DASHBOARD} component={dashboard} exact />
          <Route path={ROUTES.LOGIN} component={login} />
          <Route path={ROUTES.SIGN_UP} component={signup} />
          <Route component={notFound} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
