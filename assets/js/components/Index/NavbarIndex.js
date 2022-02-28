import React from "react";
import {useUser} from "@auth0/nextjs-auth0";


export default function NavbarComponent() {
    const { user, isLoading } = useUser();
        return (
            <>
                {user && (
                    <div className="nav_buttons">
                        <div>
                            <a id="tag-Username"
                               className="logged_in_as"
                               style={{
                                   color: 'whitesmoke',
                                   fontSize: 15,
                               }}
                            >Logged in as {user.nickname}
                            </a>
                            {" "}
                            <a    href={`api/auth/logout`}
                                  id="button-Logout">
                                <button
                                    className="btn btn-primary"
                                    style={{
                                        color: 'whitesmoke',
                                        fontSize: 15,
                                    }}
                                >Log Out
                                </button>
                            </a>
                        </div>
                    </div>
                )}
                {!user && !isLoading &&(
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
                            <a    href={`api/auth/login`}
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
                            </a>
                            {" "}
                        </div>
                    </div>
                )}
            </>
        )
}
NavbarComponent.propTypes = {
}
