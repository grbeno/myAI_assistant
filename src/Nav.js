import React from 'react';
import logout from './logout';

 const Nav = (props) => {
    return(
        <header>
            <nav class="navbar navbar-expand-md fixed-top border-bottom shadow-sm">
                <a class="menu-link navbar-brand mr-auto px-4 text-success" href="/"><span data-toggle="tooltip" title="home"><i class="fa-solid fa-kiwi-bird fa-2x"></i></span></a>
                {props.auth && (
                    <a class="h5 m-4 text-light d-block" href="#" onClick={logout}><span data-toggle="tooltip" title="logout"><i class="fa-solid fa-power-off fa-2x"></i></span></a>
                )}
                <a class="h5 m-4 text-light d-block" href="/no4uh/"><span data-toggle="tooltip" title="django-admin"><i class="fa-solid fa-id-card-clip fa-2x"></i></span></a>
            </nav>
        </header>
    )
}

export default Nav;