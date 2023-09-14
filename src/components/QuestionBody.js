//Page where we can expand and look at the questions and comment

import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useSelector } from "react-redux";
import '../styles/questionPage.css';
import { selectUser } from "../features/userSlice";

function QuestionBody() {
  const [questionData, setQuestionData] = useState(null);
  const [answer, setAnswer] = useState("");
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true); // Add loading state

  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");
  console.log(id);

  useEffect(() => {
    // Add a condition to check if id is defined
    if (id) {
      async function getFunctionDetails() {
        try {
          const response = await axios.get(`/api/question/${id}`);
          setQuestionData(response.data[0]);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching question data:", error);
          setLoading(false);
        }
      }
      getFunctionDetails();
    }
  }, [id]);

  const handleQuill = (value) => {
    setAnswer(value);
  };



  async function getUpdatedAnswer() {
    try {
      const response = await axios.get(`/api/question/${id}`);
      console.log(response);
      setQuestionData(response.data[0]);
    } catch (error) {
      console.error("Error fetching updated answer data:", error);
    }
  }

  const handleSubmit = async () => {
    const body = {
      question_id: id,
      answer: answer,
      user: user,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post("/api/answer", body, config);
      alert("Answer added successfully");
      setAnswer("");
      getUpdatedAnswer();
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const handleComment = async () => {
    if (comment !== "") {
      const body = {
        question_id: id,
        comment: comment,
        user: user,
      };
      try {
        const response = await axios.post(`/api/comment/${id}`, body);
        setComment("");
        setShow(false);
        getUpdatedAnswer();
        console.log(response.data);
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };  // Loading indicator while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">{questionData?.title} </h2>
        </div>
        <div className="main-desc">
          <div className="info">
            <p>
              Asked
              <span>{new Date(questionData?.created_at).toLocaleString()}</span>
            </p>
            <p>
              Active<span>today</span>
            </p>
            <p>
              Viewed<span>43times</span>
            </p>
          </div>
        </div>
        <div className="all-questions">
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className="arrow">▲</p>

                <p className="arrow">0</p>

                <p className="arrow">▼</p>
              </div>
            </div>
            <div className="question-answer">
              <p>{ReactHtmlParser(questionData?.body)}</p>

              <div className="author">
                <small>
                  asked {new Date(questionData?.created_at).toLocaleString()}
                </small>
                <div className="auth-details">
                  <p>
                    {questionData?.user?.displayName
                      ? questionData?.user?.displayName
                      : ""}
                  </p>
                </div>
              </div>
              <div className="comments">
                <div className="comment">
                  {questionData?.comments &&
                    questionData?.comments.map((_qd) => (
                      <p key={_qd?._id}>
                        {_qd.comment}{" "}
                        <span>
                          - {_qd.user ? _qd.user.displayName : ""}
                        </span>{" "}
                        {"    "}
                        <small>
                          {new Date(_qd.created_at).toLocaleString()}
                        </small>
                      </p>
                    ))}
                </div>
                <p onClick={() => setShow(!show)}>Add a comment</p>
                {show && (
                  <div className="title">
                    <textarea
                      style={{
                        margin: "5px 0px",
                        padding: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                        borderRadius: "3px",
                        outline: "none",
                      }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      placeholder="Add your comment..."
                      rows={5}
                    />
                    <button
                      onClick={handleComment}
                      style={{
                        maxWidth: "fit-content",
                      }}
                    >
                      Add comment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            flexDirection: "column",
          }}
          className="all-questions"
        >
          <p
            style={{
              marginBottom: "20px",
              fontSize: "1.3rem",
              fontWeight: "300",
            }}
          >
            {questionData && questionData?.answerDetails.length} Answers
          </p>
          {questionData?.answerDetails.map((_q) => (
            <>
              <div
                style={{
                  borderBottom: "1px solid #eee",
                }}
                key={_q._id}
                className="all-questions-container"
              >
                <div className="all-questions-left">
                  <div className="all-options">
                    <p className="arrow">▲</p>

                    <p className="arrow">0</p>

                    <p className="arrow">▼</p>
                  </div>
                </div>
                <div className="question-answer">
                  {ReactHtmlParser(_q.answer)}
                  <div className="author">
                    <small>
                      answered {new Date(_q.created_at).toLocaleString()}
                    </small>
                    <div className="auth-details">
                      <p>
                        {_q?.user?.displayName
                          ? _q?.user?.displayName
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
        {/* <div className="questions">
          <div className="question">
            <AllQuestions />
            <AllQuestions />
            <AllQuestions />
            <AllQuestions />
          </div>
        </div> */}
      </div>
      <div className="main-answer">
        <h3
          style={{
            fontSize: "22px",
            margin: "10px 0",
            fontWeight: "400",
          }}
        >
          Your Answer
        </h3>
        <ReactQuill
          value={answer}
          onChange={handleQuill}
          modules={{
            toolbar: {
              container: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline', 'strike'],
                ['link', 'image'],
                [{ 'align': [] }],
                ['clean'],
              ],
            },
          }}
          className="react-quill"
          theme="snow"
          style={{
            height: "200px",
          }}
        />
      </div>
      <button
        className="blubtn"
        onClick={handleSubmit}
        style={{
          marginTop: "50px",
          maxWidth: "fit-content",
        }}
      >
        Post your answer
      </button>
    </div>

  );
}

export default QuestionBody;