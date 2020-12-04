import React from 'react'
import Button from 'react-bootstrap/Button'

export default function PageTwo(props) {
    return (
        <div>
            <h5>Materials Required:</h5>
            <p>{props.viewJob.materials_required}</p>
            <div>{props.viewJob.notes}</div>
            <Button>Back to Jobs</Button>
        </div>
    )
}
