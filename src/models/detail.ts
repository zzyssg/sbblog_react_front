import {queryBlogById} from '@/services/detail';

const detail = {
    namespace : 'detail',
    state : {
        detailState : ''
    },

    effects:{
        *fetch({payload} : any,{call} : any){
            debugger
            const response = yield call(queryBlogById,payload);
            return response;

        }
    }

}

export default detail;