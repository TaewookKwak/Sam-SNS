import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import UserContext from './context/user'
import useAuthListener from './hooks/useAuthListener'
import styles from './styles/app.css'
import ProtectedRoute from './helpers/protectedRoute'
import Dashboard from './pages/dashboard/dashboard'
import IsUserLoggedIn from './helpers/is-user-logged-in'
import Login from './pages/login/login'
import SignUp from './pages/signup/signup'
import Profile from './pages/profile/profile'
import Posting from './pages/posting/posting'

const login = lazy(() => import('./pages/login/login'))
const signup = lazy(() => import('./pages/signup/signup'))
const notFound = lazy(() => import('./pages/not-found/not-found'))
const dashboard = lazy(() => import('./pages/dashboard/dashboard'))
function App() {
  const { user } = useAuthListener()
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <ProtectedRoute user={user} path={ROUTES.WRITE} exact>
              <Posting />
            </ProtectedRoute>
            <IsUserLoggedIn
              user={user}
              path={ROUTES.LOGIN}
              loggedInPath={ROUTES.DASHBOARD}
            >
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn
              user={user}
              path={ROUTES.SIGN_UP}
              loggedInPath={ROUTES.DASHBOARD}
            >
              <SignUp />
            </IsUserLoggedIn>
            <ProtectedRoute user={user} path={ROUTES.PROFILE} exact>
              <Profile />
            </ProtectedRoute>

            <Route component={notFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  )
}

export default App
