import React, {useEffect, useState} from 'react';
import {detailState} from '@/models/detail';
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {connect} from 'umi';

const FrontLogin = (props : any) => {
    let {loginVisiable} = props;
    let {curUserId} = props;
    let {login} = props;
    const {dispatch} = props;
    const [loginAvatar, setLoginAvatar] = useState();

    const onFinish = (values: any) => {
        // 提交注册/登录
        const {username} = values;
        const {password} = values; 
        if (dispatch) {
            dispatch({
                type: "detail/login",
                payload: {
                    'username': username,
                    'password': password
                }
            })
                .then(
                    (res: any) => {
                        // 将此visiable传递到middle里，使得Modal消失
                        if(res.retCode === "001"){
                            // 设置userId
                            loginVisiable = false;
                            login = true;
                            debugger
                            const resData = res.result;
                            curUserId = resData.userId;
                            const curAvatar = resData.avatar;
                            setLoginAvatar(curAvatar);
                            const token = resData.token || "";
                            sessionStorage.setItem("X-Token",token);
                            sessionStorage.setItem("curUserId", curUserId);
                            sessionStorage.setItem("curAvatar",curAvatar);
                            props.callback({loginVisiable,curUserId,curAvatar,login});
                            message.success("已登录！");
                        }else{
                            message.error("登录失败！");
                        }
                    }
                )

        }


    }
             
    // 登录成功，设置X-Token到浏览器中,刷新浏览器

    return (
        <div>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                <Row>
                    <Col span={4}>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住我</Checkbox>
                            </Form.Item>
                        </Form.Item>
                    </Col>
                    <Col span={4} offset={16}>
                        <div align="right">
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                            </Button>
                            </Form.Item>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default connect(({ detail }: detailState) => ({
    detail,
}))(FrontLogin);