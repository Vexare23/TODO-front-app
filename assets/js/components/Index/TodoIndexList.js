import React from "react";
import PropTypes from "prop-types";
import TodoIndexTodos from "./TodoIndexTodos";

export default function TodoIndexList(props) {
    const   {
        TODO,
        onDeleteTodo,
        onExportTodo,
        onGetTodos,
        onRecordTodo,
        onAddTodoForm,
        onEditTodoForm,
        isLoaded,
        deleteMessage,
        editTodo,
    } = props;

    const handleStatus = function (status, value) {
        onGetTodos(value);
    }
    const handleAddForm = function () {
        onAddTodoForm();
    }
    return (
        <>
            <div className="topnav">
                <a id="createTodo"
                   className="createTodo"
                   href="#"
                   onClick={(event) => handleAddForm()}
                >
                    <p>Create TODO</p>
                </a>

                <a id="openTodos"
                   className="openTodos"
                   href="#"
                   onClick={(event) => handleStatus(event, 'open')}
                >
                    <p>Opened</p>
                </a>
                <a id="doneTodos"
                   className="doneTodos"
                   href="#"
                   onClick={(event) => handleStatus(event, 'done')}
                >
                    <p>Done</p>
                </a>
            </div>
            <>
                <div className="q-container-show p-4">
                    <div className="row">
                        {deleteMessage && (
                            <div className="alert alert-success text-center">
                                {deleteMessage}
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
                            <TodoIndexTodos
                                TODO={TODO}
                                onDeleteTodo={onDeleteTodo}
                                onExportTodo={onExportTodo}
                                onGetTodos={onGetTodos}
                                onRecordTodo={onRecordTodo}
                                onEditTodoForm={onEditTodoForm}
                                isLoaded={isLoaded}
                                editTodo={editTodo}
                            />
                        </table>
                    </div>
                </div>
            </>
        </>
    );
}

TodoIndexList.propTypes = {
    TODO: PropTypes.array.isRequired,
    onDeleteTodo: PropTypes.func.isRequired,
    onExportTodo: PropTypes.func.isRequired,
    onGetTodos: PropTypes.func.isRequired,
    onRecordTodo: PropTypes.func.isRequired,
    onAddTodoForm: PropTypes.func.isRequired,
    onEditTodoForm: PropTypes.func.isRequired,
    editTodo: PropTypes.array.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    deleteMessage: PropTypes.string.isRequired,
}
