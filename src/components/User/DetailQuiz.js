import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { getQuizById } from "../../service/apiService";
import _ from "lodash";
import { data } from "autoprefixer";
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
        }
    }
    return (
        <div>Detail quiz</div>
    )
}

export default DetailQuiz