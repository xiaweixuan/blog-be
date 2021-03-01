#### 接口基本路径
baseUrl：/api/
> 例如：请求user接口时，使用/api/user来进行请求

#### Method类型
GET： 获取列表接口、各种操作接口
POST： 创建任务接口
PUT： 修改任务接口
DELETE： 删除任务接口

#### 状态码
200： 服务器成功返回请求的数据。
201： 新建或修改数据成功。
202： 一个请求已经进入后台排队（异步任务）。
204： 删除数据成功。
400： 发出的请求有错误，服务器没有进行新建或修改数据的操作。
401： 用户没有权限（令牌、用户名、密码错误）。
403： 用户得到授权，但是访问是被禁止的。
404： 发出的请求针对的是不存在的记录，服务器没有进行操作。
406： 请求的格式不可得。
410： 请求的资源被永久删除，且不会再得到的。
422： 当创建一个对象时，发生一个验证错误。
500： 服务器发生错误，请检查服务器。
502： 网关错误。
503： 服务不可用，服务器暂时过载或维护。
504： 网关超时。

#### 接口返回标准
```javascript
// axios返回
interface Respons {
    config: Object;
    data: any;
    headers: Object;
    request: Object;
    status: number;
    statusText: string;
}

// fetch返回
interface Respons {
    body: Object;
    bodyUsed: boolean;
    headers: Object;
    ok: boolean;
    redirected: boolean;
    status: number;
    statusText: string;
    type: string;
    url: string;
}

// 自定义数据结构
interface IBaseResponse<T = any> {
    success: boolean; // if request is success
    data: T; // response data
    errorCode?: string; // code for errorType
    errorMessage?: string; // message display to user
    showType?: number; // error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
    traceId?: string; // Convenient for back-end Troubleshooting: unique request ID
    host?: string; // onvenient for backend Troubleshooting: host of current access server
}
```