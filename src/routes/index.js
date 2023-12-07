import Home from '../pages/Home';
import User from '../pages/User';
import Employee from '../pages/Employee';
import Dashboard from '../pages/Dashboard';
import Login from '~/pages/Login';

// Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/dashboard', component: Dashboard },
    { path: '/user', component: User },
    { path: '/employee', component: Employee },
    { path: '/login', component: Login, layout: null },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes };