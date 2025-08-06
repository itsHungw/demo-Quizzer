import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { use, useState } from "react"
import { IoMdAddCircle } from "react-icons/io";
import TableUser from "./TableUser";


const ManageUser = () => {

    const [isShow, setIsShow] = useState(false)
    return (
        <div className="user-container">
            <div className="manage-user-title">Users management</div>
            <div className="user-content">
                <div className=" btn-add-user"><button className="btn btn-primary" onClick={() => setIsShow(true)}> <IoMdAddCircle />Add new user</button></div>
                <div className="users-table">
                    <TableUser />
                </div>
                <ModalCreateUser show={isShow} setShow={setIsShow} />
            </div>
        </div>
    )
}

export default ManageUser