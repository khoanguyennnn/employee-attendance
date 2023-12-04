import Home from '../pages/Home';
import User from '../pages/User';
import Employee from '../pages/Employee';

// Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/user', component: User },
    { path: '/employee', component: Employee, layout: null },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }