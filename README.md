Dashup Module Flow
&middot;
[![Latest Github release](https://img.shields.io/github/release/dashup/module-flow.svg)](https://github.com/dashup/module-flow/releases/latest)
=====

A connect interface for flow on [dashup](https://dashup.io).

## Contents
* [Get Started](#get-started)
* [Connect interface](#connect)

## Get Started

This flow connector adds flows functionality to Dashup flows:

```json
{
  "url" : "https://dashup.io",
  "key" : "[dashup module key here]"
}
```

To start the connection to dashup:

`npm run start`

## Deployment

1. `docker build -t dashup/module-flow .`
2. `docker run -d -v /path/to/.dashup.json:/usr/src/module/.dashup.json dashup/module-flow`