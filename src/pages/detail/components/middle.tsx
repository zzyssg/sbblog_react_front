import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { middleState } from '@/models/middle';
import { Card, Avatar, Image, Col, Row, Divider } from 'antd';
import { EyeOutlined, CalendarOutlined } from '@ant-design/icons';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

const Middle = (props: any) => {
    const [blogId, setBlogId] = useState(0);

    const [blogMsg, setBlogMsg] = useState();
    const { dispatch } = props;


    // 富文本编辑器
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null));

    useEffect(
        () => {
            // 解析得到从列表页得到的blogId
            // const val = sessionStorage.getItem("blogId") || -1;
            const id = Number.parseInt(sessionStorage.getItem("blogId") || "-1", 10);
            setBlogId(id);
            if (dispatch) {
                dispatch({
                    type: "detail/fetch",
                    payload: {
                        'blogId': id
                    }
                })
                    .then(
                        (res: any) => {
                            setBlogMsg(res.result);
                            // 取得html格式的编辑器内容
                            const htmlContent = res.result;
                            debugger
                            document.getElementById("htmlContent").innerHTML = htmlContent.content;
                            setEditorState(BraftEditor.createEditorState(htmlContent));
                        }
                    )

            }


        }
        , []
    );

    // 编辑器获得焦点时，按下保存快捷键时执行此方法
    const submitContent = () => {
        const htmlCOntent = editorState.toHTML();
        // 保存 
        // TODO
    }

    const handleEditorChange = () => {
        setEditorState(editorState);

    }

    return (
        <div>
            <Card>
                <Row justify="space-between">
                    <Col span={5}>
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        {blogMsg ? blogMsg.user.nickname : ""}
                    </Col>
                    <Col span={5}>
                        <CalendarOutlined />
                        {/* new Date(item.updateTime).toLocaleDateString() || "" */}
                        {blogMsg ? new Date(blogMsg.updateTime).toLocaleDateString() : ""}
                    </Col>
                    <Col span={5}>
                        <EyeOutlined />
                        {blogMsg ? blogMsg.views : ""}
                    </Col>
                </Row>
            </Card>
            <Card>
                <Image width="100%" height="50%" src={blogMsg ? blogMsg.firstPicture : ""} />
            </Card>
            <Card>
                <div style={{ fontSize : "150%",color : "green" }}>
                    <h1 align="center">
                        {blogMsg ? blogMsg.title : ""}
                    </h1>
                </div>

                <br />
                <div id="htmlContent">

                </div>
                {/* 富文本展示区域 */}
                {/* <BraftEditor
                    value={editorState}
                    onChange={handleEditorChange}
                    onSave={submitContent}
                /> */}
            </Card>
        </div>
    )
}

// export default Middle;
export default connect(({ middle }: middleState) => ({
    middle,
}))(Middle);