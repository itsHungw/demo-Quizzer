import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoMdAddCircle } from "react-icons/io";

function ModalCreateUser() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState("")


    const handleImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            //setPreviewImage("")
        }
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose} size='xl' backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form class="row g-3">
                        <div class="col-md-6">
                            <label for="inputEmail4" class="form-label">Email</label>
                            <input type="email" class="form-control" id="inputEmail4" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div class="col-md-6">
                            <label for="inputPassword4" class="form-label">Password</label>
                            <input type="password" class="form-control" id="inputPassword4" value={password} onChange={(event) => setPassword(event.target.value)} />
                        </div>

                        <div class="col-md-6">
                            <label for="inputCity" class="form-label">User name</label>
                            <input type="text" class="form-control" id="inputCity" value={userName} onChange={(event) => setUserName(event.target.value)} />
                        </div>
                        <div class="col-md-4">
                            <label for="inputState" class="form-label">Role</label>
                            <select id="inputState" class="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
                                <option selected value={'USER'}>
                                    User
                                </option>
                                <option value={'ADMIN'}>Admin</option>
                            </select>
                        </div>

                        <div class="col-md-12 add-file">
                            <label htmlFor='label-upload'><IoMdAddCircle style={{ marginRight: '5px' }} />
                                Upload image file </label>
                            <input type='file' id='label-upload' hidden onChange={(event) => { handleImage(event) }} />
                        </div>

                        <div class="col-md-12 img-space">
                            {previewImage ?
                                <img src={previewImage} />
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

                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser