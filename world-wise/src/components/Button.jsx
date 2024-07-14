import styles from './Button.module.css'

function Button({ children, onClick}) {
    return (
        <button onClick={onClick} className={`${styles.btn} ${styles.primary}`}>
            {children}
        </button>
    )
}

export default Button