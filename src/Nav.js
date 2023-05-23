import React from 'react';

export default function Nav() {
    return(
        <header>
            <nav class="navbar navbar-expand-lg p-3 border-bottom shadow-sm">
                <a class="menu-link navbar-brand mr-auto px-4 text-success" href="/"><span data-toggle="tooltip" title="Főoldal"><i class="fa-solid fa-kiwi-bird fa-2x"></i></span></a>
            </nav>
        </header>
    )
}