import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";


import styles from './Employee.module.scss';
import { postUserAttendance } from "~/services/userService";
import { toast } from "react-toastify";
import useUnsavedChangesWarn from "~/hooks/useUnsavedChangesWarn";
import { TakeAttendanceContext } from "~/components/TakeAttendance";

const cx = classNames.bind(styles)

function Employee() {
    const context = useContext(TakeAttendanceContext);

    const [time, setTime] = useState({ s: 0, m: 0, h: 0 })
    const [interv, setInterv] = useState();
    const [active, setActive] = useState(false);

    const [isShowModalCheckOut, setIsShowCheckOut] = useState(false);

    const [setDirty, setPristine] = useUnsavedChangesWarn();

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
        <>

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
                                <button
                                    className={cx('btn-checkin')}
                                    onClick={() => {
                                        checkUserAttendance();
                                        setDirty();
                                        context.handleShow();
                                    }
                                    }>
                                    <FontAwesomeIcon className={cx('icon')} icon={faRightToBracket} />
                                </button>
                                <h1 className={cx('title-checkin')}>Check in</h1>
                                <h5 className={cx('title-note')}>(Note that do not reload this site)</h5>
                            </>
                            :
                            <>
                            </>
                        }
                    </div>

                </div>
            </div>
        </>
    );
}

export default Employee;