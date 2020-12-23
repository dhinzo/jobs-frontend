import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'


export default function Register(props) {
    const [show, setShow] = useState(false);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    const [errMessage, setErrMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    
    const handleClose = () => {
      setShow(false)
      setErrMessage('')
      setSuccessMessage('')
      setUsername('')
      setPassword('')
    };

    const handleShow = () => setShow(true);
    




  const register = async (username, password) => {
      const url = process.env.REACT_APP_API_URL + "/trackr/users/register"
      try {
          const res = await axios.post(url, {
              username: username,
              password: password
          }, { withCredentials: true })
          if (res.status === 200 || res.status === 201) {
              setUsername(username)
              setPassword(password)
              setSuccessMessage('Account created successfully! Please close this dialog box and login')
          }
      } catch (err) {
          setUsername('')
          setPassword('')
          setErrMessage('That username is already taken. Please choose another and try again.')
      }
  }
  const handleSubmit = (e) => {
  e.preventDefault()
  register(username, password)  
  }

  const handleChange = e => {
    setUsername(e.target.value)
    setPassword(e.target.value)
    errMessage ? setErrMessage('') : setSuccessMessage('')
  }
    
    return (
        <>
          <Button
            className='RegisterBtn'
            variant="info"
            onClick={handleShow}>
            REGISTER
          </Button>    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>REGISTER</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            { errMessage &&
            <div style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              textAlign: 'center',
              borderRadius: '5px',
              marginBottom: '5px'}}>
              {errMessage}
              </div>}
            { successMessage &&
              <div style={{
              backgroundColor: '#c3e6cb',
              color: '#155724',
              textAlign: 'center',
              borderRadius: '5px',
              marginBottom: '5px'
              }}>{successMessage}</div>             
            }
            <Form>
                <Form.Group>
                    <Form.Label>CREATE YOUR USERNAME</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter a Username"
                        name={username}
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>CREATE A PASSWORD</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Create a Password"
                        name={password}
                        onChange={handleChange} />
                </Form.Group>
              <Button
              className='RegisterBtn'
              type='submit'
              onClick={handleSubmit}>
                REGISTER
              </Button>
            
            </Form>
            </Modal.Body>
            
          </Modal>
        </>
    )
}
