<template>
  <div id="app">
    <MainView/>
  </div>
</template>

<script>
import MainView from '@/views/MainView.vue';

export default {
  name: 'App',
  components: {
    MainView
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
