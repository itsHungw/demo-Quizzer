import { useState } from 'react';
import Select from 'react-select';
import { IoMdAddCircle } from "react-icons/io";
import { FaMinusCircle } from "react-icons/fa";
import { FaMinusSquare } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
import './QuestionMange.scss'
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
const QuestionManage = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    },
                ]
            },

        ]

    )
    // console.log('check', questions)

    const handleAddRemoveQuestion = (type, id) => {
        // console.log(type, id)
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    }
                ]
            }

            setQuestions([...questions, newQuestion]);
        }
        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(item => item.id !== id);
            setQuestions(questionClone);
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        // console.log(type, questionId, answerId)
        let questionClone = _.cloneDeep(questions)
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            }
            let index = questionClone.findIndex(item => questionId === item.id)
            // console.log(index)
            questionClone[index].answers.push(newAnswer)
            setQuestions(questionClone)
        }


        if (type === 'REMOVE') {
            let index = questionClone.findIndex(item => questionId === item.id)
            questionClone[index].answers = questionClone[index].answers.filter(item => answerId !== item.id)
            setQuestions(questionClone);
        }
    }


    const handleOnChange = (type, questionId, value) => {
        let questionClone = _.cloneDeep(questions)
        if (type === 'QUESTION') {
            let index = questionClone.findIndex(item => item.id === questionId)
            if (index > -1) {
                questionClone[index].description = value
            }
            setQuestions(questionClone)
        }
    }

    const handleOnChangeFile = (questionId, event) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === questionId)
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionClone[index].imageFile = event.target.files[0]
            questionClone[index].imageName = event.target.files[0].name
            // console.log(event.target.files[0].name)

            setQuestions(questionClone)
        }
    }

    const handleOnChangeAnswer = (type, questionId, answerId, value) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === questionId)
        console.log(type, questionId, answerId, value, index)
        if (index > -1) {
            questionClone[index].answers = questionClone[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value
                    }
                    if (type === 'INPUT') {
                        answer.description = value
                    }
                } return answer
            })
        }
        setQuestions(questionClone)
    }


    const handleSubmitQuestion = () => {
        console.log(questions)
    }
    return (
        <div className="question-container">
            <div className="title">
                Manage Question
            </div>
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label>Select Quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>
                <div className='mt-3'>
                    Add questions:
                </div>

                {questions && questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-4'>
                                <div className='questions-content'>
                                    <div class="form-floating description">
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="name@example.com"
                                            // value={question.description}
                                            onClick={(event) => { handleOnChange('QUESTION', question.id, event.target.value) }}
                                        />
                                        <label >Question {index + 1}'s description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label
                                            htmlFor={`${question.id}`}
                                            className='label-upload'>
                                            <RiImageAddFill className='upload-icon' />

                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            onChange={(event) => { handleOnChangeFile(question.id, event) }}
                                            type={"file"}
                                            hidden />
                                        <span>{question.imageName ? question.imageName : '0 file is upload'}</span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', question.i)}>
                                            <IoMdAddCircle
                                                className='icon-add'
                                            />
                                        </span>
                                        {questions && questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <FaMinusCircle
                                                    className='icon-remove'
                                                />
                                            </span>
                                        }
                                    </div>

                                </div>
                                {question.answers && question.answers.length > 0 &&
                                    question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answers-content'>
                                                <input
                                                    class="form-check-input iscorrect"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleOnChangeAnswer('CHECKBOX', question.id, answer.id, event.target.checked)}
                                                />
                                                <div class="form-floating answer-name">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="name@example.com"
                                                        value={answer.description}
                                                        onChange={(event) => handleOnChangeAnswer('INPUT', question.id, answer.id, event.target.value)}
                                                    />
                                                    <label >Answer {index + 1}</label>
                                                </div>
                                                <div className='btn-groups'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                                                        <MdAddBox
                                                            className='icon-add'
                                                        />
                                                    </span>
                                                    {question.answers && question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                            <FaMinusSquare
                                                                className='icon-remove'
                                                            />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        )
                    })
                }


                <div>
                    <button
                        className='btn btn-primary mt-3'
                        onClick={() => handleSubmitQuestion()}
                    >Save question</button>
                </div>

            </div>
        </div >
    )

}
export default QuestionManage