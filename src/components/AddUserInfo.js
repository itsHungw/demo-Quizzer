import React, { useState } from "react";

const AddUserInfo = (props) => {


    const [state, setState] = useState({
        name: '',
        age: '',
        location: 'Ho Chi Minh city, Viet Nam'
    })

    // const clickHandle = (event) => {
    //     // console.log(this.state.name);
    //     this.setState({
    //         name: 'Jimmy',
    //         age: Math.floor((Math.random() * 2000) + 2000)
    //     })
    // }

    const onChangeName = (event) => {
        setState({ name: event.target.value })
    }

    const onChangeAge = (event) => {
        setState({ age: event.target.value })
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        props.addUserInfo({
            id: Math.floor(Math.random() * 100) + 1,
            name: state.name,
            age: state.age
        })
    }
    return (
        <>
            <div>My name is {state.name} and im {state.age} year old</div>
            {/* <button onClick={this.clickHandle}>Click me</button>
        <button onMouseOver={this.mouseHover}>Hover me</button> */}

            <form onSubmit={(event) => { handleOnSubmit(event) }}>
                <input
                    value={state.name}
                    type='text'
                    onChange={(event) => { onChangeName(event) }} />
                <input
                    value={state.age}
                    type='number'
                    onChange={(event) => { onChangeAge(event) }} />

                <button>Submit</button>
            </form>
        </>

    )

}

export default AddUserInfo;