import video from '../../assets/video-homepage.mp4'

const HomePage = () => {
    return (
        <video autoPlay muted loop>
            <source src={video} type='video/mp4' />
        </video>
    )
}

export default HomePage