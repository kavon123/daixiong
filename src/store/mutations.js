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
    },
    SET_TASK_CONFIG_CODE(state, param) {
        state.taskConfigCode = param;
    },
    SET_ITEM_CODE(state, param) {
        state.itemCode = param;
    },
    SET_MOMENTS_URL(state, param) {
        state.momentsUrl = param;
    }
}
