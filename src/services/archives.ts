import request from '@/utils/request';

export async function queryBlogsByYear(params : any) {
    return request("/app/blogs/findAllBlogsByYear"
        , {
            method : 'get',
            params
            
        });
}