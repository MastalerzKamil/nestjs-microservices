# nestjs-microservices

The app is a microservice architecture based on NestJS. The communication between the microservices is done by REDIS and TCP.
The database that has been used is `MongoDB`. In order to more optimized queries, orders are mapped into collections proposed by author.

## Microservices

* [orders-service](./orders)
* [products service](./products)
* [API Gateway](./gateway)

## Communicaton

* gateway <-> Orders - Redis based on Cron Jobs (fetching data from provided API)
* gateway <-> Products - TCP 

## Data flow
The data are fetched once a day from orders service that are triggered from a queue.
To achieve it the app uses cron jobs and REDIS queue from gateway. The jobs are triggered in gateway.

# App
## How to start 
The easiest way is to run the app is setting up a Docker containers using command
```shell
docker-compose up -d
```

Before you'll do it remember about copy `.env.example` to `.env`.


Another way to run app is using localhost. It's based by running only redis and MongoDB containers.

## Endpoints

Here is a generated collection of endpoints.

https://www.getpostman.com/collections/775e60335ab7aec8b728