import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, faYoutube, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import styles from '../styles/css/App.module.css'
import { useRouter } from 'next/router'

export function Footer () {
    const router = useRouter()
    if (router.pathname === '/checkout'
    || router.pathname === '/sign-in'
    || router.pathname === '/admin'
    || router.pathname === '/admin-inventory'
    || router.pathname === '/admin-create-product'
    || router.pathname === '/admin-add-product'
    || router.pathname === '/admin-create-split-category'
    || router.pathname === '/admin-create-category') {
        return null
    }
    return (
        <footer className={styles['footer']}>
            <div className={styles['head']}>
                <img src="/eden super white.png" alt="logo" />
                <div className={styles['input-cont']}>
                    <h6 style={{ margin : '.5rem 0' }}>Get Latest Deals</h6>
                    <p style={{ margin : '.5rem 0' }}>Our best promotions sent to your inbox</p>
                    <div className={styles['input']}>
                        <input type={'email'} placeholder="Enter e-mail address" />
                        <span>Subscribe</span>
                    </div>
                </div>
            </div>
            <div className={styles['container']}>
                <div className={[styles['item']]}>
                    <h6>About Us</h6>
                    <a href="##">About Eden Supermarket</a>
                    <a href="##">Careers</a>
                    <a href="##">Forum</a>
                    <a href="##">Blog</a>
                </div>
                <div className={styles['item']}>
                    <h6>Help</h6>
                    <a href="##">Help Center</a>
                    <a href="##">How to shop on Eden Supermarket</a>
                    <a href="##">How to return a product on Eden</a>
                    <a href="##">Report a product</a>
                    <a href="##">Your Account</a>
                </div>
                <div className={styles['item']}>
                    <h6>More Info</h6>
                    <a href="##">Site Map</a>
                    <a href="##">Track my order</a>
                    <a href="##">Privacy Policy</a>
                    <a href="##">Authentic items Policy</a>
                </div>
                <div className={[styles['f-none'], styles['item']].join(" ")}>
                    <h6>Report a Product</h6>
                </div>
                <div className={[styles['f-none'], styles['item']].join(" ")}>
                    <h6>Terms & Conditions</h6>
                </div>
            </div><hr/>
            <div className={styles['contact-cont']}>
                <h5>Connect With Us</h5>
                <div>
                    <FontAwesomeIcon className={styles['social']} icon={faInstagram}/>
                    <FontAwesomeIcon className={styles['social']} icon={faFacebook}/>
                    <FontAwesomeIcon className={styles['social']} icon={faYoutube}/>
                    <FontAwesomeIcon className={styles['social']} icon={faTwitter}/>
                    <FontAwesomeIcon className={styles['social']} icon={faWhatsapp}/>
                </div>
            </div>
            <p className={styles['copyright']}>Copyright © 2022, Eden Supermarket. All rights reserved</p>
        </footer>
    )
}