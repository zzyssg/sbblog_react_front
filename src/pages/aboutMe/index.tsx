import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Tag, Image } from 'antd';
import { connect } from 'umi';
import { connectState } from '@/models/connect';
import { GithubOutlined, WechatFilled, WechatOutlined, WeiboOutlined } from '@ant-design/icons';

const colors = ["#f50", "#2db7f5", "#87d068", "#108ee9", "#55acee", "#cd201f", "#3b5999", "#55acee"];

const getRandomColor = (index: any) => {
    // const index = Math.round(Math.random() * colors.length);
    return colors[index % colors.length];
}

const AboutMe = (props: any) => {

    const { dispatch } = props;

    const [types, setTypes] = useState([]);

    useEffect(() => {
        if (dispatch) {
            dispatch(
                {
                    type: "type/fetch",
                    payload: {},
                }
            )
                .then(
                    (res: any) => {
                        debugger
                        console.log("res", res);
                        setTypes(res.result);
                    }
                )
        }

    }, []
    )

    return (
        <div>
            <Row>
                <Col span={12} offset={3}>
                    {/* <Card> */}
                        {/* <p>this is AboutMe...</p>
                        <p style={{ fontSize: "300%" }}>左侧为图片，一半空间，右侧填写个人联系方式、邮箱、微信、微博、github</p>
                        <p style={{ fontSize: "300%" }}>分类、标签、座右铭</p> */}
                        <Image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600148047755&di=25bbac62f6895a2693cb3c075a45ad53&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201505%2F30%2F20150530001720_syjCa.thumb.700_0.jpeg" 
                        height="100%" width="100%" preview={false}/>
                    {/* </Card> */}
                </Col>
                <Col span={5} offset={0}>
                    <Card>
                        <h1 style={{ fontWeight: "bold", fontSize: "150%" }}>关于我</h1>
                    </Card>
                    <Card>
                        长泽雅美现任男友，目前从事前端开发工作，喜欢历史和音乐。理想是<span style={{ fontSize: "200%", color: "green" }}>世界和平</span>。
                        喜欢的电视剧有<span><a style={{ fontSize: "150%", color: "orange" }} target="_blank" href="https://baike.baidu.com/item/LEGAL%20HIGH/786525?fr=aladdin">《LEAGAL HIGH》</a></span>、
                                        <a style={{ fontSize: "150%", color: "orange" }} target="_blank" href="https://baike.baidu.com/item/%E5%9C%88%E5%A5%97/912799?fr=aladdin">《圈套》</a>等。
                    </Card>
                    <Card>
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
                    <Card>
                        <Row>
                            <Col span={4}>
                                <WechatFilled style={{ color: "green", fontSize: "200%" }} />
                            </Col>
                            <Col span={4}>
                                <WeiboOutlined style={{ color: "red", fontSize: "200%" }} />
                            </Col>
                            <Col span = {5}>
                                <GithubOutlined href="https://github.com/zzyssg" style={{ fontSize: "200%" }} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>

    )

}

export default connect(
    ({ type }: connectState) => ({
    type,
})
)(AboutMe);
// export default AboutMe;