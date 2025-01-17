import { useState, useEffect } from 'react';
import styles from './HeartClick.module.css';

// Handles liking posts, when the heart button is clicked, it likes the post
export const HeartClick = ({ heartLikes, onLike, onLikeUpdate }) => {

    const [likes, setLikes] = useState(heartLikes.hearts);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');

    if (likedPosts.includes(heartLikes._id)) {
      setIsLiked(true);
    }
  }, [heartLikes._id]);

  //checks if a user has liked a post. If they haven't liked it, it increases the like count, visually shows that the user has liked the post, and remembers this like for the future.

  const handleHeartClick = async () => {

    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    if (!likedPosts.includes(heartLikes._id)) {

      setLikes(prevLikes => prevLikes + 1);
      setIsLiked(true);

      likedPosts.push(heartLikes._id);
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));

      const heartURL = `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${heartLikes._id}/like`;

      try {
        const update = await fetch(heartURL, {
            method: 'POST',
          });
          if (!update.ok) {
            throw new Error('Failed to update heart count');
          }
          if (onLike) {
            onLike(heartLikes._id);
          }
          if (onLikeUpdate) {
            onLikeUpdate();
            console.log('onLikeUpdate called');
          }
        } catch (error) {
          console.error("Error updating the heart count:", error);
        }
      }
    };
    return (
      <div className={styles.heartLike_wrapper}>
        <button className={`${styles.heartButton} ${isLiked ? styles.liked : ''}`}
          onClick={handleHeartClick}>
          <span className={styles.emoji} aria-label="heart emojii">❤️</span>
        </button>
        <span className={styles.likeNumber} aria-label="likeNum">×{likes}</span>
      </div>
    );
  };
