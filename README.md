# Electron-Vue-Vite Template

## 前言

本项目是基于 `Electron` + `Vue` + `Vite` 创建的项目模板。

---

### 快速开始

#### 安装依赖

```shell
npm install
```

#### 运行项目

```shell
npm run dev
```

---

### Commit 规范

- `feat`: 新功能
- `bug`: 修正非功能性问题或小错误 - 开发自测类型 （如修正语法错误）
- `fix`: 修补 BUG - 反馈类型
- `docs`: 文档
- `style`: 格式、样式 (不影响代码运行的变动)
- `refactor`: 重构 (即不是新增功能，也不是修改 BUG 的代码)
- `perf`: 优化相关，比如提升性能、体验
- `test`: 添加测试
- `test-p`: 需要线上或构建输出才能测试的修改
- `build`: 编译相关的修改，对项目构建或者依赖的改动
- `ci`: 持续集成修改
- `chore`: 构建过程或辅助工具的变动，如 `.gitignore` 的变动
- `revert`: 回滚到上一个版本
- `workflow`: 工作流改进
- `mod`: 不确定分类的修改
- `wip`: 开发中
- `types`: 类型
- `merge`: 分支合并
- `release`: 版本发布相关改动
- `assets`: 资源相关的添加
- `del`: 删除文件、废弃或未使用的代码
- `editor`: （开发工具）编辑器相关的配置修改

注意:
每次执行 `commit` 时会触发 `pre-commit` 钩子，钩子中 `shell` 脚本会检查 `commit` 信息是否符合规范，不符合规范则会报错，并阻止提交。

同时，它会执行一下脚本命令:

- `check:audit`: 检查项目的依赖包是否存在安全漏洞。
<!-- - `check:out`: 检查项目依赖包是否存在更新。 -->
- `format`: 格式化项目代码。
- `lint`: 检查项目代码是否符合规范。

**可以使用 `-n/--no-verify` 选项来跳过钩子。对于没有此标志的命令，请使用 `HUSKY=0` 暂时禁用钩子。**

---

## 相关文档

- [Electron](https://www.electronjs.org/zh/docs/latest/)
- [Node.js](https://nodejs.cn/api/)
- [Vue](https://vuejs.org/guide/quick-start.html)
- [Tailwindcss-V4](https://tailwindcss.com/docs/installation/using-vite)
- [Vite](https://cn.vitejs.dev/guide/)
- [Eslint](https://zh-hans.eslint.org/docs/latest/use/getting-started)
- [Eslint 规则](https://typescript-eslint.io/rules/)
- [Vue-Router](https://router.vuejs.org/zh/guide/)
- [Prettier](https://www.prettier.cn/docs/index.html)
<!-- - [Biome](https://biomejs.dev/zh-cn/guides/getting-started/) -->
- [Pinia](https://pinia.vuejs.org/zh/introduction.html)
- [Sass](https://www.sass.hk/docs/index.html)
- [Typescript](https://www.typescriptlang.org/)
- [ES6](https://www.bookstack.cn/read/es6-3rd/sidebar.md)
- [PixiJS](https://pixijs.com/)
- [Vitest](https://cn.vitest.dev/?from=home-page.cn)
- [Husky](https://husky.nodejs.cn/get-started.html)
- [NPM](https://www.npmjs.com/)
- [Tsconfig 配置](https://www.tslang.cn/docs/handbook/tsconfig-json.html)
