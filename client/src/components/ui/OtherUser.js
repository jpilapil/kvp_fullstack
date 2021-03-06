import React from "react";
// import { Link } from "react-router-dom";
import toDisplayDate from "date-fns/format";
import { connect } from "react-redux";

class OtherUser extends React.Component {
  render() {
    // console.log("this is the email: ", this.props.handle);
    return (
      <div className="  col-10 offset-1  col-xl-6 offset-xl-0 col-lg-8 offset-lg-2  my-4">
        <div className="card card-body">
          <h4 className="text-success">{this.props.handle}</h4>
          <p className="text-light mt-3">
            Technologies {this.props.handle} is interested in:
          </p>

          {this.props.techInterestedIn.map((tech) => {
            // TODO add comma if there are more technologies listed
            // add period if tech.name is last in list
            // slice?
            return (
              <span key={`technology-${tech}`} className="text-lightest mt-1">
                {"- " + tech}
              </span>
            );
          })}
          <p className="text-light mt-3">Member since:</p>
          <p className="text-lightest mt-1">
            {toDisplayDate(this.props.createdAt, "MMMM do, y")}
          </p>

          <a
            href={`mailto:${this.props.email}?subject=Let's collaborate!`}
            className="btn btn-tertiary ml-auto"
          >
            Contact
          </a>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(OtherUser);
