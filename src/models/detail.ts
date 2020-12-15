import {queryBlogById,frontLogin,commitComment} from '@/services/detail';

const detail = {
    namespace : 'detail',
    state : {
        detailState : ''
    },

    effects:{
        *fetch({payload} : any,{call} : any){
            const response = yield call(queryBlogById,payload);
            return response;

        },
        *login({payload} : any,{call} : any){
            const response = yield call(frontLogin,payload);
            return response;
        },
        *commitComment({payload} : any,{call} : any){
            const response = yield call(commitComment,payload);
            return response;
        },

    }

}

export default detail;