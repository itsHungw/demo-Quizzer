
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import Header from './components/Header/Header';
import { Outlet, Link } from 'react-router-dom';


const App = () => {


  return (
    <>
      <div className='app-container'>
        <div className='header-container'>
          <Header />
        </div>

        <div className='main-container'>
          <div className='side-nav'>

          </div>
        </div>

        <div className='app-container'>
          <Outlet />
        </div>
      </div>
    </>
  )

}


export default App;
