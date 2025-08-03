
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import Header from './components/Header/Header';
import { Link } from 'react-router-dom';


const App = () => {


  return (
    <>
      <div className='app-container'>
        <Header />
        <button>
          <Link to="/users">Go to Users</Link>
        </button>
        <button>
          <Link to="/admins">Go to Admin</Link>
        </button>
      </div>
    </>
  )

}


export default App;
