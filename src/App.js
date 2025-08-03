import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import MyComponent from './components/MyComponent';
import React from 'react';
import UserInfo from './components/UserInfo';
import DisplayInfo from './components/DisplayInfo';
class App extends React.Component {
  state = {
    listUser: [
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
    ]
  }
  render() {


    return (
      <>
        <div>Hello World</div>
        <UserInfo />
        <br></br>
        <br></br>
        <DisplayInfo listUser={this.state.listUser} />
      </>
    )
  }
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
