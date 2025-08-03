import logo from './logo.svg';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import MyComponent from './components/MyComponent';
import React, { useState } from 'react';
import AddUserInfo from './components/AddUserInfo';
import DisplayInfo from './components/DisplayInfo';
const App = () => {
  const [listUser, setState] = useState([
    {
      id: 1,
      name: 'Jimmy',
      age: "16"
    },
    {
      id: 2,
      name: 'Nguyen Vinh Hung',
      age: "20"
    },
    {
      id: 3,
      name: 'Sasuke',
      age: "27"
    }
  ])


  const addUserInfo = (obj) => {
    console.log(obj)
    setState([obj, ...listUser])
  }

  const deleteUserInfo = (userId) => {
    let listUserClone = [...listUser]
    listUserClone = listUserClone.filter((item) => userId !== item.id)
    setState(listUserClone)
  }

  return (
    <>
      <div>Hello World</div>
      <AddUserInfo addUserInfo={addUserInfo} />
      <br></br>
      <br></br>
      <DisplayInfo listUser={listUser}
        deleteUserInfo={deleteUserInfo} />
    </>
  )

}

// const App = () => {
//   const count = useSelector(state => state.counter.count);
//   const dispatch = useDispatch();
//   const person = {
//     name: 'Nguyen Vinh Hung',
//     age: 19,

//   }
//   return (
//     <MyComponent />
//     // <div className="App">
//     //   <header className="App-header">
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <p>
//     //       Hello World my name is {person.name}, Im {person.age} year old.
//     //     </p>
//     //     <div>Count = {count}</div>
//     //     <button onClick={() => dispatch(increaseCounter())}>Increase</button>
//     //     <button onClick={() => dispatch(decreaseCounter())}>Decrease</button>
//     //   </header>
//     // </div>
//   );
// }

export default App;
