import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import Login from '../Login'
import Logout from '../Logout'
import Register from '../Register'
import NewJobForm from '../NewJobForm'

export default function UserNav(props) {
    return (
        <React.Fragment>
            <Navbar expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                { props.loggedIn === true &&
                <div className='welcome-banner'>
                <Navbar.Text>SIGNED IN AS: {props.loggedInUser.toUpperCase()}</Navbar.Text>
                </div>
                }
                { props.loggedIn === true &&
                <NewJobForm
                        createJob={props.createJob} />
                }
                <Nav className="mr-auto">
                    </Nav>
                        {props.loggedIn === true 
                            ?
                        <React.Fragment>
                            <Logout
                                unsetUser={props.unsetUser} />
                        </React.Fragment> 
                            :
                        <React.Fragment>
                            <Register
                                setUser={props.setUser}
                                login={props.login} />
                            <Login
                                getJobs={props.getJobs}
                                clearJobs={props.clearJobs}
                                login={props.login}
                                setUser={props.setUser} />
                        </React.Fragment>
                            }

                </Navbar.Collapse>
            </Navbar>   
        </React.Fragment>
    )
}
