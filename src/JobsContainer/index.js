import React from 'react'
//import axios from 'axios'
import UserNav from '../UserNav'
import GetJobPosts from '../GetJobPosts'

import ViewJob from '../ViewJob'
import EditJobForm from '../EditJobForm'

export default class JobsContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jobs: [],
            loggedIn: false,
            loggedInUser: null,
            idOfViewJob: -1,
            idOfJobToEdit: -1,
            conView: '',
        }
    }
    // ****** SET USER FUNCTIONS ******

    setUser = (username) => {
        this.setState({
            loggedIn: true,
            loggedInUser: username
        })
    }
    
    unsetUser = () => {
        this.setState({
            loggedIn: false,
            loggedInUser: null,
            conView: ''
        })
    }
    // ****** VIEW FUNCTIONS *******    
    
    clearJobs = () => {
        this.setState({
            jobs: []
        })
    }


    viewJob = (idOfJob) => {
        this.setState({
            idOfViewJob: idOfJob,
            conView: 'view this job'
        })
    }

    backToJobs = () => {
        this.setState({
            conView: ''
        })
    }

    openEditModal = (id) => {
        console.log("you're trying to edit this job: ", id)
        this.setState({
            conView: 'edit this job',
            idOfJobToEdit: id
        })
    }

    closeEditModal = () => {
        this.setState({
            idOfJobToEdit: -1,
            conView: 'view this job'
        })
    }


// ****** REQUEST FUNCTIONS *******


// Get User Jobs    
    getJobs = async () => {
        try {
            const url = process.env.REACT_APP_API_URL + "/trackr/jobs/myjobs"
            const jobsRes = await fetch(url, {
                credentials: 'include'
            })
            const jobsJson = await jobsRes.json()
            this.setState({
                jobs: jobsJson.data,
            })
            console.log("Here is the state of jobs ", this.state.jobs)
        } catch (err) {
            console.log("error getting jobs, ", err)
        }
    }

// Create New Job    
    addJob = async (job) => {
        const url = process.env.REACT_APP_API_URL + "/trackr/jobs/"
        try {
            const res = await fetch(url, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(job)
            })
            const newJobJson = await res.json()
            if(res.status === 200 || res.status === 201){
                this.setState({
                    jobs: [...this.state.jobs, newJobJson.data]
                })
            }
        } catch(err) {
            console.log("error adding job: ", err)
        }
    }

    // Delete Job 
    deleteJob = async (id) => {
        const url = process.env.REACT_APP_API_URL + '/trackr/jobs/' + id
        try{
            const res = await fetch(url, {
                credentials: 'include',
                method: "DELETE",
            })
            const deleteJson = await res.json()
            if(deleteJson.status === 200 || deleteJson.status === 201) {
                this.setState({
                    jobs: this.state.jobs.filter(job => job.id !== id)
                })
            }
        } catch(err) {
            console.log("error trying to delete job ", err)
        }
        this.setState({
            conView: ''
        })
        this.getJobs()
    }

// Update Job
    updateJob = async (job) => {
        const url = process.env.REACT_APP_API_URL + "/trackr/jobs/" + this.state.idOfViewJob
        try{
            const res = await fetch(url, {
                credentials: "include",
                method: "PUT",
                body: JSON.stringify(job),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const jobJson = await res.json()
            this.setState({
                idOfJobToEdit: -1,
                jobs: [...this.state.jobs, jobJson]
            })
            this.getJobs()
            this.closeEditModal()
        } catch(err) {
            console.log("there was an error trying to edit this post: ", err)
        }
    }

    // Edit Helper Function
    findJobToEdit = () => {
        return this.state.jobs.find(job => job.id === this.state.idOfViewJob)    
    }

    // ****** LIFECYCLE *******

    // componentDidMount() {
    //    this.getJobs()    
    // }

    // componentDidUpdate() {
    //     this.getJobs()
    // }
    

    render() {
        return (
            <div>
            <UserNav
                    getJobs={this.getJobs}
                    clearJobs={this.clearJobs}
                    loggedIn={this.state.loggedIn}
                    loggedInUser={this.state.loggedInUser}
                    setUser={this.setUser}
                    unsetUser={this.unsetUser}
                    createJob={this.addJob}
                 />
                <h1>Trackr</h1>
                { this.state.loggedIn === true && this.state.conView === ''
                    &&
                    <>    
                <GetJobPosts
                    jobs={this.state.jobs}
                    viewJob={this.viewJob}
                     />
                    </>
                }
                {
                    this.state.idOfViewJob !== -1 && this.state.conView === 'view this job'
                    &&
                    <ViewJob
                        viewJob={this.state.jobs.find(job => job.id === this.state.idOfViewJob)}
                        jobToEdit={this.findJobToEdit}
                        updateJob={this.updateJob}                        
                        backToJobs={this.backToJobs}
                        openEditModal={this.openEditModal}
                        deleteJob={this.deleteJob}                       
                    />
                }
               {
                   this.state.idOfJobToEdit !== -1 && this.state.conView === 'edit this job'
                   &&
                   <EditJobForm
                   />
               }                
            </div>
        )
    }
}