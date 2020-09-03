import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateNote extends Component {
    
    state = {
        users: [],
        userSelected: '',
        title: '',
        content: '',
        date: new Date(),
        editing: false, // when you want to update
        _id: ''
    }

    // when you click the button
    onSubmit = async (e) => {
        e.preventDefault();
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        };
        // if wants to update
        if (this.state.editing){
            await axios.put('https://react-backend-notes-app.herokuapp.com/api/notes/' + this.state._id, newNote);
            
        } else {
            await axios.post('https://react-backend-notes-app.herokuapp.com/api/notes', newNote);
        }
        window.location.href = '/'; // redirects to the main directory
    }

    // update state when you change input's internal data
    onInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    // when date is changed 
    onChangeDate = date => {
        this.setState({date});
    }

    // change text for update
    textDecideUpdate() {
        if (this.state.content) {
            return 'Edit';
        }
        return 'Create';
    }

    // component at loading
    async componentDidMount() {
        // for edit/:id
        // console.log(this.props.match.params); // get id from route

        const users = await axios.get('https://react-backend-notes-app.herokuapp.com/api/users');
        this.setState({
            users: users.data.map(user => user.username),
            userSelected: users.data[0].username
        });

        if (this.props.match.params.id) { // If wants to edit
            const note = await axios.get('https://react-backend-notes-app.herokuapp.com/api/notes/' + this.props.match.params.id);
            
            this.setState({
                title: note.data.title,
                userSelected: note.data.author,
                content: note.data.content,
                date: new Date(note.data.date),
                editing: true,
                _id: this.props.match.params.id
            });
        }
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h3>{ this.textDecideUpdate() } note</h3> 

                    {/* SELECT USER */}
                    <div className="form-group">
                        <select
                        className="form-control"
                        name="userSelected"
                        onChange={this.onInputChange}
                        value={this.state.userSelected}>
                            {
                                this.state.users.map(user => 
                                <option key={user} value={user}>
                                    {user}
                                </option>)
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Title" 
                        name="title"
                        onChange={this.onInputChange}
                        value={this.state.title}
                        required/>
                    </div>

                    <div className="form-group">
                        <textarea name="content"
                        className="form-control"
                        placeholder="Content"
                        onChange={this.onInputChange}
                        value={this.state.content}
                        required></textarea>
                    </div>

                    <div className="form-group">
                        <DatePicker 
                        className="form-control"
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        />
                    </div>

                    <form onSubmit={this.onSubmit}>
                        <button type="submit" className="btn btn-primary btn-lg btn-block">
                            Save note
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
