import classNames from "classnames/bind";

import styles from './Profile.module.scss'
import { fetchUser } from "~/services/userService";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles)

function Profile() {
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        getUserProfile()
    }, [])

    const getUserProfile = async () => {
        let res = await fetchUser();
        if (res && res.length > 0) {
            setUserInfo(res)
        }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h1 className={cx('title')}>Your Profile</h1>
                <div className={cx('layout')}>
                    <h2>ID:</h2>
                    <div className={cx('info-box')}>
                        <h2>{userInfo[0]?._id}</h2>
                    </div>
                </div>
                <div className={cx('layout')}>
                    <h2>First Name:</h2>
                    <div className={cx('info-box')}>
                        <h2>{userInfo[0]?.First_name}</h2>
                    </div>
                </div>
                <div className={cx('layout')}>
                    <h2>Last Name:</h2>
                    <div className={cx('info-box')}>
                        <h2>{userInfo[0]?.Last_name}</h2>
                    </div>
                </div>
                <div className={cx('layout')}>
                    <h2>Role: </h2>
                    <div className={cx('info-box')}>

                        <h2>{userInfo[0]?.Role}</h2>
                    </div>
                </div>
                <div className={cx('layout')}>
                    <h2>Email:</h2>
                    <div className={cx('info-box')}>
                        <h2>{userInfo[0]?.email}</h2>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Profile;