import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faTableColumns, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";

import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import { getRole } from "~/services/userService";


const cx = classNames.bind(styles)

function Sidebar() {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        getUserRole();
    }, [])

    const getUserRole = async () => {
        let res = await getRole();
        console.log(res);
        if (res && res === "manager") {
            setUserRole(res)
        } else if (res && res === "employee") {
            setUserRole(res)
        } else {
            console.log("cannot get user role");
        }
    }

    return (
        <aside className={cx('wrapper')}>
            {userRole === "manager" ?
                <>
                    <h3 className={cx('title')}>Admin</h3>
                    <Menu>
                        <MenuItem title="Dashboard" to={'/dashboard'} icon={<FontAwesomeIcon icon={faTableColumns} />} activeIcon={<FontAwesomeIcon icon={faTableColumns} />} />
                        <MenuItem title="User" to={'/user'} icon={<FontAwesomeIcon icon={faCircleUser} />} activeIcon={<FontAwesomeIcon icon={faCircleUser} />} />
                    </Menu>
                </>
                :
                <>
                    <h3 className={cx('title')}>Master</h3>
                    <Menu>
                        <MenuItem
                            title="Employee"
                            to={'/employee'}
                            icon={<FontAwesomeIcon icon={faUsers} />}
                            activeIcon={<FontAwesomeIcon icon={faUsers} />}
                        />
                    </Menu>
                </>
            }
            <div className={cx('line-wrapper')}>
                <span className={cx('lines')}></span>
            </div>
            <h3 className={cx('title')}>User</h3>
            <Menu>
                <MenuItem
                    title="Profile"
                    to={'/me'}
                    icon={<FontAwesomeIcon icon={faUser} />}
                    activeIcon={<FontAwesomeIcon icon={faUser} />}
                />
            </Menu>
        </aside>
    );
}

export default Sidebar;