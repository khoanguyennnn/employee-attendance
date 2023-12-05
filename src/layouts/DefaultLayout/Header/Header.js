import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

const cx = classNames.bind(styles)

function Header() {
    return (<header className={cx('wrapper')}>
        <Link className={cx('logo')} to={`/`}>
            <FontAwesomeIcon className={cx('user-logo')} icon={faUser} />
            <h2 className={cx('title-logo')}>E.A.S</h2>
        </Link>
        <div className={cx('profile')}>
            <img
                className={cx('user-avatar')}
                src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/0957415902a09a46a68940814166f5ca~c5_100x100.jpeg?x-expires=1701964800&x-signature=N0U0fS%2Fx6AwFxcu8qr%2FmCj2DPGg%3D"
                alt=""
            />
            <p>Nguyen Van A</p>
        </div>
    </header>);
}

export default Header;