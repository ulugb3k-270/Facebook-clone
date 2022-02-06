import { ContactlessOutlined } from "@material-ui/icons";

export const initialState = {
  user: null,
  description: []
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_DESCRIPTION: "SET_DESCRIPTION"
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    
    case actionTypes.SET_DESCRIPTION:
    return{
      ...state,
      description: action.description,
    }
    default:
      return {
        state,
      };
  }
};

export default reducer;
