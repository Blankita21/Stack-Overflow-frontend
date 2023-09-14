// To go to the question body and look at the comments and questions
import React, { useEffect, useState } from 'react'
import '../styles/questionPage.css';
import '../styles/home.css';
import QuestionBody from './QuestionBody';
import Sidebar from './Sidebar';
import axios from "axios";

function QuestionPage() {
    return (
        <div className="home-container">
            <div className="home-content">
                <Sidebar />
                <QuestionBody/>
            </div>
        </div>
    )
}

export default QuestionPage
