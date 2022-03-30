import Vue from "vue";
import Vuex from "vuex"
import Tab from "./tab.js"
import User from "./user.js"

Vue.use(Vuex);


export default new Vuex.Store({
    modules:{
        Tab,
        User
    }
})