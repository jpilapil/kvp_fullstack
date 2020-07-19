import React from "react";
import AppTemplate from "../ui/AppTemplate";
// import OtherUser from "../ui/OtherUser";
// import { Link } from "react-router-dom";
import toDisplayDate from "date-fns/format";
import { connect } from "react-redux";

class Profile extends React.Component {
  render() {
    const currentUser = this.props.currentUser.techInterestedIn.map(
      (tech) => tech.name + ", "
    );
    // const filteredCurrentUser = currentUser.map((tech) => tech.name);
    // console.log(filteredCurrentUser);
    return (
      <AppTemplate>
        <div>
          <div className="row">
            <div className="mt-8 col-12 offset-1">
              <h2 className="text-secondary">My profile</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-10 offset-1 mt-8">
              <div className="card">
                <div className="card-body">
                  <h4 className="text-primary">
                    {this.props.currentUser.handle}
                  </h4>
                  <p className="text-light mt-3">
                    Technologies I'm interested in:
                  </p>
                  <p className="text-lightest mt-1">{currentUser}</p>
                  <p className="text-light mt-3">Member since:</p>
                  <p className="text-lightest mt-1">
                    {toDisplayDate(
                      this.props.currentUser.createdAt,
                      "MMMM do, y"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppTemplate>
    );
  }
}
function mapStateToProps(state) {
  // map state to props in local component
  return {
    currentUser: state.currentUser,
  };
}
export default connect(mapStateToProps)(Profile);
