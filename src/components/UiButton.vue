<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
}>(), { type: 'button', variant: 'secondary', disabled: false, loading: false });
</script>

<template>
  <button
    :type="type"
    class="ui-button"
    :class="`ui-button--${variant}`"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
  >
    <span
      v-if="loading"
      class="ui-spinner"
      aria-hidden="true"
    />
    <slot />
  </button>
</template>
