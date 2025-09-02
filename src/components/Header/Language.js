import { NavDropdown } from 'react-bootstrap';



const Language = () => {


    return (
        <>
            <NavDropdown title='Language' id="basic-nav-dropdown2" className='language'>
                <NavDropdown.Item

                >
                    Tiếng Việt
                </NavDropdown.Item>

                <NavDropdown.Item


                >
                    English
                </NavDropdown.Item>
            </NavDropdown>
        </>
    )
}

export default Language