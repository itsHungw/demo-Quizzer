import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom"
import { getQuizById } from "../../service/apiService";
import _ from "lodash";
import { data } from "autoprefixer";
import './DetailQuiz.scss'
import Question from "./Question";

const DetailQuiz = (props) => {
    const params = useParams()
    const location = useLocation();
    // console.log(location)
    const quizId = params.id;
    const [dataQuiz, setDataQuiz] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        if (currentIndex - 1 < 0) return;
        setCurrentIndex(+currentIndex - 1)
    }

    const handleNext = () => {
        if (currentIndex + 1 < dataQuiz.length)
            setCurrentIndex(+currentIndex + 1)

    }

    useEffect(() => {
        fetchQuiz()
    }, [quizId])

    const fetchQuiz = async () => {
        let res = await getQuizById(quizId);

        console.log('res ', res)
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
                        answer.push(item.answers);
                        console.log('answer', item.answers)
                    })
                    return { questionId: key, answer, questionDescription, image }
                })
                .value();
            console.log('data', data)
            setDataQuiz(data)
            console.log('check data', dataQuiz)
        }
    }
    return (
        <div className="detail-quiz-container">

            <div className="right-content">
                <div className="quiz-title">
                    Quiz {quizId}:  {location?.state?.description}
                </div>

                <div className="quiz-body">
                    <img />
                </div>

                <div className="quiz-content">
                    <Question
                        index={currentIndex}
                        data={
                            dataQuiz && dataQuiz.length > 0
                                ?
                                dataQuiz[currentIndex]
                                : []
                        }
                    />
                </div>

                <div className="footer">
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
            </div>

            <div className="left-content">
                count down
            </div>
        </div>
    )
}

export default DetailQuiz