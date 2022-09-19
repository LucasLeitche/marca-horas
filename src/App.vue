<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Contador from './components/Contador.vue'
import ListWorkTimes from './components/ListWorkTimes.vue';
import Modal from './components/Modal.vue';
export default{
  components:{
    Contador,
    ListWorkTimes,
    Modal,
  },
  data(){
    return{
      showModal: false,
      dataRegister: {}
    }
  },
  methods:{
    handleShowModal($event){
      console.log('entrou', $event)
      this.showModal = true
      this.dataRegister = $event
    }
  }
}
</script>

<template>
  <div class="">
    <Contador
      @finishDay="handleShowModal($event)"
    />
    <ListWorkTimes/>
    <Modal 
      v-if="showModal"
      @close="showModal = false"
      :dataRegister="dataRegister"
    />
  </div>
</template>

<style>
html.dark{
  @apply bg-[#121212] text-light
}

</style>
