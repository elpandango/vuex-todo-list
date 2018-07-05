<template>
  <div>

    <div class="card border-info">
      <div class="card-header text-left">
        <div class="header-block">
          <div class="title">
            {{ title }}
          </div>
          <div class="dropdown pull-right">
            <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
              ...
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item"
                 href="#"
                 @click="onEditClick(id)">Edit</a>
              <a class="dropdown-item"
                 href="#"
                 @click="onDelete(id)">Delete</a>
            </div>
          </div>
        </div>

      </div>
      <div class="card-body">
        <p class="card-text text-left">{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['title', 'text', 'id'],
    methods: {
      onDelete(id) {
        this.$store.dispatch('removeItem', id);
      },
      onEditClick(id) {
        this.$store.dispatch('editItem', id);
        this.$store.commit('editWasClicked');
      }
    }
  }
</script>

<style>
  .card-header .header-block {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  button {
    outline: none !important;
  }

  .card {
    margin-bottom: 20px;
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
