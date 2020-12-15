import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Card, Row, Col, message, Tag, BackTop } from 'antd';
import BlogList from './components/blogList';

import { connect } from 'umi';
import { Link } from 'react-router-dom';

const colors = ["#f50", "#2db7f5", "#87d068", "#108ee9", "#55acee", "#cd201f", "#3b5999", "#55acee"];

const backTopStyle = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
}

const getRandomColor = (index: any) => {
    // const index = Math.round(Math.random() * colors.length);
    return colors[index % colors.length];
}

const Blog = (props: any) => {

    const { dispatch } = props;

    const [types, setTypes] = useState([]);

    useEffect(


        () => {
            debugger
            console.log("Blog.props", props);

            // 加载时请求得到 所有标签
            if (dispatch) {
                dispatch(
                    {
                        type: "type/fetch",
                        payload: {

                        }
                    }
                )
                    .then(
                        (res: any) => {
                            if (res.retCode === "001") {
                                debugger
                                message.success("查询类型成功！！！");
                                const typesTemp = res.result;
                                setTypes(typesTemp);
                            }
                        }
                    )
            }
        }, []
    );

    return (
        <PageHeaderWrapper
            title={false}
        >
            <Row >


                {/* 中间内容 */}
                <Col span={13} offset={4} style={{ borderRadius : "100" }}>
                    <Card hoverable>
                        <BlogList />
                    </Card>
                </Col>
                <Col span={4}>
                    <Card>
                        <Row>
                            <Col span={4}>
                                <Link to={{ pathname: '/types' }} target="_blank" >
                                    <a style={{ fontSize : "100%" }}>分类</a>
                                </Link>
                            </Col>
                            <Col span={3} offset={15}>
                                <Link to={{ pathname: '/types' }} target="_blank" >
                                    <a>more>></a>
                                </Link>
                            </Col>
                        </Row>
                    </Card>
                    <Card hoverable>
                        <div>
                            {
                                types.map((typeItem: any) => {
                                    const colour = getRandomColor(typeItem.id);

                                    return (
                                        <Tag style={{ fontSize: "100%" }} color={colour}
                                        // onClick={() => { queryTypeByTypeId(typeItem.id) }}
                                        >
                                            {typeItem.name}
                                        </Tag>
                                    )
                                })
                            }
                        </div>

                    </Card>
                    <Card hoverable>
                        <p>要是长泽雅美就好了</p>
                    </Card>
                </Col>
            </Row>
            <div>
                <BackTop>
                    <div style={backTopStyle}>顶部</div>
                </BackTop>
            </div>
        </PageHeaderWrapper>

    )
}

export default connect(({ type, loading }: typeState) => ({
    type,
}))(Blog);
// export default Blog;