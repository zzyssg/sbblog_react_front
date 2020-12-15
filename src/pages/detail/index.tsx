import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Card, Row, Col } from 'antd';
import Middle from './components/middle';


const Detail = (props: any) => {

    const [blog, setBlog] = useState();
    useEffect(

        () => {
            debugger
            console.log("detail...index....");
            setBlog(props.location.query);
        }
    );

    return (
        <PageHeaderWrapper
            title={false}
        >
            <Row justify="space-between">
                {/* 左侧内容 */}
                {/* <Col span={4}>
                    
                </Col> */}

                {/* 中间内容 */}
                <Col span={14} offset={5}>
                    <Card hoverable>
                        <Middle blog={props.location.query} />
                    </Card>
                </Col>

                {/* 右侧内容 */}
                {/* <Col span={4}>
                  
                </Col> */}
            </Row>
            <br />
            <Row>
                <Col span={14} offset={5}>
                    <Card hoverable>
                        
                    </Card>
                </Col>
            </Row>
        </PageHeaderWrapper>

    )
}

export default Detail;