import React from 'react';
import logout from './logout';
// import sessionTimer from './session';

 const Nav = (props) => {
    return(
        <header>
            <nav className="navbar navbar-expand-md fixed-top border-bottom shadow-sm">
                <a className="menu-link navbar-brand mr-auto px-4 text-success" href="/"><span data-toggle="tooltip" title="home"><i class="fa-solid fa-kiwi-bird fa-2x"></i></span></a>
                {props.auth && (
                <>
                    <span className="h6 mx-2 text-success"><i className="fa-solid mx-2 fa-robot"></i>Welcome {props.user}! You are now logged in.</span>
                    <span className="h6 mx-2 text-success"><i className="fa-solid mx-2 fa-clock"></i>Session expires in {/*sessionTimer()*/}</span>
                    <a className="h5 m-4 text-light d-block" href="#" onClick={logout}><span data-toggle="tooltip" title="logout"><i className="fa-solid fa-power-off fa-2x"></i></span></a>
                </>
                )}
                <a className="h5 m-4 text-light d-block" href="/no4uh/"><span data-toggle="tooltip" title="django-admin"><i className="fa-solid fa-id-card-clip fa-2x"></i></span></a>
            </nav>
        </header>
    )
}

export default Nav;