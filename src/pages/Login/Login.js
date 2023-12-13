import { useState } from "react";

import classNames from "classnames/bind";
import styles from './Login.module.scss';
import LoginModal from "./LoginModal";
import Identify from "./Identify";


const cx = classNames.bind(styles)

function Login() {
    const [isMount, setIsMount] = useState(true);

    return (
        <div className={cx('wrapper')}>
            {isMount ? <LoginModal setIsMount={setIsMount} /> : <Identify />}
        </div>
    );
}

export default Login;