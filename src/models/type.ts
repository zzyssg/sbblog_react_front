import {queryTypeByTypeId,queryAllTypes} from '@/services/type';

const type = {
    namespace : 'type',
    state : {
        typeState : ''
    },

    effects:{
        *fetch({payload} : any,{call} : any){
            const response = yield call(queryAllTypes,payload);
            return response;

        },
        *queryTypeByTypeId({payload} : any,{call} : any){
            const response = yield call(queryTypeByTypeId,payload);
            return response;

        }
    }

}

export default type;