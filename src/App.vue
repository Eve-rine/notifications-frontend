<template>
  <component :is="layoutForRoute">
  </component>
</template>

<script>
import MainLayout from "@/views/layouts/MainLayout.vue";
import LoginLayout from "@/views/layouts/LoginLayout.vue"; // Import your login layout

export default {
  computed: {
    layoutForRoute() {
      const currentRoute = this.$route;

      // If the route is the login page, use the LoginLayout component
      if (currentRoute.path === '/login') {
        return LoginLayout;
      }

      // Otherwise, use the MainLayout component
      return MainLayout;
    },
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
