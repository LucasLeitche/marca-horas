import { ApiPost, ApiGet, ApiListGet, ApiDelete, ApiPut } from '../register';

// const finishLoad = () =>{
//     store.dispatch('setLoading', false);
// }
const path = 'registers';


const handleResquest = async (res, error ) =>{
    
    // await finishLoad();

    if(error.error){
        alert('Erro: ' + res.message);
        return res.message
    } 
    
        // store.dispatch(pathStore, res.data)
    
    if(res){
        alert('Realizado com sucesso');
    }

    Response(res.data)
}

var resposta = null
async function Response(res){
    return resposta = res
}
export var retorno = resposta

export async function PostRegister(payload){
    await ApiPost(path, payload , (res, error) => handleResquest(res, error))
}

export async function PutRegister(payload, payloadId){
    await ApiPut(path, payloadId, payload, (res, error) => handleResquest(res, error))
}

export async function GetRegister(payloadId){
    await ApiGet(path, payloadId, (res, error) => handleResquest(res, error, 'setRegister' ))
}

export async function GetListRegisters(callback){
    await ApiListGet(path, (res, error) => handleResquest(res, error, 'setRegister' ))
}

export async function DeleteRegister(payloadId){
    await ApiDelete(path, payloadId, (res, error)=> handleResquest(res, error))
}

