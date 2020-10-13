import request from '@/utils/request';

export async function queryBlogList (params : any){
    // return request('/app/front/queryBlogList',
    return request('/app/blogs/findAllBlogs',
        {
            method : 'post',
            data : {
                ...params
            }
        }
    );
}

export async function queryBlogsByTypeId (params : any){
    // return request('/app/front/queryBlogsByTypeId',
    debugger
    return request('/app/blogs/queryBlogsByTypeId',
        {
            method : 'Get',
            params
        }
    );
}