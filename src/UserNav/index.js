import React from 'react'
import Navbar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import Login from '../Login'
import Logout from '../Logout'
import Register from '../Register'
import NewJobForm from '../NewJobForm'

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
                    </Nav>
                    { props.loggedIn === true ?
                    <React.Fragment>
                    <NewJobForm
                        createJob={props.createJob} />
                    <Logout
                        unsetUser={props.unsetUser} />
                    </React.Fragment> 
                    :
                    <React.Fragment>
                    <Register
                        setUser={props.setUser} />
                    <Login
                        getJobs={props.getJobs}
                        clearJobs={props.clearJobs}
                        login={props.login}
                        setUser={props.setUser} />
                    </React.Fragment>
                    }

                </Navbar.Collapse>
            </Navbar>   
        </div>
    )
}
