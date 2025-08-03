import logo from './logo.svg';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import MyComponent from './components/MyComponent';
import React, { useState } from 'react';
import AddUserInfo from './components/AddUserInfo';
import DisplayInfo from './components/DisplayInfo';
const App = () => {


  return (
    <>
      <div>Hello world</div>
      <button>hiii</button>
    </>
  )

}


export default App;
