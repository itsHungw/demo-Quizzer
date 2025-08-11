import { useEffect, useState } from 'react'
import './ListQuiz.scss'
import { getQuizByUser } from '../../service/apiService';

const ListQuiz = (props) => {
    const [arrQuiz, setArrayQuiz] = useState([]);
    useEffect(() => {
        getQuizData()
    }, []);

    const getQuizData = async () => {
        let data = await getQuizByUser()
        console.log('check data', data)
        if (data && data.EC === 0) {
            setArrayQuiz(data.DT)
        }
    }
    return (
        <div className='list-quiz-container'>
            {arrQuiz && arrQuiz.length > 0
                && arrQuiz.map((quiz, index) => {
                    console.log('quiz', quiz)
                    return (
                        <div key={`${index}-quiz`} className="card" style={{ width: '18rem' }}>
                            <img src={`data:image/png;base64,${quiz.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button className="btn btn-primary">Start now</button>
                            </div>
                        </div>
                    )
                })
            }
            {arrQuiz && arrQuiz.length === 0 &&
                <div>
                    You don't have any quiz now
                </div>
            }

        </div>
    )
}

export default ListQuiz