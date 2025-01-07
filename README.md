# Orderly

## 🖥️ Demo [Orderly App](https://orderly-gilt.vercel.app/ru/login)
### Demo backend need near 1 - 2 minutes to start, just reload page a couple of times


## Setup Project
 - Open "Docker Desctop"
 - Open bash and go to folder where you gonna copy next repositories. After that run:



```bash

  git clone https://github.com/ZUBOV-ILLIA/orderly-back.git

  git clone https://github.com/ZUBOV-ILLIA/orderly.git

```

 - Copy inside of projects .env files 

<hr>

After that need to prepare Docker containers.

 - Open "Docker Desctop"

 - In bash run command:


```bash
  docker run --name orderly-mysql-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=11111111 -d mysql
```

After that, you will see that you have new docker container "orderly-mysql-db"

![build image](/instructions/1.jpg)


Open "MySQL Workbench" and click "Setup New Connection"

![build image](/instructions/2.jpg)

Setup all fields like on img. The password is 11111111

![build image](/instructions/3.jpg)

You will have new connection, select it

![build image](/instructions/4.jpg)

After that you need to copy all query from "createDB.sql" that in base directory of "orderly-back" folder and run it

![build image](/instructions/5.jpg)

Great now we already have our database.

<hr>

 - Using bash go to "orderly-back" folder and run one by one this commands to build Docker container for back.

```bash
  docker build -t orderly-back-image .
  
# you have to wait until image will created 

  docker run --name orderly-back -p 3005:3005 orderly-back-image
```

<hr>

 - Using bash go to "orderly" folder and run one by one this commands to build Docker container for front.

```bash
  docker build -t orderly-front-image .
  
  # you have to wait until image will created 
  
  docker run --name orderly-front -p 3000:3000 orderly-front-image
```
 

## 🖥️ Now you can go to: [http://localhost:3000](http://localhost:3000/ru/login)
