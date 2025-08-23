import { useState } from 'react';
import Select from 'react-select';
import { IoMdAddCircle } from "react-icons/io";
import { FaMinusCircle } from "react-icons/fa";
import { FaMinusSquare } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
const QuestionManage = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({})
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
                <div>
                    <div className='questions-content'>
                        <div class="form-floating description">
                            <input type="text" class="form-control" placeholder="name@example.com" />
                            <label >Description</label>
                        </div>
                        <div className='group-upload'>
                            <label className='label-upload'>Upload Image</label>
                            <input type={"file"} hidden />
                            <span>0 file is upload</span>
                        </div>
                        <div className='btn-add'>
                            <span>
                                <IoMdAddCircle
                                    className='icon-add'
                                />
                            </span>
                            <span>
                                <FaMinusCircle
                                    className='icon-remove'
                                />
                            </span>

                        </div>

                    </div>
                    <div className='answers-content'>
                        <input
                            class="form-check-input"
                            type="checkbox"
                        />
                        <div class="form-floating description">
                            <input type="text" class="form-control" placeholder="name@example.com" />
                            <label >Answer 1</label>
                        </div>
                        <div className='btn-add'>
                            <span>
                                <MdAddBox
                                    className='icon-add'
                                />
                            </span>
                            <span>
                                <FaMinusSquare
                                    className='icon-remove'
                                />
                            </span>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default QuestionManage