import React, {Component} from "react";
import TodoListRender from "./TodoListRender";
import {getTodoPls, getUser, markTodo} from "../../api/TODO_api";

import $ from "jquery";

export default class ShowTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoId: window.location.pathname.split("/")[2],
            todoInfo: [],
            user: [],
            isLoaded: false,
            canBeDone: false,
        };
    }
    componentDidMount() {
        getTodoPls(this.state.todoId)
            .then((data1) =>{
                getUser()
                    .then((data2) =>{
                        this.setState({
                            todoInfo: data1,
                            user: data2,
                            isLoaded: true,
                        });
                        this.setState({
                            canBeDone: ((this.state.user[0].isAdmin && this.state.todoInfo[0].status === false) ||
                                this.state.todoInfo[0].status === false &&
                                this.state.user[0].email === this.state.todoInfo[0].assignedTo &&
                                this.state.todoInfo[0].assignedTo !== "Nobody")
                        })
                    });
            });
    }
    markTodoAsDone(todoId, e) {
        e.preventDefault()
        const $link = $(e.currentTarget);
        $link.addClass('text-danger');
        $link.fadeOut();
        markTodo(todoId).then(() => {
            console.log('todo marked as done!');
            $link.fadeOut(2000, function(){
                //redirect?
            });
        });
    }
    render() {
        return (
            <TodoListRender
                {...this.state}
                markTodo={this.markTodoAsDone}
            />
        )
    }
}
