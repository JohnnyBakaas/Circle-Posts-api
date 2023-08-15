import styles from "./Post.module.css";

const Post = ({ data }: { data: IPost }) => {
  return (
    <section className={styles.wrapper}>
      <TopPart data={data} />

      <p className={styles.contentP}>{data.content}</p>

      <div className={styles.bottom}>
        <CommentButton comments={data.comments} />
        <LikeButton likes={data.likes} liked={data.liked} />
        <DisLikeButton disLikes={data.disLikes} disLiked={data.disLiked} />
        <ViewsButton views={data.views} />
      </div>
    </section>
  );
};

const TopPart = ({ data }: { data: IPost }) => {
  return (
    <div className={styles.userInfo}>
      <div className={styles.left}>
        <img
          className={styles.avatar}
          style={{
            width: "80px",
            height: "80px",
          }}
          src={data.avatar}
          alt={data.avatar}
        />
        <div className={styles.names}>
          <h3>{data.displayName}</h3>
          <h4>{data.you ? "You" : data.handle}</h4>
        </div>
      </div>
      <div className={`${styles.folower}`}>
        {data.you ? "" : data.following ? <p>-</p> : <p>+</p>}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13 20V18C13 15.2386 10.7614 13 8 13C5.23858 13 3 15.2386 3 18V20H13ZM13 20H21V19C21 16.0545 18.7614 14 16 14C14.5867 14 13.3103 14.6255 12.4009 15.6311M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7ZM18 9C18 10.1046 17.1046 11 16 11C14.8954 11 14 10.1046 14 9C14 7.89543 14.8954 7 16 7C17.1046 7 18 7.89543 18 9Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>{shortenCount(data.followers)}</p>
      </div>
    </div>
  );
};

const CommentButton = ({ comments }: { comments: number }) => {
  return (
    <button className={styles.svgWrapper}>
      <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <title>comment-5</title>
        <desc>Created with Sketch Beta.</desc>
        <defs></defs>
        <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
          <g id="Icon-Set" transform="translate(-360.000000, -255.000000)">
            <path
              d="M390,277 C390,278.463 388.473,280 387,280 L379,280 L376,284 L373,280 L365,280 C363.527,280 362,278.463 362,277 L362,260 C362,258.537 363.527,257 365,257 L387,257 C388.473,257 390,258.537 390,260 L390,277 L390,277 Z M386.667,255 L365.333,255 C362.388,255 360,257.371 360,260.297 L360,277.187 C360,280.111 362.055,282 365,282 L371.639,282 L376,287.001 L380.361,282 L387,282 C389.945,282 392,280.111 392,277.187 L392,260.297 C392,257.371 389.612,255 386.667,255 L386.667,255 Z"
              id="comment-5"
            ></path>
          </g>
        </g>
      </svg>
      <p>{shortenCount(comments)}</p>
    </button>
  );
};

