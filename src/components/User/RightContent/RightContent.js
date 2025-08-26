import './RightContent.scss'
import Timer from './Timer'


const RightContent = (props) => {
    const { dataQuiz, handleSubmit } = props

    const setTimeUp = () => {
        handleSubmit()
    }
    return (
        <>
            <div className="count-down">
                <h4>Count down</h4>
                <div className="timer">
                    <Timer
                        setTimeUp={setTimeUp}
                    />
                </div>
            </div>
            <div className="list-questions">

                {
                    dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div
                                key={`question-abc-${index}`}
                                className='q-number'>{index + 1}
                            </div>

                        )
                    })
                }


            </div>
        </>
    )
}

export default RightContent