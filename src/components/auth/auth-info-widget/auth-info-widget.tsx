import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import './auth-info-widget.css';

function AuthInfoWidget() {
    return (
        <div className="AuthInfoWidget">
            <div className="AuthInfoWidget__element">
                <SearchIcon className="AuthInfoWidget__icon" />
                <span className="AuthInfoWidget__text">Follow your interests.</span>
            </div>
            <div className="AuthInfoWidget__element">
                <PeopleOutlineIcon className="AuthInfoWidget__icon" />
                <span className="AuthInfoWidget__text">Hear what people are talking about.</span>
            </div>
            <div className="AuthInfoWidget__element">
                <ChatBubbleOutlineIcon className="AuthInfoWidget__icon" />
                <span className="AuthInfoWidget__text">Join the conversation.</span>
            </div>
        </div>
    );
}

export default AuthInfoWidget;