const LikeButton = ({ likes, liked }: { likes: number; liked: boolean }) => {
  return (
    <button className={`${styles.svgWrapper}`}>
      {liked ? (
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 486.926 486.926"
        >
          <g>
            <path
              d="M462.8,181.564c-12.3-10.5-27.7-16.2-43.3-16.2h-15.8h-56.9h-32.4v-75.9c0-31.9-9.3-54.9-27.7-68.4
          c-29.1-21.4-69.2-9.2-70.9-8.6c-5,1.6-8.4,6.2-8.4,11.4v84.9c0,27.7-13.2,51.2-39.3,69.9c-19.5,14-39.4,20.1-41.5,20.8l-2.9,0.7
          c-4.3-7.3-12.2-12.2-21.3-12.2H24.7c-13.6,0-24.7,11.1-24.7,24.7v228.4c0,13.6,11.1,24.7,24.7,24.7h77.9c7.6,0,14.5-3.5,19-8.9
          c12.5,13.3,30.2,21.6,49.4,21.6h65.9h6.8h135.1c45.9,0,75.2-24,80.4-66l26.9-166.9C489.8,221.564,480.9,196.964,462.8,181.564z
           M103.2,441.064c0,0.4-0.3,0.7-0.7,0.7H24.7c-0.4,0-0.7-0.3-0.7-0.7v-228.4c0-0.4,0.3-0.7,0.7-0.7h77.9c0.4,0,0.7,0.3,0.7,0.7
          v228.4H103.2z"
            />
          </g>
        </svg>
      ) : (
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 486.926 486.926"
        >
          <g>
            <path
              d="M462.8,181.564c-12.3-10.5-27.7-16.2-43.3-16.2h-15.8h-56.9h-32.4v-75.9c0-31.9-9.3-54.9-27.7-68.4
            c-29.1-21.4-69.2-9.2-70.9-8.6c-5,1.6-8.4,6.2-8.4,11.4v84.9c0,27.7-13.2,51.2-39.3,69.9c-19.5,14-39.4,20.1-41.5,20.8l-2.9,0.7
            c-4.3-7.3-12.2-12.2-21.3-12.2H24.7c-13.6,0-24.7,11.1-24.7,24.7v228.4c0,13.6,11.1,24.7,24.7,24.7h77.9c7.6,0,14.5-3.5,19-8.9
		c12.5,13.3,30.2,21.6,49.4,21.6h65.9h6.8h135.1c45.9,0,75.2-24,80.4-66l26.9-166.9C489.8,221.564,480.9,196.964,462.8,181.564z
    M103.2,441.064c0,0.4-0.3,0.7-0.7,0.7H24.7c-0.4,0-0.7-0.3-0.7-0.7v-228.4c0-0.4,0.3-0.7,0.7-0.7h77.9c0.4,0,0.7,0.3,0.7,0.7
		v228.4H103.2z M462.2,241.764l-26.8,167.2c0,0.1,0,0.3-0.1,0.5c-3.7,29.9-22.7,45.1-56.6,45.1H243.6h-6.8h-65.9
		c-21.3,0-39.8-15.9-43.1-36.9c-0.1-0.7-0.3-1.4-0.5-2.1v-191.6l5.2-1.2c0.2,0,0.3-0.1,0.5-0.1c1-0.3,24.7-7,48.6-24
		c32.7-23.2,49.9-54.3,49.9-89.9v-75.3c10.4-1.7,28.2-2.6,41.1,7c11.8,8.7,17.8,25.2,17.8,49v87.8c0,6.6,5.4,12,12,12h44.4h56.9
		h15.8c9.9,0,19.8,3.7,27.7,10.5C459,209.864,464.8,225.964,462.2,241.764z"
            />
          </g>
        </svg>
      )}
      <p>{shortenCount(likes)}</p>
    </button>
  );
};

