import React from "react";
// import { Link } from "react-router-dom";
import toDisplayDate from "date-fns/format";
import { connect } from "react-redux";

class OtherUser extends React.Component {
  render() {
    // map through techInterestedIn, return value of "name" key
    const usersWithFormattedTech = this.props.users.map((user) => {
      // TODO add comma if there are more technologies listed
      // add period if tech.name is last in list
      // slice?
      return user.technologyName + ", ";
    });

    // console.log(interestedTech); array of strings

    console.log(this.props.users);

    return (
      <div className="  col-10 offset-1  col-xl-6 offset-xl-0 col-lg-8 offset-lg-2  my-4">
        <div className="card card-body">
          <h4 className="text-success">{this.props.handle}</h4>
          <p className="text-light mt-3">
            Technologies {this.props.handle} is interested in:
          </p>
          <p className="text-lightest mt-1"> - {usersWithFormattedTech}</p>
          <p className="text-light mt-3">Member since:</p>
          <p className="text-lightest mt-1">
            - {toDisplayDate(this.props.createdAt, "MMMM do, y")}
          </p>

          <button className="btn btn-tertiary ml-auto">Contact</button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(OtherUser);
