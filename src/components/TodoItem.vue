<template>
  <div>
    <div class="panel-wrap">
      <div class="panel panel-primary">
        <div class="panel-heading text-left">
          <strong>{{ title }}</strong>
        </div>
        <div class="panel-body text-left">{{ text }}</div>
      </div>
      <button type="button"
              @click="onDelete(id)"
              class="close">
        <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['title', 'text', 'id'],
    methods: {
      onDelete(id) {
        this.$store.dispatch('removeItem', id);
      }
    }
  }
</script>

<style>
  button {
    outline: none!important;
  }
  .panel-wrap {
    display: flex;
    margin-bottom: 20px;
    border: 1px solid #337ab7;
    border-radius: 4px;
    overflow: hidden;
  }
  .panel-wrap .panel .panel-heading {
    border-radius: 0;
  }
  .panel-wrap .panel {
    margin-bottom: 0;
    flex: 1;
    border: none;
    border-right: 1px solid #337ab7;
    border-radius: 0;
  }
  .panel-wrap button {
    width: 50px;
  }
</style>
