import { Request, Response } from 'express';

const getDetail = (req: Request, res: Response) => {
  res.json(
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到了 14 份新周报',
      datetime: '2017-08-09',
      type: 'notification',
    },
  );
};

export default {
  'GET /api/blog/detail': getDetail,
};
