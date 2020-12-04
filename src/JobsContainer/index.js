import React from 'react'
//import axios from 'axios'
import GetJobPosts from '../GetJobPosts'
import NewJobForm from '../NewJobForm'
import Login from '../Login'
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
            conView: ''
        }
    }


// ****** VIEW FUNCTIONS *******    
    setUser = (username) => {
        this.setState({
            loggedIn: true,
            loggedInUser: username
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

// ****** REQUEST FUNCTIONS *******

// Get All Jobs    
    getJobs = async () => {
        try {
            const url = process.env.REACT_APP_API_URL + "/trackr/jobs/"
            const jobsRes = await fetch(url)
            const jobsJson = await jobsRes.json()
            this.setState({
                jobs: jobsJson.data,
            })
            console.log(jobsJson)
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


// Edit Job
    editJob = (idOfJob) => {
        this.setState({
            idOfJobToEdit: idOfJob,
            conView: 'edit this job'
        })
    }    


// Update Job
    updateJob = async (job) => {
        const url = process.env.REACT_APP_API_URL + "/trackr/jobs/" + this.state.idOfJobToEdit
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
            console.log(jobJson)
        } catch(err) {
            console.log("there was an error trying to edit this post: ", err)
        }
    }

    componentDidMount() {
       this.getJobs()
        
    }

    render() {
        return (
            <React.Fragment>
                <Login
                    setUser={this.setUser}
                    loggedIn={this.state.loggedIn}
                    loggedInUser={this.state.loggedInUser} />
                { this.state.loggedIn === true && this.state.conView === ''
                    &&
                    <>    
                <NewJobForm
                    createJob={this.addJob} />
                <GetJobPosts
                    jobs={this.state.jobs}
                    viewJob={this.viewJob}
                    editJob={this.editJob} />
                    </>
                }
                {
                    this.state.idOfViewJob !== -1 && this.state.conView === 'view this job'
                    &&
                    <ViewJob
                        viewJob={this.state.jobs.find(job => job.id === this.state.idOfViewJob)}
                        backToJobs={this.backToJobs}
                         />
                }
                {
                    this.state.idOfJobToEdit !== -1 && this.state.conView === 'edit this job'
                    &&
                    <EditJobForm
                        jobToEdit={this.state.jobs.find(job => job.id === this.state.idOfJobToEdit)}
                        updateJob={this.updateJob}
                        editJob={this.editJob} />
                }
            </React.Fragment>
        )
    }
}
