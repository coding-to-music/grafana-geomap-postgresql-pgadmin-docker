# grafana-volkovlabs-form-panel

# 🚀 Data Manipulation Panel for @grafana 🚀


https://github.com/coding-to-music/grafana-volkovlabs-form-panel

From / By https://github.com/volkovlabs/volkovlabs-form-panel


## Environment variables:

```java

```

## user interfaces:

- Grafana http://localhost:3000

## GitHub

```java
git init
git add .
git remote remove origin
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:coding-to-music/grafana-volkovlabs-form-panel.git
git push -u origin main
```

## Errors in console

```
yarn install
yarn build
yarn start
```

```
docker ps
```

Output

```
CONTAINER ID   IMAGE                                     COMMAND                  CREATED          STATUS                          PORTS                    NAMES
1fb38b82ca73   grafana-volkovlabs-form-panel_nginx       "/docker-entrypoint.…"   16 minutes ago   Restarting (1) 41 seconds ago                            nginx
28fca02b3a1f   grafana-volkovlabs-form-panel_server-pg   "docker-entrypoint.s…"   16 minutes ago   Up 15 minutes                   0.0.0.0:3002->3001/tcp   server-pg
c1328a55ec89   grafana-volkovlabs-form-panel_server      "docker-entrypoint.s…"   16 minutes ago   Up 15 minutes                   0.0.0.0:3001->3001/tcp   server
0ff9eb0d43f1   ghcr.io/volkovlabs/app:latest             "/bin/bash /entrypoi…"   16 minutes ago   Up 15 minutes                   0.0.0.0:3000->3000/tcp   grafana
508e94786b35   postgres                                  "docker-entrypoint.s…"   16 minutes ago   Up 15 minutes                   0.0.0.0:5432->5432/tcp   postgres
```

Console error messages

```bash
nginx        | 10-listen-on-ipv6-by-default.sh: info: /etc/nginx/conf.d/default.conf differs from the packaged version
nginx        | /docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
nginx        | 20-envsubst-on-templates.sh: Running envsubst on /etc/nginx/templates/default.conf.template to /etc/nginx/conf.d/default.conf
nginx        | /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
nginx        | /docker-entrypoint.sh: Configuration complete; ready for start up
nginx        | 2023/04/19 22:31:40 [emerg] 1#1: host not found in upstream "host.docker.internal" in /etc/nginx/conf.d/default.conf:7
nginx        | nginx: [emerg] host not found in upstream "host.docker.internal" in /etc/nginx/conf.d/default.conf:7
nginx exited with code 1
nginx        | 10-listen-on-ipv6-by-default.sh: info: /etc/nginx/conf.d/default.conf differs from the packaged version
nginx        | /docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
nginx        | 20-envsubst-on-templates.sh: Running envsubst on /etc/nginx/templates/default.conf.template to /etc/nginx/conf.d/default.conf
nginx        | /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
nginx        | /docker-entrypoint.sh: Configuration complete; ready for start up
nginx        | 2023/04/19 22:32:41 [emerg] 1#1: host not found in upstream "host.docker.internal" in /etc/nginx/conf.d/default.conf:7
nginx        | nginx: [emerg] host not found in upstream "host.docker.internal" in /etc/nginx/conf.d/default.conf:7
nginx exited with code 1
nginx        | 10-listen-on-ipv6-by-default.sh: info: /etc/nginx/conf.d/default.conf differs from the packaged version
nginx        | /docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
nginx        | 20-envsubst-on-templates.sh: Running envsubst on /etc/nginx/templates/default.conf.template to /etc/nginx/conf.d/default.conf
nginx        | /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
nginx        | /docker-entrypoint.sh: Configuration complete; ready for start up
nginx        | 2023/04/19 22:33:41 [emerg] 1#1: host not found in upstream "host.docker.internal" in /etc/nginx/conf.d/default.conf:7
nginx        | nginx: [emerg] host not found in upstream "host.docker.internal" in /etc/nginx/conf.d/default.conf:7
nginx exited with code 1
```

# Data Manipulation Panel for Grafana

