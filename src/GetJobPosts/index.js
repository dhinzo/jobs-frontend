import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'


export default function GetJobPosts(props) {
    
    const [jobState, setJobState] = useState({
       'unregistered': [],
       'inProgress': [],
       'completed': []
    })

    useEffect(()=>{
        //unregi jobs
        const unregjobs = props.jobs.filter(job=>job.progress === 'unregistered')
        //inprog jobs
        const inprog = props.jobs.filter(job=> job.progress === 'inProgress')
        //complete jobs
        const completed = props.jobs.filter(job=> job.progress === 'completed')


        setJobState({ 'unregistered': unregjobs, 'inProgress': inprog, 'completed': completed})
        console.log("updating props Effect")
    }, [props.jobs])
    
    const reorder = (arr, startIndex, endIndex) => {
        const result = jobState[arr]
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        setJobState({...jobState, arr: result})
    }

    const move = (source, destination, droppableSource, droppableDestination) => {
        // return result
        //get job you want to move
        const targetJob = jobState[droppableSource][source]

        targetJob.progress = droppableDestination
        props.updateProgress(targetJob)

        console.log("targetjob", targetJob)
        //remove it from its current array
        const newSourceArray = jobState[droppableSource].filter((job)=> job.id !== targetJob.id )
        console.log("newSourceArray", newSourceArray)
        
        //add target job to droppable destination
        const destinationArray = [
            ...jobState[droppableDestination].slice(0, destination),
            targetJob, ...jobState[droppableDestination].slice(destination)
        ]
        
        //update ROUTE
        //update the progress value to
        setJobState({...jobState, [droppableSource]: newSourceArray, [droppableDestination]: destinationArray})

        //call ajax function to update the job
        
    }

    // Drag End function
    const onDragEnd = result => {
        const { destination, source} = result
        console.log("this is the result", result)
        if(!destination) {
            console.log("You tried to drag out of a drag and drop context")
            return
        }
        if(
            destination.droppableId === source.droppableId &&
            destination.index === source.index 
        ) {
            console.log("you cancelled the drag")
            return
        }
        // result = move(
        //     props.jobs(source.droppableId),
        //     props.jobs(destination.droppableId),
        //     source,
        //     destination
        // )
        if(
            destination.droppableId === source.droppableId &&
            destination.index !== source.index
        ) {
            console.log("Reordering", result)
            reorder(
                source.droppableId,
                source.index,
                destination.index
            )
        }
        if(destination.droppableId !== source.droppableId){
            console.log("moving the job: ", result)
            move(
                source.index,
                destination.index,
                source.droppableId,
                destination.droppableId
            )
        }
    }
    // console.log("these are the props in getJobs: ", props)
    const unregJobs = jobState['unregistered'].map((job, index) => {
        
        return (
            <Draggable
                draggableId={`${job.id}`}
                
                index={index}
                key={job.id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >   
                                    
            <Card
                key={job.id}
                bg='dark'
                text={'bg' === 'light' ? 'dark' : 'white'}
                style={{ width: '15rem', marginLeft: '2px', marginRight: '2px', marginTop: '5px'}}
                className="mb-2"
                >
                <Card.Header
                    
                    onClick={ () => props.viewJob(job.id)}>{job.company}</Card.Header>
                <Card.Body>
                    <Card.Title>
                    {job.position}
                    </Card.Title>
                    <Card.Text>
                    {job.location}
                    </Card.Text>
                </Card.Body>            
            <Card.Footer>
                
            </Card.Footer>
            </Card>
            </div>
            )}
            </Draggable>
        )
    })

    const inProgJobs = jobState['inProgress'].map((job, index) => {
        
        return (
            <Draggable
                draggableId={`${job.id}`}
                
                index={index}
                key={job.id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >   
                                    
            <Card
                key={job.id}
                bg='dark'
                text={'bg' === 'light' ? 'dark' : 'white'}
                style={{ width: '15rem', marginLeft: '2px', marginRight: '2px', marginTop: '5px'}}
                className="mb-2"
                >
                <Card.Header
                    
                    onClick={ () => props.viewJob(job.id)}>{job.company}</Card.Header>
                <Card.Body>
                    <Card.Title>
                    {job.position}
                    </Card.Title>
                    <Card.Text>
                    {job.location}
                    </Card.Text>
                </Card.Body>            
            <Card.Footer>
                
            </Card.Footer>
            </Card>
            </div>
            )}
            </Draggable>
        )
    })

    const completeJobs = jobState['completed'].map((job, index) => {
        
        return (
            <Draggable
                draggableId={`${job.id}`}
                
                index={index}
                key={job.id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >   
                                    
            <Card
                key={job.id}
                bg='dark'
                text={'bg' === 'light' ? 'dark' : 'white'}
                style={{ width: '15rem', marginLeft: '2px', marginRight: '2px', marginTop: '5px'}}
                className="mb-2"
                >
                <Card.Header
                    
                    onClick={ () => props.viewJob(job.id)}>{job.company}</Card.Header>
                <Card.Body>
                    <Card.Title>
                    {job.position}
                    </Card.Title>
                    <Card.Text>
                    {job.location}
                    </Card.Text>
                </Card.Body>            
            <Card.Footer>
                
            </Card.Footer>
            </Card>
            </div>
            )}
            </Draggable>
        )
    })
    console.log("here is the piece of job state", jobState)
    return (
        
        <div style={{ border: '1px solid black', display: 'flex', flexDirection: 'row'}}>
            <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='unregistered'>
            {(provided, snapshot) => {                
                return (
            <div
                className='col eachColumn'
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                    border: '1px solid black',
                    background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey' 
                }} >
                    {unregJobs}
                    {provided.placeholder}
            </div>
                )
            }}
            </Droppable>
            <Droppable droppableId={'inProgress'}>
            {(provided, snapshot) => {
                return (
                    <div
                        className='col eachColumn'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                            border: '1px solid black',
                            background: snapshot.isDraggingOver ? 'lightyellow' : 'lightgrey' 
                }}>
                   {inProgJobs}
                  {provided.placeholder}  
                </div>
                )
            }}
            </Droppable>
            <Droppable droppableId='completed'>
            {(provided, snapshot) => {
                return (
                    <div
                        className='col'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                            border: '1px solid black',
                            background: snapshot.isDraggingOver ? 'lightgreen' : 'lightgrey' 
                }}>
                    {completeJobs}
                  {provided.placeholder}  
                </div>
                )
            }}
            </Droppable>
            </DragDropContext>
        </div>
    )
}
