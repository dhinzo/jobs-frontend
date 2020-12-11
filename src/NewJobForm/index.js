import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function NewJobForm(props) {
    const [lgShow, setLgShow] = useState(false)
    
    
    
    const initialInputState = {
        company: '', 
        position: '', 
        location: '', 
        materials_required: '', 
        link: '', 
        notes: '' }
    
    const [eachEntry, setEachEntry] = useState(initialInputState)
    const { company, position, location, materials_required, link, notes } = eachEntry 

    const handleInputChange = e => {
        setEachEntry({ ...eachEntry, [e.target.name]: e.target.value })
      }
    
    const handleSubmit = e => {
        //console.log(props)
        e.preventDefault()
        props.createJob(eachEntry)
        setEachEntry(initialInputState)
        setLgShow(false)
    }

    return (
        <>
        <Button
            style={{ borderRadius: '50%', marginLeft: '1rem', color:"white"}}
            className='btn-new-job'
            size='lg'
            onClick={() => setLgShow(true)}>+</Button>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              ADD A NEW JOB TO YOUR SLATE
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>NAME OF COMPANY</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Company"
                        name="company"
                        value={company}
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>TITLE OF POSITION</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Title of Position"
                        name="position"
                        value={position}
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>JOB LOCATION</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Location"
                        name="location"
                        value={location}
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>REQUIRED MATERIALS</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Required Materials"
                        name="materials_required"
                        value={materials_required}
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>JOB LINK</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Link"
                        name="link"
                        value={link}
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ADD NOTES ABOUT THIS JOB</Form.Label>
                    <Form.Control 
                        as="textarea"
                        rows={4} 
                        placeholder="Leave some notes about me"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange} />
                </Form.Group>
                <Button 
                    className='LoginBtn'
                    type="submit"
                    onClick={handleSubmit}
                    >
                    SUBMIT
                </Button>
            </Form>

          </Modal.Body>
        </Modal>
        </>
    )
}
