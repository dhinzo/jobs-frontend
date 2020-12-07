import React from 'react'
import Button from 'react-bootstrap/Button'
import EditJobForm from '../EditJobForm'
import DeleteButton from '../DeleteButton'

export default function PageOne(props) {
    console.log("Here are the props in PageOne: ", props)
    return (
        <div>
            <h4>Company:</h4>
            <h5>{props.viewJob.company}</h5>
            <h4>Position:</h4>
            <h5>{props.viewJob.position}</h5>
            <p>Location: {props.viewJob.location}</p>
            <h5>Materials Required:</h5>
            <p>{props.viewJob.materials_required}</p>
        <div>{props.viewJob.notes}</div>
           <Button
                onClick= {() => props.backToJobs()}>Back to Jobs</Button>
            <EditJobForm                
                variant='outline-warning'
                updateJob={props.updateJob}
                viewJob={props.viewJob}
                onClick={() => props.openEditModal(props.viewJob.id)}
                
                />        
            <DeleteButton
                deleteJob={props.deleteJob}
                viewJob={props.viewJob} />            
        </div>
    )
}
