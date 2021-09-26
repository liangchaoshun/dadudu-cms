# dadudu-cms

## <code>main</code> 分支，以 vite 作为构建工具
### <span style="color: #d24949">建议开发都基于 main 分支拉取</span>

- 个人开发者的本地代理配置 <code>local-proxy.js</code> 位于项目根目录下，内容应该长这样：

```javascript
module.exports = {
  '/api': {
    // url 会自动补全：`${target}/api`
    target: 'http://localhost:7716/cms/dadudu', // 本地服务
    secure: false,
    changeOrigin: true
  }
}
```
