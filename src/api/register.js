import axios from "axios";



const api = axios.create({
    baseURL: 'https://registers-scs-default-rtdb.firebaseio.com/'
});

let apiErrorMessage = 'Verifique os parametros da requisição';

// const startLoading = () =>{
//     store.dispatch('setLoading', true);
// }

// Set New Register POST

export async function ApiPost(path, data, callback){

    path += '.json';

    // startLoading();

    await api.post(path, {data})
    .then( response =>{
        return callback(response, {error: false});
    })
    .catch((error)=>{
        apiErrorMessage = error;
        return callback(error, {error: true});
    })
    
}

// Get List of Registers

export async function ApiListGet(path, callback){

    if(!path){
        return console.error(apiErrorMessage)
    }

    path += '.json';

    // startLoading();

    await api.get(path)
    .then((response)=>{
            callback(response, {error: false})
    })
    
}

// Get Register with id

export async function ApiGet(path, id, callback){

    if(!path || path != 'appliences' || !id){
        return console.error(apiErrorMessage)
    }

    path += `/${id}.json`;
    // startLoading();

    await api.get(path)
    .then(response=>{
        callback(response, {error: false});
    })
    .catch((error)=>{
        apiErrorMessage = error;
        return callback(error, {error: true});
    })

}

// Update Register

export async function ApiPut(path, id, data, callback){

    if(!path || path != 'appliences' || !id){
        return console.error(apiErrorMessage)
    }
    path += `/${id}.json`;
    
    await api.put(path, {data})
    .then( response =>{
        return callback(response, {error: false});
    })
    .catch((error)=>{
        apiErrorMessage = error;
        return callback(error, {error: true});
    })
    
}

// Delete Register
export async function ApiDelete(path, id, callback){

    if(!path || path != 'appliences' || !id){
        return console.error(apiErrorMessage)
    }
    path += `/${id}.json`;
    
    await api.delete(path)
    .then( response =>{
        return callback(response, {error: false});
    })
    .catch((error)=>{
        apiErrorMessage = error;
    })
    
}