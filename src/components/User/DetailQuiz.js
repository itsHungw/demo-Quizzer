import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { getQuizById } from "../../service/apiService";

const DetailQuiz = () => {
    const params = useParams()
    const quizId = params.id;
    // console.log(quizId)

    useEffect(() => {
        fetchQuiz()
    }, [quizId])

    const fetchQuiz = async () => {
        let res = await getQuizById(quizId);
        console.log('res ', res)
    }
    return (
        <div>Detail quiz</div>
    )
}

export default DetailQuiz