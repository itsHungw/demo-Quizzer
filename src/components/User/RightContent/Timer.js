import { useState, useEffect } from "react"





const Timer = (props) => {
    const { setTimeUp, } = props

    const [count, setCount] = useState(1000);






    useEffect(() => {
        if (count === 0) {
            setTimeUp()

            return
        }
        const timer = setInterval(() => {
            setCount(count - 1)

        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [count])

    function toHHMMSS(seconds) {
        var h, m, s, result = '';
        // HOURs
        h = Math.floor(seconds / 3600);
        seconds -= h * 3600;
        if (h) {
            result = h < 10 ? '0' + h + ':' : h + ':';
        }
        // MINUTEs
        m = Math.floor(seconds / 60);
        seconds -= m * 60;
        result += m < 10 ? '0' + m + ':' : m + ':';
        // SECONDs
        s = seconds % 60;
        result += s < 10 ? '0' + s : s;
        return result;
    }

    return (
        <div>{toHHMMSS(count)}</div>
    )
}

export default Timer