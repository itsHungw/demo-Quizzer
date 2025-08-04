import ModalCreateUser from "./ModalCreateUser"



const ManageUser = () => {
    return (
        <div className="user-container">
            <div className="manage-user-title">Users management</div>
            <div className="user-content">
                <div className="btn-add-user"><button>Add new user</button></div>
                <div className="users-table">Table</div>
                <ModalCreateUser />
            </div>
        </div>
    )
}

export default ManageUser