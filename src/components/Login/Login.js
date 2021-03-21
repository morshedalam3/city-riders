import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config"
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  const [newUser, setNewUser] = useState(true);
  const [user, setUser] = useState({
    isFormValid: false,
    email: '',
    password: '',
    confirm_Password: '',
    name: '',
    error: '',
    success: false
  })

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        const { email, displayName } = result.user;
        const signedInUser = { name: displayName, email }
        setLoggedInUser(signedInUser);
        history.replace(from);

      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        // ...
      });

  }

  const facebookSignIn = () => {
    var fbProvider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        const { email, displayName } = result.user;
        const signedInUser = { name: displayName, email }
        setLoggedInUser(signedInUser);
        history.replace(from);
        var accessToken = credential.accessToken;

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage, email, credential, errorCode)
      });

  }

  const handleBlur = (event) => {
    let isFormValid = true;
    if (event.target.name === 'email') {
      const isEmailValid = /\S+@\S+\.\S+/.test(event.target.value);
      isFormValid = isEmailValid;

    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const isPasswordNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordNumber && isPasswordValid;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo)

    }
  }


  const handleSubmit = (e) => {
    console.log(user.email, user.password)
    if (user.email && user.password) {
      if (user.password === user.confirm_Password) {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then(res => {
            const newUserInfo = { ...user }
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo);
            history.replace(from)
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            const newUserInfo = { ...user }
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);

            // ..
          });
      }
    }
    if (!newUser && user.email) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user }
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from)

        })
        .catch((error) => {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);

        });
    }
    e.preventDefault();
  }
  return (
    <div style={{ marginTop: '20px' }}>
      <form onSubmit={handleSubmit} className="container border">

        { newUser ? <div><h1>Create account</h1>
          <label htmlFor="firstName">Name</label>
          <input className="form-control" name="name" type="text" onBlur={handleBlur} placeholder="Enter your name" required /><br />
        </div> :
          <h1>Login your Account</h1>
        }

        <label htmlFor="firstName">Email</label>
        <input className="form-control" onBlur={handleBlur} type="text" name="email" placeholder="your email" required /><br />
        <label htmlFor="firstName">Password</label>
        <input className="form-control" id="password" onBlur={handleBlur} type="password" name="password" placeholder="your password" required /><br />
        <label htmlFor="firstName">Confirm Password</label>
        <input className="form-control" id="confirm_Password" onBlur={handleBlur} type="password" name="confirm_Password" placeholder="confirm password" required /><br />
        <input className="form-control bg-primary" type="submit" value="submit" /><br />
      </form>

      <div className="text-center">
        <label htmlFor="newUser">Have you an account? </label> <span className="bg-primary border" onClick={ () => setNewUser(!newUser)}> /login</span>

        <p style={{ color: 'red' }}>{user.error}</p>
        {user.success && <p style={{ color: 'green' }}> Account {newUser ? 'created' : 'logged in'} successfully</p>}

        <button className="m-2 bg-danger"
          onClick={googleSignIn}>login with google</button>
        <button className="m-2 bg-primary"
          onClick={facebookSignIn}> login with facebook</button>
      </div>

    </div>
  );
};

export default Login;
