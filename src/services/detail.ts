import request from '@/utils/request';

export async function queryBlogById(params : any) {
    return request("/app/blogs/queryBlogById"
        , {
            method : 'get',
            params
            
        });
}