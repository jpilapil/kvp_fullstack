import React from "react";
import landingLogo from "../../img/kvp-logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faCodeBranch,
  faCogs,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Landing() {
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
        {/* card 1 */}
        <div className="row mt-8">
          <div className="col-lg-6 offset-lg-0 col-md-8 offset-md-2 col-10 offset-1 col-xl-5 offset-xl-1">
            {/* first login card */}
            <div id="inside-card" className="card mt-6">
              <div id="sign-up-card" className="card-body">
                <h2 className="card-title ">Hello, world</h2>
                {/* second login card */}
                <div id="sign-up-card2">
                  <p className="card-text-landing sign-up-text text-secondary">
                    Create a new account.
                  </p>
                  <div className="form-group">
                    <label className="text-light" htmlFor="inputEmail1">
                      Username
                    </label>
                    <input
                      type="email"
                      className="form-control input-outline border"
                      id="inputEmail1"
                    />
                  </div>
                  {/* email error message */}
                  <div className="invalidEmailFeedback"></div>

                  {/* tech interested in */}
                  <div className="form-group mt-3">
                    <label className="text-light" htmlFor="interestedTech">
                      Technologies I'm interested in
                    </label>
                    <input
                      type="technologies"
                      className="form-control input-outline border"
                      id="technologyInterest"
                    />
                  </div>
                  {/* gender */}
                  <label className="text-light" htmlFor="genderSelect">
                    Please specify your gender
                  </label>
                  <div className="row ml-1">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="genderSelect"
                        id="genderMale"
                        value="option1"
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
                        value="option2"
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
                        value="option3"
                      />
                      <label
                        className="form-check-label text-lightest"
                        htmlFor="genderNA"
                      >
                        Rather not say
                      </label>
                    </div>
                  </div>
                  <Link
                    to="/connect"
                    id="letsGo"
                    className="btn btn-tertiary btn-lg btn-block btn-lg landing-button"
                  >
                    Continue&nbsp;
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      size="sm"
                      className=" mt-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* card 2 */}

          <div className="col-lg-6 offset-lg-0  col-md-8 offset-md-2 col-10 offset-1 col-xl-5 offset-xl-1 ">
            <div id="inside-card" className="card mt-6">
              <div className="card-body">
                <h2 className="card-title">Welcome back</h2>
                <p className="card-text-landing text-secondary">
                  Log in with your email address and password.
                </p>

                <div className="form-group">
                  <label className="text-light" htmlFor="inputEmail2">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control input-outline border"
                    id="inputEmail2"
                  />
                </div>
                <div className="invalid-feedback" id="emailError2">
                  Please enter your email address
                </div>
                <div className="form-group">
                  <label className="text-light" htmlFor="inputPassword2">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control input-outline border"
                    id="inputPassword2"
                  />
                  <div
                    className="invalid-feedback"
                    id="passwordEnterError2"
                    style={{ display: "none" }}
                  >
                    Please enter your password
                  </div>
                  <div
                    className="invalid-feedback"
                    id="passwordLengthError2"
                    style={{ display: "none" }}
                  >
                    Your password must be at least 9 characters
                  </div>

                  <Link
                    to="/connect"
                    id="logIn"
                    className="btn btn-tertiary bt-lg  float-right landing-button"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

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
              Increase code quality as well as learn and transfer new skills by
              collaborating on the same project.
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
