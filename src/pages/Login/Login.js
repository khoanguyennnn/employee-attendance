import { useState } from "react";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from './Login.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const cx = classNames.bind(styles)

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('title')}>Log in</div>
                <div className={cx('input-holder')}>
                    <div className={cx('text')}>Email</div>
                    <input
                        className={cx('input-box')}
                        type="text"
                        placeholder="Enter Email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <div className={cx('text')}>Password</div>
                    <div className={cx('input-psw')}>
                        <input
                            className={cx('input-box')}
                            type={isShowPassword === true ? "text" : "password"}
                            placeholder="Enter Password"
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <FontAwesomeIcon className={cx('eye-icon')} icon={isShowPassword === true ? faEye : faEyeSlash} onClick={() => setIsShowPassword(!isShowPassword)} />
                    </div>
                </div>
                <button className={cx('btn-submit', email && password ? 'active' : '')} disabled={email && password ? false : true} type="submit">Login</button>

            </div>
        </div>
    );
}

export default Login;