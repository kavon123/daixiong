export default {
    SET_USER(state, param) {
        state.oUserinfo = param;
    },
    SET_DOW_URL(state, param) {
        state.downloadUrl = param;
    },
    SET_PROMOTE_LIST(state, param) {
        state.promoteList = param;
    },
    SET_BAR_STRING(state, param) {
        state.barString = param;
    },
}