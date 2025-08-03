import React, { useState } from "react";
import './DisplayInfo.scss'
import logo from './../logo.svg'
// class DisplayInfo extends React.Component {
//     state = {
//         isShowList: true
//     }
//     handleShowHide = () => {
//         this.setState({
//             isShowList: !this.state.isShowList
//         })
//     }
//  const { listUser } = this.props;
//     render() {
// }

const DisplayInfo = (props) => {
    const { listUser } = props;
    const [isShowHideListUser, setShowHideListUser] = useState(true)
    const handleShowHide = () => {
        setShowHideListUser(!isShowHideListUser)
    }

    return (
        <div className="display-info-container">

            <img src={logo} ></img>
            <div>
                <span
                    onClick={() => { handleShowHide() }}>
                    {isShowHideListUser === true ? "Hide users" : "Show user"}
                </span>
            </div>

            {listUser.map((item) => {
                return (
                    <>
                        {isShowHideListUser &&
                            <div key={item.id}>
                                <div className={item.age > 18 ? "green" : "red"}>
                                    Name: {item.name}, Age: {item.age}
                                    <button onClick={() => { props.deleteUserInfo(item.id) }}> Delete</button>
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
export default DisplayInfo;