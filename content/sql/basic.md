---
title: "sql"
metaTitle: "sql"
metaDescription: "sql"
---

### 删除一个数据库
```
DROP DATABASE database_name

eg:
DROP DATABASE `vegcrates.com`
```


select all the fields available in the table
```
SELECT * FROM table_name;
```

select some fields in the table
```
SELECT column1, column2, ...
FROM table_name;
```


The SELECT DISTINCT statement is used to return only distinct (different) values.去重
```
SELECT DISTINCT column1, column2, ...
FROM table_name;
```
lists the number of different (distinct) customer countries
```
SELECT COUNT(DISTINCT Country) FROM Customers;
```


selects all fields from "Customers" where country is "Germany" AND city is "Berlin"
```
SELECT * FROM Customers
WHERE Country='Germany' AND City='Berlin';
```

selects all fields from "Customers" where city is "Berlin" OR "München"
```
SELECT * FROM Customers
WHERE City='Berlin' OR City='München';
```
SQL IN Operator
```
The IN operator is a shorthand for multiple OR conditions.

SELECT column_name(s)
FROM table_name
WHERE column_name IN (value1, value2, ...);

eg:
SELECT * FROM Customers
WHERE Country IN ('Germany', 'France', 'UK');
```
selects all fields from "Customers" where country is NOT "Germany":
```
SELECT * FROM Customers
WHERE NOT Country='Germany';


```
selects all fields from "Customers" where country is NOT "Germany" AND also is Not "Mexico"
```
SELECT * FROM Customers
WHERE NOT Country='Germany' AND NOT Country='Mexico';
```

selects all fields from "Customers" where country is "Germany" AND city must be "Berlin" OR "München" (use parenthesis to form complex expressions):
```
SELECT * FROM Customers
WHERE Country='Germany' AND (City='Berlin' OR City='München');
```

SQL LIKE Examples 模糊查询
```
//CustomerName starting with "a":
SELECT * FROM Customers
WHERE CustomerName LIKE 'a%';

//CustomerName ending with "a":
SELECT * FROM Customers
WHERE CustomerName LIKE '%a';

//CustomerName that have "or" in any position:
SELECT * FROM Customers
WHERE CustomerName LIKE '%or%';

//CustomerName that have "r" in the second position:
SELECT * FROM Customers
WHERE CustomerName LIKE '_r%';

//CustomerName that starts with "a" and are at least 3 characters in length:
SELECT * FROM Customers
WHERE CustomerName LIKE 'a_%_%';

//ContactName that starts with "a" and ends with "o":
SELECT * FROM Customers
WHERE ContactName LIKE 'a%o';

//CustomerName that does NOT start with "a":
SELECT * FROM Customers
WHERE CustomerName NOT LIKE 'a%';

eg:
select count(*),SUM(tax_amount) from orion.vw_get_dashbord_data_all where tax_expenditure like '%MATERIAL P%' 
```

SQL ORDER BY Keyword
```
SELECT column1, column2, ...
FROM table_name
ORDER BY column1, column2, ... ASC|DESC;

eg:
SELECT * FROM Customers
ORDER BY Country;

SELECT * FROM Customers
ORDER BY Country DESC;


ORDER BY Several Columns
eg:
SELECT * FROM Customers
ORDER BY Country ASC, CustomerName DESC;
```


更新某个table 的某个字段
```
update table_name set field_name1='val1',field_name2='val2'
where condition

update orion.case_contracts set cc_effective_date='12/30/2015',cc_datecreated='9/17/2014'
where cc_ecats_number='128012'
```

LIMIT 
```
MySQL Syntax:
SELECT column_name(s)
FROM table_name
WHERE condition
LIMIT number;


MySQL supports the LIMIT clause to select a limited number of records
LIMIT 一般放在sql 的末尾


SQL Server / MS Access Syntax:
SELECT TOP number|percent column_name(s)
FROM table_name
WHERE condition;

Oracle 12 Syntax:
SELECT column_name(s)
FROM table_name
ORDER BY column_name(s)
FETCH FIRST number ROWS ONLY;
```

### 新增一个table
```
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype,
   ....
);

eg:
CREATE TABLE Persons (
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);

```
### 
```
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);

eg:
INSERT INTO table_name
VALUES (value1, value2, value3, ...);
```

SQL DELETE Statement
```
DELETE FROM table_name
WHERE condition;
eg:
DELETE FROM Customers
WHERE CustomerName='Alfreds Futterkiste';

eg: 删除字段（name）为空的记录
DELETE FROM `strapi-v4-test`.teachers WHERE name IS NULL;

```
Delete All Records
```
DELETE FROM table_name;

or:

DELETE * FROM table_name;

```
### ALTER TABLE
删除一个表的某一列（某个字段）
```
ALTER TABLE table_name
DROP COLUMN column_name;

ALTER TABLE `products` DROP `href`;
```
增加一列
```
ALTER TABLE table_name
ADD column_name datatype;
```
改变某一列
```
ALTER TABLE table_name
MODIFY COLUMN column_name datatype;
```
SQL IFNULL(), ISNULL(), COALESCE(), and NVL() Functions

The IFNULL() function lets you return an alternative value if an expression is NULL.

```
SELECT IFNULL(NULL, "W3Schools.com");
return 'W3Schools.com'
```

COALESCE() function returns the first non-null expression in a list.
```
SELECT COALESCE(NULL, 1, 2, 'W3Schools.com');
//return 1

SELECT COALESCE(NULL, NULL, NULL, 'W3Schools.com', NULL, 'Example.com');
//return "W3Schools.com"

Example:
SELECT coalesce(cods_object_value, '0') as hos_trans_count
//cods_object_value 可能为null，如果为null就把它赋值为0
```

The SQL DROP TABLE Statement 删除某张表
```
DROP TABLE table_name;

DROP TABLE wp_commentmeta
```


### SQL JOIN
A JOIN clause is used to combine rows from two or more tables, based on a related column between them.


#### Different Types of SQL JOINs
##### (INNER) JOIN
Returns records that have matching values in both tables


#### LEFT (OUTER) JOIN
Returns all records from the left table, and the matched records from the right table

#### RIGHT (OUTER) JOIN
Returns all records from the right table, and the matched records from the left table

#### FULL (OUTER) JOIN
Returns all records when there is a match in either left or right table

![SQL JOIN](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/sql-join.gif)