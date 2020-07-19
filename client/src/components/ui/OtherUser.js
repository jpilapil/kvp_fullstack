import React from "react";
// import { Link } from "react-router-dom";
import toDisplayDate from "date-fns/format";

export default function OtherUser(props) {
  const interestedTech = props.techInterestedIn.map((tech) => {
    // map through techInterestedIn, return value of "name" key

    // TODO add comma if there are more technologies listed
    // add period if tech.name is last in list
    // slice?
    return tech.name + ", ";
  });
  // console.log(interestedTech); array of strings
  return (
    <div className="  col-10 offset-1  col-xl-6 offset-xl-0 col-lg-8 offset-lg-2  my-4">
      <div className="card card-body">
        <h4 className="text-success">{props.handle}</h4>
        <p className="text-light mt-3">
          Technologies {props.handle} is interested in:
        </p>
        <p className="text-lightest mt-1"> - {interestedTech}</p>
        <p className="text-light mt-3">Member since:</p>
        <p className="text-lightest mt-1">
          - {toDisplayDate(props.createdAt, "MMMM do, y")}
        </p>

        <button className="btn btn-tertiary ml-auto">Contact</button>
      </div>
    </div>
  );
}
