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
    formSend: false,
    editItemId: '',
    error: null,
    loading: true,
    editWasClicked: false
  },
  mutations: {
    addItem(state, todoItem) {
      // state.todoItem.title = todoItem.title;
      // state.todoItem.text = todoItem.text;
      // state.todoItem.id = todoItem.id;
    },
    fetchData(state, todoList) {
      state.todoList = null;
      state.todoList = todoList;
    },
    removeItem(state, id) {
      const deletedItem = state.todoList.findIndex(item => item.id === id);
      state.todoList.splice(deletedItem, 1);
    },
    editItem(state, id) {
      const editedItem = state.todoList.findIndex(item => item.id === id);
    },
    editWasClicked(state) {
      state.editWasClicked = true;
    },
    cancelEditWasClicked(state) {
      state.editWasClicked = false;
    }
  },
  actions: {
    addItem({commit}, todoItem) {
      axios.post('/data.json', todoItem)
        .then(response => {
          commit('addItem', todoItem);
          this.state.error = 'false';

          axios.get('/data.json')
            .then(response => {
              let tempArr = [];

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

              this.state.formSend = true;
            })

        })
        .catch(error => {
          this.state.error = 'true'
        });

    },
    removeItem({commit}, id) {
      commit('removeItem', id);
      console.log('delete id = ', id);
      axios.delete('https://vuex-todo-b6d91.firebaseio.com/data/' + id + '.json')
        .then(response => {
          console.log('Deleted successfully', response);
        })
        .catch(error => {
          console.log('Error - ', error);
        })
    },
    sendEditedItem({commit}, todoItem) {
      const id = this.state.editItemId;

      axios.put('https://vuex-todo-b6d91.firebaseio.com/data/' + id + '.json', todoItem)
        .then(response => {
          console.log('Edited successfully', response);

          axios.get('/data.json')
            .then(response => {
              let tempArr = [];

              console.log('Edit Fetch');

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

        })
        .catch(error => {
          console.log('Error - ', error);
        });

    },
    editItem({commit}, id, todoItem) {
      // console.log('edited id = ', id);

      this.state.editItemId = id;

      axios.get('https://vuex-todo-b6d91.firebaseio.com/data/' + id + '.json')
        .then(response => {
          // let tempArr = [];

          this.state.todoItem.title = response.data.title;
          this.state.todoItem.text = response.data.text;

          console.log(this.state.todoItem);
        });
    },
    fetchData({commit}) {
      axios.get('/data.json')
        .then(response => {
          let tempArr = [];

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
    getTodoItem: state => {
      return state.todoItem;
    },
    getTodoList: state => {
      return state.todoList;
    },
    getLoadingProgress: state => {
      return state.loading;
    },
    getEditWasClicked: state => {
      return state.editWasClicked;
    },
    getFormSend: state => {
      return state.formSend;
    }
  }
});

