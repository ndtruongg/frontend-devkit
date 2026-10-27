<script setup lang="ts">
import { useId } from 'vue';

withDefaults(defineProps<{
  kind?: 'empty' | 'loading' | 'error' | 'success';
  title: string;
  description?: string;
  headingId?: string;
}>(), { kind: 'empty', description: '', headingId: '' });
const generatedId = `status-${useId()}`;
</script>

<template>
  <section
    :role="kind === 'empty' ? 'region' : kind === 'error' ? 'alert' : 'status'"
    :aria-labelledby="headingId || generatedId"
    :aria-busy="kind === 'loading' || undefined"
    class="grid min-w-0 gap-2"
    :class="`ui-status--${kind}`"
  >
    <h2
      :id="headingId || generatedId"
      class="flex items-center gap-2 text-sm font-semibold"
    >
      <span
        v-if="kind === 'loading'"
        class="ui-spinner"
        aria-hidden="true"
      />
      <span>
        <template v-if="kind === 'error'">Lỗi: </template>
        <template v-else-if="kind === 'success'">Hoàn tất: </template>
        <template v-else-if="kind === 'loading'">Đang xử lý: </template>
        {{ title }}
      </span>
    </h2>
    <p
      v-if="description"
      class="text-sm leading-relaxed text-muted"
    >
      {{ description }}
    </p>
    <slot />
  </section>
</template>
