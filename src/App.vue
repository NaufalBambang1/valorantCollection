<template>
  <nav class="p-3 py-5 bg-neutral-900 fixed top-0 z-50 w-full">
    <div class="flex flex-row gap-6">
      <router-link to="/">
        <img src="./assets/images/riotlogo.png" alt="riot logo" height="60" width="100" href="/">
      </router-link>
      <router-link to="/agents" class="font-semibold text-lg">Agents</router-link>
      <router-link to="/weapons" class="font-semibold text-lg">Weapons</router-link>
    </div>
  </nav>
  <router-view/>
</template>


