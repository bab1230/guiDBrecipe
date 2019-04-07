import React from 'react';

import './Toolbar.css';
import SidebarToggleButton from '../Sidebar/SidebarToggleButton';

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation"> 
            <div>
                <SidebarToggleButton click={props.sidebarClickHandler}/>
            </div>
            <div className="toolbar_logo"><a href="/">Recipeazy</a></div>
            <div className="spacer"></div>
            <div className="toolbar_navigation-items">
                <ul>
                    <li><a href="/">Reccomended</a></li>
                    <li><a href="/">Recipes</a></li>
                    <li><a href="/">Favorites</a></li>
                    <li><a href="/">My Account</a></li>
                </ul>
            </div>
        </nav>
    </header>
);



export default toolbar;