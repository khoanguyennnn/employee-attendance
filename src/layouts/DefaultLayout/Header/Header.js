import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { Link, useNavigate } from 'react-router-dom';
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from '../../../components/Popper';
import Button from "~/components/Button";
import { useContext } from "react";

import styles from './Header.module.scss';
import { toast } from "react-toastify";
import { UserContext } from "~/context/UserContext";

const cx = classNames.bind(styles)

function Header() {
    const { logout } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogOut = () => {
        logout();
        navigate("/login");
        toast.success("Log Out success");
    }

    return (<header className={cx('wrapper')}>
        <Link className={cx('logo')} to={`/`}>
            <FontAwesomeIcon className={cx('user-logo')} icon={faUserCheck} />
            <h2 className={cx('title-logo')}>E.A.S</h2>
        </Link>
        <Tippy
            interactive
            placement="bottom"
            delay={[0, 700]}
            render={(attrs) => (
                <div className={cx('actions')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        <Button className={cx('actions-btn')} leftIcon={<FontAwesomeIcon icon={faUser} />}>
                            <p>View Profile</p>
                        </Button>
                        <Button className={cx('actions-btn')} leftIcon={<FontAwesomeIcon icon={faRightFromBracket} />} onClick={() => handleLogOut()}>
                            <p>Log out</p>
                        </Button>
                    </PopperWrapper>
                </div>
            )}
        >
            <div className={cx('profile')}>
                <img
                    className={cx('user-avatar')}
                    src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/0957415902a09a46a68940814166f5ca~c5_100x100.jpeg?x-expires=1701964800&x-signature=N0U0fS%2Fx6AwFxcu8qr%2FmCj2DPGg%3D"
                    alt=""
                />
                <p className={cx('user-name')}>Nguyen Van A</p>
            </div>
        </Tippy>
    </header>);
}

export default Header;