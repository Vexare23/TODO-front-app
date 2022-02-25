import React, {Component} from "react";
import {getRecord} from "./api/TODO_api";

export default class RecordTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apiLog: [],
            isLoaded: false,
            highlightedRowId: null,
        };
    }

    componentDidMount() {
        getRecord(window.location.pathname.split("/")[2])
            .then((data) =>{
                this.setState({
                    apiLog: data,
                    isLoaded: true,
                })
                console.log(this.state.apiLog)
            });
    }
    render() {
        const {
            highlightedRowId,
            apiLog,
        } = this.state;

        let id = 0;
        let actionNumber = 0;
        let t1 = '', t2 = '', t3 = '',t4 = '';
        return (
            <div>
                <h1 style={{
                    color: 'whitesmoke',
                }}
                ><center>Record of TODO:</center></h1>
                <br/>
                <table className="table"
                       style={{
                           color: 'whitesmoke',
                       }}
                >
                    <thead>
                    <tr
                        key = {id++}
                        className = {highlightedRowId === id ? 'info' : ''}

                    >
                        <th>Action</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Datetime</th>
                    </tr>
                    </thead>
                    <tbody>
                    {apiLog.map((apiLog) => {
                        if (apiLog.name === null) {
                            t1 = 'No change';
                        } else {
                            t1 = apiLog.name;
                        }
                        if (apiLog.description === null) {
                            t2 = 'No change';
                        } else {
                            t2 = apiLog.description;
                        }
                        if ((apiLog.status === false) || (apiLog.status === null)) {
                            t3 = 'To be done';
                        } else {
                            t3 = 'Done';
                        }
                        if (apiLog.dueDate === null) {
                            t4 = 'No change';
                        } else {
                            t4 = apiLog.dueDate;
                        }
                        return (
                            <tr key={actionNumber++}>
                                <td>{apiLog.action}</td>
                                <td>{t1}</td>
                                <td>{t2}</td>
                                <td>{t3}</td>
                                <td>{t4}</td>
                            </tr>
                        );})}
                    </tbody>
                </table>
            </div>
        );
    }
}
