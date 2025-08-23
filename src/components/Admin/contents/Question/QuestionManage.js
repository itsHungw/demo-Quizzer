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
                description: 'question 1',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: 'answer 1',
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
                                            value={question.description}
                                        />
                                        <label >Question {index + 1}'s description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label className='label-upload'>
                                            <RiImageAddFill className='upload-icon' />
                                            Upload Image
                                        </label>
                                        <input type={"file"} hidden />
                                        <span>0 file is upload</span>
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
                                                />
                                                <div class="form-floating answer-name">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="name@example.com"
                                                        value={answer.description}

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




            </div>
        </div >
    )

}
export default QuestionManage