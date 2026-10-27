import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import '../../src/app/styles/main.css';
import './style.css';

createApp(App).use(createPinia()).mount('#app');
