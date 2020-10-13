import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { blogListState } from '@/models/blogList';
import { Link } from 'react-router-dom';

// blogs
// for (let i = 0; i < 23; i++) {
//   listData.push({
//     href: 'https://ant.design',
//     title: `ant design part ${i}`,
//     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     description:
//       'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//     content:
//       'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//   });
// }

const IconText = ({ icon, text }: any) => (

    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const BlogList = (props: any) => {
    const [listData, setListData] = useState([]);
    const { dispatch } = props;


    useEffect(
        () => {
            if (dispatch) {
                dispatch(
                    {
                        type: 'blogList/fetch',
                        payload: {

                        },
                    }
                ).then(
                    (res: any) => {
                        debugger
                        console.log("res");
                        console.log(res);
                        setListData(res.result);
                    }
                )

            }
        }

        , []);

    const linkToDetail = (blogId: any) => {
        sessionStorage.setItem('blogId', blogId);
    }

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 5,
            }}
            dataSource={listData}
            footer={
                <div>
                    <b>Gakki Is Mine</b>and Masami Is Mine
                </div>
            }
            renderItem={item => (item &&
                <List.Item
                    key={item.title}
                    actions={[
                        <IconText icon={StarOutlined} text={item.user.nickname || ""} key="list-vertical-star-o" />,
                        <IconText icon={LikeOutlined} text={new Date(item.updateTime).toLocaleDateString() || ""} key="list-vertical-like-o" />,
                        <IconText icon={MessageOutlined} text={item.views || 0} key="list-vertical-message" />,
                    ]}
                    extra={
                        <Link to={{ pathname: '/detail', query: item }} target="_blank" >
                            <img
                                width={272}
                                alt="logo"
                                src={item.firstPicture}
                                onClick={() => { linkToDetail(item.id) }}
                            />
                        </Link>

                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.user.avatar} />}
                        title={
                            <Link to={{ pathname: '/detail', query: item }} target="_blank">
                                <a onClick={() => { linkToDetail(item.id) }}>{item.title}</a>
                            </Link>
                        }
                        description={item.description || "暂无简介..."}
                    />
                    {/* {item.description || ""} */}
                </List.Item>
            )}
        />
    );
}

export default connect(({ blogList, loading }: blogListState) => ({
    blogList,
}))(BlogList);
// export default BlogList;