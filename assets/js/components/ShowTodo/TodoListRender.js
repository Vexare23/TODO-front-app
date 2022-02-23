import React from "react";
import TodoList from "./TodoList";
import TodoMarkAsDone from "./TodoMarkAsDone";
import PropTypes from "prop-types";

export default function TodoListRender(props) {
    const   {todoId, markTodo, todoInfo, user, isLoaded, canBeDone} = props;

    return (
        <div>
            <h1 style={{
                    color: 'whitesmoke',
                }}
            ><center>TODO details</center></h1>
            <br/>
            <table id="TODO_show_table" className="table_TODO">
                <thead>
                <tr>
                    <th>
                        <center>To be done by</center>
                    </th>
                    <th>
                        <center>TODO name</center>
                    </th>
                    <th>
                        <center>Description</center>
                    </th>
                    <th>
                        <center>Assigned to</center>
                    </th>
                </tr>
                </thead>
                <TodoList
                    todoInfo={todoInfo}
                />
            </table>
            <TodoMarkAsDone
                todoId={todoId}
                markTodo={markTodo}
                user={user}
                todoInfo={todoInfo}
                isLoaded={isLoaded}
                canBeDone={canBeDone}
            />
        </div>
    );
}

TodoListRender.propTypes = {
    todoId: PropTypes.any.isRequired,
    markTodo: PropTypes.func.isRequired,
    todoInfo: PropTypes.array.isRequired,
    user: PropTypes.array.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    canBeDone: PropTypes.bool.isRequired,
};
