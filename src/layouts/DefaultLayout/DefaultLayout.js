import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import styles from './DefaultLayout.module.scss';
import Header from "./Header";
import Sidebar from "./Sidebar";
import { getRole } from '~/services/userService';
import { TakeAttendanceContext } from '~/components/TakeAttendance';
import TakeAttendanceModal from '~/components/TakeAttendance/TakeAttendanceModal';

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    const context = useContext(TakeAttendanceContext);

    const navigate = useNavigate();

    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        let token = localStorage.getItem("accessToken");
        if (!token) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        getUserRole();
        if (
            (userRole === "employee" && window.location.pathname === "/user") ||
            (userRole === "employee" && window.location.pathname === "/dashboard")
        ) {
            navigate('/empty')
        } else if (userRole === "manager" && window.location.pathname === "/employee") {
            navigate('/empty')
        }
    }, [userRole])

    const getUserRole = async () => {
        let res = await getRole();
        if (res) {
            setUserRole(res)
        } else {
            console.log("cannot get user role");
        }
    }
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx("container")}>
                <Sidebar />
                <div className={cx("content")}>
                    {children}
                </div>
            </div>
            {context.active && <TakeAttendanceModal />}
        </div>
    );
}

export default DefaultLayout;