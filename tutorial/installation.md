# 간단한 create-react-app 타입스크립트 프로젝트 만들기

#### 준비 사항
* 터미널
* 코드 에디터 - [VSCODE](https://code.visualstudio.com/) 추천
* Node.js 과 npm 설치

[Node.js](https://nodejs.org/en/)에서 설치 후 터미널에서 버전을 확인해보자.

```
node -v
npm -v // npm 5.2+ 이상인지 버전 확인
```

#### Node.js와 npm 업데이트 하기
``` 
npm install -g n // * N은 npm 기반 노드 버전 매니저
sudo n latest
```

#### 타입스크립트 기반 Create-React-App 프로젝트 구성

`npx create-react-app *앱이름* --template typescript`

`package.json` 명령어 살펴보기

* 현재 'react-jsx' 오류([#10144](https://github.com/facebook/create-react-app/issues/10144
)))가 있으므로, package.json 에서 아래 버전으로 수정 후, npm install 으로 버전 업데이트 하기

```
"react-scripts": "^4.0.1",
"typescript": "^4.1.2"
```

#### yarn으로 의존성 추가하기

[yarn](https://yarnpkg.com/getting-started/install)은 npm의 속도와 보안을 보완하고자 페이스북에서 만들어진 패키지

```
npm install -g yarn
```

#### Eslint (옵션)

Eslint는 자바스크립트/타입스크립트 문법 검사기

```
cd app
> yarn add -D eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
```

create-react-app 은 버전6을 사용하고, eslint 최신 버전 7을 설치하므로 문제가 발생. 이를 해결하기 위해 peer 의존성을 설치

```
npx install-peerdeps --dev eslint-config-airbnb
```

프로젝트 루트에 `.eslintrc.js` 파일 만들고 아래 내용을 복사 붙여넣기

```js
module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  plugins: ['react', '@typescript-eslint', 'jest'],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'linebreak-style': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
```

####  Prettier (옵션)

[VSCODE - [Prettier 플러그인 설치하기]](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

의존성 설치하기

```
yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```

프로젝트 디렉토리 루트에 `.prettierrc` 파일 만들고 아래 내용 추가

```
{
  "printWidth": 100,
  "singleQuote": true
}
```

package.json에서 아래 명령어를 추가

```

```jsx
"scripts": {
  ...
  "format": "prettier --write src/**/*.ts{,x}",
  "lint": "tsc --noEmit && eslint src/**/*.ts{,x}"
}
```

### VScode 옵션 설정하기 (옵션)
.vscode 폴더 만든 후, settings.json 파일 만들고 복사붙여넣기

```
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "eslint.format.enable": true,
  "eslint.lintTask.enable": true,
  "eslint.alwaysShowStatus": true,
  "[javascriptreact]": {
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
      }
  },
  "editor.formatOnSave": true,
    "[typescript]": {
      "editor.formatOnSave": false,
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
      }
  },
    "[typescriptreact]": {
      "editor.formatOnSave": false,
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
      }
  },
  "editor.formatOnPaste": true,
```
