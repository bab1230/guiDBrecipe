import React from 'react';
import './Sidebar.css';
import profilepic from './profilepic.jpg'



const sidebar = props => {
    

    let sidebarClasses = 'sidebar';

    if(props.show) {
        sidebarClasses = 'sidebar open'
    }

    return (
        <div className={sidebarClasses} style={{width: "15%"}}>
            <img className="profile-pic" src={profilepic} alt="profile picture"></img>
            <ul className="sidebar-list" width="100%">
                <li><a href='/' onClick={props.setTableDataFavorites()}>Favorites</a></li>
                <li><a href='/' onClick={props.setTableDataPantry()}>Pantry</a></li>
                <li><a href='/' onClick={props.setTableDataFridge()}>Refridgerator</a></li>
                <li><a href='/' onClick={props.setTableDataAppliances()}>Appliances</a></li>
                <li><a href='/'>Settings</a></li>
            </ul>
        </div>
    );
};

export default sidebar;