import React from "react";
import $ from 'jquery';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

export default function TodoIndexTodos(props) {
    const {
        TODO,
        onDeleteTodo,
        onExportTodo,
        onRecordTodo,
        onEditTodoForm,
        isLoaded,
        editTodo,
    } = props;
    const handleDeleteTodo = function (event, TodoId) {
        event.preventDefault();
        const $link= $(event.currentTarget);
        $link.find('.fa')
            .removeClass('fa-trash')
            .addClass('fa-spinner')
            .addClass('fa-spin');
        console.log(TodoId);
        onDeleteTodo(TodoId);
    }
    const handleRecordTodo = function (event, TodoId) {
        event.preventDefault();
        const $link= $(event.currentTarget);
        $link.find('.fa')
            .removeClass('fa-eye')
            .addClass('fa-spinner')
            .addClass('fa-spin');
        onRecordTodo(TodoId);
    }
    const handleExportTodo = function (event, TodoId) {
        event.preventDefault();
        const $link= $(event.currentTarget);
        $link.find('.fa')
            .removeClass('fa-arrow-circle-down')
            .addClass('fa-check');
        onExportTodo(TodoId);
    }
    const handleEditForm = function (id) {
        //console.log(id)
        onEditTodoForm(id);
    }
    if (!isLoaded) {
        return (
            <tbody>
            <tr>
                <td colSpan="4" className="text-center">
                    Loading...
                </td>
            </tr>
            </tbody>
        )
    }
    return (
        <tbody>
    {TODO.map((TODO) => {
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
                        <Link to={`TODO/${TODO.id}`}
                              className="js-show-TODO"
                              style={{
                                  color: 'whitesmoke',
                              }}>
                            <p>{TODO.name}</p>
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
                                <a id="editTodo"
                                   className="editTodo"
                                   href="#"
                                   style={{
                                       color: 'whitesmoke',
                                   }}
                                   onClick={() => handleEditForm(TODO.id)}
                                >
                                        <i className="fa fa-pencil"/>
                                </a>
                                {" "}
                                <a href="#"
                                   style={{
                                       color: 'whitesmoke',
                                   }}
                                   onClick={(event) => handleDeleteTodo(event, TODO.id)}
                                >
                                    <i className="fa fa-trash"/>
                                </a>
                                {" "}
                            </center>
                        }
                        <Link to={`/recordTODO/${TODO.id}`}
                              id="recordTODO"
                              className="recordTODO"
                              style={{
                                  color: 'whitesmoke',
                              }}>
                                <i className="fa fa-eye"/>
                        </Link>
                        {" "}
                        <a href="#"
                           style={{
                               color: 'whitesmoke',
                           }}
                           onClick={(event) => handleExportTodo(event, TODO.id)}
                        >
                            <i className="fa fa-arrow-circle-down"/>
                        </a>
                    </center>
                </th>
            </tr>

        );})}
        </tbody>
    )
}
TodoIndexTodos.propTypes = {
    TODO: PropTypes.array.isRequired,
    onDeleteTodo: PropTypes.func.isRequired,
    onExportTodo: PropTypes.func.isRequired,
    onRecordTodo: PropTypes.func.isRequired,
    onEditTodoForm: PropTypes.func.isRequired,
    editTodo: PropTypes.array.isRequired,
    isLoaded: PropTypes.bool.isRequired,
};
