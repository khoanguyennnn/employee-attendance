import ReactPaginate from 'react-paginate';
import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import { fetchAllUser } from "~/services/userService";
import styles from './User.module.scss';
import Button from "~/components/Button";
import ModalAddNew from "./ModalAddNew";

const cx = classNames.bind(styles)

function User() {

    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const handleClose = () => {
        setIsShowModalAddNew(false);
    }

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers])
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

    return (
        <section className={cx('user')}>
            <div className={cx('user-list')}>
                <div className={cx('title')}>
                    <h1>Users List</h1>
                    <Button outline className={cx('btn-add')}
                        onClick={() => setIsShowModalAddNew(true)}>
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
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers && listUsers.length > 0 &&
                            listUsers.map((value, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        <td>{value.id}</td>
                                        <td>{value.email}</td>
                                        <td>{value.first_name}</td>
                                        <td>{value.last_name}</td>
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
        </section>
    );
}

export default User;