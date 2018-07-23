import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className = {classes.NavigationItems}>
        <NavigationItem link ="/" exact>Burger Builder</NavigationItem>
        
        {
            localStorage.getItem("token") !== "null" 
            ? <NavigationItem link ="/orders">Orders</NavigationItem>
            : null
        }     
        
        <NavigationItem link ="/auth">
            {
                localStorage.getItem("token") !== "null"
                ? "Log Out"
                : "Authenticate"
            }
        </NavigationItem>
    </ul>
);

export default navigationItems;