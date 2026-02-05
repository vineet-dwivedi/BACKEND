import { useState } from "react"
import axios from "axios"
import { useEffect } from "react";

const App = () => {
  const [notes, setnotes] = useState([])

 function fetchNotes(){
    axios.get('http://localhost:3000/api/notes')
      .then(res => setnotes(res.data.notes))
      .catch(err => console.error(err))
  }
 
  useEffect(() => {
    fetchNotes();
  }, [])

  function subHandle(e){
     e.preventDefault();
     const{title,about,age} = e.target.elements;
     console.log(title.value,about.value,age.value);

     axios.post("http://localhost:3000/api/notes",{
      title: title.value,
      about: about.value,
      age: age.value
     }).then(res=>{
      console.log(res.data)
      fetchNotes();
     })
  }

  function delHandle(id){
  axios
    .delete(`http://localhost:3000/api/notes/${id}`)
    .then(res => {
      console.log(res.data);
      fetchNotes();
    })
    .catch(err => console.error(err));
}
  return (
    <>
      <form className="create-form" onSubmit={subHandle}>
      <input name = "title" type="text" placeholder='Enter Title'/>
      <input name = "about"  type="text" placeholder='Enter About'/>
      <input name = "age" type="number" placeholder='Enter Age'/>
      <button>Submit</button>
      </form>


       <div className="notes">
            {notes.map((note, index) => (
            <div className="note" key={index}>
            <h1>{note.title}</h1>
            <p>{note.about}</p>
            <h4>{note.age}</h4>
            <button onClick={()=>delHandle(note._id)}>delete</button>
            </div>
      ))}
       </div>
    </>
  )
}

export default App
