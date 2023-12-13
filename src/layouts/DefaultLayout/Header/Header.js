import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { Link, useNavigate } from 'react-router-dom';
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from '../../../components/Popper';
import Button from "~/components/Button";
import { useContext, useEffect, useState } from "react";

import styles from './Header.module.scss';
import { toast } from "react-toastify";
import { UserContext } from "~/context/UserContext";
import { fetchUser } from "~/services/userService";

const cx = classNames.bind(styles)

function Header() {
    const navigate = useNavigate();

    const { logout, user } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        let res = await fetchUser();
        if (res && res.length > 0) {
            setUserInfo(res)
        }
    }

    const handleLogOut = () => {
        logout();
        navigate("/login");
        toast.success("Log Out success");
    }

    const handleChangePassword = () => {
        navigate("/passwordchange");
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
                        <Button className={cx('actions-btn')} leftIcon={<FontAwesomeIcon icon={faUser} />} onClick={() => handleChangePassword()}>
                            <p>Change Password</p>
                        </Button>
                        <Button className={cx('actions-btn')} leftIcon={<FontAwesomeIcon icon={faRightFromBracket} />} onClick={handleLogOut}>
                            <p>Log out</p>
                        </Button>
                    </PopperWrapper>
                </div>
            )}
        >
            {user && user.auth &&
                <div className={cx('profile')}>
                    <p className={cx('user-name')}>Welcome {userInfo[0]?.First_name}!</p>
                </div>
            }
        </Tippy>
    </header>);
}

export default Header;