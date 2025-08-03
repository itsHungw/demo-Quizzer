import React from "react";
import './DisplayInfo.scss'
import logo from './../logo.svg'
class DisplayInfo extends React.Component {
    state = {
        isShowList: true
    }
    handleShowHide = () => {
        this.setState({
            isShowList: !this.state.isShowList
        })
    }

    render() {
        const { listUser } = this.props;
        return (
            <div className="display-info-container">

                <img src={logo} ></img>
                <div>
                    <span
                        onClick={() => { this.handleShowHide() }}>
                        {this.state.isShowList === true ? "Hide users" : "Show user"}
                    </span>
                </div>

                {listUser.map((item) => {
                    return (
                        <>
                            {this.state.isShowList &&
                                <div>
                                    <div key={item} className={item.age > 18 ? "green" : "red"}>
                                        Name: {item.name}, Age: {item.age}
                                        <button onClick={() => { this.props.deleteUserInfo(item.id) }}> Delete</button>
                                    </div>
                                    <hr />
                                </div>
                            }
                        </>
                    )


                })}

            </div>

        )
    }
}

export default DisplayInfo;