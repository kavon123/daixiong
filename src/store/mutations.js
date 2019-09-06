export default {
    SET_USER(state, param) {
        state.oUserinfo = param;
    },
    SET_USER_INFO_YG(state, param) {
        state.ygUserinfo = param;
    },
    SET_BAR_STRING(state, param) {
        state.barString = param;
    },
    SET_PLATFORM_TYPE(state, param) {
        console.log(param)
        state.platformType = param;
    },
}
