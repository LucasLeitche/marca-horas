<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Contador from './components/Contador.vue'
import ListWorkTimes from './components/ListWorkTimes.vue';
import Modal from './components/Modal.vue';
import { GetListRegisters } from './api/registers/registerApiService';
import { instace } from './api/registers/registerApiService';


export default{
  components:{
    Contador,
    ListWorkTimes,
    Modal,
  },
  data(){
    return{
      showModal: false,
      dataRegisters:[],
      dataRegister:{}
    }
  },
  methods:{
    async loadData(){
      await GetListRegisters();
      this.dataRegisters = {...instace.data}
      console.log(this.dataRegisters)

    },
    handleShowModal($event){
      console.log('entrou', $event)
      this.showModal = true
      this.dataRegister = $event
    },
    handleClose(sended){
      if(sended){
        this.loadData();
      }
      this.showModal = false
    }
  },
  mounted(){
    this.loadData()
  }
}
</script>

<template>
  <div class="mb-20">
    <Contador
      @finishDay="handleShowModal($event)"
    />
    <ListWorkTimes
      :dataRegisters="dataRegisters"
    />
    <Modal 
      v-if="showModal"
      @close="handleClose($event)"
      :dataRegister="dataRegister"
    />
  </div>
</template>

<style>
html.dark{
  @apply bg-[#121212] text-light
}

</style>
