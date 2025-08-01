import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import MyComponent from './components/MyComponent';
import React from 'react';

class App extends React.Component {
  state = {
    name: 'Nguyen Vinh Hung',
    birth: 2006,

  };
  render() {
    return (
      <div>My name is {this.state.name} and im {2026 - this.state.birth} year old</div>
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
