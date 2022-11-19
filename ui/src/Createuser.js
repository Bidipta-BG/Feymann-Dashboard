import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Createuser = () => {

    const [username, setUsername] = useState("")
    let navigate = useNavigate()


    const submitButton = async () => {
        console.log({username});
        await fetch("http://localhost:4000/createUser", {
            method: 'post',
            body: JSON.stringify({ username }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()
                .then((response) => {
                    console.log(response);
                    if (response.status === true) {
                        alert(response.message)
                        navigate("/")

                    } else {
                        alert(response.message)
                    }
                }))
    }

    function submitAction(e) {
        e.preventDefault()
    }

  return (
    <div>
          <div className="w-50 mx-auto mt-5">
              <form onSubmit={submitAction}>
                  <div className="mb-3">
                      <label className="form-label">Write your username</label>
                      <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                  <button onClick={submitButton} type="button" className="btn btn-success me-3">Register Username</button>
              </form>
          </div>
    </div>
  )
}

export default Createuser