import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../service/apiService';
import toast, { Toaster } from 'react-hot-toast';


const ModalDeleteUser = (props) => {
    // const [show, setShow] = useState(false);
    const { show, setShow, dataUser } = props

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async () => {
        let data = await deleteUser(dataUser && dataUser.id ? dataUser.id : "")
        // console.log('Componetn', data);

        if (data.EC !== 0) {
            toast.error(data.EM);
        }
        else {
            toast.success(data.EM)
            handleClose();
            await props.fetchListUser()
        }
    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}
            <Toaster
                position="top-right"
                reverseOrder={false} />
            <Modal
                show={show}
                onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>DELETE</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete user <b>{dataUser && dataUser.username ? dataUser.username : ""}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;