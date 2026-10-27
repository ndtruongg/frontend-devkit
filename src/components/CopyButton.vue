<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';
import UiButton from './UiButton.vue';

const props = withDefaults(defineProps<{ text: string; disabled?: boolean }>(), { disabled: false });
const busy = ref(false);
const feedback = ref<'idle' | 'success' | 'error'>('idle');
let generation = 0;

watch(() => props.text, () => { generation++; feedback.value = 'idle'; });
onUnmounted(() => { generation++; });

async function copy(): Promise<void> {
  if (busy.value || props.disabled || props.text.length === 0) return;
  const current = ++generation;
  busy.value = true;
  feedback.value = 'idle';
  try {
    if (!globalThis.navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await globalThis.navigator.clipboard.writeText(props.text);
    if (current === generation) feedback.value = 'success';
  } catch {
    if (current === generation) feedback.value = 'error';
  } finally {
    busy.value = false;
  }
}
</script>

<template>
  <div class="grid min-w-0 justify-items-start gap-2">
    <UiButton
      :disabled="disabled || text.length === 0"
      :loading="busy"
      @click="copy"
    >
      Sao chép
    </UiButton>
    <p
      role="status"
      class="text-sm"
      :class="feedback === 'error' ? 'text-danger' : 'text-success'"
    >
      <template v-if="busy">
        Đang sao chép…
      </template>
      <template v-else-if="feedback === 'success'">
        Đã sao chép.
      </template>
      <template v-else-if="feedback === 'error'">
        Không thể sao chép. Hãy cho phép clipboard hoặc sao chép thủ công.
      </template>
    </p>
  </div>
</template>
