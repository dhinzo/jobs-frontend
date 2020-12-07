import React from 'react'
import Navbar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import Login from '../Login'
import Logout from '../Logout'
import Register from '../Register'

export default function UserNav(props) {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                { props.loggedIn === true &&
                <Navbar.Text>Signed in as: {props.loggedInUser}</Navbar.Text>
                }
                    <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    </Nav>
                    { props.loggedIn === true ?
                    <Logout
                        unsetUser={props.unsetUser} />
                    :
                    <React.Fragment>
                    <Register
                        setUser={props.setUser} />
                    <Login
                        login={props.login}
                        setUser={props.setUser} />
                    </React.Fragment>
                    }

                </Navbar.Collapse>
            </Navbar>   
        </div>
    )
}
