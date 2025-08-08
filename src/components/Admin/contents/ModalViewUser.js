import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoMdAddCircle } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';
import { tab } from '@testing-library/user-event/dist/tab';
import { putUpdateUser } from '../../../service/apiService';
import _ from 'lodash';

function ModalViewUser(props) {
    const { show, setShow, dataUser } = props
    // const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUserName("");

        setImage("");
        setPreviewImage("");

        setEmailError("");
        setPasswordError("");
        setUsernameError("");
    }
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState("")

    useEffect(() => {
        if (!_.isEmpty(dataUser)) {

            setEmail(dataUser.email);
            // setPassword(dataUser.password);
            setUserName(dataUser.username);
            setRole(dataUser.role)
            if (dataUser.image) {

                setPreviewImage(`data:image/jpeg;base64,${dataUser.image}`);
            }

        }
    }, [dataUser])


    const handleImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            //setPreviewImage("")
        }
    }



    // Validate email 
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [usernameError, setUsernameError] = useState("");

    //handle validation email
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        if (!validateEmail(value)) {
            setEmailError("Email is invalid.");
        } else {
            setEmailError("");
        }
    };

    //handle validate password
    const validatePassword = (password) => {
        return (
            // /[A-Z]/.test(password) &&
            // /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            // /[^A-Za-z0-9]/.test(password) &&
            password.length > 4
        )
    }
    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        if (!validatePassword(value)) {
            setPasswordError("Password is invalid");
        } else {
            setPasswordError("");
        }
    };

    //handle validation userName

    const validateUserName = (username) => {
        return username.length > 3
    }
    const handleUserNameChange = (event) => {
        const value = event.target.value;
        setUserName(value);
        if (!validateUserName(value)) {
            setUsernameError('User name must longer than 4 characters!')
        } else {
            setUsernameError("");
        }
    }



    //submit form 
    const handleSubmit = async () => {
        let hasError = false;
        // Validate email
        if (!validateEmail(email)) {
            setEmailError("Email is required.");
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



        let data = await putUpdateUser(dataUser.id, username, role, image)
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

    // console.log('check data ', dataUser)

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false} />
            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>View a user</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                            <input
                                disabled
                                type="email"
                                className={`form-control${emailError ? ' is-invalid' : ''}`}
                                id="inputEmail4"
                                value={email}
                                onChange={handleEmailChange}
                                style={emailError ? { borderColor: 'red' } : {}}
                            />
                            {emailError && <div style={{ color: 'red', fontSize: '13px' }}>{emailError}</div>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">Password</label>
                            <input
                                disabled
                                type="password"
                                className={`form-control${passwordError ? ' is-invalid' : ''}`}
                                id="inputPassword4"
                                value={password}
                                onChange={handlePasswordChange}
                                style={passwordError ? { borderColor: 'red' } : {}}
                            />
                            {passwordError && <div style={{ color: 'red', fontSize: '13px' }}>{passwordError}</div>}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="userName" className="form-label">User name</label>
                            <input
                                disabled

                                type="text"
                                className={`form-control${usernameError ? ' is-invalid' : ''}`}
                                id="userName"
                                value={username}
                                onChange={handleUserNameChange}
                                style={usernameError ? { borderColor: 'red' } : {}}
                            />
                            {usernameError && <div style={{ color: 'red', fontSize: '13px' }}>{usernameError}</div>}
                        </div>
                        <div className="col-md-4">

                            <label htmlFor="role" className="form-label">Role</label>
                            <select
                                id="role"
                                className="form-select"
                                value={role}
                                onChange={(event) => setRole(event.target.value)}
                                disabled>

                                <option value={'USER'}>User</option>
                                <option value={'ADMIN'}>Admin</option>
                            </select>
                        </div>

                        <div className="col-md-12 add-file">
                            <label htmlFor='label-upload' style={{ cursor: 'pointer' }}><IoMdAddCircle style={{ marginRight: '5px' }} />
                                Upload image file </label>
                            <input disabled type='file' id='label-upload' style={{ display: 'none' }} onChange={handleImage} />
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

                    {/* <Button variant="primary" onClick={() => handleSubmit()}>
                        Save
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default ModalViewUser