import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  useEffect(() => { clearLocalStorage() }, [])
  window.onpopstate = () => {
    navigate("/");
  }
    const [username, setUsername] = useState("")
    let navigate = useNavigate()

    const  submitButton = async ()=>{
        await fetch("http://localhost:4000/enterDashboard",{
          method:'post',
          body:JSON.stringify({username}),
          headers:{
            'Content-Type' : 'application/json'
          }
        })
          .then(res => res.json()
            .then((response) => {
              console.log(response);
              if (response.status === true) {
                // props.data(username)
                localStorage.setItem("name", JSON.stringify(username))
                alert(response.message+'. Click Ok to continue to your dashboard')
                navigate("/dashboard")

              } else {
                alert(response.message)
              }
            }))
    }

    let createUser = () =>{
      navigate("/createuser")
    }



    function submitAction(e) {
        e.preventDefault()
    }

  let clearLocalStorage =()=>{
    localStorage.clear()
  }

  return (
    <div>
      <div class="p-3 alert alert-success border rounded-end">
        <div className='d-flex justify-content-around'>
          <h3>Welcome to Feynman Dashboard</h3>
        </div>
      </div>
      <div >
        <div className="w-50 mx-auto mt-5 ">
          <form onSubmit={submitAction}>
            <div className="mb-4 mt-5">
              <label className="form-label">Enter your username below: </label>
              <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="me-5">
              <button onClick={submitButton} type="button" className="btn btn-outline-success me-3">Enter Dashboard</button>
              <button onClick={createUser} type="button" className="btn btn-outline-info">Create Username</button>
            </div>
          </form>
        </div>
      </div>
     
      
</div>
  )
}

export default Home