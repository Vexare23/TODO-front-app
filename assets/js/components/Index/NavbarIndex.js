import Link from 'next/link'
import React from "react";
import {useUser} from "@auth0/nextjs-auth0";


export default function NavbarComponent(props) {
    const { user, isLoading } = useUser();
    console.log(user)
    if(user) {
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
                    <Link href="api/auth/logout"
                          id="button-LogouT">
                        <button
                            className="btn btn-primary"
                            style={{
                                color: 'whitesmoke',
                             fontSize: 15,
                             }}
                        >Log Out
                        </button>
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
                    <Link href="api/auth/login"
                          id="button-Login"
                          >
                        <button
                            className="btn btn-primary"
                            style={{
                                color: 'whitesmoke',
                                fontSize: 15,
                            }}
                        >Log In
                        </button>
                    </Link>
                    {" "}
                    <Link href="/register"
                          id="button-Signup">
                        <button
                            className={"btn btn-dark"}
                            style={{
                                color: 'whitesmoke',
                                fontSize: 15,
                            }}
                        >Sign up
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}
NavbarComponent.propTypes = {
}
