# USTCLUG mirrors 前端
## 关于
本站使用 [Nextjs](
https://nextjs.org/
) 编写，并采用 [typescript-nextjs-starter](https://github.com/jpedroschmitz/typescript-nextjs-starter) 作为启动器。

# 安装
本项目采用 yarn，请尽可能避免采用 npm 安装本项目，以免出现依赖问题。

安装：
```bash
yarn
```

## 修改配置文件
本项目配置文件位于 `src/config.ts` 中，请按照需要进行修改。

## 运行
> 需要处理 cors 问题，否则会被浏览器拦截请求。

开启开发环境：
```bash
yarn run dev
```

## 构建
> 出于需求考虑，我们不期望在服务端运行 node，所以最终构建结果为静态 HTML 展现，使用方法与普通 React 项目相同。

在构建前，请先执行 `eslint` 相关指令：
```bash
yarn run lint
# if encounter lint error
yarn run lint --fix
```

之后可以导出为 `html`。
```bash
yarn run build
```

