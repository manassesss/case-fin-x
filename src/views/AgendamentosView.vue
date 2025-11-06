<template>
  <div class="agendamentos-view">
    <AgendamentosList />
  </div>
</template>

<script setup>
import AgendamentosList from '../components/AgendamentosList.vue'
</script>

<style scoped>
.agendamentos-view {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.view-header {
  background-color: #ffffff;
  padding: 30px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.view-header h1 {
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 600;
  color: #2c3e50;
}

.subtitle {
  margin: 0;
  font-size: 16px;
  color: #6c757d;
}
</style>
