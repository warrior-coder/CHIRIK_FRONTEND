import React from 'react';
import './sidebar-tab.css';
import { Link } from 'react-router-dom';

interface SidebarTabProps {
    Icon: any;
    active?: boolean;
    children: React.ReactNode;
    linkTo: string;
}

function SidebarTab({ Icon, active, children, linkTo }: SidebarTabProps) {
    return (
        <Link to={linkTo} className="SidebarTab">
            <div className={`SidebarTab__body ${active ? 'SidebarTab__body_active' : ''}`}>
                <Icon className={'SidebarTab__icon'} />
                <h2 className={'SidebarTab__text'}>{children}</h2>
            </div>
        </Link>
    );
}

export default SidebarTab;
