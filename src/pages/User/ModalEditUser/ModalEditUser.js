import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import Dropdown from 'react-bootstrap/Dropdown';

import styles from './ModalEditUser.module.scss'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateUserEmail, putUpdateUserRole } from "~/services/userService";

const cx = classNames.bind(styles);

const ModalEditUser = (props) => {
    const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
    const [fName, setFName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("employee");
    const [rate, setRate] = useState("12");
    const [roleTitle, setRoleTitle] = useState("Employee");

    const handleRoleTitle = (role) => {
        setRole(role);
        if (role === "employee") {
            setRoleTitle("Employee")
        } else if (role === "manager") {
            setRoleTitle("Manager")
        }
    }

    const handleEditUser = async () => {
        let resEmail = await putUpdateUserEmail(dataUserEdit.email, email)
        let resRole = await putUpdateUserRole(dataUserEdit.email, role)

        if (resEmail === "change email successfully" && resRole === "change Role successfully") {
            handleEditUserFromModal({
                email: email,
                Role: role,
                _id: dataUserEdit._id
            })
            handleClose();
            toast.success("Update user succeed!")
        } else {
            toast.error("Cannot update user!")
        }

    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className={cx('title')}>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('body-add-new')}>
                        <form>
                            <div className={cx("form-group")}>
                                <label className={cx('form-label')}>Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {roleTitle}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleRoleTitle("employee")}>Employee</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleRoleTitle("manager")}>Manager</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditUser;