import { useNavigate, useParams } from "react-router-dom";
import HeaderElement from "./HeaderElement";
import ErrorComponent from "./ErrorComponent";
import TopicList from "./TopicList";
import ArticleList from "./ArticleList";

export default function Topic({ topics, isTopicsLoading, isTopicsError }) {
  const topicSlug = useParams().topicSlug;
  const navigate = useNavigate();

  return (
    <>
      <div className="hiddenOnSmallScreen">
        <HeaderElement />
      </div>
      <p style={{ textDecoration: "underline" }} onClick={() => navigate(-1)}>
        Back
      </p>
      {isTopicsError && (
        <ErrorComponent
          message={`Error loading topic. Check your network connection and try again.`}
        />
      )}
      {isTopicsLoading && <p>Loading...</p>}
      {!isTopicsError && !isTopicsLoading && !topics[topicSlug] && (
        <>
          <p>Sorry, that topic doesn't exist.</p>
          <p>How about...</p>
          <TopicList
            topics={topics}
            isTopicsLoading={isTopicsLoading}
            isTopicsError={isTopicsError}
          />
        </>
      )}
      {!isTopicsLoading && !isTopicsError && topics[topicSlug] && (
        <>
          <h1>{topics[topicSlug]}</h1>
          <ArticleList
            topics={topics}
            isTopicsLoading={isTopicsLoading}
            isTopicsError={isTopicsError}
            filterTopic={topicSlug}
          />
        </>
      )}
    </>
  );
}
