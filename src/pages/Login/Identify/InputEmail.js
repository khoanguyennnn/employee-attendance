import { useState } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from 'react-toastify';

import classNames from "classnames/bind";
import styles from '~/pages/Login/Login.module.scss';
import { postForgot } from "~/services/userService";

const cx = classNames.bind(styles)

function InputEmail(props) {
    const { setIsMount, setCloneEmail } = props

    const [email, setEmail] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email) {
            toast.error("Email is required!")
            return;
        }
        setShowLoading(true);
        let res = await postForgot(email);
        if (res === "auth data saved successfully") {
            setCloneEmail(email);
            setEmail('');
            setIsMount(false);
        } else {
            //error
            toast.error("Your email is not found")
        }
        setShowLoading(false);
    }

    return (
        <>
            <div className={cx('title')}>Reset password</div>
            <div className={cx('input-holder')}>

                <div className={cx('text')}>Please enter your email address or mobile number to search for your account.</div>
                <input
                    className={cx('input-box')}
                    type="text"
                    placeholder="Enter Email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <button
                className={cx('btn-submit', email ? 'active' : '')}
                disabled={email ? false : true}
                type="submit"
                onClick={() => handleSubmit()}
            >
                {showLoading && <FontAwesomeIcon icon={faSpinner} spin />}
                &nbsp;Submit
            </button>
        </>
    );
}

export default InputEmail;