const DisLikeButton = ({
  disLikes,
  disLiked,
}: {
  disLikes: number;
  disLiked: boolean;
}) => {
  return (
    <button className={styles.svgWrapper}>
      {disLiked ? (
        <svg
          className={styles.dislike}
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 486.926 486.926"
        >
          <g>
            <path
              d="M462.8,181.564c-12.3-10.5-27.7-16.2-43.3-16.2h-15.8h-56.9h-32.4v-75.9c0-31.9-9.3-54.9-27.7-68.4
          c-29.1-21.4-69.2-9.2-70.9-8.6c-5,1.6-8.4,6.2-8.4,11.4v84.9c0,27.7-13.2,51.2-39.3,69.9c-19.5,14-39.4,20.1-41.5,20.8l-2.9,0.7
          c-4.3-7.3-12.2-12.2-21.3-12.2H24.7c-13.6,0-24.7,11.1-24.7,24.7v228.4c0,13.6,11.1,24.7,24.7,24.7h77.9c7.6,0,14.5-3.5,19-8.9
          c12.5,13.3,30.2,21.6,49.4,21.6h65.9h6.8h135.1c45.9,0,75.2-24,80.4-66l26.9-166.9C489.8,221.564,480.9,196.964,462.8,181.564z
           M103.2,441.064c0,0.4-0.3,0.7-0.7,0.7H24.7c-0.4,0-0.7-0.3-0.7-0.7v-228.4c0-0.4,0.3-0.7,0.7-0.7h77.9c0.4,0,0.7,0.3,0.7,0.7
          v228.4H103.2z"
            />
          </g>
        </svg>
      ) : (
        <svg
          className={styles.dislike}
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 486.926 486.926"
        >
          <g>
            <path
              d="M462.8,181.564c-12.3-10.5-27.7-16.2-43.3-16.2h-15.8h-56.9h-32.4v-75.9c0-31.9-9.3-54.9-27.7-68.4
            c-29.1-21.4-69.2-9.2-70.9-8.6c-5,1.6-8.4,6.2-8.4,11.4v84.9c0,27.7-13.2,51.2-39.3,69.9c-19.5,14-39.4,20.1-41.5,20.8l-2.9,0.7
            c-4.3-7.3-12.2-12.2-21.3-12.2H24.7c-13.6,0-24.7,11.1-24.7,24.7v228.4c0,13.6,11.1,24.7,24.7,24.7h77.9c7.6,0,14.5-3.5,19-8.9
		c12.5,13.3,30.2,21.6,49.4,21.6h65.9h6.8h135.1c45.9,0,75.2-24,80.4-66l26.9-166.9C489.8,221.564,480.9,196.964,462.8,181.564z
    M103.2,441.064c0,0.4-0.3,0.7-0.7,0.7H24.7c-0.4,0-0.7-0.3-0.7-0.7v-228.4c0-0.4,0.3-0.7,0.7-0.7h77.9c0.4,0,0.7,0.3,0.7,0.7
		v228.4H103.2z M462.2,241.764l-26.8,167.2c0,0.1,0,0.3-0.1,0.5c-3.7,29.9-22.7,45.1-56.6,45.1H243.6h-6.8h-65.9
		c-21.3,0-39.8-15.9-43.1-36.9c-0.1-0.7-0.3-1.4-0.5-2.1v-191.6l5.2-1.2c0.2,0,0.3-0.1,0.5-0.1c1-0.3,24.7-7,48.6-24
		c32.7-23.2,49.9-54.3,49.9-89.9v-75.3c10.4-1.7,28.2-2.6,41.1,7c11.8,8.7,17.8,25.2,17.8,49v87.8c0,6.6,5.4,12,12,12h44.4h56.9
		h15.8c9.9,0,19.8,3.7,27.7,10.5C459,209.864,464.8,225.964,462.2,241.764z"
            />
          </g>
        </svg>
      )}
      <p>{shortenCount(disLikes)}</p>
    </button>
  );
};

const ViewsButton = ({ views }: { views: number }) => {
  return (
    <button className={styles.svgWrapper}>
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M29.5 7c-1.381 0-2.5 1.12-2.5 2.5 0 0.284 0.058 0.551 0.144 0.805l-6.094 5.247c-0.427-0.341-0.961-0.553-1.55-0.553-0.68 0-1.294 0.273-1.744 0.713l-4.774-2.39c-0.093-1.296-1.162-2.323-2.482-2.323-1.38 0-2.5 1.12-2.5 2.5 0 0.378 0.090 0.732 0.24 1.053l-4.867 5.612c-0.273-0.102-0.564-0.166-0.873-0.166-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5c1.381 0 2.5-1.119 2.5-2.5 0-0.332-0.068-0.649-0.186-0.939l4.946-5.685c0.236 0.073 0.48 0.124 0.74 0.124 0.727 0 1.377-0.316 1.834-0.813l4.669 2.341c0.017 1.367 1.127 2.471 2.497 2.471 1.381 0 2.5-1.119 2.5-2.5 0-0.044-0.011-0.086-0.013-0.13l6.503-5.587c0.309 0.137 0.649 0.216 1.010 0.216 1.381 0 2.5-1.119 2.5-2.5s-1.119-2.5-2.5-2.5z"></path>
      </svg>
      <p>{shortenCount(views)}</p>
    </button>
  );
};

const shortenCount = (numb: number) => {
  if (numb > 1000000) {
    if ((numb / 1000000).toString()[1] == ".")
      return `${(numb / 1000000).toFixed(2)}m`;
    return `${(numb / 1000000).toFixed(1)}m`;
  }

  if (numb > 1000) {
    if ((numb / 1000).toString()[1] == ".")
      return `${(numb / 1000).toFixed(2)}k`;
    return `${(numb / 1000).toFixed(1)}k`;
  }

  return numb;
};

export default Post;

export type IPost = {
  avatar: string;
  displayName: string;
  handle: string;
  followers: number;
  content: string;
  comments: number;
  likes: number;
  disLikes: number;
  views: number;

  you: boolean;
  following: boolean;
  liked: boolean;
  disLiked: boolean;
};
