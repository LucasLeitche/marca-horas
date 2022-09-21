import { ApiPost, ApiGet, ApiListGet, ApiDelete, ApiPut } from '../register';
import { ListData } from './listData';
// const finishLoad = () =>{
//     store.dispatch('setLoading', false);
// }
const path = 'registers';

export const instace = new ListData();


const handleResquest = async (res, error ) =>{
    
    // await finishLoad();

    if(error.error){
        alert('Erro: ' + res.message);
        return res.message
    } 
    
        // store.dispatch(pathStore, res.data)
    
    const method = res.config.method.toUpperCase();

    if( method == 'POST' || method == 'PUT' || method == 'DELETE' ){
        alert('Realizado com sucesso');
    } else{
        instace.setData(res.data);
    }

}

 

export async function PostRegister(payload){
    await ApiPost(path, payload , (res, error) => handleResquest(res, error))
}

export async function PutRegister(payload, payloadId){
    await ApiPut(path, payloadId, payload, (res, error) => handleResquest(res, error))
}

export async function GetRegister(payloadId){
    await ApiGet(path, payloadId, (res, error) => handleResquest(res, error, 'setRegister' ))
}


export async function GetListRegisters(){
    await ApiListGet(path, async (res, error) => await handleResquest(res, error, 'setRegister' ))
}



export async function DeleteRegister(payloadId){
    await ApiDelete(path, payloadId, (res, error)=> handleResquest(res, error))
}

