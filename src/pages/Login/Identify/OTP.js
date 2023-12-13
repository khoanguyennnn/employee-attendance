import { useState, useContext, useEffect } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import classNames from "classnames/bind";
import styles from '../Login.module.scss';
import { postOTP } from "~/services/userService";
import { UserContext } from "~/context/UserContext";

const cx = classNames.bind(styles)

function OTP(props) {
    const { email } = props;
    const navigate = useNavigate();

    const { loginContext } = useContext(UserContext);
    const [OTP, setOTP] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    const handleSubmit = async () => {
        if (!OTP) {
            toast.error("OTP is required!")
            return;
        }
        setShowLoading(true);
        let res = await postOTP(email, OTP.toString());
        if (res && res.accessToken) {
            loginContext(email, res.accessToken);
            navigate("/passwordchange");
        } else if (res && res.status === 400) {
            toast.error(res.data)
        }
        setShowLoading(false);
    }

    return (
        <>
            <div className={cx('title')}>OTP</div>
            <div className={cx('input-holder')}>

                <div className={cx('text')}>Please enter OTP which we sent in your email.</div>
                <input
                    className={cx('input-box')}
                    type="text"
                    placeholder="Enter OTP code"
                    required
                    value={OTP}
                    onChange={(event) => setOTP(event.target.value)}
                />
            </div>
            <button
                className={cx('btn-submit', OTP ? 'active' : '')}
                disabled={OTP ? false : true}
                type="submit"
                onClick={() => handleSubmit()}
            >
                {showLoading && <FontAwesomeIcon icon={faSpinner} spin />}
                &nbsp;Submit
            </button>
        </>
    );
}

export default OTP;