import request from '@/utils/request';

export async function queryAllTypes(params : any) {
    return request("/app/type/queryAllTypes"
        , {
            method : 'get',
            params
            
        });
}
export async function queryTypeByTypeId(params : any) {
    return request("/app/type/queryTypeByTypeId"
        , {
            method : 'get',
            params
            
        });
}