import classNames from "classnames/bind";
import styles from './Home.module.scss';

const cx = classNames.bind(styles)

function Home() {

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h2 className={cx('welcome-title')}>Welcome to Employee Attendance Management System!</h2>
            </div>

        </div>
    );
}

export default Home;