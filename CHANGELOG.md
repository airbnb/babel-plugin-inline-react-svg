# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v2.0.2](https://github.com/airbnb/babel-plugin-inline-react-svg/compare/v2.0.1...v2.0.2) - 2023-02-22

### Merged

- [actions] make a "summary" job, to require for protected branches [`#120`](https://github.com/airbnb/babel-plugin-inline-react-svg/pull/120)
- Tweak some formatting in readme [`#119`](https://github.com/airbnb/babel-plugin-inline-react-svg/pull/119)
- migrate from travis to github actions [`#117`](https://github.com/airbnb/babel-plugin-inline-react-svg/pull/117)

### Fixed

- [Fix] Register export declaration in scope [`#74`](https://github.com/airbnb/babel-plugin-inline-react-svg/issues/74)

### Commits

- [meta] add `auto-changelog` [`0137651`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/0137651421d95db064157f13cc7ac96a2506cfeb)
- [Tests] migrate from travis to github actions [`63611b5`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/63611b5524c5a8cc97d5a21de0ffab86e5627d95)
- [Dev Deps] update `@babel/cli`, `@babel/node`, `@babel/preset-react`, `eslint`, `eslint-config-airbnb`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react` [`b839b94`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/b839b94cb0341da187b2220b69bacb664e5e6891)
- [readme] Update svgo configuration example [`e37c29b`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/e37c29bbea03d8cfcb12503c4924662c7fc1f286)
- [Fix] Fix crash when svg has a style tag in the root element; pass path to SVGO [`a4c1c4c`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/a4c1c4c5d11b088185f8ccc603ac00c352bde45b)
- [meta] use `npmignore` to autogenerate an npmignore file [`aeb3ddf`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/aeb3ddff9cf66927f96226543ac2c5868be23271)
- [Deps] update `resolve`, `svgo` [`b29d6a6`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/b29d6a64de7ffc8f29e91c16e4d7f15044367930)
- [meta] add `safe-publish-latest` and use `prepublishOnly` [`982144b`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/982144bce6bb749885e2d898aa16dc515936a3c2)
- [Dev Deps] update `@babel/cli`, `@babel/plugin-transform-typescript` [`815bb4a`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/815bb4a466c03bce4d9cc6a2b3310fa99fa54d6c)

## [v2.0.1](https://github.com/airbnb/babel-plugin-inline-react-svg/compare/v2.0.0...v2.0.1) - 2021-02-23

### Commits

- [Fix] Fix crash when SVGO is turned off [`b8fb637`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/b8fb6377358e132748ad7c62f73226d4d519ccb8)
- [Deps] update `svgo` [`7471408`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/7471408459cf54ec023c8398d85e4d70b11d22e0)

## [v2.0.0](https://github.com/airbnb/babel-plugin-inline-react-svg/compare/1.1.2...v2.0.0) - 2021-02-18

### Fixed

- [Tests] add passing test [`#89`](https://github.com/airbnb/babel-plugin-inline-react-svg/issues/89)

### Commits

- [Breaking] update `svgo` to v2; drop node &lt; v10.13 [`90eeedd`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/90eeedda0bf1b380de35d5eb57e2443f1e4987f9)
- [Dev Deps] update `@babel/cli`, `@babel/node`, `@babel/preset-react`, `babel-preset-airbnb`, `eslint`, `eslint-config-airbnb`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react` [`4ed41be`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/4ed41be81dc23ec5ea940225a07b250d17eb40f4)
- [Dev Deps] update `@babel/cli`, `@babel/node`, `@babel/preset-react`, `eslint` [`0b2b119`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/0b2b1191eeeecaa8aef36141a2d8e236aa3bd1b6)
- [Deps] update `resolve` [`c7ae6fd`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/c7ae6fdb9de0bb3c9002d3f5af10d97607ab3222)
- [Deps] update `resolve` [`ca99a79`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/ca99a799a55f8e3dcd4d72852ed5e5a1a996decb)

## [1.1.2](https://github.com/airbnb/babel-plugin-inline-react-svg/compare/v1.1.2...1.1.2) - 2020-10-30

## [v1.1.2](https://github.com/airbnb/babel-plugin-inline-react-svg/compare/v1.1.1...v1.1.2) - 2021-01-07

### Merged

- Fix crash when export declaration has no local property [`#93`](https://github.com/airbnb/babel-plugin-inline-react-svg/pull/93)

### Fixed

- Fix crash on `export * as foo from "bar"` [`#92`](https://github.com/airbnb/babel-plugin-inline-react-svg/issues/92)

### Commits

- Add failing test for export * as foo from bar [`3fbe8bf`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/3fbe8bf308af7c0df6162093df664da5e766d6de)

## [v1.1.1](https://github.com/airbnb/babel-plugin-inline-react-svg/compare/v1.1.0...v1.1.1) - 2020-01-21

### Merged

- [Fix] Register module binding [`#68`](https://github.com/airbnb/babel-plugin-inline-react-svg/pull/68)

### Commits

- Register Module Binding [`266d26a`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/266d26ac514fea3a3cd69eb98c9ce292a3a477b0)

## [v1.1.0](https://github.com/airbnb/babel-plugin-inline-react-svg/compare/v1.0.1...v1.1.0) - 2019-04-09

### Commits

- [New] Add support for export default from [`4ed020e`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/4ed020eb9ee2b4784e233a202cdd73076be49974)
- add MIT license file [`a39dfa5`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/a39dfa517563e3b30c631da1bdeba487c6bd21ae)
- [Dev Deps] update `@babel/cli`, `@babel/node`, `babel-preset-airbnb`, `eslint`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react` [`6b39561`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/6b39561f6e608dedd529e884e7491d26b6361648)
- [Deps] update `resolve` [`5e7bb85`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/5e7bb8582e9b50ca5f50424014c9af9fb29198c9)

## [v1.0.1](https://github.com/airbnb/babel-plugin-inline-react-svg/compare/v1.0.0...v1.0.1) - 2018-10-22

### Merged

- Fix transforming via API [`#53`](https://github.com/airbnb/babel-plugin-inline-react-svg/pull/53)

### Fixed

- Merge pull request #53 from airbnb/svg_api [`#52`](https://github.com/airbnb/babel-plugin-inline-react-svg/issues/52)
- [Fix] require "filename" option when transforming code [`#52`](https://github.com/airbnb/babel-plugin-inline-react-svg/issues/52)

### Commits

- Add failing test case. [`1525b2e`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/1525b2e409fb5d5b07ca63d2b276d664693c4fef)
- [Dev Deps] update to eslint 5 [`c4fe318`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/c4fe31830abc4143a02c27d075fdaccca6c85162)

## [v1.0.0](https://github.com/airbnb/babel-plugin-inline-react-svg/compare/v0.5.4...v1.0.0) - 2018-10-09

### Merged

- [Breaking] Upgrade to babel 7 [`#48`](https://github.com/airbnb/babel-plugin-inline-react-svg/pull/48)

### Commits

- [Refactor] no need to directly depend on babel-template or babel-traverse [`7665543`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/7665543a459045a1e295a34ef6be8fdde57a3b73)
- [Breaking] drop support of node &lt; 6, per babel 7 [`143e8b1`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/143e8b1624dc37d7b60278c16aaed9ea52543c3c)
- Switch to single quotes with curly tick [`83cae6f`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/83cae6fd43f1c297516bc12043c4edb78d7e4dfb)

## [v0.5.4](https://github.com/airbnb/babel-plugin-inline-react-svg/compare/v0.5.3...v0.5.4) - 2018-07-20

### Fixed

- [Fix] do not crash on dynamic requires [`#47`](https://github.com/airbnb/babel-plugin-inline-react-svg/issues/47)

## [v0.5.3](https://github.com/airbnb/babel-plugin-inline-react-svg/compare/v0.5.2...v0.5.3) - 2018-06-25

### Merged

- [Fix] throw a better error if no svg is found; add tests for multiple SVGs. [`#39`](https://github.com/airbnb/babel-plugin-inline-react-svg/pull/39)
- fix CloseSVG typo in readme [`#37`](https://github.com/airbnb/babel-plugin-inline-react-svg/pull/37)

### Commits

- [New] add support for `require` [`512996e`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/512996e6652dfd1e1de38e6af1bd7bd6408c9045)
- [Dev Deps] update `babel-cli`, `babel-core`, `babel-preset-airbnb`, `eslint`, `eslint-config-airbnb`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react` [`7dc34fa`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/7dc34fa762441265712b4ca98f51963904ea57c9)
- [Tests] add failing tests for multiple React imports [`f380c66`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/f380c664b47c76e062091eadd5e9347517e31d3c)
- [Tests] skip case-sensitive check when on a case-sensitive filesystem [`8f7f42b`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/8f7f42b6006fae4b223a055b9caf73cfb613e67b)
- [Refactor] reduce repeated object lookups [`f9d9613`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/f9d9613d75874c4134145ae4e9374e52b9b4fecd)
- [Tests] add travis [`b6bb7d4`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/b6bb7d4545026ac70aba5dcc67c13f7307814e40)
- [fix] fix linting errors [`49fcb09`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/49fcb09d1e4d4eb59ccce79bbc3affaed9980324)
- Fix invalid JS issue for data attr and cater for aria-* (#33) [`6052866`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/6052866e3888e151cf0dae4ef0cbe470a9b3259f)
- [Dev Deps] update `babel-preset-airbnb`, `eslint-config-airbnb`, `eslint-plugin-import`, `eslint-plugin-react` [`52533c8`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/52533c8c2b474736dd7b471fa17eed2fc7f356d0)
- [Deps] update `babel-template`, `babel-traverse`, `babylon`, `svgo` [`0c5dcdb`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/0c5dcdbf06243c9e0c0408bd7ceda9e7bdeea6a5)
- [Tests] add test scripts [`acf96e2`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/acf96e2a38a022f965fecd291105b778f1c8625f)
- Only apps should have lockfiles [`6b39b21`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/6b39b21cf640303d46e83c2f3326edf840d086e3)
- [Refactor] use `resolve` instead of `resolve-from` [`2696b6b`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/2696b6b0c47625d53203ca42057a2e3a5ea0c62d)
- [Fix] throw a better error if no svg is found [`157bbf0`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/157bbf00db60a15e13e495e7c737c930eaa91273)
- [Fix] ensure that a React import is only added once [`f022c45`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/f022c4560b4584b423cbc6acfcdbbb1efb8d50c4)

## [v0.5.2](https://github.com/airbnb/babel-plugin-inline-react-svg/compare/v0.5.1...v0.5.2) - 2017-11-09

### Merged

- [Fix] Only ensure a React import when there’s an svg import in the file. [`#32`](https://github.com/airbnb/babel-plugin-inline-react-svg/pull/32)

## [v0.5.1](https://github.com/airbnb/babel-plugin-inline-react-svg/compare/v0.5.0...v0.5.1) - 2017-11-05

### Commits

- Fixing issue with react not trigger module transform [`efe3805`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/efe38059559cf49800f60a87597c15486b25481a)

## [v0.5.0](https://github.com/airbnb/babel-plugin-inline-react-svg/compare/v0.4.0...v0.5.0) - 2017-11-05

### Merged

- Add react import [`#29`](https://github.com/airbnb/babel-plugin-inline-react-svg/pull/29)
- Use defaultProps instead of adding props to the svg [`#8`](https://github.com/airbnb/babel-plugin-inline-react-svg/pull/8)
- Implement case-sensitivity check [`#20`](https://github.com/airbnb/babel-plugin-inline-react-svg/pull/20)
- Support data-* attributes [`#22`](https://github.com/airbnb/babel-plugin-inline-react-svg/pull/22)
- Add option to disable optimization. [`#15`](https://github.com/airbnb/babel-plugin-inline-react-svg/pull/15)
- Fix typo in svgo options example in docs [`#11`](https://github.com/airbnb/babel-plugin-inline-react-svg/pull/11)

### Fixed

- [Fix] Add a React import if no React binding exists. [`#24`](https://github.com/airbnb/babel-plugin-inline-react-svg/issues/24)
- Add option to disable optimization. closes #10 [`#10`](https://github.com/airbnb/babel-plugin-inline-react-svg/issues/10)
- Use defaultProps instead of adding props to the svg [`#7`](https://github.com/airbnb/babel-plugin-inline-react-svg/issues/7)

### Commits

- [Tests] minimally transform; add filename to output. [`301681c`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/301681cbfb6ba732ecd6f66ec4de5fd0e94727d3)
- #10 fix bugs and formatting. [`6b6181f`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/6b6181f5fe7b9c28649306d60b7ace7e78beb454)
- #10 update readme [`6b080dc`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/6b080dca6740f3997cbf2d2192dfc0c11f802e8c)

## [v0.4.0](https://github.com/airbnb/babel-plugin-inline-react-svg/compare/v0.3.1...v0.4.0) - 2017-03-20

### Merged

- Added svgo options [`#5`](https://github.com/airbnb/babel-plugin-inline-react-svg/pull/5)

## [v0.3.1](https://github.com/airbnb/babel-plugin-inline-react-svg/compare/v0.3.0...v0.3.1) - 2017-03-06

### Merged

- Escaping curly braces of SVG's [`#3`](https://github.com/airbnb/babel-plugin-inline-react-svg/pull/3)

### Commits

- escaping curly braces before parsing as JSX [`24e3bef`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/24e3bef2330a1fe651c0a20a3d3bdea81aaf1a91)
- changing names, to avoid confusion/deprecation [`8d17c63`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/8d17c6345764d106ec9fc1f4240688cc716c1cc6)
- reverted version bump [`ceb8968`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/ceb896852f1a0ea012446423aaa62fbdc1b10262)

## [v0.3.0](https://github.com/airbnb/babel-plugin-inline-react-svg/compare/v0.2.0...v0.3.0) - 2017-03-06

### Merged

- Add support for .svg paths from 3rd party packages [`#2`](https://github.com/airbnb/babel-plugin-inline-react-svg/pull/2)

### Commits

- Adding docs for the options [`3da7129`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/3da712960d2fe963e209d2cc20e808782b5e2783)

## [v0.2.0](https://github.com/airbnb/babel-plugin-inline-react-svg/compare/v0.1.2...v0.2.0) - 2016-09-19

### Commits

- Adding ignorePattern to allow selectively disabling the plugin [`b53fa56`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/b53fa5648e4549a0fb161887e98065bd259b9b9a)

## [v0.1.2](https://github.com/airbnb/babel-plugin-inline-react-svg/compare/v0.1.1...v0.1.2) - 2016-09-19

### Commits

- Fixing svg resolution in projects [`0c60955`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/0c609557a5ad37b9c9ed822847dde1955f4b2081)

## v0.1.1 - 2016-09-19

### Commits

- First version [`fea1021`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/fea102160b823e3d79b30292c4a406e24256e7a7)
- Better readme [`c8f9e46`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/c8f9e46d862a4594c12022ff40b5b12d2bd54b82)
- svgo isn't really async [`3bb94bc`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/3bb94bca3a0255f609293b9233147118d132ecac)
- More readme cleanu [`d2548c5`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/d2548c5f0ca25a6bda45214053c86686db027634)
- adding npm ignore [`18c6c14`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/18c6c146a2cb37797d80fbcf6f3ec707122f3cce)
- first commit [`15e011a`](https://github.com/airbnb/babel-plugin-inline-react-svg/commit/15e011a6a57060d79a252acd7fa67872437e9c5d)
