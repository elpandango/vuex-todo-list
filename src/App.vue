<template>
  <div id="app">
    <div class="container">
      <div class="row">

        <div class="col-xs-12">
          <img v-show="loaded" src="https://cdn-images-1.medium.com/max/800/0*cWpsf9D3g346Va20.gif" alt="">

          <div class="list-container" v-show="!loaded" v-if="!isEmpty">
            <h1 class="text-left">Todo List:</h1>
            <transition-group name="slide" mode="out-in">
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
