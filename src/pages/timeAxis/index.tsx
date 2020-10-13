import React, { useEffect, useState } from 'react';
import { Timeline, Card, Row, Col } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import { blogListState } from '@/models/blogList';
import { Link } from 'react-router-dom';
// import LoadMore from './components/LoadMore';


const TimesAxis = (props: any) => {

    const [data, setData] = useState<any>([]);
    const { dispatch } = props;

    const linkToDetail = (blogId: any) => {
        sessionStorage.setItem('blogId', blogId);
    }

    useEffect(
        () => {
            // 加载时从服务器获取所有的博客数据（或者仅获取部分数据）
            if (dispatch) {
                dispatch(
                    {
                        type: 'blogList/fetch',
                        payload: {

                        }
                    }
                )
                    .then(
                        (res: any) => {
                            const records = res.result;
                            const dataTemp = records.map(
                                (record: any) => {
                                    const num = record.id % 3;
                                    let color = "green";
                                    if (num === 1) {
                                        color = "red";
                                    } else if (num === 2) {
                                        color = "purple";
                                    }
                                    return (
                                        <Timeline.Item
                                            color={color}
                                        // dot={record.id / 2 === 0 ? <> : <ClockCircleOutlined />}
                                        // label={new Date(record.updateTime).toLocaleDateString()}
                                        >
                                            {new Date(record.updateTime).toLocaleDateString()}
                                            <Link to={{ pathname: '/detail', query: record }} target="_blank">
                                                <a onClick={() => { linkToDetail(record.id) }}>{record.title}</a>
                                            </Link>
                                        </Timeline.Item>
                                    )
                                }
                            );
                            console.log("res", res);
                            setData(dataTemp);
                        }
                    )
            }
            // const dataTemp = [...new Array(20)].map(() => {
            //     return (
            //         <Timeline.Item >
            //             hhh啊按实际看见了富
            //         </Timeline.Item>
            //     )

            // })

            // 将数据进行处理,在 item里添加标题,添加超链接=>跳转至详情页面

            // 将数据设置在data里
            // setData(dataTemp);
        }, []
    );

    return (
        <Row>
            <Col span={16} offset={4}
            >
                <Card>
                    <Timeline
                        mode="alternate"
                        pending="i am the last..."
                        // 标志可以用react对象
                        // TODO
                        pendingDot={<ClockCircleOutlined />}>
                        {data}
                    </Timeline>
                </Card>
            </Col>
        </Row>
    )

}

export default connect(({ blogList, loading }: blogListState) => ({
    blogList,
}))(TimesAxis);
// export default TimesAxis;