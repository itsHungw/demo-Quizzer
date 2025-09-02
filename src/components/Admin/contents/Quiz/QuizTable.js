



const QuizTable = (props) => {
    const { handleClickDelete, handleClickEdit, listQuiz } = props

    return (
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Quiz ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Difficulty</th>
                    <th scope="col">Action</th>

                </tr>
            </thead>
            <tbody>

                {listQuiz.map((quiz, index) => {
                    return (
                        <tr>
                            <td>{quiz.id}</td>
                            <td>{quiz.name}</td>
                            <td>{quiz.description}</td>
                            <td>{quiz.difficulty}</td>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button
                                    className='btn btn-warning'
                                    onClick={() => handleClickEdit(quiz)}
                                >Edit
                                </button>

                                <button
                                    className='btn btn-danger'
                                    onClick={() => handleClickDelete(quiz)}
                                >Delete
                                </button>
                            </div>
                        </tr>
                    )
                })}


            </tbody>
        </table>
    )
}

export default QuizTable