import React, { useState, useEffect } from 'react';
import { Col, Row, Card, List } from 'antd';
import ArchiveHead from './components/archiveHead';
import { connectState } from '@/models/connect';
import { connect } from 'umi';
import { Link } from 'react-router-dom';

const Archives = (props: any) => {
    const [blogData, setBlogData] = useState([]);

    const { dispatch } = props;
    useEffect(() => {
        if (dispatch) {
            dispatch(
                {
                    type: "archives/fetch",
                    payload: {}
                }
            )
                .then(
                    (res: any) => {
                        console.log("res", res);
                        if (res.retCode === '001') {
                            setBlogData(res.result);
                        }
                    }
                )
        }
    }, []
    )

    const linkToDetail = (blogId: any) => {
        sessionStorage.setItem('blogId', blogId);
    }

    return (
        <div>
            <Row>
                <Col span={16} offset={4}>
                    <ArchiveHead />
                    <Card>
                        <Row justify="space-around">
                            {
                                blogData.map(
                                    (blogWithYear: any) => {
                                        return (
                                            <Col span={7}>
                                                {/* <Card hoverable> */}
                                                <List
                                                    header={blogWithYear.curYear}
                                                    bordered
                                                    dataSource={blogWithYear.blogsOfYear}
                                                    renderItem={
                                                        (blog: any) => (
                                                            <List.Item>
                                                                <Link to={{ pathname: '/detail', query: blog }} target="_blank" 
                                                                    onClick={() => {linkToDetail(blog.id)}}
                                                                >
                                                                    <a style={{ fontWeight : 'blod' }}>{blog.title}</a>
                                                                </Link>
                                                            </List.Item>)
                                                    }
                                                />
                                                {/* </Card> */}
                                            </Col>
                                        )
                                    }
                                )
                            }
                        </Row>
                    </Card>
                </Col>
            </Row>

        </div>
    )

}

export default connect(
    ({ ArchivesState }: connectState) => ({
        ArchivesState,
    })
)(Archives);