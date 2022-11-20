import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Createcontent = () => {

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [contentarray, setContentarray] = useState([])
    const [next, setNext] = useState(false)

    // const [rating, setRating] = useState("")
    const [understanding, setUnderstanding] = useState({})

    // let contentarray= ["adad","adsad","adad","adad","adad"]

    let nextPage=()=>{
        if (title.trim().length === 0) alert("Title cannot be empty")
        else if (body.trim().length === 0)  alert("Body cannot be empty")
        else{
            let bodyArray = body.split(/[,}?.{;/)(:|-]+/)
            // console.log(bodyArray)
            let filterArr = []
            for (let txt of bodyArray) {
                if (txt.trim().length !== 0) filterArr.push(txt.trim())
            }
            setContentarray(filterArr)
            setNext(true)
        }
    }

    let selectRating=(data, block)=>{
        // setRating(data)
        understanding[block] = data
        setUnderstanding(understanding)
        // console.log(understanding);
    }

    let navigate = useNavigate()
    const submitButton = async () => {
        let username = await localStorage.getItem("name")
        let user = JSON.parse(username)
        let data = { title, body, user, understanding }
        console.log(data);
        await fetch("http://localhost:4000/createContent", {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()
                .then((response) => {
                    console.log(response);
                    if (response.status === true) {
                        alert(response.message)
                        navigate("/dashboard")

                    } else {
                        alert(response.message)
                    }
                }))
    }
    function submitAction(x) {
        x.preventDefault()
    }

  return (
    <div>
       {
        !next ? 

       
              <div className="row">

                  <div className="w-50 mx-auto mt-3">
                      <h1>Write Your Content Below</h1>
                      <form onSubmit={submitAction}>
                          <div className="mt-4">
                              <label className="form-label">Title</label>
                              <input className="form-control" type="text" placeholder="Title of your Content"
                                  value={title} onChange={(e) => setTitle(e.target.value)} />
                          </div>
                          <div className="mt-3">
                              <label className="form-label">Body</label>
                                  <textarea className="form-control" placeholder="Write the Complete content here" rows="8"
                                  value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                          </div>
                          <div className="mt-4">
                              <button onClick={nextPage} type="submit" className="btn btn-primary">{"Next >>"}</button>
                          </div>
                      </form>
                  </div>

              </div>


     
                :


             <div>

                      <div className="container">
                          <div class="mt-4 mb-4">
                              <div className="d-flex justify-content-around card-header">
                                  <h3>Please select your level of understanding for each block</h3>
                              </div>
                          </div>
                      </div>


              <div className="container bg-info">
                  <div class="mt-4 mb-4">
                      <div className="d-flex justify-content-between card-header">
                          <h3>Your Blocks</h3>
                          <h3>Your Understanding</h3>
                      </div>
                  </div>
              </div>


              {contentarray.map(x =>
                  <div className='mt-2 bg-light container'>
                      <div className="card">
                          <div className="d-flex justify-content-between card-header">
                              <label className="form-label" >{x}</label>
                              <select class="form-select-sm" value={understanding.x} onChange={e => selectRating(e.target.value, x)}>
                                  <option value='0'>Select...</option>
                                  <option value="4">UNDERSTOOD</option>
                                  <option value="3">SOMEWHAT UNDERSTOOD</option>
                                  <option value="2">NOT CLEAR</option>
                                  <option value="1">WHAT RUBBISH</option>
                              </select>
                          </div>

                      </div>
                  </div>
              )}

                      <div class="d-grid gap-2 col-6 mx-auto mt-4 mb-4">
                          <button onClick={submitButton} class="btn btn-primary" type="button">Save and Calculate Percentage</button>
                      </div>

             </div>
              
              }
                
               

    </div>
  )
}

export default Createcontent