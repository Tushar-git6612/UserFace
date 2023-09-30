import React, { Component } from "react";
import Login from "./Login";

export default class Myeditor extends Component {
  constructor() {
    super();
    this.state = {
      editorarea: "type here",
      show: false,
      userobj: {
        email: "",
        password: "",
      },
    };
    this.editorChanger = this.editorChanger.bind(this);
    this.textUppercase = this.textUppercase.bind(this);
    this.textLowercase = this.textLowercase.bind(this);
    this.textClear = this.textClear.bind(this);
    this.textCapitalize = this.textCapitalize.bind(this);
    this.copyText = this.copyText.bind(this);
    this.boldText = this.boldText.bind(this);
  }

  editorChanger(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  textUppercase() {
    let upperState = this.state.editorarea.toUpperCase();
    this.setState({
      editorarea: upperState,
    });
  }

  textLowercase() {
    let lowerState = this.state.editorarea.toLowerCase();
    this.setState({
      editorarea: lowerState,
    });
  }

  textClear() {
    this.setState({
      editorarea: "",
    });
  }

  textCapitalize() {
    let newStrings = this.state.editorarea.split(" ");
    let words = newStrings.map((word) => {
      if (word.length === 0) {
        return "";
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    // change to string
    let data = words.join(" ");
    this.setState({
      editorarea: data,
    });
  }

  copyText() {
    const text = document.querySelector("#textarea");
    console.log(text);
    text.select();
    text.setSelectionRange(0, 9999);
    navigator.clipboard.writeText(text.value);
  }

  boldText() {
    let textarea = document.querySelector("textarea");
    textarea.style.fontWeight = "900";
  }

  sentenceCase() {
    let textarea = document.querySelector("textarea");
    textarea.style.textAlign = "justify";
  }

  textCenter() {
    let textarea = document.querySelector("textarea");
    textarea.style.textAlign = "center";
  }

  textRight() {
    let textarea = document.querySelector("textarea");
    textarea.style.textAlign = "right";
  }

  render() {
    //loginfunc----
    const loginUser = async (userInfor) => {
      console.log(userInfor);
      const resData = await fetch(
        `http://localhost/apis/login.php?email=${userInfor.email}&password=${userInfor.password}`,
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
          },
        }
      )
      .catch((error)=>{
        console.log(error)
      });
      if(resData){
        const jsData = await resData.json();
        console.log(jsData.data[0]);
        if (jsData.status === 1) {
          this.setState({
            show: true,
          });
        }
      }else{
        alert("server not found");
      }
    };

    // formFunction
    const onChangeHanfle = (event) => {
      this.setState({
        userobj: {
          ...this.state.userobj,
          [event.target.name]: event.target.value,
        },
      });
    };

    const submitHandle = (event) => {
      event.preventDefault();
      if (
        this.state.userobj.email !== "" &&
        this.state.userobj.password !== ""
      ) {
        loginUser(this.state.userobj);
        this.setState({
          userobj: {
            email: "",
            password: "",
          },
        });
      }
    };

    return (
      <>
        {this.state.show && (
          <main>
            <div className="container text-center my-2">
              <textarea
                className="form-control"
                id="textarea"
                onChange={this.editorChanger}
                rows="12"
                name="editorarea"
                value={this.state.editorarea}
              ></textarea>
              <div className="d-flex mt-3 btnBox">
                <div className="d-inline me-2">
                  <button
                    type="button"
                    onClick={this.textUppercase}
                    className="btn btn-outline-info"
                  >
                    Uppercase
                  </button>
                </div>
                <div className="d-inline me-2">
                  <button
                    type="button"
                    onClick={this.textLowercase}
                    className="btn btn-outline-info"
                  >
                    Lowercase
                  </button>
                </div>
                <div className="d-inline me-2">
                  <button
                    type="button"
                    onClick={this.textClear}
                    className="btn btn-outline-info"
                  >
                    Clear All
                  </button>
                </div>
                <div className="d-inline me-2">
                  <button
                    type="button"
                    onClick={() => {
                      this.textCapitalize();
                    }}
                    className="btn btn-outline-info"
                  >
                    Capitalize
                  </button>
                </div>
                <div className="d-inline me-2">
                  <button
                    id="copyBtn"
                    type="button"
                    onClick={this.copyText}
                    className="btn btn-outline-info"
                  >
                    Copy
                  </button>
                </div>
                <div className="d-inline me-2">
                  <button
                    id="copyBtn"
                    type="button"
                    onClick={this.boldText}
                    className="btn btn-outline-info"
                  >
                    Bold
                  </button>
                </div>
                <div className="d-inline me-2">
                  <button
                    id="copyBtn"
                    type="button"
                    onClick={this.sentenceCase}
                    className="btn btn-outline-info"
                  >
                    Justify
                  </button>
                </div>
                <div className="d-inline me-2">
                  <button
                    id="copyBtn"
                    type="button"
                    onClick={this.textCenter}
                    className="btn btn-outline-info"
                  >
                    text center
                  </button>
                </div>
                <div className="d-inline me-2">
                  <button
                    id="copyBtn"
                    type="button"
                    onClick={this.textRight}
                    className="btn btn-outline-info"
                  >
                    text Right
                  </button>
                </div>
              </div>
            </div>
          </main>
        )}
        <Login
          formState={this.state.userobj}
          changeHandle={onChangeHanfle}
          submitHandle={submitHandle}
        />
      </>
    );
  }
}
