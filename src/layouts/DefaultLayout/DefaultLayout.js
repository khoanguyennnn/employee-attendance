import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './DefaultLayout.module.scss';
import Header from "./Header";
import Sidebar from "./Sidebar";

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("accessToken");
        if (!token) {
            navigate('/login');
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx("container")}>
                <Sidebar />
                <div className={cx("content")}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;