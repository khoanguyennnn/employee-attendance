import classNames from "classnames/bind";
import styles from './Login.module.scss'

const cx = classNames.bind(styles)

function Login() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('title')}>Log in</div>
                <div className={cx('input-holder')}>
                    <div className={cx('text')}>Email</div>
                    <input className={cx('input-box')} type="text" placeholder="Enter Username" required />
                    <div className={cx('text')}>Password</div>
                    <input className={cx('input-box')} type="password" placeholder="Enter Password" required />
                </div>
                <button className={cx('btn-submit')} type="submit">Login</button>

            </div>
        </div>
    );
}

export default Login;