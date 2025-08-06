import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { use, useState } from "react"
import { IoMdAddCircle } from "react-icons/io";
import TableUser from "./TableUser";
import { useEffect } from "react"
import { getAllUser } from "../../../service/apiService"


const ManageUser = () => {

    const [isShow, setIsShow] = useState(false)
    const [listUser, setListUser] = useState([])


    useEffect(() => {
        fetchListUser()
    })

    const fetchListUser = async () => {
        let res = await getAllUser();
        // console.log(res.DT)
        if (res.EC === 0) {
            setListUser(res.DT);
        }
    }



    return (
        <div className="user-container">
            <div className="manage-user-title">Users management</div>
            <div className="user-content">
                <div className=" btn-add-user"><button className="btn btn-primary" onClick={() => setIsShow(true)}> <IoMdAddCircle />Add new user</button></div>
                <div className="users-table">
                    <TableUser listUser={listUser} />
                </div>
                <ModalCreateUser
                    show={isShow}
                    setShow={setIsShow}
                    fetchListUser={fetchListUser} />
            </div>
        </div>
    )
}

export default ManageUser