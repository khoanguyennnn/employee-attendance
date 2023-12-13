import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import _ from "lodash";
import { debounce } from 'lodash';

import { getAllUserAttendance } from "~/services/userService";
import styles from './Dashboard.module.scss';


const cx = classNames.bind(styles)

function Dashboard() {
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        getUsers(1);
    }, [])


    const getUsers = async () => {
        let res = await getAllUserAttendance();
        if (res) {
            setListUsers(res)
        }
    }

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListUsers = _.cloneDeep(listUsers);
            cloneListUsers = cloneListUsers.filter(item => item.email.includes(term));
            setListUsers(cloneListUsers);
        } else {
            getUsers(1);
        }
    }, 300)

    return (
        <section className={cx('user')}>
            <div className={cx('user-list')}>
                <div className={cx('title')}>
                    <h1>Attendance List</h1>
                </div>
                <div className='my-3'>
                    <input
                        className={cx('form-control')}
                        placeholder={"Search user by email"}
                        onChange={(event) => handleSearch(event)}
                    />
                </div>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <td>Email</td>
                            <td>Date</td>
                            <td>Check in Time</td>
                            <td>Check out Time</td>
                        </tr>
                    </thead>
                    <tbody className={cx('table-body')}>
                        {listUsers.map((value, index) => {
                            return (
                                <tr key={`users-${index}`}>
                                    <td>{value.email}</td>
                                    <td>{value.date}</td>
                                    <td>{value.checkInTime}</td>
                                    <td>{value.checkOutTime}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Dashboard;