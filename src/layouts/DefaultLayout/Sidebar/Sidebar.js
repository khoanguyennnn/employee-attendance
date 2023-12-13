import classNames from "classnames/bind";
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faTableColumns, faUsers } from "@fortawesome/free-solid-svg-icons";


const cx = classNames.bind(styles)

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <h3 className={cx('title')}>Admin</h3>
            <Menu>
                <MenuItem title="Dashboard" to={'/dashboard'} icon={<FontAwesomeIcon icon={faTableColumns} />} activeIcon={<FontAwesomeIcon icon={faTableColumns} />} />
                <MenuItem title="User" to={'/user'} icon={<FontAwesomeIcon icon={faCircleUser} />} activeIcon={<FontAwesomeIcon icon={faCircleUser} />} />
            </Menu>
            <div className={cx('line-wrapper')}>
                <span className={cx('lines')}></span>
            </div>
            <h3 className={cx('title')}>Master</h3>
            <Menu>
                <MenuItem
                    title="Employee"
                    to={'/employee'}
                    icon={<FontAwesomeIcon icon={faUsers} />}
                    activeIcon={<FontAwesomeIcon icon={faUsers} />}
                />
            </Menu>
        </aside>
    );
}

export default Sidebar;