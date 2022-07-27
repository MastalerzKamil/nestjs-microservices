print(
  "Start #################################################################"
);

db = db.getSiblingDB("products_db");
db.createUser({
  user: "api_user",
  pwd: "api1234",
  roles: [{ role: "readWrite", db: "products_db" }],
});

db = db.getSiblingDB("orders_db");
db.createUser({
  user: "api_user",
  pwd: "api1234",
  roles: [{ role: "readWrite", db: "orders_db" }],
});

print("END #################################################################");
