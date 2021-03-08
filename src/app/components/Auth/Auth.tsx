import React from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { sagaActions } from "app/store/config/rootActions";
import firebase from "firebase/app";
import "firebase/auth";

interface MapDispatchToProps {
  actions: typeof sagaActions;
}

const Auth = (props: MapDispatchToProps) => {
  // const handleSubmit = (val: any) => {
  //   props.actions.loginAction({ email: val.email, password: val.password });
  // };

  return (
    <div className="auth">
      {/* <Form onFinish={(val) => handleSubmit(val)}>
        <h1>MyLocal.vn Admin</h1>
        <h2>Email:</h2>
        <Form.Item name="email">
          <Input className="input__text-lg" />
        </Form.Item>

        <h2>Password:</h2>
        <Form.Item name="password">
          <Input.Password className="input__text-lg" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        <div style={{width : "100%", textAlign : "center", fontSize : "2rem", color : "#ffffff"}}>
          Or
          </div>
      </Form> */}
      <div>
        <h1>MyLocal.vn Admin</h1>
        <Button
          type="primary"
          onClick={(e) => {
            e.preventDefault();
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            firebase
              .auth()
              .signInWithPopup(googleAuthProvider)
              .then((res) => {
                return res.user?.getIdToken();
              })
              .then((idToken) => {
                props.actions.loginAction({ token: idToken! });
              });
          }}
        >
          Sign In with Google
        </Button>
      </div>
    </div>
  );
};

export default connect(null, (dispatch: Dispatch) => {
  return {
    actions: bindActionCreators(Object.assign(sagaActions), dispatch),
  };
})(Auth);
