import React from "react";
import TodoEditFormChild from "./TodoEditFormChild";
import {createTodo} from "../../api/TODO_api";
import {Button, Modal} from "react-bootstrap";
import PropTypes from "prop-types";

export default function EditForm(props) {
    const   {
        editTodo,
        showEditForm,
        user,
        usersLog,
        onCloseEditForm,
        getTodos,
    } = props;
    const editTodoForm = function (formData) {
        createTodo(formData)
            .then(data => {
                console.log(data);
                onCloseEditForm()
                getTodos('open')
            })
    }
    const handleClose = function () {
        onCloseEditForm()
    }
    if(!showEditForm){
        return null;
    }
    console.log(editTodo)
    return (
        <>
            <Modal show={showEditForm}
                   onHide={handleClose}
                   backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title><h2>Edit current TODO</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TodoEditFormChild
                        editTodo={editTodo}
                        user={user}
                        usersLog={usersLog}
                        submitForm={editTodoForm}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
EditForm.propTypes = {
    showEditForm: PropTypes.bool.isRequired,
    user: PropTypes.array.isRequired,
    usersLog: PropTypes.array.isRequired,
    onCloseEditForm: PropTypes.func.isRequired,
    getTodos: PropTypes.func.isRequired,
    editTodo: PropTypes.array.isRequired,
};
