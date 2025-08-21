import { useState } from 'react';
import './QuizManage.scss'
import Select from 'react-select';



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



    const handleFileChange = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            // setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }
    return (
        <div className="quiz-manage-container">
            <div className="title">
                Manage Quizzes
            </div>
            <hr />
            <div className="add-quiz">
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
                            onChange={setQuizType}
                            options={options}
                        />
                    </div>

                    <div className='more-actions form-group'>
                        <label className='mb-1'> Upload image   </label>
                        <input
                            type='file'
                            className='form-control'
                            onChange={(event) => { handleFileChange(event) }} />
                    </div>
                </fieldset>
            </div>
            <div className="quiz-table">
                table
            </div>
        </div>
    )
}

export default QuizzesManage