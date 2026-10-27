<script setup lang="ts">
import { useId } from 'vue';
import { useThemeStore } from '../stores/theme';

const theme = useThemeStore();
const id = `theme-${useId()}`;
</script>

<template>
  <div class="grid min-w-0 gap-2">
    <label
      :for="id"
      class="text-sm font-semibold"
    >Giao diện</label>
    <select
      :id="id"
      class="ui-control"
      :value="theme.preference"
      :aria-describedby="`${id}-hint`"
      @change="theme.setPreference(($event.target as HTMLSelectElement).value)"
    >
      <option value="system">
        Theo hệ thống
      </option>
      <option value="light">
        Sáng
      </option>
      <option value="dark">
        Tối
      </option>
    </select>
    <p
      :id="`${id}-hint`"
      class="text-xs leading-relaxed text-muted"
    >
      Lựa chọn áp dụng trong phiên này.
    </p>
  </div>
</template>
