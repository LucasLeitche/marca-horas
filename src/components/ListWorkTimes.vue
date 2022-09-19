<template>
  <div class="w-[95%] mx-auto">
    <table>
        <tr class="bg-dark-lilac text-light font-semibold text-[18px] h-[50px] ">
            <td >Dia</td>
            <td>Horário do Registro</td>
            <td>Tarefas realizadas</td>
            <td>Tempo Trabalhado</td>
        </tr>
        <tr class="odd:bg-white text-dark-lilac font-normal even:bg-slate-200 ">
            <td>05/07/2018</td>
            <td>19/09/2022 14:02:32</td>
            <td class="w-[50%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos harum dolorum maxime reiciendis consectetur magnam itaque incidunt odit, obcaecati consequuntur velit enim doloremque odio delectus porro ipsum praesentium ab accusamus!</td>
            <td>0 hora: 5 minutos: 18 segundos</td>
        </tr>
        
    </table>
  </div>
</template>

<script>
import { GetListRegisters } from '../api/registers/registerApiService.js';
import {retorno} from '../api/registers/registerApiService.js'
export default {
  methods:{
    async retorno(res){
      console.log(res)
    }
  },
  data(){
    return{
      dataRegisters:{
        day: null,
        registerTime: null,
        timeWorked: null,
        timeWorkedObject: null,
        occurrence: null 
      }
    }
  },  
  async mounted(){
    await GetListRegisters()
    console.log(retorno)
  }
}
</script>

<style>
table tr td{
    @apply px-2
}
</style>