<template>
  <div 
    class="mask"
    v-if="dataRegister"
  >
    <div 
        
        id="modal" 
        class="xl:w-[60%] overflow-y-scroll w-[90%] mt-[5%] max-h-[560px] text-light-lilac bg-white"
    >
        <div id="modal-header" class=" py-4 px-5 flex justify-between border-b-2">
            <span class="font-semibold text-2xl">Finalização do dia</span>
            <button
                @click="$emit('close')"
                class="font-semibold text-xl"
            >
                X
            </button>
        </div>
        <div id="modal-body" class="px-5 py-4 flex flex-col gap-5 text-black">
            <span> <strong class="text-light-lilac">Dia: </strong> {{dataRegister.day}} </span>
            <span> <strong class="text-light-lilac">Registro:</strong> {{dataRegister.registerTime}}</span>
            <span class="text-timeWorkd"> <strong class="text-light-lilac">Tempo Trabalhado:</strong> <span class="" v-html="dataRegister.timeWorked"></span> </span>
            <textarea v-model="dataRegister.occurrence" class="border-2 rounded border-slate-400 outline-1 outline-light-lilac p-2" name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div id="modal-footer" class="border-2 border-top py-4 px-5 flex justify-end gap-3">
            <button 
                @click="$emit('close')"    
                class="btn border border-dark-red text-dark-red p-2 rounded-lg hover:bg-dark-red hover:text-light transition-colors">
                Cancelar
            </button>
            <button 
                class="btn border bg-dark-green text-light p-3 rounded-lg border hover:border-dark-green hover:bg-transparent hover:text-dark-green transition-colors"
                @click="handleConfirm()"    
            >
                Confirmar
            </button>
        </div>
    </div>
  </div>
</template>

<script>
import {PostRegister} from '../api/registers/registerApiService.js'

export default {
    props:{
        dataRegister:{
            type: Object
        }
    }, 
    data(){
        return{
            text: null
        }
    },
    methods:{
        async handleConfirm(){
            let data = this.dataRegister
            await PostRegister(data);
            this.$emit('close', true)
            console.log(data)
        }
    }
}
</script>

<style>
.mask{
    background: rgba(0, 0, 0, 0.505);
    @apply
    h-screen
    w-full
    absolute
    flex
    justify-center
    top-0
    bottom-0
}
.text-timeWorkd span{
    @apply
    text-black font-normal
    
}
.text-timeWorkd span span{
    @apply
    text-light-lilac font-bold
}
.text-timeWorkd span strong{
    @apply text-black font-normal
}
</style>