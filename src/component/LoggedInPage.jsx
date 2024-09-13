import { useState,useEffect } from "react";
import axios from "axios";
import "./style/loginForm.css";

const LoggedInPage =({user,setUser, token,setToken,isRegistered,setIsRegistered})=>{

    const [newNote,setNewNote] = useState("");
    const [notes,setNotes] = useState([]);

    const fetchNotes = async() =>{

        const config = {
            headers:{
                'Authorization':`Bearer ${token}`
            }
        };
        
        console.log("fetching notes...");

        try{
            const response = await axios.get('https://notesapp-backend-nbdx.onrender.com/notes', config)
            console.log("notes fetched successfully..");
            console.log(response.data);
            
            setNotes(response.data);
        }catch(error){
            console.log("Error fetching notes ",error);
        }
    }

    useEffect(()=>{
        fetchNotes();
    },[]);
   
    const hanldeAddNote =async (e)=>{
        e.preventDefault();

        const config={
            headers:{
                'Authorization':`Bearer ${token}`
            }
        };
        const newNoteObject = {
            content : newNote
        };

        try{
            const response = await axios.post('https://notesapp-backend-nbdx.onrender.com/notes',newNoteObject,config)
            console.log("Note added successfully...");
            console.log(response.data);
            setNewNote('');
            fetchNotes();

        }catch(error){
            console.log("Error adding new note",error)
        }
    }

    const onLogout = ()=>{
        setUser(null);
        setToken(null);

        window.localStorage.removeItem('user');
        window.localStorage.removeItem('token');

        setIsRegistered(true);
    }
    return (
        <div className="loginForm">
            <p>Welcome , <span>{user.name} </span></p>
            <form onSubmit={hanldeAddNote}>
                    <input
                        type="text"
                        placeholder="Enter a new note"
                        value={newNote}
                        onChange={(e)=>setNewNote(e.target.value)}
                        required
                    />
                    <button type="submit">save</button>
            </form>
            <div className="content">
                <h2>user contents</h2>
                <ol className="notes">
                    {
                        notes.map(note => <li key={note._id}>{note.content}</li>)
                    }
                </ol>
            </div>
            <button onClick={onLogout}>logout</button>
        </div>
    )
}

export default LoggedInPage;