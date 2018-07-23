import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
// import { Route } from 'react-router-dom';

class Auth extends Component{
    state={
        sign_up:{
            email: "",
            password: ""
        },
        loading: false
        
    };

    // If there is a token, that means the button is Log out now
    componentWillMount = () =>{
        if (localStorage.getItem("token") !== "null"){
            localStorage.setItem("token", "null");
            localStorage.setItem("userid", "null");
            this.props.history.replace('/');
        }
    }

    inputChangedHandler = (event, name) =>{
        const temp = {...this.state.sign_up};
        temp[name] = event.target.value;
        
        this.setState({sign_up:temp});
        
    }

    submit= (event, choice) =>{
        this.setState({loading:true});

        event.preventDefault(event);
        let url = "";
        
        if(choice === "signin"){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA5_IWWcrEhcH-yEhw7INOthd1TOaI-I6o';
        }else if (choice === "login"){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA5_IWWcrEhcH-yEhw7INOthd1TOaI-I6o';
        }

        const data = {
            ...this.state.sign_up,
            returnSecureToken: true
        }
      
        axios.post(url,data)
        .then(response=>{
            localStorage.setItem("token",response.data.idToken);
            localStorage.setItem("userid",response.data.localId);
            this.setState({loading:false});
            this.props.history.replace("/");
        }).catch(err=>{
            alert(err);
        });
    };



    

    render(){
        
        let form = (
            <form>
            <Input inputtype="input" type="text" name="email" placeholder="Email"  onChange={(event)=>this.inputChangedHandler(event,"email")}/>
            <Input inputtype="input" type="text" name="password" placeholder="Password"  onChange={(event)=>this.inputChangedHandler(event,"password")}/>
            <Button btnType="Success" clicked={(event)=>this.submit(event, "signin")}>Register</Button>
            <Button btnType="Success" clicked={(event)=>this.submit(event, "login")}>Log In</Button>
            </form>
        );

        if(this.state.loading){
            form = <Spinner />
        }

        return(
            <div className={classes.Auth}>
                {form}    
            </div>    
        );
    }
}

export default Auth;
