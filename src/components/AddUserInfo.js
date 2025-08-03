import React from "react";

class AddUserInfo extends React.Component {
    state = {
        name: '',
        age: '',
        location: 'Ho Chi Minh city, Viet Nam'
    };




    clickHandle = (event) => {
        // console.log(this.state.name);
        this.setState({
            name: 'Jimmy',
            age: Math.floor((Math.random() * 2000) + 2000)
        })
    }

    onChangeName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    onChangeAge = (event) => {
        this.setState({
            age: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        this.props.addUserInfo({
            id: Math.floor(Math.random() * 100) + 1,
            name: this.state.name,
            age: this.state.age
        })
    }
    render() {
        return (
            <>
                <div>My name is {this.state.name} and im {this.state.age} year old</div>
                {/* <button onClick={this.clickHandle}>Click me</button>
        <button onMouseOver={this.mouseHover}>Hover me</button> */}

                <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
                    <input
                        value={this.state.name}
                        type='text'
                        onChange={(event) => { this.onChangeName(event) }} />
                    <input
                        value={this.state.age}
                        type='number'
                        onChange={(event) => { this.onChangeAge(event) }} />

                    <button>Submit</button>
                </form>
            </>

        )
    }
}

export default AddUserInfo;