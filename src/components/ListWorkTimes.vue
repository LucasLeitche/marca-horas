<template>
  <div class="mt-16" ref="list">
    <table class="w-[95%] mx-auto">
        <tr style="background: #6730b52d !important;" class="bg-dark-lilac text-light font-semibold text-[18px] h-[50px] ">
            <td >Dia</td>
            <td>Horário do Registro</td>
            <td>Tarefas realizadas</td>
            <td>Tempo Trabalhado</td>
        </tr>
        <tr 
          class="odd:bg-white text-dark-lilac font-semibold text-opacity-80 text-lg even:bg-slate-200"
          v-for="(register, key) in dataRegisters"
          :key="key"
          >
            <td>{{register.data.day}}</td>
            <td>{{register.data.registerTime}}</td>
            <td class="w-[50%]">{{register.data.occurrence}}</td>
            <td v-html="register.data.timeWorked"></td>
        </tr>
        
    </table>
  </div>
</template>

<script>
import { GetListRegisters } from '../api/registers/registerApiService.js';
import { instace } from '../api/registers/registerApiService.js'
export default {
  props:{
    dataRegisters: []
  },
  mounted(){
    console.log(this.dataRegisters)
  }
}
</script>

<style>
table tr td{
    @apply px-2
}
</style>