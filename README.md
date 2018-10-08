# bamazon

``` sql
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NULL,
  PRIMARY KEY (id)
);
```
<img width="1359" alt="bamazon 1" src="https://user-images.githubusercontent.com/8258629/46588899-56223e00-ca71-11e8-9689-e09fbe6731a0.png">



<img width="1367" alt="bamazon 2" src="https://user-images.githubusercontent.com/8258629/46588907-6fc38580-ca71-11e8-8b55-9c97050f176a.png">


<img width="1383" alt="bamazon 3" src="https://user-images.githubusercontent.com/8258629/46588912-7c47de00-ca71-11e8-8584-6a3548bcdda7.png">
