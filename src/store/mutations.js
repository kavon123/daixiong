export default {
    SET_DOW_URL(state, param) {
        console.log(param)
        state.downloadUrl = param;
    },
    SET_PROMOTE_LIST(state, param) {
        state.promoteList = param;
    },
    SET_BAR_STRING(state, param) {
        state.barString = param;
    },
}