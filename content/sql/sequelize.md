### Sequelize is available via NPM and Yarn.

```
// Using NPM
$ npm install --save sequelize

# And one of the following:
$ npm install --save pg pg-hstore
$ npm install --save mysql2
$ npm install --save sqlite3
$ npm install --save tedious // MSSQL

// Using Yarn
$ yarn add sequelize

# And one of the following:
$ yarn add pg pg-hstore
$ yarn add mysql2
$ yarn add sqlite3
$ yarn add tedious // MSSQL
```

### Setting up a connection
```
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'|'sqlite'|'postgres'|'mssql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: 'path/to/database.sqlite'
});

// Or you can simply use a connection uri
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
```

### Test the connection
```
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
```

### Your first model
```
const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});
```
### Your first query
```
User.findAll().then(users => {
  console.log(users)
})
```
### Application wide model options
```
const sequelize = new Sequelize('connectionUri', {
    define: {
        timestamps: false, // true by default 是否自动添加时间戳createAt，updateAt
        freezeTableName: true,// 默认false修改表名为复数，true不修改表名
    },
  
});

const User = sequelize.define('user', {}); // timestamps is false by default
const Post = sequelize.define('post', 
    {
         user_id:{ 
                type: Sequelize.STRING,
                primaryKey: true
            }, 
         name: Sequelize.STRING,
         phone: Sequelize.STRING,
         create_date: Sequelize.DATE, update_date: Sequelize.DATE 
    }, 
    {
    timestamps: true // timestamps will now be true
    }
);
```

### Promises
```
User.findOne().then(user => {
  console.log(user.get('firstName'));
});
```