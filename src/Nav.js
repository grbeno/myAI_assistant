import React from 'react';

export default function Nav() {
    return(
        <header>
            <nav class="navbar navbar-expand-md fixed-top border-bottom shadow-sm">
                <a class="menu-link navbar-brand mr-auto px-4 text-success" href="/"><span data-toggle="tooltip" title="Home"><i class="fa-solid fa-kiwi-bird fa-2x"></i></span></a>
                <a class="h5 m-4 text-secondary d-block" href="/no4uh/"><i class="fa-solid fa-user fa-2x"></i></a>
            </nav>
        </header>
    )
}