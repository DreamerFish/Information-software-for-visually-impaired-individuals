import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
 
export const store = new Vuex.Store({
	state: {
		url: '123654789'
	},
	mutations: {
		// payload为用户传递的值，可以是单一值或者对象
		m(state, payload) {
			state.url = payload.url;
		}
	}
})
 