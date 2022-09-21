<template>
  <div class="w-full h-full flex flex-col justify-center items-center mt-20 mb-15 ">
    <div class="mb-16">
        <span class="text-green-400 text-xl font-semibold text-animation" v-if="timer">Rodando</span>
        <span class="text-dark-red text-xl font-semibold text-animation" v-if="!timer && count">Pausado</span>
    </div>
    <div class="flex flex-col items-start justify-center p-3 w-[300px] h-[100px]   rounded-md absolute left-3 top-20 text-light font-semibold text-md">
        <span>Total trabalhado: </span>
        <span>Hora: <span class="text-dark-green underline"> R$ 22,00 </span></span>
        <span>A receber: <span class="text-dark-green underline"> R$ 22,00 </span></span>
    </div>
    <div id="container-timer" class="flex gap-5 items-center">
        <div class="squad-timer">
            {{timeWorked.hour}}
            <small class="text-sm my-2 opacity-60">Horas</small>
        </div>
        <span class="points">:</span>
        <div class="squad-timer">
            {{timeWorked.min}}
            <small class="text-sm my-2 opacity-60">Minutos</small>
        </div>
        <span class="points">:</span>
        <div class="squad-timer">
            {{timeWorked.sec}}
            <small class="text-sm my-2 opacity-60">Segundos</small>
        </div>
    </div>
    <div class="flex gap-3 flex-wrap my-10">
        <button 
            @click="startCount()"
            class="btn bg-light-lilac bg-opacity-60 text-light px-[32px] py-[18px] rounded-xl disabled:bg-dark-lilac disabled:text-zinc-500 disabled:cursor-not-allowed"
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
            count: null,
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
        resetTime(){
            this.timeWorked = {
                sec: 0,
                min:0,
                hour:0
            }
        },
        finishCount(){
            this.count = '<strong>hora:</strong>  0 <strong>minutos:</strong> 0 <strong>segundos</strong>'
            this.timer = null
        },
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
                this.finishCount();
                this.resetTime();
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
                        this.timeWorked.sec = (0 - 1);
                        this.timeWorked.min = this.timeWorked.min + 1;
                        this.timeWorked.sec = this.timeWorked.sec + 1;
                    }

                    if(this.timeWorked.min == 60){
                        this.timeWorked.min = 0
                        this.timeWorked.hour = this.timeWorked.hour + 1;
                    }

                    this.count = `${this.timeWorked.hour} <strong>hora:</strong>  ${this.timeWorked.min} <strong>minutos:</strong> ${this.timeWorked.sec} <strong>segundos</strong>`;
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
    @keyframes animate {
        0%{
            opacity: 0;
        }
        50%{
            opacity: 0.7;
        }
        100%{
            opacity: 0;
        }
    }
.text-animation{
    animation: animate 
                1.5s linear infinite;
}
.squad-timer{
    background: #6730b52d;
    @apply
        flex
        flex-col
        justify-center
        items-center
        text-light
        text-6xl
        border
        border-light-lilac
        border-opacity-30
        shadow-md
        shadow-gray-800
        rounded-md
        p-3
        w-[180px]
        h-[180px]
}
.points{
    @apply
        text-light

}
</style>