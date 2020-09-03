import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom';

export default class NotesList extends Component {

    state = {
        notes: []
    }
    
    getNotes = async () => {
        const res = await axios.get('https://react-backend-notes-app.herokuapp.com/api/notes');
        this.setState({
            notes: res.data
        });
    }

    deleteNote = async (id) => {
        await axios.delete('https://react-backend-notes-app.herokuapp.com/api/notes/' + id);
        this.getNotes();
    }

    ifNotesExists() {
        if (this.state.notes.length === 0) {
            return <h1 className ="display-4">No notes available</h1>;
        }
    }

    // component when loading
    async componentDidMount() {
        this.getNotes();
    }

    render() {
        return (
            <div className="row">
                {this.ifNotesExists()}
                {
                    this.state.notes.map(note => (
                        <div className="col-md-4 p-2" key={note._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{note.title}</h5>
                                    
                                    <Link className="btn btn-secondary" to={"/edit/" + note._id}>
                                        Edit
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p>{note.content}</p>
                                    <p className="font-weight-light">{'By: ' + note.author}</p>
                                    {/* timeago.js */}
                                    <p className="text-right font-weight-light">{format(note.date)}</p>
                                </div>
                                <div className="card-footer">
                                    <button 
                                    className="btn btn-danger"
                                    onClick={
                                        () => this.deleteNote(note._id)
                                    }>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
