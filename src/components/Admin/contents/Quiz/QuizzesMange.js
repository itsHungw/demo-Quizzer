import { useEffect, useState } from 'react';
import './QuizManage.scss'
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';
import QuizTable from './QuizTable';
import { deleteQuiz, getAllQuiz, postAddNewQuiz, putUpdateQuiz } from '../../../../service/apiService';
import QuizModalDelete from './QuizModalDelete';
import QuizModalEdit from './QuizModalEdit';
import Accordion from 'react-bootstrap/Accordion';
import UpdateQAQuiz from './UpdateQAQuiz';
import AssignUser from './AssignUser';



const QuizzesManage = () => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];

    const [quizName, setQuizName] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [quizType, setQuizType] = useState('EASY');
    const [image, setImage] = useState(null)
    const [dataQuiz, setDataQuiz] = useState()
    const [listQuiz, setListQuiz] = useState([]);
    const [isShowDelete, setShowDelete] = useState(false)
    const [isShowEdit, setShowEdit] = useState(false)



    useEffect(() => {
        fetchListQuiz()
    }, [])

    const fetchListQuiz = async () => {
        let res = await getAllQuiz();
        console.log('quiz', res)
        setListQuiz(res.DT)
    }


    const handleClickDelete = (quiz) => {
        setDataQuiz(quiz);
        // console.log("del", quiz.id)
        setShowDelete(true)

    }

    const handleClickEdit = (quiz) => {
        setDataQuiz(quiz);
        // console.log("del", quiz.id)
        setShowEdit(true)

    }
    const handleFileChange = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            // setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }



    const handleDelete = async () => {
        let res = await deleteQuiz(dataQuiz.id)
        if (res.EC < 0) {
            toast.error(res.EM);
        } else {
            toast.success(res.EM)
            setShowDelete(false)
            await fetchListQuiz()
        }
    }

    const handleSubmitQuiz = async () => {
        if (!quizName || !quizDescription) {
            toast.error("Quiz name and description are required!");
            return
        }
        let resp = await postAddNewQuiz(quizDescription, quizName, quizType?.value, image)
        console.log(resp)

        if (resp.EC < 0) {
            toast.error(resp.EM);
        }
        else {
            toast.success(resp.EM)
            setQuizName('')
            setQuizDescription('')
            setImage('')
            setQuizType('EASY')
            await fetchListQuiz()

        }
    }
    return (
        <div className="quiz-manage-container">
            <Toaster
                position="top-center"
                reverseOrder={false} />
            <div className="title">
                Manage Quizzes
            </div>
            <hr />
            <div className="add-quiz">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Add your new Quiz</Accordion.Header>
                        <Accordion.Body>
                            <fieldset className="border p-2">
                                <legend className="float-none w-auto p-2">Add new quiz</legend>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Quiz name"
                                        value={quizName}
                                        onChange={(event) => { setQuizName(event.target.value) }} />
                                    <label for="floatingInput">Quiz name</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text"
                                        class="form-control"
                                        placeholder="Description"
                                        value={quizDescription}
                                        onChange={(event) => { setQuizDescription(event.target.value) }} />
                                    <label for="floatingPassword">Description</label>
                                </div>
                                <div className='select-type my-3'>
                                    <Select
                                        value={quizType}
                                        defaultValue={quizType}
                                        onChange={setQuizType}
                                        options={options}
                                        placeholder={'Quiz type...'}
                                    />
                                </div>

                                <div className='more-actions form-group'>
                                    <label className='mb-1'> Upload image   </label>
                                    <input
                                        type='file'
                                        className='form-control'
                                        onChange={(event) => { handleFileChange(event) }} />
                                </div>
                                <div>
                                    <button
                                        className='btn btn-warning mt-3'
                                        onClick={() => handleSubmitQuiz()}
                                    >Save
                                    </button>
                                </div>
                            </fieldset>
                            <div className="quiz-table">
                                <QuizTable
                                    handleClickEdit={handleClickEdit}
                                    handleClickDelete={handleClickDelete}
                                    dataQuiz={dataQuiz}
                                    listQuiz={listQuiz}
                                />
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
                        <Accordion.Body>
                            <UpdateQAQuiz />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Assign to user</Accordion.Header>
                        <Accordion.Body>
                            <AssignUser />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>


            <QuizModalDelete
                show={isShowDelete}
                setShow={setShowDelete}
                dataQuiz={dataQuiz}
                handleDelete={handleDelete}
            />

            <QuizModalEdit
                show={isShowEdit}
                setShow={setShowEdit}
                dataQuiz={dataQuiz}
                fetchListQuiz={fetchListQuiz}
            />
        </div>
    )
}

export default QuizzesManage