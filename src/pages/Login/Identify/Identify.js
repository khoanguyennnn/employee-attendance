import { useState } from "react";

import classNames from "classnames/bind";
import styles from '../Login.module.scss';
import InputEmail from "./InputEmail";
import OTP from "./OTP";

const cx = classNames.bind(styles)

function Identify() {
    const [isMount, setIsMount] = useState(true)
    const [cloneEmail, setCloneEmail] = useState('');

    return (

        <div className={cx('content')}>
            {isMount ? <InputEmail setIsMount={setIsMount} setCloneEmail={setCloneEmail} /> : <OTP email={cloneEmail} />}
            <a href="/login">Back</a>
        </div >
    );
}

export default Identify;