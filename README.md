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

![image](https://user-images.githubusercontent.com/56251920/222390076-a88c79ab-52ef-40a6-a54c-2626442a5e3e.png)
![image](https://user-images.githubusercontent.com/56251920/222390160-ab52f08d-2bbc-4ef0-b0b5-78de7ee7f991.png)
![image](https://user-images.githubusercontent.com/56251920/222390118-dcef1ff8-ee8d-44ab-a262-dfe47d7292fb.png)
![image](https://user-images.githubusercontent.com/56251920/222390196-d63ed909-9419-4642-9cb6-87717fdb26de.png)
![image](https://user-images.githubusercontent.com/56251920/222390264-b5ffbd5c-0a71-4dee-b888-4256f4437cb1.png)
![image](https://user-images.githubusercontent.com/56251920/222390330-d9f0d42b-d7a6-4ff9-ab5d-87f35dfbbfdb.png)


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
