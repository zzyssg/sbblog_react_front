import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Tag, message } from 'antd';
import { connect } from 'umi';
import { typeState } from '@/models/type';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import BlogList from './components/blogList';


const colors = ["#f50", "#2db7f5", "#87d068", "#108ee9", "#55acee", "#cd201f", "#3b5999", "#55acee"];

const getRandomColor = () => {
    const index = Math.round(Math.random() * colors.length);
    return colors[index];
}

const Types = (props: any) => {
    const { dispatch } = props;
    const [types, setTypes] = useState([]);

    const [blogsOfType, setBlogsOfType] = useState();

    useEffect(
        () => {
            // 查询出所有的type
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
                                message.success("查询类型成功！！！");
                                setTypes(res.result);
                                const firstTypeId = res.result[0].id;
                                document.getElementById("currentType").innerHTML = res.result[0].name;

                                // 设置柱状图状图
                                const typeEchart = echarts.init(document.getElementById("typeChart"), 'dark');

                                // const typeXNameData = (res.result).map((type: any) =>
                                //     type.name
                                // );
                                // const typeDataValue = (res.result).map((type: any) => type.blogs.length);
                                // const typeBarOption = {
                                   
                                //     title: {
                                //         text: '柱状图'
                                //     },
                                //     tooltip: {},
                                //     xAxis: {
                                //         data: typeXNameData
                                //     },
                                //     yAxis: {

                                //     },
                                //     series: {
                                //         name: "类型",
                                //         type: 'bar',
                                //         data: typeDataValue,
                                //         // 全局调色盘。
                                //         color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83',
                                //             '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
                                //     }
                                // }
                                // typeEchart.setOption(typeBarOption);

                                // 饼状图
                                const typeData = (res.result).map((type: any) => {
                                    return {

                                        name: type.name,
                                        value: type.blogs.length,

                                    }
                                });
                                const typeOption = {
                                    visualMap : {
                                        show : false,
                                        min : 80,
                                        max : 600,
                                        inRange : {
                                            colorLightness : [0,1]
                                        }
                                    },
                                    backgroundColor : "#2c343c",
                                    textStyle : {
                                        color : 'rgba(255,255,255,0.3)',
                                    },
                                    labelLine : {
                                        lineStyle : {
                                            color : 'rgba(255,255,255,0.3)',
                                        }
                                    },
                                    itemStyle : {
                                        // 设置扇形的颜色
                                        color : '#c23531',
                                        shadowBlur : 200,
                                        shadowColor : 'rgba(0,0,0,0.5)'
                                    },
                                    title : {
                                        show : true,
                                        text : '类型饼状图'
                                    },
                                    tooltip: {

                                    },
                                    series: {
                                        itemStyle : {
                                            emphasis : {
                                                shadowBlur : 200,
                                                shadowColor : 'rgba(0,0,0,0.5)',
                                            }
                                        },
                                        roseType : "angle",
                                        radius : "55%",
                                        type: 'pie',
                                        data: typeData
                                    }
                                }
                                typeEchart.setOption(typeOption);


                                // 给博客列表以初值————即第一个type对应的列表
                                dispatch(
                                    {
                                        type: "blogList/queryBlogsByTypeId",
                                        payload: {
                                            "typeId": firstTypeId,
                                        }
                                    }
                                )
                                    .then(
                                        (res2: any) => {
                                            debugger
                                            const blogTemp = res2.result;
                                            setBlogsOfType(blogTemp);
                                        }
                                    )
                            }
                        }
                    )
            }

        }, []
    )

    const queryBlogsByTypeId = (type: any) => {
        const typeId = type.id;
        const typeName = type.name;
        document.getElementById("currentType").innerHTML = typeName;
        if (dispatch) {
            dispatch(
                {
                    type: "blogList/queryBlogsByTypeId",
                    payload: {
                        "typeId": typeId
                    },
                }
            )
                .then(
                    (res: any) => {
                        if (res.retCode === "001") {
                            const blogList = res.result;
                            message.success("queryTypeById OK！！！");
                            setBlogsOfType(blogList);
                        }
                    }
                )
        }

    }

    return (

        <Row>
            <Col span={12} offset={4}>
                <Card >
                    <Row>
                        <Col span={4}>
                            <h1 style={{ fontSize: "200%" }}>分类</h1>

                        </Col>
                        <Col span={4} offset={16}>
                            共<span style={{ color: "green", fontWeight: "bold", fontSize: "200%" }}>{types.length}</span>类
                        </Col>
                    </Row>
                </Card>

                {/* 标签类别 */}
                <Card>
                    <Row>
                        <Col span={10}>
                            {
                                types.map((typeItem: any) => {
                                    const colour = getRandomColor();
                                    return (
                                        <Tag style={{ fontSize: "100%" }} color={colour} onClick={() => { queryBlogsByTypeId(typeItem) }}>
                                            {typeItem.name}
                                        </Tag>
                                    )
                                })
                            }
                        </Col>
                        <Col span={6} offset={6}>
                            <p>当前分类：<span id="currentType" style={{ fontSize: "100%", fontWeight: "bold", }}></span></p>
                        </Col>
                    </Row>

                </Card>

                {/* 标签选定后，插叙得到的博客列表 */}
                <Card>
                    <BlogList listData={blogsOfType} />
                </Card>
            </Col>
            <Col span={6}>
                <div id="typeChart" style={{ height: 300, weight: 300 }} />
            </Col>
        </Row>

    )
}

export default connect(({ type }: typeState) => ({
    type,
}))(Types);
// export default Types;