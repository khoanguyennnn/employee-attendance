import { HeaderOnly } from '~/layouts';

import Home from '../pages/Home';
import User from '../pages/User';
import Employee from '../pages/Employee';
import Dashboard from '../pages/Dashboard';
import Login from '~/pages/Login';
import PasswordChange from '~/pages/PasswordChange';
import Empty from '~/pages/Empty';

// Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/dashboard', component: Dashboard },
    { path: '/user', component: User },
    { path: '/employee', component: Employee },
    { path: '/passwordchange', component: PasswordChange, layout: HeaderOnly },
    { path: '/login', component: Login, layout: null },
    { path: '/empty', component: Empty, layout: HeaderOnly },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes };