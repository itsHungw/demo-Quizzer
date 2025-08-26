import { useState, useEffect } from 'react';
import Select from 'react-select';
import { getAllQuiz, getAllUser, postAssignQuiz } from '../../../../service/apiService';
import toast, { Toaster } from 'react-hot-toast';


const AssignUser = () => {
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [listQuiz, setListQuiz] = useState([])

    const [selectedUser, setSelectedUser] = useState({})
    const [listUser, setListUser] = useState([])



    useEffect(() => {
        fetchListQuiz()
        fetchListUser()
    }, [])

    const fetchListQuiz = async () => {
        let res = await getAllQuiz();
        let newQuiz = res.DT.map(item => {
            return {
                value: item.id,
                label: `${item.id} - ${item.description} `
            }
        })
        setListQuiz(newQuiz)
    }

    const fetchListUser = async () => {
        let res = await getAllUser();
        let users = res.DT.map(user => {
            return {
                value: user.id,
                label: `${user.id} - ${user.username} - ${user.email}`
            }
        })
        setListUser(users)
    }

    const handleAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
        console.log(res)
        if (res && res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
    }
    return (
        <>
            <Toaster />
            <div className='row'>
                <div className='col-6 form-group'>
                    <label>Select Quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                        menuPortalTarget={document.body}
                        styles={{
                            menuPortal: base => ({ ...base, zIndex: 9999 })
                        }}
                    />
                </div>

                <div className='col-6 form-group'>
                    <label>Select User:</label>
                    <Select
                        defaultValue={selectedUser}
                        onChange={setSelectedUser}
                        options={listUser}
                        menuPortalTarget={document.body}
                        styles={{
                            menuPortal: base => ({ ...base, zIndex: 9999 })
                        }}
                    />
                </div>
            </div>
            <div>
                <button
                    className='btn btn-warning mt-3'
                    onClick={() => handleAssign()}
                >Assign</button>
            </div>
        </>
    )
}

export default AssignUser