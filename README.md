# grafana-geomap-postgresql-pgadmin-docker

# 🚀 Data Manipulation Panel for @grafana with added CSV data imported and GeoMap visualization and pgAdmin 🚀


https://github.com/coding-to-music/grafana-geomap-postgresql-pgadmin-docker

From / By https://github.com/volkovlabs/volkovlabs-form-panel

Data comes from https://github.com/coding-to-music/ev-charging-stations-kaggle

pgAdmin and simulation comes from https://github.com/coding-to-music/postgresql-pgadmin-docker-compose


## Environment variables:

```java

```

## user interfaces:

- Grafana http://localhost:3000
- pgAdmin http://localhost:5050

## GitHub

```java
git init
git add .
git remote remove origin
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:coding-to-music/grafana-geomap-postgresql-pgadmin-docker.git
git push -u origin main
```

## Running 

```
yarn install
yarn build
yarn start
yarn simulation
yarn loaddata
```

## docker ps

```
docker ps
```

Output

```
CONTAINER ID   IMAGE                                     COMMAND                  CREATED          STATUS                          PORTS                    NAMES
1fb38b82ca73   grafana-geomap-postgresql-pgadmin-docker_nginx       "/docker-entrypoint.…"   16 minutes ago   Restarting (1) 41 seconds ago                            nginx
28fca02b3a1f   grafana-geomap-postgresql-pgadmin-docker_server-pg   "docker-entrypoint.s…"   16 minutes ago   Up 15 minutes                   0.0.0.0:3002->3001/tcp   server-pg
c1328a55ec89   grafana-geomap-postgresql-pgadmin-docker_server      "docker-entrypoint.s…"   16 minutes ago   Up 15 minutes                   0.0.0.0:3001->3001/tcp   server
0ff9eb0d43f1   ghcr.io/volkovlabs/app:latest             "/bin/bash /entrypoi…"   16 minutes ago   Up 15 minutes                   0.0.0.0:3000->3000/tcp   grafana
508e94786b35   postgres                                  "docker-entrypoint.s…"   16 minutes ago   Up 15 minutes                   0.0.0.0:5432->5432/tcp   postgres
```

## PostgreSQL and pgAdmin
This example provides a base setup for using [PostgreSQL](https://www.postgresql.org/) and [pgAdmin](https://www.pgadmin.org/).
More details on how to customize the installation and the compose file can be found [here (PostgreSQL)](https://hub.docker.com/_/postgres) and [here (pgAdmin)](https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html).

Project structure:
```
.
├── .env
├── compose.yaml
└── README.md
```

[_compose.yaml_](compose.yaml)
``` yaml
services:
  postgres:
    image: postgres:latest
    ...
  pgadmin:
    image: dpage/pgadmin4:latest
```

## Configuration

### .env
Before deploying this setup, you need to configure the following values in the [.env](.env) file.
- POSTGRES_USER
- POSTGRES_PW
- POSTGRES_DB (can be default value)
- PGADMIN_MAIL
- PGADMIN_PW

## Deploy with docker compose
When deploying this setup, the pgAdmin web interface will be available at port 5050 (e.g. http://localhost:5050).  

``` shell
$ docker compose up
Starting postgres ... done
Starting pgadmin ... done
```

## Add postgres database to pgAdmin
After logging in with your credentials of the .env file, you can add your database to pgAdmin. 
1. Right-click "Servers" in the top-left corner and select "Create" -> "Server..."
2. Name your connection
3. Change to the "Connection" tab and add the connection details:
- Hostname: "postgres" (this would normally be your IP address of the postgres database - however, docker can resolve this container ip by its name)
- Port: "5432"
- Maintenance Database: $POSTGRES_DB (see .env)
- Username: $POSTGRES_USER (see .env)
- Password: $POSTGRES_PW (see .env)
  
## Expected result

Check containers are running:
```
$ docker ps
CONTAINER ID   IMAGE                           COMMAND                  CREATED             STATUS                 PORTS                                                                                  NAMES
849c5f48f784   postgres:latest                 "docker-entrypoint.s…"   9 minutes ago       Up 9 minutes           0.0.0.0:5432->5432/tcp, :::5432->5432/tcp                                              postgres
d3cde3b455ee   dpage/pgadmin4:latest           "/entrypoint.sh"         9 minutes ago       Up 9 minutes           443/tcp, 0.0.0.0:5050->80/tcp, :::5050->80/tcp                                         pgadmin
```

Stop the containers with
``` shell
$ docker compose down
# To delete all data run:
$ docker compose down -v
```

## View the header row (there should not be any column headers in the header row)

```
head -n 1 ev_locations.csv
```

## Count the columns in the header row 

Counting the number of columns in the header row:

```
head -n 1 ev_locations.csv | awk -F ',' '{print NF}'
```

## Counting the number of columns in the CSV body:

```
awk -F ',' '{print NF; exit}' ev_locations.csv


13
```

## Count the number of rows in the csv file

```
wc -l ev_locations.csv

70453
```

## verify can connect from the command line

```
sudo apt install postgresql-client
```

## connect via postgresql-client 

```
psql -h localhost -p 5432 -U postgres
```

Try a command, always end with a semicolin;
```
CREATE TABLE IF NOT EXISTS mytable (
  id SERIAL PRIMARY KEY,
  datetime TIMESTAMP NOT NULL
);
```

verify

```
SELECT COUNT(*) FROM mytable;
```

Full example of connecting and executing commands

```
psql -h localhost -p 5432 -U postgres
Password for user postgres: 
```

Output

```
psql (12.14 (Ubuntu 12.14-0ubuntu0.20.04.1), server 15.2 (Debian 15.2-1.pgdg110+1))
WARNING: psql major version 12, server major version 15.
         Some psql features might not work.
Type "help" for help.

postgres=# CREATE TABLE IF NOT EXISTS mytable (
postgres(#   id SERIAL PRIMARY KEY,
postgres(#   datetime TIMESTAMP NOT NULL
postgres(# );
CREATE TABLE
postgres=# SELECT COUNT(*) FROM mytable;
 count 
-------
     0
(1 row)
```

## Try the simulation

```
npm run simulation
```

Output

```
> postgresql-pgadmin-docker-compose@1.0.0 simulation
> node ./simulation.js

Number of rows before: 2
{
  id: '1679990154903',
  mystring: 'mykey_1679990154903',
  datetime: 2023-03-28T12:55:54.903Z
}
Number of rows after: 3
[
  { id: '1679990031918', datetime: 2023-03-28T12:53:51.918Z },
  { id: '1679990039882', datetime: 2023-03-28T12:53:59.882Z },
  { id: '1679990154903', datetime: 2023-03-28T12:55:54.903Z}
]
```

## To load into Postgres

```
\copy ev_locations from 'ev_locations.csv' delimiter',' CSV header;
```

## Count rows in the table

```
SELECT COUNT(*) FROM ev_locations;

 count 
-------
 70405
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