![Form Panel](https://raw.githubusercontent.com/volkovlabs/volkovlabs-form-panel/main/src/img/panel.png)

[![Grafana](https://img.shields.io/badge/Grafana-9.4.3-orange)](https://www.grafana.com)
[![YouTube](https://img.shields.io/badge/YouTube-Playlist-red)](https://www.youtube.com/playlist?list=PLPow72ygztmRXSNBxyw0sFnnvNRY_CsSA)
![CI](https://github.com/volkovlabs/volkovlabs-form-panel/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/volkovlabs-form-panel/branch/main/graph/badge.svg?token=0m6f0ktUar)](https://codecov.io/gh/VolkovLabs/volkovlabs-form-panel)
[![CodeQL](https://github.com/VolkovLabs/volkovlabs-form-panel/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/VolkovLabs/volkovlabs-form-panel/actions/workflows/codeql-analysis.yml)

## Introduction

The Data Manipulation Panel is a conceptually new plugin for Grafana. It is the first plugin that allows inserting and updating application data, as well as modifying configuration directly from your Grafana dashboard.

[![Data Manipulation Plugin for Grafana | Manual data entering and User input into Dashboard](https://raw.githubusercontent.com/volkovlabs/volkovlabs-form-panel/main/img/video.png)](https://youtu.be/DXALVG8GijM)

### Requirements

- **Grafana 8.5+**, **Grafana 9.0+** is required for version 2.X.
- **Grafana 8.0+** is required for version 1.X.

## Getting Started

Data Manipulation panel can be installed from the [Grafana Catalog](https://grafana.com/grafana/plugins/volkovlabs-form-panel/) or utilizing the Grafana command line tool.

For the latter, use the following command:

```bash
grafana-cli plugins install volkovlabs-form-panel
```

## Features

- Provides functionality to create customizable forms with elements:
  - Number Input
  - Radio Group with Boolean options
  - String Input
  - Number Slider
  - Select with Custom options
  - Date and Time
  - Radio Group with Custom options
  - Read-only (Disabled) with support for lookup
  - Password Input
  - Text Area
  - Code Editor
- Supports the Custom Code for the `Initial` and `Update` requests.
- Allows specifying `GET` request to get initial values and `DELETE`, `PATCH`, `POST`, and `PUT` requests to send values updated in the form.
- Allows adding `Header` fields to the `Initial` and `Update` requests.
- Allows customizing `Submit`, `Reset` buttons, and form layout.
- Allows splitting form elements into sections.
- Allows requesting confirmation before `Update` request.
- Allows sending all or only updated elements in the `Payload`.
- Allows displaying `Success` and `Error` notifications from the **Custom Code**.
- Supports Code Editor suggestions for available parameters.

## Documentation

| Section | Description |
| -- | -- |
| [Architecture](https://volkovlabs.io/plugins/volkovlabs-form-panel/architecture) | Explains the Architecture and how to use Grafana and API behind NGINX. |
| [Custom Code](https://volkovlabs.io/plugins/volkovlabs-form-panel/code) | Demonstrates how to access panel options, API responses, form elements, Grafana services. |

### Features

| Section | Description |
| -- | -- |
| [Control Panel](https://volkovlabs.io/plugins/volkovlabs-form-panel/control) | Explains how to create Control Panels with multiple sections and same Id. |
| [Custom Requests](https://volkovlabs.io/plugins/volkovlabs-form-panel/request) | Demonstrates how to create your own Initial and Update requests using Custom Code. |
| [Dynamic form elements](https://volkovlabs.io/plugins/volkovlabs-form-panel/dynamic) | Demonstrates how to update elements element's values and options from any data source. |
| [Variables](https://volkovlabs.io/plugins/volkovlabs-form-panel/variables) | Explains how to replace Dashboard and Global variables. |

### API Servers

| Section                          | Description                                                                       |
| -------------------------------- | --------------------------------------------------------------------------------- |
| [Deno](https://volkovlabs.io/plugins/volkovlabs-form-panel/servers/deno)             | Demonstrates how to create an API server on Deno.                                 |
| [JSON](https://volkovlabs.io/plugins/volkovlabs-form-panel/servers/json)             | Demonstrates how to create an API server on Node.js with JSON object.             |
| [MySQL](https://volkovlabs.io/plugins/volkovlabs-form-panel/servers/mysql)           | Demonstrates how to create an API server on Node.js with the MySQL database.      |
| [PostgreSQL](https://volkovlabs.io/plugins/volkovlabs-form-panel/servers/postgresql) | Demonstrates how to create an API server on Node.js with the PostgreSQL database. |

## Tutorials

[![How to Manipulate Data using Grafana dashboard | API Node.js Server and Deno Deploy Project](https://raw.githubusercontent.com/volkovlabs/volkovlabs-form-panel/main/img/server.png)](https://youtu.be/SHN2S-dRIEM)

[![Static and dynamic interface elements of Data Manipulation plugin | DML using data source in Grafana](https://raw.githubusercontent.com/volkovlabs/volkovlabs-form-panel/main/img/elements.png)](https://youtu.be/RSVH1bSBNl8)

Three plugins that make Grafana complete. Dynamic Text, Data Manipulation, and Apache ECharts are all you need to create functional real-world web applications.

[![Magic JavaScript trio for Grafana | Dynamic Text, Data Manipulation and Apache ECharts plugins](https://raw.githubusercontent.com/volkovlabs/volkovlabs-form-panel/main/img/magic-trio.png)](https://youtu.be/wPr4gZYzUVA)

## Feedback

We love to hear from you. There are various ways to get in touch with us.

- Ask a question, request a new feature, and file a bug with [GitHub issues](https://github.com/volkovlabs/volkovlabs-form-panel/issues/new/choose).
- Sponsor our open-source plugins for Grafana with [GitHub Sponsor](https://github.com/sponsors/VolkovLabs).
- Star the repository to show your support.

## License

Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-form-panel/blob/main/LICENSE).
