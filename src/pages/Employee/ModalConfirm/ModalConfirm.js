import classNames from "classnames/bind";

import styles from './ModalConfirm.module.scss'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postUserCheckOut } from "~/services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "~/context/UserContext";
import { useContext } from "react";
import { TakeAttendanceContext } from "~/components/TakeAttendance";


const cx = classNames.bind(styles);

const ModalConfirm = (props) => {
    const navigate = useNavigate();

    const { logout, user } = useContext(UserContext);
    const context = useContext(TakeAttendanceContext);

    const { show, handleClose, stop } = props;

    const handleConfirmModal = async () => {
        let res = await postUserCheckOut();
        console.log(res);
        if (res && res === "check out successfully") {
            stop();
            handleClose();
            handleLogOut();
            context.handleShow();
            toast.success("Thank you for today!")
        } else {
            toast.error("Cannot check out!")
        }
    }

    const handleLogOut = () => {
        logout();
        navigate("/login");
    }

    return (
        <>
            <Modal
                className={cx('wrapper')}
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className={cx('title')}>User Check Out</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('body-add-new')}>
                        <h4>Check out now? Make sure you are done with your work!</h4>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmModal()} >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalConfirm;