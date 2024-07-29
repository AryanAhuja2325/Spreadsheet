import React, { useEffect, useState } from 'react';
import Navbar from '../components/miscellaneous/Navbar';
import Home from '../components/dashboard/Home';
import MyWorkbooks from '../components/dashboard/MyWorkbooks';
import Profile from '../components/dashboard/Profile';

const Dashboard = () => {
    const [selected, setSelected] = useState("");

    const handleSelect = (selection) => {
        setSelected(selection);
    }

    const renderComponents = () => {
        switch (selected) {
            case 'Home':
                return <Home />
            case 'My Workbooks':
                return <MyWorkbooks />
            case 'Profile':
                return <Profile />
            default:
                return <Home />
        }
    }

    return (
        <div className='Dashboard'>
            <Navbar onSelect={handleSelect} />
            <div className="pt-16">
                {renderComponents()}
            </div>
        </div>
    )
}

export default Dashboard;
