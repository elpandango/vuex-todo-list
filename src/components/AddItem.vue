<template>
  <div class="row">
    <div class="col-sm-12 col-xs-12">
      <form action="post">
        <h2 class="text-left">Add new todo item</h2>
        <div class="form-group text-left">
          <label>Todo title</label>
          <input type="text"
                 class="form-control"
                 placeholder="Title 1"
                 v-model="todoItem.title">
        </div>
        <div class="form-group text-left">
          <label>Todo text</label>
          <textarea name=""
                    id=""
                    cols="15"
                    rows="5"
                    class="form-control"
                    placeholder="Todo text"
                    v-model="todoItem.text">
               </textarea>
        </div>
        <div v-show="error==='false'" class="alert alert-success text-left anim">
          Success!<br>
          Todo has been saved.
        </div>
        <div v-show="error==='true'" class="alert alert-danger text-left anim">
          Error!<br>
          Todo hasn't been saved.
        </div>
        <div v-show="emptyError==='empty'" class="alert alert-danger text-left anim">
          Fields should be filled!
        </div>
        <div class="form-group text-left">
          <button @click.prevent="onSubmit"
                  class="btn btn-primary pull-left">Add New Item
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        todoItem: {
          title: '',
          text: '',
          id: ''
        },
        emptyError: null
      }
    },
    computed: {
      formSend() {
        return this.$store.getters.getFormSend;
      },
      error() {
        return this.$store.getters.getError;
      }
    },
    methods: {
      onSubmit(event) {
        let self = this;
        if (this.todoItem.title !== '' && this.todoItem.text !== '') {

          let formData = {
            title: this.todoItem.title,
            text: this.todoItem.text,
            id: this.todoItem.id
          };

          this.$store.dispatch('addItem', formData);
          this.emptyError = '';

          this.todoItem.title = '';
          this.todoItem.text = '';
          this.todoItem.id = '';

        } else {
          this.emptyError = 'empty';
        }
      }
    }
  }
</script>
