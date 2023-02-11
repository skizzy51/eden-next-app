import styles from '../styles/css/Loading.module.css'

export function LoadingSpinner () {
    return (
        <div className={styles['loading-wrapper']}>
            <div className={styles['loading']}></div>
        </div>
    )
}