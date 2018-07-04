import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    todoList: [],
    todoItem: {
      title: '',
      text: '',
      id: '',
      key: ''
    },
    error: null,
    loading: true
  },
  mutations: {
    addItem(state, todoItem) {
      state.todoItem.title = todoItem.title;
      state.todoItem.text = todoItem.text;
      state.todoItem.id = todoItem.id;
      // state.todoList.push(todoItem);
    },
    fetchData(state, todoList) {
      state.todoList = null;
      state.todoList = todoList;
    },
    removeItem(state, key) {
      const deletedItem = state.todoList.findIndex(item => item.key === key);
      state.todoList.splice(deletedItem, 1);
    }
  },
  actions: {
    addItem({commit}, todoItem) {
      // todoItem.key = '_' + Math.random().toString(36).substr(2, 9);
      axios.post('https://vuex-todo-b6d91.firebaseio.com/data.json', todoItem)
        .then(response => {
          commit('addItem', todoItem);
          // console.log(response);
          this.state.error = 'false'
        })
        .catch(error => {
          this.state.error = 'true'
        });
    },
    removeItem({commit}, id) {
      commit('removeItem', id);
      console.log('delete id = ', id);
      // console.log('delete key = ', key);
      axios.delete('https://vuex-todo-b6d91.firebaseio.com/data/' + id + '.json')
        .then(response => {
          console.log('Deleted successfully', response);
        })
        .catch(error => {
          console.log('Error - ', error);
        })
    },
    fetchData({commit}) {
      axios.get('https://vuex-todo-b6d91.firebaseio.com/data.json')
        .then(response => {
          // console.log('response data = ', response.data);
          let tempArr = [];

          // console.log(response.data[key]);

          for (let key in response.data) {
            tempArr.push({
              'title': response.data[key].title,
              'text': response.data[key].text,
              'key': response.data[key].id,
              'id': key
            });

          }
          commit('fetchData', tempArr);
          this.state.loading = false;
        })
    }
  },
  getters: {
    getError: state => {
      return state.error;
    },
    getTodoList: state => {
      return state.todoList;
    },
    getLoadingProgress: state => {
      return state.loading;
    }
  }
});
