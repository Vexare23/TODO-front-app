import Link from "next/link";
import NavbarComponent from "./NavbarIndex";

const user = {"user":[{"email":"admin@example.com","isAdmin":true,"firstName":"Maynard","lastName":"Dickinson"}]}

export default function Header() {
    return (
        <header>
            <nav className="navbar">
                <div className="nav_home">
                    <Link href="/">
                        <a className="pl-2 d-inline font-weight-bold"
                           style={{
                               color: '#fff',
                               fontSize: 20,
                           }}
                        >TODO app
                        </a>
                    </Link>
                </div>
                <NavbarComponent
                    user={user.user}
                />
            </nav>
        </header>
    )
}
