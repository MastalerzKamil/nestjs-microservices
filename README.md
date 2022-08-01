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

Unfortunatelly due to issues with Redis in proposed solutions inside my docker compose 
I couldn't dockerize the app at all. However running `db`, `redis` containers by using 
command below works 
```shell
docker compose up db redis -d
```
I did my best to make it work, but I couldn't. Doing these way will be required run each service separately. and use localhost instead container name.


Before you'll do it remember about copy `.env.example` to `.env`.


## Endpoints

Here is a generated collection of endpoints.

https://www.getpostman.com/collections/775e60335ab7aec8b728