import { List, Avator, Button, Skeleton } from 'antd';
import reqwest from 'reqwest';
import React, { useState, useEffect } from 'react';

const count = 3;
const url = "http://localhost:8000/queryAllBlogs"
const getData = (callback: any) => {

    reqwest(
        {
            url: {url},
            type: 'json',
            method: "get",
            contentType: 'application/json',
            success: (res: any) => {
                callback(res);
            },

        }
    );
}



const LoadMore = () => {

    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>([]);
    const [list, setList] = useState<any>([]);

    const onLoadMore = () => {
        setLoading(true);
        setList(
            data.concat([...new Array(count)].map(() => ({ loading: true }))),
        );
        getData((res: any) => {
            debugger
            const dataTamp = data.concat(res.results);
            setData(dataTamp);
            setList(data);
            setLoading(false);
            (() => {
                window.dispatchEvent(new Event('resize'));
            })();
        
        }
        );


    }

    const loadMore =
        !initLoading && !loading ? (
            <div>
                style={{
                    textAlign: "center",
                    marginTop: 12,
                    height: 32,
                    lineHeight: "32px"
                }}
                <Button onClick={onLoadMore}>点击加载更多...</Button>
            </div>
        ) : null;

    useEffect(
        () => {
            getData((res: any) => {
                setInitLoading(false);
                setData(res.results);
                setList(res.results);
            });
        }

    )

    return (
        <List
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={
                (item: any) => (
                    <List.Item
                    >
                        <List.Item.Meta>
                            <div>
                                {item}
                            </div>
                        </List.Item.Meta>
                    </List.Item>

                )

            }
        >
            ..
        </List>



    );



}

export default LoadMore;