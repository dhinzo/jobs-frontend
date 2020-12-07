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
        console.log(props)
        e.preventDefault()
        props.createJob(eachEntry)
        setEachEntry(initialInputState)
        setLgShow(false)
    }

    return (
        <>
        <Button onClick={() => setLgShow(true)}>Create New Job</Button>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Enter the details of this new Job Application
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Name of Company</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Company"
                        name="company"
                        value={company}
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Title of Position</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Title of Position"
                        name="position"
                        value={position}
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Job Location</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Location"
                        name="location"
                        value={location}
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Required Materials</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Required Materials"
                        name="materials_required"
                        value={materials_required}
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Job Posting Link</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Link"
                        name="link"
                        value={link}
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Add Notes about this job</Form.Label>
                    <Form.Control 
                        as="textarea"
                        rows={4} 
                        placeholder="Link"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange} />
                </Form.Group>
                <Button 
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                    >
                    Submit
                </Button>
            </Form>

          </Modal.Body>
        </Modal>
        </>
    )
}
