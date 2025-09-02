import video from '../../assets/video-homepage.mp4'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    // const account = useSelector(state => state.user.account);
    // console.log(account, isAuthenticated)
    const navigate = useNavigate()
    return (
        <div className='homepage-container'>
            <video autoPlay muted loop>
                <source src={video} type='video/mp4' />
            </video>
            <div className='homepage-content'>
                <div className='title-1'>
                    QUIZZER
                </div>
                <div className='title-2'>
                    Hello

                </div>
                <div className='title-3'>
                    {isAuthenticated === false
                        ?
                        <button onClick={() => navigate('/login')}>Get started. It's free</button>
                        :
                        <button onClick={() => navigate('/users')}>Do quiz now</button>
                    }
                </div>
            </div>
        </div>

    )
}

export default HomePage