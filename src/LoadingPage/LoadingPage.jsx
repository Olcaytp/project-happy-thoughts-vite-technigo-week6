import styles from "./LoadingPage.module.css";

export const LoadingPage = () => {
    return (
        <div className={styles.loadingSpinner}>
            <h1 className={styles.loadingTitle}>Loading...</h1>
        </div>
    );
}
