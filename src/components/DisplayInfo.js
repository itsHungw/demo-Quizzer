import React from "react";

class DisplayInfo extends React.Component {
    render() {
        const { listUser } = this.props;

        return (
            <>
                {listUser.map((item) => {
                    return (
                        <>
                            <div key={item}>Name: {item.name}, Age: {item.age}</div>
                            <hr />
                        </>

                    )
                })}

            </>

        )
    }
}

export default DisplayInfo;