import { useEffect, useState } from "react";
import { faEyeSlash, faEye, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import classNames from "classnames/bind";
import styles from './Login.module.scss';
import { loginApi } from "~/services/userService";


const cx = classNames.bind(styles)

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            navigate('/');
        } else {
            navigate('/login');
        }
    }, []);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email/Password is required!")
            return;
        }
        setShowLoading(true);
        let res = await loginApi(email, password);
        if (res && res.token) {
            localStorage.setItem("token", res.token)
            navigate("/");
        } else {
            // error
            if (res && res.status === 400) {
                toast.error(res.data.error);
            }
        }
        setShowLoading(false);
    }

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
                <button
                    className={cx('btn-submit', email && password ? 'active' : '')}
                    disabled={email && password ? false : true}
                    type="submit"
                    onClick={() => handleLogin()}
                >
                    {showLoading && <FontAwesomeIcon icon={faSpinner} spin />}
                    &nbsp;Login
                </button>

            </div>
        </div>
    );
}

export default Login;