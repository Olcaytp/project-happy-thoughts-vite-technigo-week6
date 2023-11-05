import { useEffect, useState } from "react";
import styles from "./MainContent.module.css";
import { DisplayPosts } from "../DisplayPosts/DisplayPosts";
import { PostNewThought } from "../PostNewThought/PostNewThought";
import { LoadingPage } from "../LoadingPage/LoadingPage";

export const MainContent = () => {
    const [thoughts, setThoughts] = useState([]);
    const [likedCount, setLikedCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchPost();
      const count = JSON.parse(localStorage.getItem('likedPosts') || '[]').length;
      setLikedCount(count);
    }, []);

      const fetchPost = async () => {
        try {
          const response = await fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts");
          if (response.status >= 400 && response.status < 600) {
            throw new Error(
              JSON.stringify({
                code: response.status,
                message: data.message,
                errorDetail: data.errors.message.message,
              })
            );
          }
          const data = await response.json();
          setThoughts(data);
          console.log(data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };

      const addNewThoughts = () => {
        fetchPost();
    };

      const updateLikedCount = () => {
        const count = JSON.parse(localStorage.getItem('likedPosts') || '[]').length;
        setLikedCount(count);
    };

      return (
        <div className={styles.mainwrapper}>
          {loading ? (
            < LoadingPage />
          ) : (
            <div>
              <PostNewThought newMessage={addNewThoughts} fetchPost={fetchPost} />
              <DisplayPosts thoughts={thoughts} likedCount={likedCount} updateLikedCount={updateLikedCount} />
            </div>
          )}
        </div>
      );
      
    };
