import styles from './PostNewThought.module.css';
import { useState, useEffect } from "react";

export const PostNewThought = ({ newMessage, fetchPost }) => {
    // using useState to define state variables for the component
    const [newThoughts, setNewThoughts] = useState("");
    const [errorAlert, setErrorAlert] = useState("");

    //check and set the value of the input field
    useEffect(() => {
        if (newThoughts.length >= 141) {
            setErrorAlert("Please write shorter than 140 characters");
        }
        else {
            setErrorAlert("")
        }
    }, [newThoughts]);

    //function to handle the submit of the form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("Form submitted", newThoughts);

        //check if the input field is empty or length is shorter than 4 characters
        if (newThoughts.length <= 4) {
            setErrorAlert("Please write at least 5 characters");
        } else {
            //post the new thought to the API
            const options = {
                method: "POST",
                body: JSON.stringify({ 
                message: `${newThoughts}`,
             }),
                headers: {
                    "Content-Type": "application/json"
                },
            };

            await fetch(
                'https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts',
                options
            )
            .then((response) => response.json()) //parse the response as json
            .then((data) => {
                newMessage(data);
                console.log(data);
                setNewThoughts("");
                    fetchPost();
                })
                .catch((error) => console.log(error));
        };
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleFormSubmit(event);
        }
    }

    return (
        <div className={styles.thoughtInputBox}>
            <form onSubmit={handleFormSubmit}>
                <h3 className={styles.h3}>What is making you happy right now?</h3>
                <textarea
                    rows="5"
                    cols="50"
                    placeholder="'A heart caught in love will never break..' – Mevlana."
                    value={newThoughts}
                    onChange={(e) => setNewThoughts(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <div className={styles.characterCount}>
                    <span className={styles.error}>{errorAlert}</span>
                    <span className={`${styles.length} ${newThoughts.length >= 140 ? styles.red : (newThoughts.length > 0 && newThoughts.length <= 4) ? styles.red : ""}`}>
                        {newThoughts.length}/140
                    </span>
                    </div>
                <button type="submit" id={styles.submitThoughtsBtn}>
                    <span className={styles.emoji} aria-label="heart emoji">❤️</span>
                    Send Happy Thought
                    <span className={styles.emoji} aria-label="heart emoji">❤️</span>
                </button>
            </form>
        </div>
    );
};
