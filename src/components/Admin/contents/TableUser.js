import { useEffect, useState } from "react"
import axios from "axios"
import { getAllUser } from "../../../service/apiService"
const TableUser = (props) => {
    const [listUser, setListUser] = useState([

    ])

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
        <>
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">User name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>


                <tbody>
                    {listUser.length > 0 && listUser &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <th>{item.id}</th>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-info">View</button>
                                        <button className="btn btn-warning mx-3">Update</button>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    {listUser && listUser.length === 0 &&
                        <tr>
                            <td colSpan={'4'} style={{ textAlign: 'center' }}>Not found</td>
                        </tr>}
                </tbody>
            </table>
        </>

    )
}

export default TableUser