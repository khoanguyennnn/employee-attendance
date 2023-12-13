import { useEffect, useState } from "react";
import { faEyeSlash, faEye, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import classNames from "classnames/bind";
import styles from '../Login.module.scss';
import { loginApi } from "~/services/userService";
import { UserContext } from "~/context/UserContext";

const cx = classNames.bind(styles)

function LoginModal(props) {
    const { setIsMount } = props;
    const navigate = useNavigate();
    const { loginContext } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("accessToken");
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
        if (res && res.accessToken) {
            loginContext(email, res.accessToken);
            navigate("/");
        } else {
            // error
            if (res && res.status === 404) {
                toast.error(res.data.message);
            }
        }
        setShowLoading(false);
    }

    return (
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
                <p onClick={() => setIsMount(false)}>Forgot password?</p>
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
    );
}

export default LoginModal;