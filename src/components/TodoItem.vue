<template>
  <div>
    <div class="panel panel-primary">
      <div class="panel-heading text-left">
        <strong>{{ title }}</strong>
        <button type="button"
                @click="onDelete(id)"
                class="close">
          <span class="glyphicon glyphicon glyphicon-remove" aria-hidden="true"></span>
        </button>
      </div>
      <div class="panel-body text-left">{{ text }}</div>
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
</style>
