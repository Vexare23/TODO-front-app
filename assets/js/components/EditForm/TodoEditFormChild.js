import React, {Component} from "react";
import PropTypes from "prop-types";
import moment from "moment";

function AdminFormRender(user,usersLog, assignedToInput) {
    let AdminForm = '';
    user.map(user => {
        if (user.isAdmin) {
            AdminForm =
                <div className="form-group">
                    <div className="mb-3">
                        <label className="form-label"
                               htmlFor="todo_form_assignedTo"
                        >
                            <p
                                style={{
                                    color: '#01116c',
                                }}
                            >Assigned to</p>
                        </label>
                        <select id="todo_form_assignedTo"
                                ref={assignedToInput}
                                className="form-select"
                        >
                            <option value="">
                                Nobody
                            </option>
                            {usersLog.map(option => {
                                return <option value={option.id} key={option.id}>{option.email}</option>
                            })}
                        </select>
                    </div>
                </div>
        }
    })
    return AdminForm;
}

export default class TodoEditFormChild extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dateTimeError: '',
            selectedDatetime: moment(new Date()).format('YYYY-MM-DDTHH:mm')
        };

        this.nameInput = React.createRef();
        this.descriptionInput = React.createRef();
        this.assignedToInput = React.createRef();

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleDatetimeChange = this.handleDatetimeChange.bind(this);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const {submitForm, user} = this.props;
        const {selectedDatetime} = this.state;

        const nameInput = this.nameInput.current;
        const descriptionInput = this.descriptionInput.current;
        const assignedToInput = this.assignedToInput.current;

        let d = moment(new Date()).format('YYYY-MM-DDTHH:mm');
        if (this.state.selectedDatetime < d) {
            console.log('not good?');
            console.log(selectedDatetime);
            this.setState({
                dateTimeError: 'The to be done by date, cannot be in the past!'
            })
        } else {
            console.log('good')
            if(user[0].isAdmin) {
                const formData = {
                    name: `${nameInput.value}`,
                    description: `${descriptionInput.value}`,
                    datetime: `${selectedDatetime}`,
                    assignedTo: `${assignedToInput.options[assignedToInput.selectedIndex].value}`,
                };
                this.setState({
                    dateTimeError: '',
                    selectedDatetime: ''
                })
                nameInput.value = '';
                descriptionInput.value = '';
                assignedToInput.selectedIndex = 0;

                submitForm(formData);
            } else {
                const formData = {
                    name: `${nameInput.value}`,
                    description: `${descriptionInput.value}`,
                    datetime: `${selectedDatetime}`,
                };
                this.setState({
                    dateTimeError: '',
                    selectedDatetime: ''
                })
                nameInput.value = '';
                descriptionInput.value = '';

                submitForm(formData);
            }
        }

    }

    handleDatetimeChange(event) {
        this.setState({
            selectedDatetime: event.target.value
        })
        let d = moment(new Date()).format('YYYY-MM-DDTHH:mm');
        if (this.state.selectedDatetime < d) {
            console.log('not good')
            this.setState({
                dateTimeError: 'The to be done by date, cannot be in the past!'
            })
        } else {
            console.log('good')
            this.setState({
                dateTimeError: '',
            })
        }

    }

    render() {
        const {dateTimeError, selectedDatetime} = this.state;
        const {user, usersLog, editTodo} = this.props;

        //console.log(moment(editTodo[0].datetime).format('YYYY-MM-DDTHH:mm'))
        //console.log(moment(new Date()).format('YYYY-MM-DDTHH:mm'))

        return (
            <div>
                <div className="js-new-TODO">
                    <form name="todo_form"
                          method="post"
                          className="form1 js-new-todo-form"
                          data-url="{{ path('api_newTODO')}}"
                          onSubmit={this.handleFormSubmit}
                    >
                        <div className="form-group">
                            <div className="mb-3">
                                <label htmlFor="todo_form_name"
                                       className="form-label required"
                                >
                                    <p
                                        style={{
                                            color: '#01116c',
                                        }}
                                    >Name</p>
                                </label>
                                <input type="text"
                                       id="todo_form_name"
                                       ref={this.nameInput}
                                       required="required"
                                       placeholder="TODO name"
                                       className="form-control"
                                       defaultValue={editTodo[0].name}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="mb-3">
                                <label htmlFor="todo_form_description"
                                       className="form-label required"
                                >
                                    <p
                                        style={{
                                            color: '#01116c',
                                        }}
                                    >Description</p>
                                </label>
                                <input
                                    type="text"
                                    id="todo_form_description"
                                    ref={this.descriptionInput}
                                    required="required"
                                    maxLength="255"
                                    placeholder="TODO description"
                                    className="form-control"
                                    defaultValue={editTodo[0].description}

                                />
                            </div>
                        </div>

                        <div className={`form-group ${dateTimeError ? 'has-error' : ''}`}>
                            <div className="mb-3">
                                <label htmlFor="todo_form_datetime"
                                       className="form-label required"
                                >
                                    <p
                                        style={{
                                            color: '#01116c',
                                        }}
                                    >To be done by</p>
                                </label>
                                <input type="datetime-local"
                                       id="todo_form_datetime"
                                       value={selectedDatetime}
                                       onChange={this.handleDatetimeChange}
                                       required="required"
                                       className="form-control"

                                />
                                {dateTimeError && <center>
                                    <span
                                        className="help-block"
                                        style={{
                                            color: 'red',
                                        }}
                                    >{dateTimeError}
                                    </span></center> }
                            </div>
                        </div>
                        {AdminFormRender(user, usersLog, this.assignedToInput)}
                        <br/>
                        <button type="submit"
                                className="btn btn-question js-bt-submit"
                                style={{
                                    color: 'whitesmoke',
                                }}
                        >Save
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

TodoEditFormChild.propTypes = {
    editTodo: PropTypes.array.isRequired,
    user: PropTypes.array.isRequired,
    usersLog: PropTypes.array.isRequired,
    submitForm: PropTypes.func.isRequired,
};
