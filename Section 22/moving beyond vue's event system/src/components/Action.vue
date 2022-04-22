<template>
  <div class="mt-2 ml-2" style="opacity: 0.5;">
    <button type="button" class="btn btn-primary" @click="open = true">
      Open
    </button>

    <teleport to='#modals'>
      <app-modal :show="open" @hide="open = false" :scrollable="false" />
    </teleport>
  </div>
</template>

<script>
import AppModal from './Modal.vue';

export default {
  name: 'AppAction',
  components: {
    AppModal,
  },
  data() {
    return {
      open: false,
    };
  },
};
</script>

<style>

</style>
