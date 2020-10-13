import {queryBlogById} from '@/services/detail';

const Middle = {
    namespace : 'middle',
    state : {
        middleState : ''
    },

    effects:{
        *fetch({params} : any,{call} : any){
            const response = yield call(queryBlogById,params);
            return response;

        }
    }

}

export default Middle;