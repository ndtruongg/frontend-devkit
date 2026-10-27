<script setup lang="ts">
import { computed, useId } from 'vue';

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<{
  modelValue: string;
  label: string;
  id?: string;
  hint?: string;
  error?: string;
  type?: 'text' | 'search' | 'url' | 'password';
  disabled?: boolean;
  required?: boolean;
}>(), { type: 'text', disabled: false, required: false, id: '', hint: '', error: '' });
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
const generatedId = useId();
const inputId = computed(() => props.id || `field-${generatedId}`);
const description = computed(() => [
  props.hint ? `${inputId.value}-hint` : '',
  props.error ? `${inputId.value}-error` : '',
].filter(Boolean).join(' ') || undefined);
</script>

<template>
  <div class="grid min-w-0 gap-2">
    <label
      :for="inputId"
      class="text-sm font-semibold"
    >
      {{ label }}<span
        v-if="required"
        class="font-normal text-muted"
      > (bắt buộc)</span>
    </label>
    <input
      v-bind="$attrs"
      :id="inputId"
      class="ui-control"
      :type="type"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="description"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <p
      v-if="hint"
      :id="`${inputId}-hint`"
      class="text-sm text-muted"
    >
      {{ hint }}
    </p>
    <p
      v-if="error"
      :id="`${inputId}-error`"
      role="alert"
      class="text-sm text-danger"
    >
      {{ error }}
    </p>
  </div>
</template>
