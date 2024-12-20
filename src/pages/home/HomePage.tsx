
import HeaderClient from '../../components/HeaderClient';
import React from 'react';
import CarouselPoster from '../../components/CarouselPoster';
import  "../../styles/homepage.css"
const HomePage = () => {
    return (
        <div className="homepage-container">
            <div className="homepage-content">
                <HeaderClient />
                <div className="homepage-carousel">
                    <CarouselPoster />
                </div>
                
            </div>
        </div>
             
        
    );
};

export default HomePage;