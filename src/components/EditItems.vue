<template>
  <div class="row">
    <div class="col-sm-12 col-xs-12">
      <form action="post">
        <h2 class="text-left">Edit todo item</h2>
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
          <button @click.prevent="onEdit"
                  class="btn btn-primary pull-left">Save Changes
          </button>
          <button class="btn btn-danger" @click="onCancelEdit">Cancel</button>
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
        emptyError: null
      }
    },
    computed: {
      todoItem() {
        return this.$store.getters.getTodoItem;
      },
      error() {
        return this.$store.getters.getError;
      }
    },
    methods: {
      onSubmit(event) {
        if (this.todoItem.title !== '' && this.todoItem.text !== '') {
          this.$store.dispatch('addItem', this.todoItem);
          this.emptyError = '';

          this.todoItem.title = '';
          this.todoItem.text = '';
          this.todoItem.id = '';
        } else {
          this.emptyError = 'empty';
        }
      },
      onCancelEdit() {
        this.$store.commit('cancelEditWasClicked');
      },
      onEdit() {
        this.$store.dispatch('sendEditedItem', this.todoItem);
        this.$store.commit('cancelEditWasClicked');
      }
    }
  }
</script>
