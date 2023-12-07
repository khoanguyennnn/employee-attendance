import ReactPaginate from 'react-paginate';
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Button as Btn } from 'react-bootstrap';
import _ from "lodash";

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
        let index = listUsers.findIndex(item => item.id === user.id);

        cloneListUsers[index].first_name = user.first_name;
        setListUsers(cloneListUsers);
    }

    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);
        setListUsers(cloneListUsers);
    }

    useEffect(() => {
        getUsers(1);
    }, [])


    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            setTotalUsers(res.total)
            setTotalPages(res.total_pages)
            setListUsers(res.data)
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
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Email</td>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody className={cx('table-body')}>
                        {listUsers && listUsers.length > 0 &&
                            listUsers.map((value, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        <td>{value.id}</td>
                                        <td>{value.email}</td>
                                        <td>{value.first_name}</td>
                                        <td>{value.last_name}</td>
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