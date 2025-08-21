import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { deleteUser } from '../../../service/apiService';
// import toast, { Toaster } from 'react-hot-toast';


const ModalResult = (props) => {
    // const [show, setShow] = useState(false);
    const { show, setShow, dataUser } = props

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}
            {/* <Toaster
                position="top-right"
                reverseOrder={false} /> */}
            <Modal
                show={show}
                onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your result...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total correct answer: { }</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;