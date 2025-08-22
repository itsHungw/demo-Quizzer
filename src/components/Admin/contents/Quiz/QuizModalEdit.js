
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoMdAddCircle } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';
import { tab } from '@testing-library/user-event/dist/tab';
import _ from 'lodash';
import { putUpdateQuiz } from '../../../../service/apiService';

const QuizModalEdit = (props) => {
    const { show, setShow, dataQuiz, fetchListQuiz } = props

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [type, setType] = useState();
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState()


    const handleImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            //setPreviewImage("")
        }
    }

    useEffect(() => {
        if (!_.isEmpty(dataQuiz)) {

            setName(dataQuiz.name);
            // setPassword(dataUser.password);
            setDescription(dataQuiz.description);
            setType(dataQuiz.difficulty)
            if (dataQuiz.image) {

                setPreviewImage(`data:image/jpeg;base64,${dataQuiz.image}`);
            }

        }
    }, [dataQuiz])

    const [nameError, setNameError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [usernameError, setUsernameError] = useState("");


    const handleClose = () => {
        setShow(false);
        setName("");
        setDescription("");
        setType("EASY");

        setImage("");
        setPreviewImage("");

        setNameError("");
        setDescriptionError("");
        setUsernameError("");
    }
    const handleShow = () => setShow(true);


    const handleEdit = async () => {
        let hasError = false;

        if (!name) {
            setNameError("Email is required.");
            hasError = true;
        }
        // Validate password
        // if (!validatePassword(password)) {
        //     setPasswordError("Password is required.");
        //     hasError = true;
        // }
        // Validate username
        if (!username) {
            setUsernameError("Username is required.");
            hasError = true;
        }
        if (hasError) return;



        let res = await putUpdateQuiz(dataQuiz.id, description, name, type, image)
        console.log('edit', res)
        if (res.EC !== 0) {
            toast.error(res.EM);

        } else {
            setShow(false);
            toast.success(res.EM);
            fetchListQuiz()
        }

    }

    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Edit quiz</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <label htmlFor="inputEmail4" className="form-label">Quiz name</label>
                            <input

                                type="text"
                                className='form-control'
                                // className={`form-control${emailError ? ' is-invalid' : ''}`}
                                id="inputEmail4"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            // style={emailError ? { borderColor: 'red' } : {}}
                            />
                            {/* {emailError && <div style={{ color: 'red', fontSize: '13px' }}>{emailError}</div>} */}
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="inputPassword4" className="form-label">Description</label>
                            <input
                                className='form-control'
                                type="text"
                                // className={`form-control${passwordError ? ' is-invalid' : ''}`}
                                id="inputPassword4"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}

                            // style={passwordError ? { borderColor: 'red' } : {}}
                            />
                            {/* {passwordError && <div style={{ color: 'red', fontSize: '13px' }}>{passwordError}</div>} */}
                        </div>



                        <div className="col-md-12">
                            <label htmlFor="role" className="form-label">Type</label>
                            <select id="role" className="form-select" value={type} onChange={(event) => setType(event.target.value)}>
                                <option value={'EASY'}>Easy</option>
                                <option value={'MEDIUM'}>Medium</option>
                                <option value={'HARD'}>Hard</option>

                            </select>
                        </div>

                        <div className="col-md-12 add-file">
                            <label htmlFor='label-upload' style={{ cursor: 'pointer' }}><IoMdAddCircle style={{ marginRight: '5px' }} />
                                Upload image file </label>
                            <input type='file' id='label-upload' style={{ display: 'none' }} onChange={handleImage} />
                        </div>

                        <div className="col-md-12 img-space">
                            {previewImage ?
                                <img src={previewImage} alt="preview" style={{ maxWidth: '150px', maxHeight: '150px' }} />
                                :
                                <span>Empty Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="primary" onClick={() => handleEdit()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default QuizModalEdit