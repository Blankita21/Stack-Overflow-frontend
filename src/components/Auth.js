import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Update this line
import { auth, provider } from "../firebase";
import '../styles/auth.css';

function Auth() {
    const navigate = useNavigate(); // Update this line
    const [register, setRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function validateEmail(email) {
        const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) === false) {
            return false;
        } else return true;
    }

    const handleSignIn = () => {
        setError("");
        setLoading(true);
        if (email === "" || password === "") {
            setError("Required field is missing");
            setLoading(false);
        } else if (!validateEmail(email)) {
            setError("Email is malformed");
            setLoading(false);
        } 
        else {
            signInWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    // console.log(res);
                    navigate("/"); // Update this line
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error.code);
                    setError(error.message);
                    setLoading(false);
                });
        }
    };

    const handleRegister = () => {
        setError("");
        setLoading(false);
        if (email === "" || password === "" || username === "") {
            setError("Required field is missing.");
            setLoading(false);
        } else if (!validateEmail(email)) {
            setError("Email is malformed");
            setLoading(false);
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    // console.log(res);
                    navigate("/"); // Update this line
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setError(error.message);
                    setLoading(false);
                });
        }
    };

    return (
        <div className="auth">
            <div className="auth-container">
                <div className="auth-login">
                    <div className="auth-login-container">
                        {register ? (
                            <>
                                {" "}
                                <div className="input-field">
                                    <p>Username</p>
                                    <input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        type="text"
                                    />
                                </div>
                                <div className="input-field">
                                    <p>Email</p>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="text"
                                    />
                                </div>
                                <div className="input-field">
                                    <p>Password</p>
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                    />
                                </div>
                                <button className="btnblue"
                                    onClick={handleRegister}
                                    disabled={loading}
                                    style={{
                                        marginTop: "10px",
                                    }}
                                >
                                    {loading ? "Registering..." : "Register"}
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="input-field">
                                    <p>Email</p>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="text"
                                    />
                                </div>
                                <div className="input-field">
                                    <p>Password</p>
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                    />
                                </div>
                                <button className="btnblue"
                                    onClick={handleSignIn}
                                    disabled={loading}
                                    style={{
                                        marginTop: "10px",
                                    }}
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </button>
                            </>
                        )}

                        <p
                            onClick={() => setRegister(!register)}
                            style={{
                                marginTop: "10px",
                                textAlign: "center",
                                color: "#0095ff",
                                textDecoration: "underline",
                                cursor: "pointer",
                            }}
                        >
                            {register ? "Login" : "Register"} ?
                        </p>
                    </div>
                </div>
                {error !== "" && (
                    <p
                        style={{
                            color: "red",
                            fontSize: "14px",
                        }}
                    >
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Auth;
