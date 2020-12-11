import React from 'react'
import Button from 'react-bootstrap/Button'
import EditJobForm from '../EditJobForm'
import DeleteButton from '../DeleteButton'

export default function PageTwo(props) {
    // console.log("Here are the props in PageOne: ", props)
    return (
        <div>
            <div className='view-pg'>
                <h4 className='view-headers'>NOTES:</h4>
                <div className='notes'>
                <p>{props.viewJob.notes}</p>
                </div>            
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