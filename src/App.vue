<template>
  <div id="app">
    <div class="container">
      <div class="row">

        <div class="col-xs-12">
          <img v-show="loaded" src="https://cdn-images-1.medium.com/max/800/0*cWpsf9D3g346Va20.gif" alt="">

          <div class="list-container" v-show="!loaded" v-if="!isEmpty">
            <h1 class="text-left">Todo List:</h1>
            <transition-group name="slide-right" tag="div">
              <app-todo-item v-for="(item, index) in todoList"
                             :title="item.title"
                             :text="item.text"
                             :id="item.id"
                             :key="index"></app-todo-item>
            </transition-group>
          </div>
          <div v-show="!loaded" v-else>
            <h1 class="text-left">Your todo list is empty.</h1>
          </div>
        </div>

        <div class="col-xs-12">
          <hr>
          <div class="text-left">
            <button class="btn btn-primary" @click="fetchData">Fetch Data</button>
          </div>
          <hr>
        </div>
      </div>


      <div class="row">
        <app-add-item></app-add-item>
      </div>
      <br>
      <br>

    </div>


  </div>
</template>

<style scoped>
  img {
    height: 100px;
  }
  .slide-right {
    transition: all .5s;
  }
  .slide-right-enter, .slide-right-leave-to
    /* .slide-right-leave-active for <2.1.8 */ {
    opacity: 0;
    transform: scale(0);
  }
  .slide-right-enter-to {
    opacity: 1;
    transform: scale(1);
  }

  .slide-right-leave-active {
    /*position: absolute;*/
  }

  .slide-right-move {
    opacity: 1;
    transition: all 0.5s;
  }
</style>

<script>
  import TodoItem from './components/TodoItem.vue';
  import AddItem from './components/AddItem.vue';
  import axios from 'axios';
  import imageUrl from './assets/preloader.gif';
  //  const imageUrl = require('https://cdn-images-1.medium.com/max/800/0*cWpsf9D3g346Va20.gif');

  export default {
    name: 'app',
    components: {
      appTodoItem: TodoItem,
      appAddItem: AddItem
    },
    methods: {
      fetchData() {
        this.$store.dispatch('fetchData');
      }
    },
    computed: {
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
