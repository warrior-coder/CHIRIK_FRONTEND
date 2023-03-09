import './home-page.css';
import React from 'react';

import Sidebar from '../sidebar/sidebar';
import Widgets from '../widgets/widgets';

import HomePageFeed from './home-page-feed/home-page-feed';
import HomePageHeader from './home-page-header/home-page-header';

function HomePage() {
    return (
        <div className="HomePage">
            <Sidebar activeElement="HomePage" />

            <div className="HomePage__container">
                <HomePageHeader />
                <HomePageFeed />
            </div>

            <Widgets />
        </div>
    );
}

export default HomePage;
