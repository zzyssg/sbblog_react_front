import React, { useEffect, useState } from 'react';
import { Card, Row, Col, message, List } from 'antd';
import style from './archives.less';

const ArchiveHead = (props: any) => {

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
                        console.log("res-archiveHead", res);
                        if (res.retCode === '001') {
                            setBlogData(res.result);
                        }
                    }
                )
        }
    }
    )

    return (
        <div>
            <Card className={style.head}>
                <Row >
                    <Col span={2}>
                        <span style={{ fontSize: '200%' }}>归档</span>
                    </Col>
                    <Col span={2} offset={20}>
                        共<span style={{ fontSize: '200%', color: 'green' }}>66</span>篇
                    </Col>
                </Row>
            </Card>
        </div>
    )


}

export default ArchiveHead;