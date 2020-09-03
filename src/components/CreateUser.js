import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

    state={
        users:[],
        username: ''
    }

    // everytime a user types something
    onChangeUsername = (e) => {
        this.setState({username: e.target.value});
    }

    // get users and update state users:[]
    getUsers = async () => {
        const res = await axios.get('https://react-backend-notes-app.herokuapp.com/api/users'); // get all users
        this.setState({users: res.data});
    }

    // get users and update state user: ''
    onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('https://react-backend-notes-app.herokuapp.com/api/users',{
            username: this.state.username
        });
        this.setState({username : ''});
        this.getUsers();
    }

    // delete a user by id
    deleteUser = async (id) => {
        await axios.delete('https://react-backend-notes-app.herokuapp.com/api/users/' + id);
        this.getUsers();
    }

    // to do an http request to server
    async componentDidMount() {
        this.getUsers();
        console.log(this.state.users)
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create new user</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input 
                                type="text" 
                                className="form-control" 
                                value={this.state.username}
                                onChange={this.onChangeUsername}/>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg btn-block">Save user</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => (
                                <li 
                                className="list-group-item list-group-item-action" 
                                key={user._id}
                                onDoubleClick={() => this.deleteUser(user._id)}>
                                    {user.username}
                                </li>)
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
