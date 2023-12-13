import classNames from "classnames/bind";
import { useState } from "react";
import { toast } from 'react-toastify';
import Dropdown from 'react-bootstrap/Dropdown';

import styles from './ModalAddNew.module.scss'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from "~/services/userService";

const cx = classNames.bind(styles);

const ModalAddNew = (props) => {
    const { show, handleClose, handleUpdateTable } = props;
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [rate, setRate] = useState("12");
    const [roleTitle, setRoleTitle] = useState("Choose a role");
    const [active, setActive] = useState(false);

    const handleCloseUser = () => {
        handleClose();
        setFName('');
        setEmail('');
        setLName('');
        setPassword('');
        setRole('');
        setRoleTitle('Choose a role');
    }

    const handleRoleTitle = (role) => {
        setRole(role);
        if (role === "employee") {
            setActive(true);
            setRoleTitle("Employee")
        } else if (role === "manager") {
            setActive(false)
            setRoleTitle("Manager")
        }
    }

    const handleSaveUser = async () => {
        let res = await postCreateUser(email, password, role, rate, fName, lName, active);
        if (res && res === "data saved succesfully") {
            //succeed
            handleClose();
            setFName('');
            setEmail('');
            setLName('');
            setPassword('');
            setRole('');
            toast.success("A user is created succeed!");
            handleUpdateTable({
                email: email,
                password: password,
                Role: role,
                Rate: rate,
                First_name: fName,
                Last_name: lName
            });
        } else {
            // error
            toast.error("An error...")
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
                    <Modal.Title className={cx('title')}>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('body-add-new')}>
                        <form>
                            <div className={cx("form-group")}>
                                <label className='form-label'>First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter First Name"
                                    value={fName}
                                    onChange={(event) => setFName(event.target.value)}
                                />
                            </div>
                            <div className={cx("form-group")}>
                                <label className='form-label'>Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Last Name"
                                    value={lName}
                                    onChange={(event) => setLName(event.target.value)}
                                />
                            </div>
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
                            <div className={cx("form-group")}>
                                <label className={cx('form-label')}>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
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
                    <Button variant="secondary" onClick={handleCloseUser}>
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