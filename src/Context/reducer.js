

export const initialState = {
  user: null,
  description: [],
  replyText: "",
  replyAuthor: "",
  commentId: ""
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_DESCRIPTION: "SET_DESCRIPTION",
  SET_REPLY: "SET_REPLY",
};

const reducer = (state, action) => {

  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionTypes.SET_DESCRIPTION:
      return {
        ...state,
        description: action.description,
      };

    case actionTypes.SET_REPLY:
      return {
        ...state,
        reply: action.reply,
        replyAuthor: action.replayAuthor,
        commentId: action.commentId,
      };

    default:
      return {
        state,
      };
  }
};

export default reducer;
