import React, {useState} from "react";
import TodoAddFormChild from "./TodoAddFormChild";
import {createTodo} from "../../api/TODO_api";
import {Button, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import TrueModal from "../Modal";

export default function AddForm(props) {
    const [showAddModal, setShowAddModal] = useState(false)
    const   {
        showAddForm,
        user,
        usersLog,
        onCloseAddForm,
        //getTodos,
    } = props;
    const addTodoForm = function (formData) {
        createTodo(formData)
            .then(data => {
                console.log(data);
                onCloseAddForm()
                //getTodos('open')
            })
    }
    const handleClose = function () {
        onCloseAddForm()
    }

    return (
        <>
            <Modal show={showAddForm}
                   onHide={handleClose}
                   backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title><h2>Add a new TODO</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TodoAddFormChild
                        user={user}
                        usersLog={usersLog}
                        submitForm={addTodoForm}
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
AddForm.propTypes = {
    showAddForm: PropTypes.bool.isRequired,
    user: PropTypes.array.isRequired,
    usersLog: PropTypes.array.isRequired,
    onCloseAddForm: PropTypes.func.isRequired,
};
