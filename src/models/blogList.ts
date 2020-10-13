import {queryBlogList, queryBlogsByTypeId} from '@/services/blogList';

const blogList = {
    namespace : 'blogList',
    state : {
        blogListState : ''
    },
    effects : {
        *fetch(payload : any ,{call} : any){
            const response = yield call(queryBlogList,payload);
            return response;
        },
        *queryBlogsByTypeId({payload} : any ,{call} : any){
            debugger
            const response = yield call(queryBlogsByTypeId,payload);
            return response;
        }

    }


}
export default blogList;
