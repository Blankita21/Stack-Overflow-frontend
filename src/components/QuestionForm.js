import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TagsInput } from "react-tag-input-component";
import axios from 'axios';
import '../styles/questionForm.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

function QuestionForm() {
    const user = useSelector(selectUser);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tag, setTag] = useState([]);
    const navigate = useNavigate();

    const handleQuill = (value) => {
        setBody(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title !== "" && body !== "") {
            const bodyJSON = {
                title: title,
                body: body,
                tag: JSON.stringify(tag),
                user: user,
            };
            try {
                const res = await axios.post("/api/question", bodyJSON);
                alert("Question added successfully");
                navigate("/");
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="add-question">
            <div className="add-question-container">
                <div className="head-title">
                    <h1>Ask a public question</h1>
                </div>
                <div className="question-container">
                    <div className="question-options">
                        <div className="question-option">
                            <div className="title">
                                <h3>Title</h3>
                                <small>
                                    Be specific and imagine you’re asking a question to another
                                    person
                                </small>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    placeholder="e.g What is React-DOM?"
                                />
                            </div>
                        </div>
                        <div className="question-option">
                            <div className="title">
                                <h3>Body</h3>
                                <small>
                                    Include all the information someone would need to answer your
                                    question
                                </small>
                                <ReactQuill
                                    value={body}
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
                                />
                            </div>
                        </div>
                        <div className="question-option">
                            <div className="title">
                                <h3>Tags</h3>
                                <small>
                                    Add up to 5 tags to describe what your question is about
                                </small>

                                <TagsInput
                                    className="custom-tag-input"
                                    value={tag}
                                    onChange={setTag}
                                    name="fruits"
                                    placeHolder="press enter to add new tag"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={handleSubmit} className="button">
                    Add your question
                </button>
            </div>
        </div>
    );
}

export default QuestionForm;
