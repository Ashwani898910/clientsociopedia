const commentReducer = (
    state = { comments: null, loading: false, error: false, uploading: false },
    action
) => {
    switch (action.type) {
        // belongs to commentcard.jsx
        case "POST_RETREIVING_START":
            return { ...state, loading: true, error: false };
        case "POST_RETREIVING_SUCCESS":
            return { ...state, comments: action.data, loading: false, error: false };
        case "POST_RETREIVING_FAIL":
            return { ...state, loading: false, error: true };
        default:
            return state;

    }
}
export default commentReducer;
