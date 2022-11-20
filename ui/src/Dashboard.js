import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    let navigate = useNavigate()

    useEffect(() => { getContent() }, [])

    let [content, setContent] = useState([])
    // let [name, setName] = useState(props.data)

    async function getContent() {
        let username = await localStorage.getItem("name")
        let user = JSON.parse(username)
        // console.log(props.data)
        // setName(props.data)
        // let user = username
        // console.log(user)    
        let alldata = await fetch(`http://localhost:4000/getData/${user}`)
        alldata = await alldata.json()
        // console.log(alldata);
        setContent(alldata.data)
    }

    let createContent = () => {
        navigate("/createcontent")
    }

    let logout =()=>{
        localStorage.clear()
        navigate("/")
    }


  return (
      <div className="container">


          <div class="mt-3">
              <div className="d-flex justify-content-between card-header">
                  <button onClick={createContent} class="btn btn-primary bg-success" type="button">Add New Content</button>
                  <button onClick={logout} class="btn btn-primary bg-danger" type="button">Leave Dashboard</button>
              </div>
          </div>

          
          <div className='mt-4'>
            
              <div className="card bg-info">
                  <div className="d-flex justify-content-between card-header">
                      <h4>Topics</h4>
                      <h1>DASHBOARD</h1>
                      <h4>Understanding</h4>
                  </div>
              </div>



              {content.length === 0 ?

                  <div className="d-flex justify-content-around card-header mt-4">
                      <h4>You have not created any content so far. Please Create content to view data</h4>
                  </div>
              :
              content.map(x=>
                  <div className='mt-2'>
                      <div className="card">
                          <div className="d-flex justify-content-between card-header">
                              <h5>{x.title}</h5>
                              <h5>{x.percentage}</h5>
                          </div>

                      </div>
                  </div>
                )}
               
                  


          
              </div>
         
    </div>
  )
}

export default Dashboard