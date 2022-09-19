<template>
  <div class="w-full h-full my-0 my-32 flex flex-col justify-center items-center gap-3">
    <span>Total trabalhado: 0</span>
    <span v-html="count"></span>
    <span>Data e Hora :{{dateNow}}</span>
    <div class="flex gap-3 flex-wrap">
        <button 
            @click="startCount()"
            class="btn bg-light-lilac text-light px-[32px] py-[18px] rounded-xl disabled:bg-dark-lilac disabled:text-zinc-500 disabled:cursor-not-allowed"
            :disabled="timer"
        >
            <span class="text-[16pt] ">Iniciar Contagem</span>
        </button>
        <button 
            @click="pauseCount()"
            class="btn  border-2 border-dark-red text-dark-red px-[32px] py-[18px] rounded-xl hover:border-[#ff0000] hover:text-[#ff0000]  transition-colors"
            :disabled="!timer"
            v-if="timer"
        >
            <span class="text-[16pt] ">Pausar</span>
        </button>
        <button 
            @click="finishDay()"
            class="btn border-2  border-dark-blue   text-dark-blue px-[32px] py-[18px] rounded-xl hover:border-[#00bfff] hover:text-[#00bfff] transition-colors"
            :disabled="!timer"
            v-if="timer"
        >
            <span class="text-[16pt] ">Finalizar Dia</span>
        </button>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            count: "0:0:0",
            timer: null,
            dateNow: 0,
            day: null,
            currentDataTimer: null,
            timeWorked:{
                sec: 0,
                min:0,
                hour:0
            }
        }
    },
    methods:{
        finishDay(){
            let dataRegister = {
                day: this.day,
                registerTime: this.dateNow,
                timeWorked: this.count,
                timeWorkedObject: this.timeWorked,
                occurrence: null 
            }
            if(confirm('Você tem certeza que deseja finalizar o dia?') == true){
                this.pauseCount();
                this.$emit('finishDay', dataRegister)
            } else{
                return;
            }

        },
        handleStorage(){
            let storageTimeWork = {};

            if(this.timeWorked && this.currentDataTimer){
                storageTimeWork = {
                    ...this.timeWorked,
                    dateStorage: this.currentDataTimer
                }
            }
            localStorage.setItem('tempo', JSON.stringify(storageTimeWork))
        },
        pauseCount(){
            clearInterval(this.timer)
            this.timer = !this.timer 
        },
        startCount(){
            if(!this.timer){
                this.timer = setInterval(()=>{
                    this.timeWorked.sec = this.timeWorked.sec + 1;
 
                    if(this.timeWorked.sec == 60){
                        this.timeWorked.sec = 0;
                        this.timeWorked.min = this.timeWorked.min + 1;
                        this.timeWorked.sec = this.timeWorked.sec + 1;
                    }

                    if(this.timeWorked.min == 60){
                        this.timeWorked.sec = 0;
                        this.timeWorked.min = 0;
                        this.timeWorked.hour = this.timeWorked.hour + 1;
                    }

                    this.count = `<span>Tempo trabalhado:</span>  ${this.timeWorked.hour} <strong>hora:</strong>  ${this.timeWorked.min} <strong>minutos:</strong> ${this.timeWorked.sec} <strong>segundos</strong>`;
                },1000)
            }
        },
        currentTime(){
            let data = new Date()
            // Guarda cada pedaço em uma variável
            let dia     = data.getDate();           // 1-31
            let mes     = data.getMonth();          // 0-11 (zero=janeiro)
            let ano     = data.getFullYear();       // 4 dígitos
            let hora    = data.getHours();          // 0-23
            let min     = data.getMinutes();        // 0-59
            let seg     = data.getSeconds();        // 0-59
            let str_data = `${dia < 10 ? '0' : ''}` + dia + '/' + `${mes < 10 ? '0' : ''}` + (mes+1) + '/' + ano;
            let str_hora = `${hora < 10 ? '0' : ''}` + hora + ':' + `${min < 10 ? '0' : ''}` + min + ':' + `${seg < 10 ? '0' : ''}` + seg;
            this.day = str_data
            this.dateNow = `${str_data} ${str_hora}` 
        },
    },
    mounted(){
        this.currentDataTimer = setInterval(this.currentTime)
        console.log(this.currentTime)
    },
    created(){
        window.onbeforeunload = function(e){
            return "Tem certeza que quer sair da pagina?";
        }
    },
    beforeDestroy() {
        clearInterval(this.interval)
    },
}
</script>

<style>

</style>