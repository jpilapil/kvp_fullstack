import React from "react";
import landingLogo from "../../img/kvp-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faCodeBranch,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import { v4 as getUuid } from "uuid";
import { EMAIL_REGEX } from "../../utils/helpers";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import actions from "../../store/actions";
import ReactTags from "react-tag-autocomplete";

class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
      // default state
      landingCard: "log-in",
      // log in errors
      logInEmailError: "",
      logInPasswordError: "",
      hasLogInEmailError: false,
      hasLogInPasswordError: false,
      // sign up errors
      signUpEmailError: "",
      signUpPasswordError: "",
      signUpHandleError: "",
      signUpTechInterestError: "",
      // signUpGenderError: "",
      // signUpGenderSelect: "",
      hasSignUpEmailError: false,
      hasSignUpPasswordError: false,
      hasSignUpHandleError: false,
      hasSignUpTechInterestError: false,
      // hasSignUpGenderError: false,

      accountCreatedTitle: "",
      logInTitle: "Log in with your email and password.",

      tags: [],
      suggestions: [],
    };

    this.reactTags = React.createRef();
  }

  componentDidMount() {
    // make api call to get all technologies in the database
    axios
      .get("/api/v1/technologies")
      .then((res) => {
        this.setState({ suggestions: res.data }); // set state of suggestions for react tags to the data in technologies api
      })
      .catch((err) => console.log(err));
  }

  // used for react tags
  onDelete(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  }
  // used for react tags
  onAddition(tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
  }
  // set log in card
  showLogInCard() {
    this.setState({
      landingCard: "log-in",
      logInEmailError: "",
      logInPasswordError: "",
      hasLogInEmailError: false,
      hasLogInPasswordError: false,
    });
  }

  setLogInTitle() {
    this.setState({
      logInTitle: "",
      accountCreatedTitle: "Account created! Please log in.",
      landingCard: "log-in",
    });
  }
  // set sign up card
  showSignUpCard() {
    this.setState({
      landingCard: "create-account",
      signUpEmailError: "",
      signUpPasswordError: "",
      signUpHandleError: "",
      signUpTechInterestError: "",
      // signUpGenderError: "",
      // signUpGenderSelect: "",
      hasSignUpEmailError: false,
      hasSignUpPasswordError: false,
      hasSignUpHandleError: false,
      hasSignUpTechInterestError: false,
      hasSignUpGenderError: false,
    });
  }

  // LOG IN ----------
  async setLogInEmailState(logInEmailInput) {
    const lowerCasedEmailInput = logInEmailInput.toLowerCase();
    if (logInEmailInput === "")
      this.setState({
        logInEmailError: "Please enter your email address",
        hasLogInEmailError: true,
      });
    else if (EMAIL_REGEX.test(lowerCasedEmailInput) === false) {
      this.setState({
        logInEmailError: "Please enter a valid email address",
        hasLogInEmailError: true,
      });
    } else {
      this.setState({ logInEmailError: "", hasLogInEmailError: false });
    }
  }

  async setLogInPasswordState(logInPasswordInput) {
    const uniqChars = [...new Set(logInPasswordInput)]; // turn set of password input into an array of unique characters
    if (logInPasswordInput === "") {
      this.setState({
        logInPasswordError: "Please enter your password",
        hasLogInPasswordError: true,
      });
    } else if (logInPasswordInput.length < 9) {
      this.setState({
        logInPasswordError: "Your password must be at least 9 characters",
        hasLogInPasswordError: true,
      });
    } else if (uniqChars.length < 3) {
      this.setState({
        logInPasswordError:
          "Your password must contain at least 3 unique characters",
        hasLogInPasswordError: true,
      });
    } else {
      this.setState({ logInPasswordError: "", hasLogInPasswordError: false });
    }
  }

  // log in errors
  async validateExistingUser() {
    // email input
    const logInEmailInput = document.getElementById("logInEmailInput").value;
    // password input
    const logInPasswordInput = document.getElementById("logInPasswordInput")
      .value;

    const user = {
      email: logInEmailInput,
      password: logInPasswordInput,
    };

    axios
      .post("/api/v1/users/auth", user)
      .then((res) => {
        console.log("data stored to redux store: ", res.data);
        this.props.dispatch({
          // update currentUser in global state in redux with API response
          type: actions.UPDATE_CURRENT_USER,
          payload: res.data,
        });
        this.props.history.push("/connect");
      })
      .catch((err) => {
        // use error responses to trigger state
        const { data } = err.response;
        console.log(data);
        const { emailError, passwordError } = data;
        if (emailError !== "") {
          this.setState({
            hasLogInEmailError: true,
            logInEmailError: emailError,
          });
        } else {
          this.setState({
            hasLogInEmailError: false,
            logInEmailError: emailError,
          });
        }
        if (passwordError !== "") {
          this.setState({
            hasLogInPasswordError: true,
            logInPasswordError: passwordError,
          });
        } else {
          this.setState({
            hasLogInPasswordError: false,
            logInPasswordError: passwordError,
          });
        }
      });
    // }
  }

  // SIGN UP ----------

  async setTechInterestState(signUpTechInterestInput) {
    if (signUpTechInterestInput !== 3) {
      this.setState({
        signUpTechInterestError: "Please select 3 technologies.",
        hasSignUpTechInterestError: true,
      });
    } else {
      this.setState({
        signUpTechInterestError: "",
        hasSignUpTechInterestError: false,
      });
    }
  }

  // sign up errors
  async createNewUser() {
    // email input
    const signUpEmailInput = document.getElementById("signUpEmailInput").value;
    // password input
    const signUpPasswordInput = document.getElementById("signUpPasswordInput")
      .value;
    // username input
    const signUpHandleInput = document.getElementById("signUpHandleInput")
      .value;
    // tech interested input
    // const signUpTechInterestInput = document.getElementById(
    //   "signUpTechInterestInput"
    // ).value;
    const signUpTechInterestInput = document.getElementsByClassName(
      "react-tags__selected-tag"
    ).length;
    const reactTagsTechInput = this.state.tags;

    // create user obj
    const user = {
      id: getUuid(),
      handle: signUpHandleInput,
      email: signUpEmailInput,
      password: signUpPasswordInput,
      //gets value of the selected gender input (male, female, or na)
      // gender: this.state.signUpGenderSelect,
      createdAt: Date.now(),
      techInterestedIn: reactTagsTechInput,
    };
    const userXrefTech = {
      id: getUuid(),
      userId: user.id,
      technologyId: [],
    };
    reactTagsTechInput.forEach((tech) => {
      userXrefTech.technologyId.push(tech.id);
    });

    console.log("Created new user object for POST: ", user);
    console.log("Created new userXrefTech object for POST: ", userXrefTech);

    // post to API
    axios
      .post("/api/v1/users", user)
      .then((res) => {
        console.log(res.data);
        this.setLogInTitle();
      })
      .catch((err) => {
        const { data } = err.response;
        console.log(data);
        const { emailError, passwordError, handleError } = data;
        if (emailError !== "") {
          this.setState({
            hasSignUpEmailError: true,
            signUpEmailError: emailError,
          });
        } else {
          this.setState({
            hasSignUpEmailError: false,
            signUpEmailError: emailError,
          });
        }
        if (passwordError !== "") {
          this.setState({
            hasSignUpPasswordError: true,
            signUpPasswordError: passwordError,
          });
        } else {
          this.setState({
            hasSignUpPasswordError: false,
            signUpPasswordError: passwordError,
          });
        }
        if (handleError !== "") {
          this.setState({
            hasSignUpHandleError: true,
            signUpHandleError: handleError,
          });
        } else {
          this.setState({
            hasSignUpHandleError: false,
            signUpHandleError: handleError,
          });
        }
        if (signUpTechInterestInput !== 3) {
          this.setState({
            hasSignUpTechInterestError: true,
            signUpTechInterestError: "Please select 3 technologies",
          });
        } else {
          this.setState({
            hasSignUpTechInterestError: false,
            signUpTechInterestError: "",
          });
        }
      });

    // update currentUser in global state with API response
    // go to next page: this.props.history.push("/connect")
  }

  // log in card -- shown as default state
  renderLogInCard() {
    return (
      <div className="col-lg-6 offset-lg-3  col-md-8 offset-md-2 col-10 offset-1 col-xl-6 offset-xl-3 ">
        <div id="inside-card" className="card mt-6">
          <div className="card-body">
            <h2 className="card-title">Welcome back</h2>
            <p className="card-text-landing text-secondary">
              {this.state.logInTitle}
            </p>
            <p className="card-text-landing text-success">
              {this.state.accountCreatedTitle}
            </p>
            <div className="form-group">
              <label className="text-light" htmlFor="logInEmailInput">
                Email
              </label>
              <input
                type="email"
                className={classnames({
                  "form-control": true,
                  "is-invalid": this.state.hasLogInEmailError,
                })}
                id="logInEmailInput"
              />
              {this.state.hasLogInEmailError && (
                <p className="text-danger mb-2 mt-1">
                  {this.state.logInEmailError}
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="text-light" htmlFor="logInPasswordInput">
                Password
              </label>
              <input
                type="password"
                className={classnames({
                  "form-control": true,
                  "is-invalid": this.state.hasLogInPasswordError,
                })}
                id="logInPasswordInput"
              />
              {this.state.hasLogInPasswordError && (
                <p className="text-danger mb-2 mt-1">
                  {this.state.logInPasswordError}
                </p>
              )}
            </div>
            <button
              className="btn btn-link ml-auto p-0 mt-6"
              onClick={() => this.showSignUpCard()}
            >
              Create a new account!
            </button>
            <button
              id="logIn"
              className="btn btn-tertiary float-right mt-3"
              onClick={() => {
                this.validateExistingUser();
              }}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    );
  }

  // sign up card
  renderSignUpCard() {
    return (
      <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-10 offset-1 col-xl-6 offset-xl-3">
        <div id="inside-card" className="card mt-6">
          <div className="card-body">
            <h2 className="card-title ">Hello, world</h2>
            <p className="card-text-landing sign-up-text text-secondary">
              Create a new account.
            </p>
            {/* {!this.state.isDisplayingInputs && (
            <> */}
            <div className="form-group">
              <label className="text-light" htmlFor="signUpEmailInput">
                Email
              </label>
              <input
                type="email"
                className={classnames({
                  "form-control": true,
                  "is-invalid": this.state.hasSignUpEmailError,
                })}
                id="signUpEmailInput"
              />
              {/* email error message */}
              {this.state.hasSignUpEmailError && (
                <p className="text-danger mb-2 mt-1">
                  {this.state.signUpEmailError}
                </p>
              )}
            </div>

            {/* password input */}
            <div className="form-group mt-3">
              <label className="text-light" htmlFor="signUpPasswordInput">
                Password
              </label>
              <input
                type="password"
                className={classnames({
                  "form-control": true,
                  "is-invalid": this.state.hasSignUpPasswordError,
                })}
                id="signUpPasswordInput"
              />
              {/* password error */}
              {this.state.hasSignUpPasswordError && (
                <p className="text-danger mb-2 mt-1">
                  {this.state.signUpPasswordError}
                </p>
              )}
            </div>
            {/* user handle */}
            <div className="form-group">
              <label className="text-light" htmlFor="signUpHandleInput">
                Username
              </label>
              <input
                type="handle"
                className={classnames({
                  "form-control": true,
                  "is-invalid": this.state.hasSignUpHandleError,
                })}
                id="signUpHandleInput"
              />
              {/* handle error */}
              {this.state.hasSignUpHandleError && (
                <p className="text-danger mb-2 mt-1">
                  {this.state.signUpHandleError}
                </p>
              )}
            </div>

            {/* tech interested in */}
            <div className="form-group mt-3">
              <label className="text-light" htmlFor="signUpTechInterestInput">
                Technologies I'm interested in
              </label>

              <ReactTags
                ref={this.reactTags}
                tags={this.state.tags}
                suggestions={this.state.suggestions}
                onDelete={this.onDelete.bind(this)}
                onAddition={this.onAddition.bind(this)}
                placeholderText="Please select 3 technologies"
                minQueryLength={1}
                noSuggestionsText="Oops! We couldn't find that technology!"
                type="technologies"
                className={classnames({
                  "form-control": true,
                  "is-invalid": this.state.hasSignUpTechInterestError,
                })}
                id="signUpTechInterestInput"
              />

              {/* <input
                type="technologies"
                className={classnames({
                  "form-control": true,
                  "is-invalid": this.state.hasSignUpTechInterestError,
                })}
                id="signUpTechInterestInput"
              /> */}
              {/* tech interest error */}
              {this.state.hasSignUpTechInterestError && (
                <p className="text-danger mb-2 mt-1">
                  {this.state.signUpTechInterestError}
                </p>
              )}
            </div>

            {/* gender */}
            {/* <label className="text-light" htmlFor="genderSelect">
              Please specify your gender
            </label>
            <div className="row ml-1">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="genderSelect"
                  id="genderMale"
                  value="male"
                  checked={this.state.signUpGenderSelect === "male"}
                  onChange={this.handleChange}
                />
                <label
                  className="form-check-label text-lightest"
                  htmlFor="genderMale"
                >
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="genderSelect"
                  id="genderFemale"
                  value="female"
                  checked={this.state.signUpGenderSelect === "female"}
                  onChange={this.handleChange} // on change, run function
                />
                <label
                  className="form-check-label text-lightest"
                  htmlFor="genderFemale"
                >
                  Female
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="genderSelect"
                  id="genderNA"
                  value="na"
                  checked={this.state.signUpGenderSelect === "na"}
                  onChange={this.handleChange}
                />
                <label
                  className="form-check-label text-lightest"
                  htmlFor="genderNA"
                >
                  Rather not say
                </label>
              </div>
              {this.state.hasSignUpGenderError && (
                <p className="text-danger mb-2 mt-1">
                  {this.state.signUpGenderError}
                </p>
              )}
            </div> */}

            <button
              id="letsGo"
              className="btn btn-tertiary btn-block btn-lg landing-button mt-5"
              onClick={() => {
                // on click, run function
                this.createNewUser();
              }}
            >
              Create Account
            </button>

            <button
              className="btn btn-link mr-auto p-0 mt-3"
              onClick={() => this.showLogInCard()}
            >
              Already have an account?
            </button>
            {/* </>
            )} */}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="container">
          {/* small logo */}
          <div className="row mt-8">
            <div className="col-12 text-center">
              <img
                src={landingLogo}
                alt="Key Value Pairs Landing Logo"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="row mt-8">
            {this.state.landingCard === "log-in" && this.renderLogInCard()}
            {this.state.landingCard === "create-account" &&
              this.renderSignUpCard()}
          </div>
          {/* feature icons */}
          <div className="row mt-8">
            <div className="col-8 offset-2 col-lg-3 offset-lg-1 col-md-3 offset-md-1 col-sm-6 offset-sm-3  text-center mt-7">
              <FontAwesomeIcon icon={faUserFriends} className="fa-icon" />
              <p className="mt-5 text-dark">
                Easily connect with other developers that share common
                technological interests.
              </p>
            </div>
            <div className="col-8 offset-2 col-lg-3 offset-lg-1 col-md-3 offset-md-1 col-sm-6 offset-sm-3  text-center mt-7">
              <FontAwesomeIcon icon={faCodeBranch} className="fa-icon" />
              <p className="mt-5 text-dark">
                Increase code quality as well as learn and transfer new skills
                by collaborating on the same project.
              </p>
            </div>
            <div className="col-8 offset-2 col-lg-3 offset-lg-1 col-md-3 offset-md-1 col-sm-6 offset-sm-3  text-center mt-7 mb-5">
              <FontAwesomeIcon icon={faCogs} className="fa-icon" />
              <p className="mt-5 text-dark">
                Stay up to date with hunderds of technologies to choose from.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {};
}
export default withRouter(connect(mapStateToProps)(Landing));
