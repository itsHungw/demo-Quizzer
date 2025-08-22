import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { deleteUser } from '../../../service/apiService';
import toast, { Toaster } from 'react-hot-toast';
import { deleteQuiz } from '../../../../service/apiService';


const QuizModalDelete = (props) => {

    const { show, setShow, dataQuiz, handleDelete } = props

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
                    <Modal.Title>DELETE</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete QUIZ: <b>{dataQuiz && dataQuiz.name ? dataQuiz.name : ""}</b>
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

export default QuizModalDelete;