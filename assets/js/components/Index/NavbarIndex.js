import Link from 'next/link'
import React from "react";
import PropTypes from "prop-types";


export default function NavbarComponent(props) {
    const {
        user,
    } = props;
    if(!user[0]) {
        return null;
    }
    if(user[0].email) {
        return (
            <div className="nav_buttons">
                <div>
                    <a id="tag-Username"
                       className="logged_in_as"
                       style={{
                           color: 'whitesmoke',
                           fontSize: 15,
                       }}
                    >Logged in as {user[0].email}
                    </a>
                    {" "}
                    <Link href="/logout"
                          id="button-Logout"
                          className="btn btn-primary">
                        <a

                            style={{
                                color: 'whitesmoke',
                             fontSize: 15,
                             }}
                        >Log Out
                        </a>
                    </Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className="nav_buttons">
                <div>
                    <a id="tag-not-logged-in"
                       className="not_logged_in"
                       style={{
                           color: 'whitesmoke',
                           fontSize: 15,
                       }}
                    >Not logged in
                    </a>
                    {" "}
                    <Link href="/login"
                          id="button-Login"
                          className="btn btn-primary">
                        <a
                            style={{
                                color: 'whitesmoke',
                                fontSize: 15,
                            }}
                        >Log In
                        </a>
                    </Link>
                    {" "}
                    <Link href="/register"
                          id="button-Signup"
                          className={"btn btn-dark"}>
                        <a
                            style={{
                                color: 'whitesmoke',
                                fontSize: 15,
                            }}
                        >Sign up
                        </a>
                    </Link>
                </div>
            </div>
        )
    }
}
NavbarComponent.propTypes = {
    user: PropTypes.array.isRequired,
}
