import styles from "./DisplayPosts.module.css";
import { HeartClick } from "../HeartClick/HeartClick";
import { TimeDate } from "../TimeDate/TimeDate";

export const DisplayPosts = ({ thoughts, updateLikedCount, likedCount }) => {
  return (
    <div>
      <div className={styles.likedCount}>❤️×{likedCount}</div>
      {thoughts.map(post => (
                <div key={post._id} className={styles.posts}>
                    <p>{post.message}</p>
                    <div className={styles.bottomLine}>
                        <HeartClick heartLikes={post} onLikeUpdate={updateLikedCount} />
                        <TimeDate timePosted={{ time: post.createdAt }} />
                    </div>
                </div>
            ))}
    </div>
  );
};
