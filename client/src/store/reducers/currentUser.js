import actions from "../actions";
import isEmpty from "lodash/isEmpty";

export default function currentUser(currentUser = {}, action) {
  switch (action.type) {
    case actions.UPDATE_CURRENT_USER:
      // if the currentUser in redux store is an empty obj, remove authToken
      if (isEmpty(action.payload)) {
        localStorage.removeItem("authToken");
      }
      return action.payload;
    default:
      return currentUser;
  }
}
