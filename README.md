# BankOfTime

## Overview

BankOfTime is a project which allows for a cashless exchange of services between registered users. It's a modern solution which may prove to be useful when the value of traditional payment methods declines.

## Table of contents

- [BankOfTime](#bankoftime)
  - [Overview](#overview)
  - [Table of contents](#table-of-contents)
  - [Features](#features)
  - [Images](#images)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Configuration and starting the application](#configuration-and-starting-the-application)

## Features

- Selling and buying offers
- Browsing all active offers
- Browsing my offers
- Browsing offers chosen by me
- Editing offers
- Filtering, sorting and searching offers
- Accepting or rejecting client
- Viewing my wallet
- Transaction history
- Creating profiles
- Viewing client profiles
- Administration panel
  - Managing users
  - Managing offers

## Images

<img src="https://user-images.githubusercontent.com/56251920/222392988-98c280a8-4103-4d54-8d3b-72acab464064.png" width="600" />
<img src="https://user-images.githubusercontent.com/56251920/222393096-228b9a64-0c2f-45d8-befc-fa6b6e77c3a8.png" width="600" />
<img src="https://user-images.githubusercontent.com/56251920/222393187-d409cb0d-9c4d-4960-8061-bfb8f34e563d.png" width="600" />
<img src="https://user-images.githubusercontent.com/56251920/222394637-cafb429f-9c8f-4c29-80c9-50ba1a6d9370.png" width="600" />
<img src="https://user-images.githubusercontent.com/56251920/222393340-90767685-8b16-437d-aa9d-8a50e86bb718.png" width="600" />
<img src="https://user-images.githubusercontent.com/56251920/222393422-87eacb83-26c9-4d0f-b499-84428558df52.png" width="600" />

## Prerequisites

Get the following:

1. Git
2. Docker deamon, ex. Docker Desktop
3. DBeaver or any other software to manage database

## Installation

Do the following:

1. Open terminal
2. Create a new folder named "bankOfTime":

   ```bash
    mkdir bankOfTime && cd bankOfTime
   ```

3. Download frontend image:

   ```bash
   docker pull marekkawalski/bankoftime-frontend:latest
   ```

4. Download backend image:

   ```bash
    docker pull marekkawalski/bankoftime-backend:latest
   ```

5. Clone the repository:

   ```bash
    git clone https://github.com/marekkawalski/BankOfTime.git
   ```

### Configuration and starting the application

Do the following:

1. Navigate to folder "BankOfTime"

   ```bash
   cd BankOfTime
   ```

2. Start the database server:

   ```bash
   docker compose up -d bankoftime-db
   ```

3. Using DBeaver or any other database management tool create a database named "BankOfTime"

4. Start the application using docker compose:

   ```bash
   docker compose up
   ```

5. Open a web browser and navigate to: <http://localhost:3000>
