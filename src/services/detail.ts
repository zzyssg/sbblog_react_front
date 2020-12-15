import request from '@/utils/request';

export async function queryBlogById(params : any) {
    return request("/app/blogs/queryBlogById"
        , {
            method : 'get',
            params
            
        });
}

export async function frontLogin(params : any) {
    return request("/app/user/frontLogin"
        , {
            method : 'POST',
            data: {
                ...params,
                method: 'post',
              },
            
        });
}

export async function commitComment(params : any) {
    return request("/app/comment/commit"
        , {
            method : 'POST',
            data: {
                ...params,
                method: 'post',
              },
            
        });
}