import React from "react";
import AppTemplate from "../ui/AppTemplate";
import OtherUser from "../ui/OtherUser";
import orderBy from "lodash/orderBy";
import countBy from "lodash/countBy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { connect } from "react-redux";
import actions from "../../store/actions";

class Connect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      order: '[["handle", "asc"]]',
      displayedUsers: [],
      allUsers: [],
      currentUser: {},
    };
  }

  componentDidMount() {
    // componentDidMount is a lifecycle method, does not need to be called somewhere else, will always run before render

    // get signed in user from redux store
    axios
      .get(
        "https://raw.githubusercontent.com/jpilapil/key-value-pair/master/src/mock-data/user.json"
      )
      .then((res) => {
        const currentUser = res.data;
        console.log("this is the user stored to global state: ", currentUser);
        this.props.dispatch({
          type: actions.UPDATE_CURRENT_USER,
          payload: res.data,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

    // get all users with technology names and set them do displayedUsers & allUsers state
    axios
      .all([axios.get("/api/v1/all-user-tech"), axios.get("/api/v1/users")])
      .then(
        axios.spread((techRes, userRes) => {
          let userTechnologies = techRes.data;
          console.log("userTechnologies: ", userTechnologies);
          const users = userRes.data.map((user) => {
            return {
              id: user.id,
              handle: user.handle,
              email: user.email,
              createdAt: user.created_at,
              technologies: userTechnologies
                .filter((technology) => technology.userId === user.id)
                .map((tech) => tech.technologyId),
              // technologies: userTechnologies
              //   .filter((technology) => technology.userId === user.id)
              //   .map((tech) => tech.technologyName),
            };
          });
          this.setState({
            allUsers: users,
            displayedUsers: users,
          });
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }

  getMatchedUsers() {
    // if the filter = all users, display all users
    if (this.state.order === '[["handle", "asc"]]') {
      this.setState({
        displayedUsers: this.state.allUsers,
      });
    } else {
      // if filter = all matched users, set state of displayedUsers to filtered users
      const currentUserTechNames = this.props.currentUser.techInterestedIn
        .map((tech) => tech)
        .map((id) => id.id);
      // const currentUserTechNames = this.props.currentUser.techInterestedIn.map(
      //   (tech) => tech.name
      // );
      console.log("currentUserTechNames: ", currentUserTechNames);
      const filteredUsers = [];
      currentUserTechNames.forEach((currentUserTechName) => {
        this.state.displayedUsers.forEach((user) => {
          user.technologies.forEach((techName) => {
            // console.log(user);
            if (techName === currentUserTechName) {
              // return multiple copies of users with the same tech name
              filteredUsers.push(user);
            }
          });
        });
      });
      const bestMatched = countBy(filteredUsers, "handle");
      let ob = bestMatched;
      let map = new Map();
      filteredUsers.map((x) => map.set(x.handle, x));
      let res = Object.entries(ob)
        .sort((a, b) => b[1] - a[1])
        .flatMap((o) => Array(o[1]).fill(map.get(o[0])));

      // console.log("sorted array of users: ", res);

      this.setState({
        displayedUsers: [...new Set(res)],
      });
      // const bestMatched = countBy(filteredUsers, "handle");
      // let ob = bestMatched;
      // let map = new Map();
      // filteredUsers.map((x) => map.set(x.handle, x));
      // // let res = [];
      // let v = Object.entries(ob)
      //   .sort((a, b) => b[1] - a[1])
      //   .forEach((o) => {
      //     ob = map.get(o[0]);
      //     res.push(Array(o[1]).fill(ob));
      //   });
    }
  }

  handleChange(e) {
    this.setState({ search: e.target.value });
  }

  filterByInput() {
    const input = this.state.search.toLowerCase();
    console.log(input);
    const copyOfDisplayedUsers = [...this.state.displayedUsers];
    const filteredUsers = copyOfDisplayedUsers.filter((user) => {
      if (user.handle.toLowerCase().includes(input.toLowerCase())) {
        return true;
      } else return false;
    });
    this.setState({ displayedUsers: filteredUsers });
  }

  setOrder(e) {
    // set order first, then set users
    const newOrder = e.target.value;
    this.setState({ order: newOrder }, () => {
      this.setUsers();
    });
  }

  setUsers() {
    // console.log("setting users");
    const copyOfDisplayedUsers = [...this.state.displayedUsers];

    console.log("this is what youre looking for: ", this.state.order);

    const toJson = JSON.parse(this.state.order);
    // console.log(toJson);
    const orderedUsers = orderBy(copyOfDisplayedUsers, ...toJson);
    // console.log(orderedUsers);
    this.setState({ displayedUsers: orderedUsers });
    this.getMatchedUsers();
  }

  render() {
    return (
      <AppTemplate>
        <div>
          <div className=" mt-8">
            <h2 className="text-secondary text-center mb-8">
              Connect with other users
            </h2>

            {/* search bar */}
            <div className="row justify-content-start mb-7">
              <div className="col-2 ">
                <select
                  value={this.state.order}
                  className="form-control mt-1"
                  id="searchFilter"
                  onChange={(e) => this.setOrder(e)}
                >
                  <option value='[["handle", "asc"]]'>All Users</option>
                  <option value='[["handle", "desc"]]'>
                    All Matched Users
                  </option>
                  {/* <option value='[["rating", "handle"], ["desc", "asc"]]'>
                    Highest Rated
                  </option> */}
                </select>
              </div>
              <div className="col-0 mt-4 ml-auto">
                <FontAwesomeIcon icon={faSearch} className="fa-search" />
              </div>

              <div className="col-7">
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Search users"
                  aria-label="Search users"
                  aria-describedby="searchInput"
                  id="searchInput"
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
              </div>

              <div className="col-1 mr-7 ml-auto">
                <button
                  className="btn btn-sm btn-tertiary"
                  onClick={() => this.filterByInput()}
                >
                  Search
                </button>
              </div>
            </div>

            <div className="row mt-2">
              {this.state.displayedUsers.map((user) => {
                return (
                  <OtherUser
                    handle={user.handle}
                    techInterestedIn={user.technologies}
                    createdAt={user.createdAt}
                    email={user.email}
                    key={user.id}
                    users={this.state.displayedUsers}
                  />
                );
              })}
            </div>
            {/* <div className="row justify-content-center">
              <Link className="btn bt-lg text-tertiary">Show more</Link>
            </div> */}
          </div>
        </div>
      </AppTemplate>
    );
  }
}

// grant access to redux store, use this.props!
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}
export default connect(mapStateToProps)(Connect);
