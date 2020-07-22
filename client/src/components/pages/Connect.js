import React from "react";
import AppTemplate from "../ui/AppTemplate";
import OtherUser from "../ui/OtherUser";
import orderBy from "lodash/orderBy";
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

  async componentDidMount() {
    // componentDidMount is a lifecycle method, does not need to be called somewhere else, will always run before render

    // get user signed in
    await axios
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

    // get all local users
    axios.get("/api/v1/all-users").then((res) => {
      // handle success
      const userTechnologies = res.data;
      console.log("this is user tech: ", userTechnologies);
      axios.get("/api/v1/users").then((res2) => {
        const users = res2.data.map((user) => {
          return {
            id: user.id,
            handle: user.handle,
            createdAt: user.created_at,
            technologies: userTechnologies
              .filter((technology) => technology.userId === user.id)
              .map((tech) => tech.technologyName),
          };
        });
        console.log(users);
        this.setState({
          displayedUsers: users,
        });
      });
    });
  }

  getMatchedUsers() {
    if (this.state.order === '[["handle", "asc"]]') {
      // axios.get("/api/v1/all-users").then((res) => {
      //   // handle success
      //   const users = res.data;
      //   this.setState({
      //     displayedUsers: users,
      //   });
      // });
      axios.get("/api/v1/all-users").then((res) => {
        // handle success
        const userTechnologies = res.data;
        // console.log("this is user tech: ", userTechnologies);
        axios.get("/api/v1/users").then((res2) => {
          const users = res2.data.map((user) => {
            return {
              id: user.id,
              handle: user.handle,
              createdAt: user.created_at,
              technologies: userTechnologies
                .filter((technology) => technology.userId === user.id)
                .map((tech) => tech.technologyName),
            };
          });
          console.log(users);
          this.setState({
            displayedUsers: users,
          });
        });
      });
    } else {
      axios
        .get(
          "https://raw.githubusercontent.com/jpilapil/key-value-pair/master/src/mock-data/user.json"
        )
        .then((res) => {
          const currentUserTech = res.data;
          console.log("this is currentUserTech: ", currentUserTech);
        });

      axios
        .get("/api/v1/all-users")
        .then((res) => {
          const allUserTechnologies = res.data;
          console.log("this is all user tech: ", allUserTechnologies);
          axios.get("/api/v1/users").then((res2) => {
            const users = res2.data.map((user) => {
              return {
                id: user.id,
                handle: user.handle,
                createdAt: user.created_at,
                technologies: allUserTechnologies
                  .filter((technology) => technology.userId === user.id)
                  .map((tech) => tech.technologyName),
              };
            });

            console.log("this is local users were working with: ", users);
            const currentUserTechNames = this.props.currentUser.techInterestedIn.map(
              (tech) => tech.name
            );
            console.log("currentUserTechNames: ", currentUserTechNames);
            const filteredUsers = [];
            currentUserTechNames.forEach((currentUserTechName) => {
              users.forEach((user) => {
                user.technologies.forEach((techName) => {
                  // console.log(user);
                  if (techName === currentUserTechName) {
                    // return multiple copies of users with the same tech name
                    filteredUsers.push(user);
                  }
                });
              });
            });
            // console.log(users);
            const bestMatchedUsers = filteredUsers;
            //  - set displayed users state to filtered users
            /* TODO order filteredUsers by most common tech interests, count how often someone is matched, order by number of times matches, most = highest, less = lowest. map through filteredUsers, get each user. if user shows up multiple times, push to top of list */

            this.setState({
              displayedUsers: [...new Set(bestMatchedUsers)],
            });
          });
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
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
      if (user.handle.includes(input.toLowerCase())) {
        return true;
      } else return false;
    });
    this.setState({ displayedUsers: filteredUsers }, () => {
      // this.setUsers();
    });
    // if (input === "") {
    //   this.setState({ displayedUsers: users });
    // }
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
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}
export default connect(mapStateToProps)(Connect);
