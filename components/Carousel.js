import styles from '../styles/css/Home.module.css'
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css'

export function HomeCarousel() {
    return (
        <Carousel className={styles['Carousel-cont']}>
            <Carousel.Item>
                <div className={styles["images"]} style={{backgroundImage : 'url(/jeshoots-com-7VOyZ0-iO0o-unsplash.jpg)'}} ></div>
                <Carousel.Caption className={styles['carousel-caption']}>
                    <h3>Christmas Deals</h3>
                    <p>Get a 20% discount on winter clothes bought between now and Dec 24th!!!</p>
                </Carousel.Caption>
            </Carousel.Item>
            
            <Carousel.Item>
                <div className={styles["images"]} style={{backgroundImage : 'url(/patrick-fore-hoxqcGUheeo-unsplash.jpg)'}} ></div>
                <Carousel.Caption className={styles['carousel-caption']}>
                    <h3>ThanksGiving Deals</h3>
                    <p>Get a 10% discount on all kitchen utensils bought between now and friday!!!</p>
                </Carousel.Caption>
            </Carousel.Item>
            
            <Carousel.Item>
                <div className={styles["images"]} style={{backgroundImage : 'url(/daniel-romero-73tFTwOrKPg-unsplash.jpg)'}} ></div>
                <Carousel.Caption className={styles['carousel-caption']}>
                    <h3>Phones</h3>
                    <p>Get 10% off on all phones purchased promo code 'PHONE'. Only available to all Eden premium members</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}