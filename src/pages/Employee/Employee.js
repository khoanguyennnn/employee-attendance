import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import styles from './Employee.module.scss';
import ModalConfirm from "./ModalConfirm";
import { postUserAttendance } from "~/services/userService";
import { toast } from "react-toastify";


const cx = classNames.bind(styles)

function Employee() {
    const [time, setTime] = useState({ s: 0, m: 0, h: 0 })
    const [interv, setInterv] = useState();
    const [active, setActive] = useState(false);

    const [isShowModalCheckOut, setIsShowCheckOut] = useState(false);

    const handleClose = () => {
        setIsShowCheckOut(false);
    }

    const handleShowModal = () => {
        setIsShowCheckOut(true);
    }

    const checkUserAttendance = async () => {
        let res = await postUserAttendance()
        if (res) {
            start();
            toast.success("Take attendance succesfully, enjoy your work!")
        } else {
            toast.error("Cannot take attendance")
        }
    }


    const start = () => {
        setActive(!active);
        run();
        setInterv(setInterval(run, 1000));
    }

    var updateS = time.s, updateM = time.m, updateH = time.h;

    const run = () => {
        updateS++;
        if (updateS === 60) {
            updateM++;
            updateS = 0;
            if (updateM === 60) {
                updateH++;
                updateM = 0;
            }
        }
        return setTime({ s: updateS, m: updateM, h: updateH })
    }

    const stop = () => {
        clearInterval(interv);
        setActive(!active);
        setTime({ s: 0, m: 0, h: 0 });
    }

    return (
        <div className={cx('wrapper')}>
            <h1>Check Attendance</h1>
            <div className={cx('content')}>
                <div className={cx('time-count')}>
                    <h1 className={cx('title')}>Timer</h1>
                    <h1 className={cx('time-setter')}>{time.h < 10 ? "0" + time.h : time.h} : {time.m < 10 ? "0" + time.m : time.m} : {time.s < 10 ? "0" + time.s : time.s}</h1>
                </div>
                <div className={cx('take-attendance')}>
                    {!active ?
                        <>
                            <button className={cx('btn-checkin')} onClick={() => checkUserAttendance()}><FontAwesomeIcon className={cx('icon')} icon={faRightToBracket} /></button>
                            <h1 className={cx('title-checkin')}>Check in</h1>
                        </>
                        :
                        <>
                            <button className={cx('btn-checkout')} onClick={() => handleShowModal()}><FontAwesomeIcon className={cx('icon')} icon={faRightFromBracket} /></button>
                            <h1 className={cx('title-checkin')}>Check out</h1>
                        </>
                    }
                </div>

            </div>
            <ModalConfirm
                show={isShowModalCheckOut}
                handleClose={handleClose}
                stop={stop}
            />
        </div>
    );
}

export default Employee;