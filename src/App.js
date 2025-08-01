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
    location: 'Ho Chi Minh city, Viet Nam'
  };



  clickHandle = (event) => {
    // console.log(this.state.name);
    this.setState({
      name: 'Jimmy',
      birth: Math.floor((Math.random() * 2000) + 2000)
    })
  }


  mouseHover = (event) => {
    console.log(Math.random().toPrecision(2) * 10);
  }

  onChangeInput = (event) => {
    this.setState({
      name: event.target.value
    })
    console.log(event.target.value);
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(this.state)
  }
  render() {
    return (
      <>
        <div>My name is {this.state.name} and im {2025 - this.state.birth} year old</div>
        {/* <button onClick={this.clickHandle}>Click me</button>
        <button onMouseOver={this.mouseHover}>Hover me</button> */}
        <form onSubmit={(event) => { this.handleOnSubmit(event) }}>

          <input
            type='text'
            onChange={(event) => { this.onChangeInput(event) }} />

          <button>Submit</button>
        </form>
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
