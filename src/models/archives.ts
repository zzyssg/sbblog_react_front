import {queryBlogsByYear} from '@/services/archives';

const archives = {
    namespace : 'archives',
    state : {
        ArchivesState : ''
    },

    effects:{
        *fetch({payload} : any,{call} : any){
            const response = yield call(queryBlogsByYear,payload);
            return response;

        }
    }

}

export default archives;