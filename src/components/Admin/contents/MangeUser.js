import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { use, useState } from "react"
import { IoMdAddCircle } from "react-icons/io";
import TableUser from "./TableUser";
import { useEffect } from "react"
import { getAllUser } from "../../../service/apiService"
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
import { getListWithPaginate } from "../../../service/apiService";

const ManageUser = () => {

    const LIMIT_USER = 6;

    const [isShow, setIsShow] = useState(false)
    const [listUser, setListUser] = useState([])
    const [isShowUpdate, setShowUpdate] = useState(false)
    const [dataUser, setDataUser] = useState()
    const [dataUpdate, setDataUpdate] = useState()
    const [isShowView, setShowView] = useState(false)
    const [isShowDelete, setShowDelete] = useState(false)
    const [pageCount, setPageCount] = useState(0)



    useEffect(() => {
        // fetchListUser()
        fetchListUserWithPaginate(1)
    }, [dataUser])

    const fetchListUser = async () => {
        let res = await getAllUser();
        // console.log(res.DT)
        if (res.EC === 0) {
            setListUser(res.DT);
        }
    }

    const fetchListUserWithPaginate = async (page) => {
        let res = await getListWithPaginate(page, LIMIT_USER);
        // console.log(res.DT)
        if (res.EC === 0) {
            // console.log(res.DT.totalPages)
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages)
        }
    }

    const handleClickUpdate = (user) => {
        setShowUpdate(true);
        setDataUser(user)
        // console.log(user)
    }

    const handleClickView = (user) => {
        setShowView(true);
        setDataUser(user)
        // console.log(user)
    }

    const handleClickDelete = (user) => {
        setShowDelete(true);
        setDataUser(user)
    }
    return (
        <div className="user-container">
            <div className="manage-user-title">Users management</div>
            <div className="user-content">
                <div className=" btn-add-user">
                    <button
                        className="btn btn-primary"
                        onClick={() => setIsShow(true)}
                    ><IoMdAddCircle />Add new user
                    </button>
                </div>
                {/* <div className="users-table">
                    <TableUser
                        listUser={listUser}
                        setListUser={setListUser}
                        handleClickUpdate={handleClickUpdate}
                        handleClickView={handleClickView}
                        handleClickDelete={handleClickDelete}
                    />
                </div> */}
                <TableUserPaginate
                    listUser={listUser}
                    setListUser={setListUser}
                    handleClickUpdate={handleClickUpdate}
                    handleClickView={handleClickView}
                    handleClickDelete={handleClickDelete}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    pageCount={pageCount}
                />
                <div>

                </div>
                <ModalCreateUser
                    show={isShow}
                    setShow={setIsShow}
                    fetchListUser={fetchListUser} />
                <ModalUpdateUser
                    show={isShowUpdate}
                    setShow={setShowUpdate}
                    dataUser={dataUser}
                    fetchListUser={fetchListUser}
                />
                <ModalViewUser
                    show={isShowView}
                    setShow={setShowView}
                    dataUser={dataUser}
                />

                <ModalDeleteUser
                    show={isShowDelete}
                    setShow={setShowDelete}
                    dataUser={dataUser}
                    fetchListUser={fetchListUser}
                />
            </div>
        </div>
    )
}

export default ManageUser