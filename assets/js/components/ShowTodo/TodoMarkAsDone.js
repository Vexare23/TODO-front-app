import React from "react";
import PropTypes from 'prop-types';

function isAdmin(user, todoInfo, isLoaded, canBeDone) {
    if (isLoaded) {
        return !!((canBeDone));
    }
}

export default function TodoMarkAsDone (props) {
    const {todoId, markTodo, user, todoInfo, isLoaded, canBeDone} = props;

    if (isAdmin(user, todoInfo, isLoaded, canBeDone))
    {
        return (
            <center><a href="#"
               className="js-mark-todo-as-done"
               id="js-mark-todo-button"
               onClick={(e) => markTodo(todoId, e)}
            >DONE{" "}
                <span className="fa fa-train"/>
            </a></center>
        );
    } else {
        return "";
    }
}

TodoMarkAsDone.propTypes = {
    todoId: PropTypes.any.isRequired,
    markTodo: PropTypes.func.isRequired,
    todoInfo: PropTypes.array.isRequired,
    user: PropTypes.array.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    canBeDone: PropTypes.bool.isRequired,
};
