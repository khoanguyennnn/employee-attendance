import ReactPaginate from 'react-paginate';
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Button as Btn } from 'react-bootstrap';
import _ from "lodash";
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

import { fetchAllUser } from "~/services/userService";
import styles from './User.module.scss';
import Button from "~/components/Button";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';

const cx = classNames.bind(styles)

function User() {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);

    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers])
    }

    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        let index = listUsers.findIndex(item => item._id === user._id);

        cloneListUsers[index].email = user.email;
        cloneListUsers[index].Role = user.Role;
        setListUsers(cloneListUsers);
    }

    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = cloneListUsers.filter(item => item.email !== user.email);
        setListUsers(cloneListUsers);
    }

    useEffect(() => {
        getUsers(1);
    }, [])


    const getUsers = async () => {
        let res = await fetchAllUser();
        if (res) {
            setListUsers(res)
        }
    }



    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    }

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    }

    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);

        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy])
        setListUsers(cloneListUsers);
    }

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListUsers = _.cloneDeep(listUsers);
            cloneListUsers = cloneListUsers.filter(item => item.email.includes(term));
            setListUsers(cloneListUsers);
        } else {
            getUsers(1);
        }
    }, 300)

    return (
        <section className={cx('user')}>
            <div className={cx('user-list')}>
                <div className={cx('title')}>
                    <h1>Users List</h1>
                    <Button
                        outline
                        className={cx('btn-add')}
                        onClick={() => setIsShowModalAddNew(true)}
                    >
                        Add new user
                    </Button>
                </div>
                <div className='my-3'>
                    <input
                        className={cx('form-control')}
                        placeholder={"Search user by email"}
                        onChange={(event) => handleSearch(event)}
                    />
                </div>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <td>
                                <div className={cx('sort-header')}>
                                    <span>Role</span>
                                </div>
                            </td>
                            <td>Email</td>
                            <td>
                                <div className={cx('sort-header')}>
                                    <span>First Name</span>
                                    <span className={cx('sort-icon')}>
                                        {sortBy === "asc" ?
                                            <FontAwesomeIcon onClick={() => handleSort("desc", "First_name")} icon={faSortDown} />
                                            : <FontAwesomeIcon onClick={() => handleSort("asc", "First_name")} icon={faSortUp} />
                                        }
                                    </span>
                                </div>
                            </td>
                            <td>Last Name</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody className={cx('table-body')}>
                        {listUsers.map((value, index) => {
                            return (
                                <tr key={`users-${index}`}>
                                    <td>
                                        {value.Role}
                                    </td>
                                    <td>{value.email}</td>
                                    <td>{value.First_name}</td>
                                    <td>{value.Last_name}</td>
                                    <td>
                                        <Btn
                                            variant="warning"
                                            className={cx('btn-edit')}
                                            onClick={() => handleEditUser(value)}
                                        >
                                            Edit
                                        </Btn>
                                        <Btn
                                            variant="danger"
                                            className={cx('btn-delete')}
                                            onClick={() => handleDeleteUser(value)}
                                        >
                                            Delete
                                        </Btn>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                renderOnZeroPageCount={null}
                containerClassName={cx('pagination')}
                pageLinkClassName={cx('page-num')}
                previousLinkClassName={cx('page-num')}
                nextLinkClassName={cx('page-num')}
                activeLinkClassName={cx('active')}
            />
            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />
            <ModalEditUser
                show={isShowModalEdit}
                handleClose={handleClose}
                dataUserEdit={dataUserEdit}
                handleEditUserFromModal={handleEditUserFromModal}
            />
            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />
        </section>
    );
}

export default User;