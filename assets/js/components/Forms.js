import React, {Component} from "react";
import AddForm from "./AddForm/TodoAddForm";
import {getUsers} from "../api/TODO_api";


export default class Forms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditForm: false,
            showAddForm: false,
            user: [{"email":"admin@example.com","isAdmin":true,"firstName":"Maynard","lastName":"Dickinson"}],
            usersLog: [],
        }

        this.addTodoForm = this.addTodoForm.bind(this);
        this.handleCloseEditForm = this.handleCloseEditForm.bind(this);
        this.handleCloseAddForm = this.handleCloseAddForm.bind(this);

    }
    componentDidMount() {
        /*getUsers()
            .then((data) => {
                this.setState({
                    usersLog: data
                });
                //console.log(this.state.usersLog)
            })

         */
    }
    addTodoForm() {
        /*
        getUser()
            .then((data) => {
                this.setState({
                    user: data,
                })
            }).then(() => {

         */
            getUsers()
                .then((data) => {
                    this.setState({
                        usersLog: data,
                        showAddForm: true,
                    })
                    console.log(this.state.showAddForm)
                });
        //});
    }
    handleCloseAddForm() {
        this.setState({
            showAddForm: false
        });
    }
    handleCloseEditForm() {
        this.setState({
            showEditForm: false
        });
    }
    render() {
        console.log(this.state.showAddForm)
        return (
            <>
                <a id="createTodo"
                   className="createTodo"
                   href="#"
                   onClick={(event) => this.addTodoForm()}
                >
                    <p>Create TODO</p>
                </a>
                <AddForm showAddForm={this.state.showAddForm}
                         user={this.state.user}
                         usersLog={this.state.usersLog}
                         onCloseAddForm={this.handleCloseAddForm}
                    // getTodos={this.getTodos}
                />
            </>
        )
    }
}
