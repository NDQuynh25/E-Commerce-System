
import HeaderClient from '../../components/home/HeaderClient';
import CarouselPoster from '../../components/CarouselPoster';
import CarouselItem from '../../components/home/CarouselItem';
import CustomCountdown from '../../components/CustomCountdown';
import  "../../styles/homepage.css"
import { Col, Row, Statistic } from 'antd';
import VideoPlayer from '../../components/VideoPlayer';

const { Countdown } = Statistic;

const HomePage = () => {
    const poster_1 = [
        'image 37.png',
        'test2.webp',
        'image 37.png',
        'image 37.png',
    ];
    const poster_2 = [
        'poster-new-arrival-1.png',
        'poster-new-arrival-2.png',
        'poster-new-arrival-3.png',
    ];
 
    return (
        <div className="homepage-container">
            <div className="homepage-content">
                <HeaderClient />
                <div className="homepage-carousel">
                    <CarouselPoster image={poster_1}/>
                    
                </div>
                <div className="homepage-carousel-flash-sale">
                    <div style={{display: 'flex',  alignItems: 'center'}}>
                        <img src='flash-sale.png' alt="flash-sale" />
                        <div style={{marginTop: '7px', marginLeft: "10px", display: 'flex',  alignItems: 'center', justifyContent: 'center'}}>
                            <CustomCountdown  />
                        </div>  
                    </div>
                    <CarouselItem 
                        slidesToShow={6}
                        slidesToScroll={1}
                    />
                </div>
                <div className="homepage-carousel-new-arrival">
                    <div style={{width: "32%", marginTop: "15px", marginLeft: "10px", paddingRight: "10px", marginBottom:"20px"}}>
                        <CarouselPoster image={poster_2} width='425px' height= '425px'/>
                    </div>
                    <div style={{width: "66.5%"}}>
                        <img src='new-arrival.png' alt="new-arrival" style={{height: "65px"}} />
                        <CarouselItem 
                            slidesToShow={4}
                            slidesToScroll={1}
                        />
                    </div>
                    
                </div>
                <div className='homepage-footer' style={{height: "500px"}}>
                </div>

                
            </div>
        </div>
             
        
    );
};

export default HomePage;