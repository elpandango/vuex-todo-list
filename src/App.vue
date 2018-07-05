<template>
  <div id="app">
    <div class="container">
      <div class="row">

        <div class="col-sm-12 col-xs-12">
          <img v-show="loaded" src="https://cdn-images-1.medium.com/max/800/0*cWpsf9D3g346Va20.gif" alt="">

          <div class="list-container" v-show="!loaded" v-if="!isEmpty">
            <h1 class="text-left">Todo List:</h1>
            <div class="todos-wrap">
              <transition-group name="slide">
                <app-todo-item v-for="(item, index) in todoList"
                               :title="item.title"
                               :text="item.text"
                               :id="item.id"
                               :key="index"></app-todo-item>
              </transition-group>
            </div>
          </div>
          <div v-show="!loaded" v-else>
            <h1 class="text-left">Your todo list is empty.</h1>
          </div>
        </div>
        <hr>
      </div>

      <app-edit-item v-show="editWasClicked"></app-edit-item>
      <app-add-item v-show="!editWasClicked"></app-add-item>
      <br>
      <br>

    </div>


  </div>
</template>

<style scoped>
  img {
    height: 100px;
  }

  .slide-enter {
    /*transform: translateY(20px);*/
    opacity: 0;
  }

  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
    transition: opacity .5s;
  }

  .slide-leave {

  }

  .slide-leave-active {
    animation: slide-out 1s ease-out forwards;
    transition: opacity 1s;
    opacity: 0;
    position: absolute;
  }

  .slide-move {
    transition: transform 1s;
  }

  @keyframes slide-in {
    from {
      transform: translateY(20px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(20px);
    }
  }
</style>

<script>
  import TodoItem from './components/TodoItem.vue';
  import AddItem from './components/AddItem.vue';
  import EditItems from './components/EditItems.vue';
  import axios from 'axios';
  import imageUrl from './assets/preloader.gif';
  //  const imageUrl = require('https://cdn-images-1.medium.com/max/800/0*cWpsf9D3g346Va20.gif');

  export default {
    name: 'app',
    components: {
      appTodoItem: TodoItem,
      appAddItem: AddItem,
      appEditItem: EditItems
    },
    methods: {
      fetchData() {
        this.$store.dispatch('fetchData');
      }
    },
    computed: {
      editWasClicked() {
        return this.$store.getters.getEditWasClicked;
      },
      isEmpty() {
        return this.$store.getters.getTodoList.length === 0;
      },
      loaded() {
        return this.$store.getters.getLoadingProgress;
      },
      todoList() {
        return this.$store.getters.getTodoList;
      }
    },
    created() {
      this.$store.dispatch('fetchData');
    }
  }
</script>
<style>
  /*.todos-wrap {*/
    /*max-height: 280px;*/
    /*overflow-y: scroll;*/
    /*margin-bottom: 10px;*/
  /*}*/
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
