import classNames from 'classnames/bind';
import { useContext, useEffect } from 'react';
import styles from './TakeAttendance.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

import useUnsavedChangesWarn from '~/hooks/useUnsavedChangesWarn';
import { TakeAttendanceContext } from './TakeAttendance';
import ModalConfirm from '~/pages/Employee/ModalConfirm';

const cx = classNames.bind(styles);

function TakeAttendanceModal() {
    const context = useContext(TakeAttendanceContext);

    const [time, setTime] = useState({ s: 0, m: 0, h: 0 })
    const [interv, setInterv] = useState();
    const [active, setActive] = useState(false);

    const [setDirty, setPristine] = useUnsavedChangesWarn();

    const [isShowModalCheckOut, setIsShowCheckOut] = useState(false);

    const stop = () => {
        clearInterval(interv);
        setActive(!active);
        setTime({ s: 0, m: 0, h: 0 });
    }

    const handleClose = () => {
        setIsShowCheckOut(false);
    }

    const handleShowModal = () => {
        setIsShowCheckOut(true);
    }

    return (
        <>
            <div className={cx('modal-mask')}>
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        <div className={cx('inner')}>
                            <div className={cx('take-attendance')}>
                                <>
                                    <button
                                        className={cx('btn-checkout')}
                                        onClick={() => {
                                            handleShowModal();
                                            setPristine();
                                        }}
                                    >
                                        <FontAwesomeIcon className={cx('icon')} icon={faRightFromBracket} />
                                    </button>
                                    <h1 className={cx('title-checkin')}>Check out</h1>
                                    <h5 className={cx('title-note')}>(Note that do not reload this site when timer is setted)</h5>
                                </>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalConfirm
                show={isShowModalCheckOut}
                handleClose={handleClose}
                stop={stop}
            />
        </>
    );
}

export default TakeAttendanceModal;