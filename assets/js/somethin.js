import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import TodoIndex from "./Index/TodoIndexApp";
import RecordTodo from "./TodoShowReccord";
import NavbarComponent from "./Index/NavbarIndex";
import {getUser} from "../api/TODO_api";
import ShowTodo from "./ShowTodo/TodoShowDetails";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
        };
    }
    componentDidMount() {
        getUser()
            .then((data) => {
                this.setState({
                    user: data,
                })
            });
    }
    render() {
        return (
            <>
                <Router>
                    <header>
                        <nav className="navbar">
                            <div className="nav_home">
                                <Link to="/">
                                    <p className="pl-2 d-inline font-weight-bold"
                                       style={{
                                           color: '#fff',
                                           fontSize: 20,
                                       }}
                                    >TODO app
                                    </p>
                                </Link>
                            </div>
                            <NavbarComponent
                                user={this.state.user}
                            />
                        </nav>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/app_logout" element={<Logout/>}/>
                            <Route path="/app_login" element={<Login/>}/>
                            <Route path="/app_register" element={<Register/>}/>
                            <Route path="/TODO/:id" element={<ShowTodoPls/>}/>
                            <Route path="/recordTODO/:id" element={<ShowRecord/>}/>
                        </Routes>
                    </header>
                </Router>
            </>
        );
    }
}

function Home() {
    return <TodoIndex/>;
}
function Logout() {
    return <h2>Logout</h2>;
}
function Login() {
    return <h2>Login</h2>;
}
function Register() {
    return <h2>Register</h2>;
}
function ShowTodoPls() {
    return <ShowTodo/>;
}
function ShowRecord() {
    return <RecordTodo/>;
}
