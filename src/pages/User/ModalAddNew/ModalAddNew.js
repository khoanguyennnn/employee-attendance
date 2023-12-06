import classNames from "classnames/bind";
import { useState } from "react";
import { toast } from 'react-toastify';

import styles from './ModalAddNew.module.scss'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from "~/services/userService";

const cx = classNames.bind(styles);

const ModalAddNew = (props) => {
    const { show, handleClose, handleUpdateTable } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job);

        if (res && res.id) {
            //succeed
            handleClose();
            setName('');
            setJob('');
            toast.success("A user is created succeed!");
            handleUpdateTable({ first_name: name, id: res.id });
        } else {
            // error
            toast.error("An error...")
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className={cx('title')}>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('body-add-new')}>
                        <form>
                            <div className={cx("form-group")}>
                                <label className='form-label'>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>
                            <div className={cx("form-group")}>
                                <label className={cx('form-label')}>Job</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Job"
                                    value={job}
                                    onChange={(event) => setJob(event.target.value)}
                                />
                            </div>

                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddNew;