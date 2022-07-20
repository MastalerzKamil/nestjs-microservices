print(
    'Start #################################################################',
);

db = db.getSiblingDB('customers_db');
db.createUser({
    user: 'api_user',
    pwd: 'api1234',
    roles: [{ role: 'readWrite', db: 'customers_db' }],
});
db.createCollection('users');

db = db.getSiblingDB('products_db');
db.createUser({
    user: 'api_user',
    pwd: 'api1234',
    roles: [{ role: 'readWrite', db: 'products_db' }],
});
db.createCollection('users');

db = db.getSiblingDB('sales_db');
db.createUser({
    user: 'api_user',
    pwd: 'api1234',
    roles: [{ role: 'readWrite', db: 'sales_db' }],
});
db.createCollection('users');

print('END #################################################################');
