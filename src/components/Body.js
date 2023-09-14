import React from 'react';
import '../styles/body.css';
import QuestionFeed from './QuestionFeed';

function Body({ questions }) {
  return (
    <div className="body">
      <div className="body-container">
        <div className="body-header">
          <h2>Recent Posts</h2>
        </div>
        <div className="body-content">
          <p>All Questions</p>
          <div className="body-filters"></div>
        </div>
        {questions.length} Questions
        {questions?.map((_q) => (
          <div className="question">
            <QuestionFeed data={_q} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Body;
