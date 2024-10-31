<template>
  <div>
    <div class="bg-main-image h-[91.9vh] w-full flex justify-center items-center ">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <router-link to="/agents" class="border bg-[#ff4655] px-8 py-3 hover:bg-white hover:text-black transition flex justify-center">
          <span class="text-2xl font-semibold ">See More Agents</span>
        </router-link>
        <router-link to="/weapons" class="border bg-[#ff4655] px-8 py-3 hover:bg-white hover:text-black transition flex justify-center">
          <span class="text-2xl font-semibold">See More Weapons</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

