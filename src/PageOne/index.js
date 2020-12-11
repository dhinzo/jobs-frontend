import React from 'react'
import Button from 'react-bootstrap/Button'
import EditJobForm from '../EditJobForm'
import DeleteButton from '../DeleteButton'

export default function PageOne(props) {
    // console.log("Here are the props in PageOne: ", props)
    return (
        <div>
            <div className='view-pg'>
                <h4 className='view-headers'>Company:</h4>
                <p>{props.viewJob.company}</p>
                <h4 className='view-headers'>WEBSITE:</h4>
                <a href='{props.viewJob.link}' target='_blank'><p>{props.viewJob.link}</p></a>
                <h4 className='view-headers'>Position:</h4>
                <p>{props.viewJob.position}</p>
                <h4 className='view-headers'>Materials Required:</h4>
                <p>{props.viewJob.materials_required}</p>
                <h4 className='view-headers'>Location: </h4>
                <p>{props.viewJob.location}</p>
                <div className='notes'>{props.viewJob.notes}</div>
            </div>
           <Button
                variant='outline-dark'
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
