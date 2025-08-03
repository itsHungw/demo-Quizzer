import React from "react";
import './DisplayInfo.scss'
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