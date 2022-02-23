import React, {Component} from "react";
import TodoIndexList from "./TodoIndexList";
import {deleteTodo, exportTodo, getIndexItems, getTodoPls, getTodos, getUser, getUsers} from "../../api/TODO_api";
import Routing from '../../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js';
import $ from "jquery";
import AddForm from "../AddForm/TodoAddForm";
import EditForm from "../EditForm/TodoEditForm";
import FilterTodo from "./newIndexFilter";

const routes = require('../../../../public/js/fos_js_routes.json');
Routing.setRoutingData(routes);

export default class TodoIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditForm: false,
            showAddForm: false,
            user: [],
            usersLog: [],
            TODO: [],
            editTodo: [],
            isLoaded: false,
            deleteMessage: '',
            verifyStatus: 'open',
        };
        this.deleteMessageTimeoutHandle = 0;

        this.handleCloseEditForm = this.handleCloseEditForm.bind(this);
        this.editTodoForm = this.editTodoForm.bind(this);
        this.handleCloseAddForm = this.handleCloseAddForm.bind(this);
        this.addTodoForm = this.addTodoForm.bind(this);
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
        this.handleExportTodo = this.handleExportTodo.bind(this);
        this.handleRecordTodo = this.handleRecordTodo.bind(this);
        this.getTodos = this.getTodos.bind(this);
    }
    componentDidMount() {
        getIndexItems(this.state.verifyStatus)
            .then((data) => {
                this.setState({
                    TODO: data,
                    isLoaded: true,
                })
            }).then(() => {
            getTodos()
                .then((data) => {
                    this.setState( {
                        allTodos: data,
                    })
                })
        });
    }
    componentWillUnmount() {
        clearTimeout(this.deleteMessageTimeoutHandle);
    }
    getTodos(status) {
        console.log(status)
        getIndexItems(status)
            .then((data) => {
                this.setState({
                    TODO: data,
                    isLoaded: true,
                    verifyStatus: status
                })
            });
    }
    handleDeleteTodo(id) {
        this.setState((prevState) => {
            return {
                TODO: prevState.TODO.map(Todo => {
                    if (Todo.id !== id) {
                        return Todo;
                    }
                    return Object.assign({}, Todo, {isDeleting: true});
                })
            }
        });
        deleteTodo(id)
            .then(() => {
                this.setState((prevState) => {
                    return {
                        TODO: prevState.TODO.filter(DeletedTodo => DeletedTodo.id !== id)
                    }
                });
                this.setDeleteMessage('Todo Deleted!');
        });
    }
    handleExportTodo(id) {
        exportTodo(id)
            .then(() => {
                $.ajax({
                    success: function () {
                        window.location = `api/exportCsv/${id}`;
                        console.log('Export Successful');
                    }
                });
            });
    }
    //onClick={(event) => handleRecordTodo(event, TODO.id)}
    handleRecordTodo(id) {
        console.log(id)
    }
    setDeleteMessage(message) {
        this.setState({
            deleteMessage: message
        });

        clearTimeout(this.deleteMessageTimeoutHandle);
        this.deleteMessageTimeoutHandle = setTimeout(() => {
            this.setState({
                deleteMessage: ''
            });

            this.deleteMessageTimeoutHandle = 0;
        }, 3000);
    }
    addTodoForm() {
        getUser()
            .then((data) => {
                this.setState({
                    user: data,
                })
            }).then(() => {
            getUsers()
                .then((data) => {
                    this.setState({
                        usersLog: data,
                        showAddForm: true,
                    })
                });
        });
    }
    editTodoForm(id) {
        console.log(id)
        getTodoPls(id)
            .then((data) => {
                this.setState({
                    editTodo: data,
                });
                //console.log(this.state.editTodo[0])
            }).then(() => {
            getUsers()
                .then((data) => {
                    this.setState({
                        usersLog: data,
                    })
                }).then(() => {
                getUser()
                    .then((data) => {
                        this.setState({
                            user: data,
                            showEditForm: true,
                        })
                    })
            })
        });
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
        return (
            <>
                <AddForm
                    showAddForm={this.state.showAddForm}
                    user={this.state.user}
                    usersLog={this.state.usersLog}
                    onCloseAddForm={this.handleCloseAddForm}
                    getTodos={this.getTodos}
                />
                { this.state.showEditForm && <EditForm
                    showEditForm={this.state.showEditForm}
                    user={this.state.user}
                    usersLog={this.state.usersLog}
                    onCloseEditForm={this.handleCloseEditForm}
                    getTodos={this.getTodos}
                    editTodo={this.state.editTodo}
                />}
                <FilterTodo
                    TODOs={this.state.allTodos}
                />
                <TodoIndexList
                    {...this.state}
                    onDeleteTodo={this.handleDeleteTodo}
                    onExportTodo={this.handleExportTodo}
                    onRecordTodo={this.handleRecordTodo}
                    onGetTodos={this.getTodos}
                    onAddTodoForm={this.addTodoForm}
                    onEditTodoForm={this.editTodoForm}
                />
            </>
        )
    }
}
