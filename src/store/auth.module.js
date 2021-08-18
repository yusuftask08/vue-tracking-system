import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";
import router from "../router"
import {
    LOGIN,
    LOGOUT,
    REGISTER,
    // CHECK_AUTH,
    UPDATE_USER
} from "./actions.type";
import {
    SET_AUTH,
    PURGE_AUTH,
    SET_ERROR
} from "./mutations.type";

const state = {
    unsuccess: false,
    success: false,
    Err: "",
    errors: "",
    isAuth: null,
    user: {},
    snackbar: null,
    isAuthenticated: !JwtService.getToken()
};

const getters = {
    currentUser(state) {
        return state.user;
    },
    isAuthenticated(state) {
        return state.isAuthenticated;
    },
    isAuth(state) {
        return state.isAuth;
    },
    Err(state) {
        return state.Err;
    }
};

const actions = {
    [LOGIN](context, credentials) {
        return new Promise(resolve => {
            ApiService.post("", {
                    email: credentials.email,
                    password: credentials.password,
                    returnSecureToken: true,
                })
                .then(({
                    data
                }) => {
                    context.commit(SET_AUTH, data.idToken);
                    resolve(data);
                    if (data) {
                        this.state.success = true
                    }
                }).catch(error => {
                    context.commit(SET_ERROR, error);
                });
        });
    },
    [LOGOUT](context) {
        context.commit(PURGE_AUTH);
    },
    [REGISTER](context, credentials) {
        return new Promise((resolve, reject) => {
            ApiService.post("users", {
                    user: credentials
                })
                .then(({
                    data
                }) => {
                    context.commit(SET_AUTH, data.user);
                    resolve(data);
                })
                .catch(({
                    response
                }) => {
                    context.commit(SET_ERROR, response.message);
                    reject(response);
                });
        });
    },
    // [CHECK_AUTH](context) {
    //     if (JwtService.getToken()) {
    //         ApiService.setHeader();
    //         ApiService.get("user")
    //             .then(({
    //                 data
    //             }) => {
    //                 console.log('data :>> ', data);
    //                 context.commit(SET_AUTH, data.data);
    //             })
    //             .catch(({
    //                 response
    //             }) => {
    //                 context.commit(SET_ERROR, response.data.message);
    //             });
    //     } else {
    //         context.commit(PURGE_AUTH);
    //     }
    // },
    [UPDATE_USER](context, payload) {
        const {
            email,
            username,
            password,
            image,
            bio
        } = payload;
        const user = {
            email,
            username,
            bio,
            image
        };
        if (password) {
            user.password = password;
        }

        return ApiService.put("user", user).then(({
            data
        }) => {
            context.commit(SET_AUTH, data.user);
            return data;
        });
    }
};

const mutations = {
    [SET_ERROR](state, error) {
        state.Err = error;
    },
    [SET_AUTH](state, user) {
        state.isAuthenticated = true;
        state.isAuth = true;
        state.user = user;
        state.Err = {};
        JwtService.saveToken(state.user);
    },
    [PURGE_AUTH](state) {
        state.isAuthenticated = false;
        state.isAuth = false;
        state.user = {};
        state.Err = {};
        JwtService.destroyToken();
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};