import React,  { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import '../styles/home.css';
import Body from './Body';
import axios from "axios";

function Home() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getQuestion() {
      await axios.get("/api/question").then((res) => {
        setQuestions(res.data.reverse());
      });
    }
    getQuestion();
  }, []);
  return (
    <div className="home-container">
      <div className="home-content">
        <Sidebar />
        <Body questions={questions} />
      </div>
    </div>
  )
}

export default Home