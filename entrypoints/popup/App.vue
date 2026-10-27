<script setup lang="ts">
import UiStatus from '../../src/components/UiStatus.vue';
import ThemeSelect from '../../src/components/ThemeSelect.vue';
import { useThemeDocument } from '../../src/composables/useThemeDocument';

useThemeDocument();
</script>

<template>
  <main
    aria-labelledby="app-title"
    class="grid gap-6 p-6"
  >
    <header>
      <p class="text-xs font-semibold text-muted">
        P0 · Foundation
      </p>
      <h1
        id="app-title"
        class="mt-2 text-2xl font-bold tracking-tight"
      >
        Frontend DevKit
      </h1>
      <p class="mt-4 text-sm leading-relaxed">
        Không gian công cụ dành cho frontend developer, xử lý dữ liệu ngay trên máy.
      </p>
    </header>
    <UiStatus
      heading-id="status-title"
      title="Đang xây dựng nền tảng"
      description="Bản khởi tạo chưa có công cụ. Workspace, tìm kiếm và các công cụ sẽ được bổ sung theo lộ trình."
      class="border-t border-line pt-5"
    />
    <ThemeSelect />
    <p class="text-xs leading-relaxed text-muted">
      Bản này không yêu cầu quyền truy cập website và không gửi dữ liệu lên mạng.
    </p>
  </main>
</template>
