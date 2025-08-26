import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom"
import { getQuizById, postSubmitQuiz } from "../../service/apiService";
import _ from "lodash";
import { data } from "autoprefixer";
import './DetailQuiz.scss'
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./RightContent/RightContent";

const DetailQuiz = (props) => {
    const params = useParams()
    const location = useLocation();
    // console.log(location)
    const quizId = params.id;
    const [dataQuiz, setDataQuiz] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [isShowModal, setIsShowModal] = useState(false)
    const [res, setRes] = useState({})

    const handlePrev = () => {
        if (currentIndex - 1 < 0) return;
        setCurrentIndex(+currentIndex - 1)
        console.log(currentIndex)
    }

    const handleNext = () => {
        if (currentIndex + 1 < dataQuiz.length)
            setCurrentIndex(+currentIndex + 1)
        console.log(currentIndex)


    }


    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz)
        let question = dataQuizClone.find(item => +questionId === +item.questionId)
        if (question && question.answer) {
            // console.log('questo', question.answer)
            let b = question.answer.map(item => {
                if (+answerId === +item.id) {
                    item.isSelected = !item.isSelected;
                }
                return item
            })
            // console.log('new', b)
            question.answer = b;
        }
        let index = dataQuizClone.findIndex(item => +questionId === +item.questionId)
        if (index > -1) {
            dataQuiz[index] = question
            setDataQuiz(dataQuizClone)
        }
        console.log(dataQuiz)
    }
    useEffect(() => {
        fetchQuiz()
    }, [quizId])

    const fetchQuiz = async () => {
        let res = await getQuizById(quizId);

        // console.log('res ', res)
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answer = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image
                        }
                        item.answers.isSelected = false;
                        answer.push(item.answers);
                        // console.log('answer', item.answers)
                    })
                    return { questionId: key, answer, questionDescription, image }
                })
                .value();
            // console.log('data', data)
            setDataQuiz(data)

            // console.log('check data', data.answers.isSelected)
        }
    }


    const handleSubmit = async () => {

        //         {
        //     "quizId": 1,
        //     "answers": [
        //         { 
        //             "questionId": 1,
        //             "userAnswerId": [3]
        //         },
        //         { 
        //             "questionId": 2,
        //             "userAnswerId": [6]
        //         }
        //     ]
        // }

        // console.log('dataquiz', dataQuiz)

        let payload = {
            quizId: +quizId,
            answers: []
        }

        let answers = []
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(item => {
                let questionId = item.questionId;
                let userAnswerId = [];

                item.answer.forEach(a => {
                    if (a.isSelected)
                        userAnswerId.push(a.id)
                })

                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })


            })
            payload.answers = answers;

            console.log(payload)
            let res = await postSubmitQuiz(payload);
            console.log(res)
            setRes({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal
            })
        }
        setIsShowModal(true)
    }


    return (
        <div className="detail-quiz-container">

            <div className="left-content">
                <div className="quiz-title">
                    Quiz {quizId}:  {location?.state?.description}
                </div>

                <div className="quiz-body">
                    {dataQuiz[currentIndex] && dataQuiz[currentIndex].image
                        ?
                        <img src={`data:image/png;base64,${dataQuiz[currentIndex].image}`} className="card-img-top" alt="..." />
                        : ''
                    }
                </div>

                <div className="quiz-content">
                    <Question
                        index={currentIndex}
                        handleCheckBox={handleCheckBox}

                        // answer={data.answers.isSelected}
                        data={
                            dataQuiz && dataQuiz.length > 0
                                ?
                                dataQuiz[currentIndex]
                                : []
                        }
                    />
                </div>

                <div className="footer">
                    <div>
                        <button
                            className="btn-secondary"
                            onClick={() => handlePrev()}
                        >Prev
                        </button>
                        <button
                            className="btn-primary"

                            onClick={() => handleNext()}
                        >Next
                        </button>
                    </div>

                    <div className="submit-btn">
                        <button
                            className="btn btn-warning "
                            onClick={() => handleSubmit()}
                        >Submit
                        </button>
                    </div>

                </div>
            </div>

            <div className="right-content">
                <RightContent
                    dataQuiz={dataQuiz}
                    handleSubmit={handleSubmit}
                    setCurrentIndex={setCurrentIndex}
                />
            </div>

            <ModalResult
                show={isShowModal}
                setShow={setIsShowModal}
                res={res}
            />
        </div>
    )
}

export default DetailQuiz