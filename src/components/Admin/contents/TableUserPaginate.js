import { useState, useEffect } from "react"
import axios from "axios"
import { getAllUser } from "../../../service/apiService"
import ReactPaginate from "react-paginate";


const TableUserPaginate = (props) => {
    // const [listUser, setListUser] = useState([])
    const { listUser, pageCount } = props
    // const [pageCount, setPageCount] = useState(10);


    const handlePageClick = (event) => {
        props.fetchListUserWithPaginate(+event.selected + 1)
        console.log(`User requested page number ${event.selected}`);
    };

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
                                        <button className="btn btn-info" onClick={() => props.handleClickView(item)}>View</button>
                                        <button className="btn btn-warning mx-3" onClick={() => props.handleClickUpdate(item)}>Update</button>
                                        <button className="btn btn-danger" onClick={() => props.handleClickDelete(item)}>Delete</button>
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
            <div className="paginate d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>

        </>

    )
}

export default TableUserPaginate