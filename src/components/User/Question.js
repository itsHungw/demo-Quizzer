import _ from "lodash"


const Question = (props) => {

    const { data, index } = props

    if (_.isEmpty(data)) {
        return (
            <>
            </>
        )
    }

    return (
        <>

            <div className="question-img">
                {data && data.image
                    ?
                    <img src={`data:image/png;base64,${data.image}`} className="card-img-top" alt="..." />
                    : ''
                }
            </div>
            <div className="question">
                Question {+index + 1}: {data.questionDescription}
            </div>
            <div className="answer">
                {data && data.answer &&
                    data.answer.map((ans, index) => {
                        return (
                            <div
                                key={`answer-${index}`}
                                className="a-child">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" />
                                    <label class="form-check-label" >
                                        {ans.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </>
    )
}

export default Question