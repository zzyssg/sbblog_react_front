import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { middleState } from '@/models/middle';
import { Card, Avatar, Image, Col, Row, Divider, List, Button, Form, Input, Modal, message } from 'antd';
import { EyeOutlined, CalendarOutlined } from '@ant-design/icons';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css';
import style from './middle.less';
import FrontLogin from './frontLogin';

const Middle = (props: any) => {
    const [blogId, setBlogId] = useState(0);
    const [userId, setUserId] = useState();
    const [blogMsg, setBlogMsg] = useState();
    const [rootComments, setRootComments] = useState([]);
    const [comment, setComment] = useState();
    const [reply, setReply] = useState();
    const [replyComments, setReplyComments] = useState([]);
    const [loginModalVisiable, setLoginModalVisiable] = useState(false);
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
                            // 包含 comments、content、user、id、title等
                            debugger
                            setBlogMsg(res.result);
                            // 根评论
                            const rtComments = res.result.comments;
                            setRootComments(rtComments);
                            // 取得html格式的编辑器内容
                            const htmlContent = res.result;
                            // document.getElementById("htmlContent").innerHTML = htmlContent.content;
                            const tempEditorContent = BraftEditor.createEditorState(htmlContent.content);
                            setEditorState(tempEditorContent);
                            document.getElementById("htmlContent").innerHTML = tempEditorContent.toHTML();
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

    // 提交评论
    const commitComments = (values : any) => {
        const {rootCommentContent} = values;
        dispatch(
            {
                type: "detail/commitComment",
                payload: {
                    'blogId': blogId,
                    'userId': userId,
                    'content': rootCommentContent,
                    // 'parentCommentId': 1 

                }
            }
        ).then(
            (res1 : any) => {
                // 刷新页面
                if(res1){
                    //
                    if (dispatch) {
                        dispatch({
                            type: "detail/fetch",
                            payload: {
                                'blogId': blogId
                            }
                        })
                            .then(
                                (res: any) => {
                                    // 包含 comments、content、user、id、title等
                                    setBlogMsg(res.result);
                                    // 根评论
                                    const rtComments = res.result.comments;
                                    setRootComments(rtComments);
                                    // 取得html格式的编辑器内容
                                    const htmlContent = res.result;
                                    // document.getElementById("htmlContent").innerHTML = htmlContent.content;
                                    const tempEditorContent = BraftEditor.createEditorState(htmlContent.content);
                                    setEditorState(tempEditorContent);
                                    document.getElementById("htmlContent").innerHTML = tempEditorContent.toHTML();
                                }
                            )
        
                    }
                }else{
                    message.error("新增评论失败！")
                }
            }
        )
    }

    // 评论相关
    const onFinish = (values: any) => {
        setComment(values);
        // 检验是否登录，若未登录，则进行登录或者注册
        // 登录与否是在浏览器中检查是否存在token；浏览器中每次请求均携带此token
        const token =  sessionStorage.getItem("X-Token");
        if(!token){
            // 注册、登录获取token
            setLoginModalVisiable(true);
            console.log(values);
        }else{
            // 提交评论
            commitComments(values);
        }
        
    }

    

    // 获取传递到子组件的可见值——获得userId，同时设置隐藏Modal
    const getloginModalVisiable = (visiableAndUsrId : any) => {
        const {loginVisiable} = visiableAndUsrId;
        const {curUserId} = visiableAndUsrId;
        setLoginModalVisiable(loginVisiable);
        setUserId(curUserId);
    }

    return (
        <div>
            <div >
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
                    <div style={{ fontSize: "150%", color: "green" }}>
                        <h1 align="center">
                            {blogMsg ? blogMsg.title : ""}
                        </h1>
                    </div>

                    <br />
                    <div className={style.myContent}>
                        <div
                            // className="braft-output-content"
                            id="htmlContent" >
                            {/* {editorState.toHTML()} */}
                        </div>
                    </div>
                </Card>
            </div>
            <div>
                <Card>
                    {
                     rootComments && rootComments.map(
                            (rootComment: any) => {
                                debugger
                                // 从content中拿出key——一级评论，value——二级评论的集合，如果没有二级评论则只显示一级
                                const subComments = rootComment.replyComments;
                                return (
                                    // 拿到user
                                    <div>
                                        <div>
                                            <Avatar src={rootComment.user.avatar || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />{rootComment.user.nickname || "为注册用户"}
                                            <span> {new Date(rootComment.createTime).toLocaleDateString()} {new Date(rootComment.createTime).toLocaleTimeString()}</span>
                                            <br />
                                            {rootComment.content}
                                        </div>
                                        <div>
                                            {
                                                subComments.map(
                                                    (subComment: any) => {
                                                        return (
                                                            <div>
                                                                <Avatar src={subComment.user.avatar || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />
                                                                {subComment.user.nickname || "未注册用户"}<span> 回复@ <Avatar src={subComment.parentCommentUser.avatar || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />{subComment.parentCommentUser.nickname}<span> </span>
                                                                    {new Date(subComment.createTime).toLocaleDateString()} {new Date(subComment.createTime).toLocaleTimeString()}</span>
                                                                <br />
                                                                {subComment.content}
                                                            </div>

                                                        )
                                                    }
                                                )
                                            }
                                        </div>
                                        <hr align="center" color="green" SIZE="2" />
                                    </div>
                                )
                            }
                        )
                    }
                </Card>
                <Card>
                        <Form
                            name="rootComment"
                            onFinish={onFinish}
                        >
                            <Form.Item label="评论" name="rootCommentContent"
                                rules={
                                    [{ required: true, message: "评论内容不能为空!" }]
                                }
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <div align="right">
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        提交
                                </Button>
                                </Form.Item>
                            </div>
                        </Form>
                        <Modal
                            destroyOnClose={true}
                            visible={loginModalVisiable}
                            closable={false}
                            footer={null}
                        >
                            <FrontLogin loginVisiable={loginModalVisiable} blogId={blogId} curUserId={userId} callback={getloginModalVisiable}/>
                        </Modal>
                </Card>
            </div>
        </div>
    )
}

// export default Middle;
export default connect(({ middle }: middleState) => ({
    middle,
}))(Middle);