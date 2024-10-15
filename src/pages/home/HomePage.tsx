
import HeaderClient from '../../components/HeaderClient';
import style from "../../styles/homepage.module.css"
const HomePage = () => {
    return (
        <div className={style['homepage-container']}>
            <div className={style['homepage-header']}>
                <HeaderClient />
            </div>
            
        </div>
    );
};

export default HomePage;