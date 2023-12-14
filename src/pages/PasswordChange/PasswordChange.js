import classNames from "classnames/bind";
import styles from './PasswordChange.module.scss';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { fetchUser, postUserPassword } from "~/services/userService";
import Button from "~/components/Button";
import { UserContext } from "~/context/UserContext";

const cx = classNames.bind(styles)

function PasswordChange() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        getUser(1);
    }, [])

    const getUser = async () => {
        let res = await fetchUser(user.email);

        if (res && res.length > 0) {
            setUserInfo(res[0])
        }
    }


    const [showLoading, setShowLoading] = useState(false);
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        if (!password) {
            toast.error("Email/Password is required!")
            return;
        }
        setShowLoading(true);
        let res = await postUserPassword(userInfo.email, password);
        if (res && res === "change password successfully") {
            toast.success("Change password successfully!")
            navigate("/");
        } else {
            // error
            if (res && res.status === 404) {
                toast.error("There are some problems!");
            }
        }
        setShowLoading(false);
    }


    return (
        <div className={cx('content')}>
            <div className={cx('title')}>Reset your password</div>
            <div className={cx('input-holder')}>
                <div className={cx('input-psw')}>
                    <div className={cx('text')}>Enter New Password</div>
                    <input
                        className={cx('input-box')}
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>
            </div>
            <Button className={cx('btn-submit')} onClick={() => handleSubmit()} outline>
                {showLoading && <FontAwesomeIcon icon={faSpinner} spin />}
                Submit
            </Button>

        </div>
    );
}

export default PasswordChange;