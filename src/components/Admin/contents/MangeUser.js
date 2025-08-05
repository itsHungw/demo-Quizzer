import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { use, useState } from "react"


const ManageUser = () => {

    const [isShow, setIsShow] = useState(false)
    return (
        <div className="user-container">
            <div className="manage-user-title">Users management</div>
            <div className="user-content">
                <div className="btn-add-user"><button onClick={() => setIsShow(true)}>Add new user</button></div>
                <div className="users-table">Table</div>
                <ModalCreateUser show={isShow} setShow={setIsShow} />
            </div>
        </div>
    )
}

export default ManageUser