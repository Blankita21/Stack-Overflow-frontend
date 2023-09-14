import React from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from "react-html-parser";
import '../styles/questionFeed.css';

function QuestionFeed({ data }) {
  if (!data) {
    return null;
  }

  function truncateText(str, maxLength) {
    if (str && str.length > maxLength) {
      return str.substr(0, maxLength - 1) + "...";
    } else {
      return str;
    }
  }

  console.log(data?._id);

  let tags;

  if (data && data.tags && data.tags[0]) {
    tags = JSON.parse(data.tags[0]);
  } else {
    tags = [];
  }

  return (
    <div className="question-feed">
      <div className="question-feed-container">
        <div className="question-feed-left">
          <div className="question-options">
            <div className="question-option">
              <p>0</p>
              <span>votes</span>
            </div>
            <div className="question-option">
              <p>{data?.answerDetails?.length}</p>
              <span>answers</span>
            </div>
            <div className="question-option">
              <small>2 views</small>
            </div>
          </div>
        </div>
        <div className="question-answer">
          <Link to={`/question-page?q=${data._id}`}>{data.title}</Link>
          <div
            style={{
              maxWidth: '90%',
            }}
          >
            <div>
              {ReactHtmlParser(truncateText(data.body, 200))}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
            }}
          >
            {tags.map((_tag, index) => (
              <p
                key={index}
                style={{
                  margin: '10px 5px',
                  padding: '5px 10px',
                  backgroundColor: '#007cd446',
                  borderRadius: '3px',
                }}
              >
                {_tag}
              </p>
            ))}
          </div>
          <div className="author">
            <small>Name</small>
            <div className="auth-details">
              <p>
                {data?.user?.displayName
                  ? data?.user?.displayName
                  : ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionFeed;
