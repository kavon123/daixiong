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
        state.platformType = param;
    },
    SET_IS_IOS(state, param) {
        state.isIOS = param;
    },
    SET_PHONE(state, param) {
        state.Phone = param;
    },
    SET_CONTACTS_LIST(state, param) {
        state.contactsList = param;
    }
}
