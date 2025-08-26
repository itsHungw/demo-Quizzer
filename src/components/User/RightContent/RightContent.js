import './RightContent.scss'
import Timer from './Timer'


const RightContent = (props) => {
    const { dataQuiz, handleSubmit, setCurrentIndex } = props

    const setTimeUp = () => {
        handleSubmit()
    }

    const isSelected = (question, index) => {
        if (question && question.answer.length > 0) {
            console.log('check dt q', question.answer)
            let isAnswered = question.answer.find(answer => answer.isSelected === true)
            if (isAnswered) {
                return 'q-number selected'
            }
            return 'q-number'
        }
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
                                onClick={() => setCurrentIndex(index)}
                                className={isSelected(item, index)}

                            >{index + 1}
                            </div>

                        )
                    })
                }


            </div>
        </>
    )
}

export default RightContent