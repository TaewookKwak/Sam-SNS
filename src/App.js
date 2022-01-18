import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as ROUTES from './constants/routes'
const login = lazy(() => import('./pages/login/login'))
const signup = lazy(() => import('./pages/signup/signup'))

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={login} />
          <Route path={ROUTES.SIGN_UP} component={signup} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
