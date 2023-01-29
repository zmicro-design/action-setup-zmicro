# GitHub Action to setup Zmicro

![https://github.com/zmicro-design/action-setup-zmicro](https://img.shields.io/github/v/release/zmicro-design/action-setup-zmicro)
![https://github.com/zmicro-design/action-setup-zmicro](https://github.com/zmicro-design/action-setup-zmicro/workflows/Publish/badge.svg)

### Usage

| option  | required | description            |
| ------- | -------- | ---------------------- |
| version | false    | specify zmicro version |

### Example

```yml
name: CI

on: [push]

jobs:
  build:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - name: Setup Zmicro
        uses: zmicro-design/action-setup-zmicro@v1
```

### License

[MIT](./LICENSE)
