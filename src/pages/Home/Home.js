import classNames from "classnames/bind";

import { fetchAllUser } from "~/services/userService";
import styles from './Home.module.scss';
import { useEffect, useState } from "react";

const cx = classNames.bind(styles)

function Home() {
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        getUsers(1);
    }, [])

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            setListUsers(res.data)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('welcome-title')}>Welcome to Employee Attendance Management System!</h2>
            <h3 className={cx('welcome-title')}>Our employees:</h3>
            <div className={cx('content')}>
                {listUsers && listUsers.length > 0 && listUsers.map((value, index) => {
                    return (
                        <div className={cx('profile-container')} key={index}>
                            <img className={cx('profile-avatar')} src={value.avatar} alt="" />
                            <h3>{value.first_name}</h3>
                            <h4>{value.email}</h4>
                        </div>
                    )
                })}
            </div>

        </div>
    );
}

export default Home;