import React from "react";
import Link from 'next/link'
import {deleteTodo, exportTodo, getIndexItems, getTodos} from "../../api/TODO_api";
import $ from "jquery";
import AddForms from "../Forms";

const Loading = () => {
        return (
            <tbody>
            <tr>
                <td colSpan="4"
                    className="text-center">
                    Loading...
                </td>
            </tr>
            </tbody>
        )
}

export default class FilterTodo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            verifyStatus: false,
            filteredTodo: [],
            allTodos: [],
            deleteMessage: '',
        }
        this.deleteMessageTimeoutHandle = 0;

        this.filterTodos = this.filterTodos.bind(this);
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
        this.handleEditForm = this.handleEditForm.bind(this);
        this.handleExportTodo = this.handleExportTodo.bind(this);

    }
    componentDidMount() {
        getIndexItems()
            .then((data) => {
                this.setState({
                    filteredTodo: data,
                });
            }).then(() => {
            getTodos()
                .then((data) => {
                    this.setState({
                        allTodos: data,
                        isLoaded: true,
                    });
                });
        })

    }
    componentWillUnmount() {
        clearTimeout(this.deleteMessageTimeoutHandle);
    }
    filterTodos(e, value) {
        //const searchValue = e.target.value;
        const currentTodos = [...this.state.allTodos];
        const matchingTodos = currentTodos.filter((TODO) => TODO.status === value)
        this.setState({
            filteredTodo: matchingTodos,
        });
    }
    handleDeleteTodo(e, id) {
        this.setState((prevState) => {
            return {
                filteredTodo: prevState.filteredTodo.map(Todo => {
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
                        filteredTodo: prevState.filteredTodo.filter(DeletedTodo => DeletedTodo.id !== id)
                    }
                });
                this.setDeleteMessage('Todo Deleted!');
            });
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
    handleEditForm(id) {
        console.log('edit')
        console.log(id)
    }
    handleExportTodo(e, id) {
        console.log('exporting')
        console.log(id);
        exportTodo(id)
            .then(() => {
                $.ajax({
                    success: function () {
                        window.location = `http://localhost/api/exportCsv/${id}`;
                        console.log('Export Successful');
                    }
                });
            });
    }
    render() {
        return (
            <>
                <AddForms/>
                <div className="topnav">
                    <a id="openTodos"
                       className="openTodos"
                       href="#"
                       onClick={(event) => this.filterTodos(event, false)}
                    >
                        <p>Opened</p>
                    </a>
                    <a id="doneTodos"
                       className="doneTodos"
                       href="#"
                       onClick={(event) => this.filterTodos(event, true)}
                    >
                        <p>Done</p>
                    </a>
                </div>
                <div className="q-container-show p-4">
                    <div className="row">
                        { this.state.deleteMessage && (
                            <div className="alert alert-success text-center">
                                {this.state.deleteMessage}
                            </div>
                        )}
                        <table className="table_TODO js-todos-show">
                            <thead>
                            <tr>
                                <th>
                                    <center>ID:</center>
                                </th>
                                <th>
                                    <center>To be done by:</center>
                                </th>
                                <th>
                                    <center>TODO name:</center>
                                </th>
                                <th>
                                    <center>Assigned to:</center>
                                </th>
                                <th>&nbsp;</th>
                            </tr>
                            </thead>
                            {!this.state.isLoaded && <Loading/>}
                            {this.state.filteredTodo && (<tbody>
                            {this.state.filteredTodo.map((TODO) => {
                                return(
                                    <tr key = {TODO.id}
                                        style={{
                                            opacity: TODO.isDeleting ? .3 : 1
                                        }}
                                    >
                                        <th>
                                            <center>
                                                {TODO.id}
                                            </center>
                                        </th>
                                        <th>
                                            <center>
                                                {TODO.datetime}
                                            </center>
                                        </th>
                                        <th>
                                            <center>
                                                <Link
                                                    as={`/TODO/${TODO.id}`}
                                                    href="/TODO/[id]"
                                                    className="js-show-TODO"
                                                    style={{
                                                        color: 'whitesmoke',
                                                    }}>
                                                    <a>{TODO.name}</a>
                                                </Link>
                                            </center>
                                        </th>
                                        <th>
                                            <center>
                                                <strong>
                                                    {TODO.assignedTo}
                                                </strong>
                                            </center>
                                        </th>
                                        <th>
                                            <center>
                                                {!TODO.status &&
                                                <center>
                                                    <a
                                                        href="#"//editTodo
                                                        className="editTodo"
                                                        style={{
                                                            color: 'whitesmoke',
                                                        }}
                                                        onClick={() => this.handleEditForm(TODO.id)}
                                                    >
                                                        <i className="fa fa-pencil"/>
                                                    </a>
                                                    {" "}
                                                    <a
                                                        href="#"
                                                        style={{
                                                            color: 'whitesmoke',
                                                        }}
                                                        onClick={(event) => this.handleDeleteTodo(event, TODO.id)}
                                                    >
                                                        <i className="fa fa-trash"/>
                                                    </a>
                                                    {" "}
                                                </center>
                                                }
                                                <Link
                                                    as={`/record/${TODO.id}`}
                                                    href="/record/[id]"
                                                    id="recordTODO"
                                                    className="recordTODO"
                                                    style={{
                                                        color: 'whitesmoke',
                                                    }}>
                                                    <a>
                                                    <i className="fa fa-eye"/>
                                                    </a>
                                                </Link>
                                                {" "}
                                                <a
                                                    href="#"
                                                    style={{
                                                        color: 'whitesmoke',
                                                    }}
                                                    onClick={(event) => this.handleExportTodo(event, TODO.id)}
                                                >
                                                    <i className="fa fa-arrow-circle-down"/>
                                                </a>
                                            </center>
                                        </th>
                                    </tr>
                                );})}
                            </tbody>)}
                        </table>
                    </div>
                </div>
            </>
        )
    }
}
