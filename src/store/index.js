import Vuex from 'vuex';
import Vue from 'vue';
import note from "./modules/note";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules: {
        note
    }
});
