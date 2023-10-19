---
title: "nestjs study"
metaTitle: "nestjs study"
metaDescription: "nestjs study"
---

#### nestjs request


##### 使用装饰器获取 request 的param， body， query
```

@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Query('sortBy') sortBy: string) {
    console.log(sortBy); //get asc; from url /users?sortBy=asc
    return {
      a: 'a',
    };
  }

  @Post()
  createUser(@Req() request: Request, @Res() response: Response) {
    console.log(request);

    const body = request.body;
    console.log(body); //{ name: 'xiaomig', password: '123456' } get json obj send from frontend

    const query = request.query;
    console.log(query); // get { att: 'value' } from url like /users?att=value

    response.send('created');
  }

  @Post('create')
  creat(@Body() userData: createUserDto) {
    console.log(userData); //decorator method get request.body { name: 'xiaomig', password: '123456' } get json obj send from frontend
    return {};
  }

  // param route should be placed beneath the actually named routed like create route above,
  // or you cannot use the create route, because it is interceptted by param route :id and treated with it.
  @Post(':id')
  createUsers(@Req() request: Request, @Res() response: Response) {
    //
    const params = request.params;
    console.log(params); //get { id: '34' } from url like /users/34
    response.send('createUsers');
  }

  @Get(':id')
  getOneUser(@Param('id') id: string) {
    //get parameter using @Param
    console.log(id); //get 10 from url like /users/10
    return { id };
  }

  @Get(':userid/:postid')
  getUserPost(
    @Param('userid') userid: string,
    @Param('postid') postid: string,
    @Body() postdata: createUserDto,
  ) {
    //get parameter using @Param
    console.log(userid); //
    console.log(postid); //get 10 and 100 from url like /users/10/100
    // get method can also get the json obj send from frontend/
    // but do not suggest do that data send by get method is limited to size 2kb-8kb,and data transmit is not encripted
    console.log(postdata);
    return { userid, postid };
  }
}



```



### graphql 的 resolover 中定义 参数为可选参数的方法
```
  @Query(() => [Hotel], { nullable: true })
  async hotels(
    @Args('paginationArg') pagination?: PaginationArg,
  ): Promise<PaginationedHotel> {
    return await this.hotelsService.findAll(pagination);
  }


如参数 paginationArg 默认是必填的，加上{ nullable: true }这样参数 paginationArg 就是可选的
@Args('paginationArg', { nullable: true }) pagination: PaginationArg,

@Args('filters', { nullable: true }) filters: ReservationFiltersInput,
```

Graphql Object types
```
@ObjectType()
export class PaginationedHotel {
  @Field(() => [Hotel], { nullable: true })
  result: Hotel[];

  @Field(() => Pagination, { nullable: true })
  pagination: Pagination;
}

// 注意 @Field(() => [Hotel], { nullable: true }) 是针对graphql 的定义,graphql 数组的写法[hotel]
// result: Hotel[]; 是针对 typescript 类型定义, typescript 数组一般这样写 Hotel[]
```


### mongoose schema Options

参考
https://mongoosejs.com/docs/schematypes.html#schematype-options

```

@Prop({ required: true })
name: string;


// 设置默认值
@Prop({ default: "some value or function" })
name: string;

@Prop({
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Reservation',
  default: [],
})
reservations: Reservation[];


// 可选属性/字段
@Prop({
  default: RESERVATION_STATUS.START,
})
status?: string;

```



### log 日志
![nodejs log](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/nodejs-log.png)

### 常用日志module
#### morgan
HTTP request logger middleware for node.js
```
:method :url :status :response-time ms - :res[content-length]
```

### Winston - A logger for just about everything.
Nodejs 环境下最常用的logger


### pino - super fast, all natural json logger

### nestjs lifecycle
![nestjs lifecycle](https://raw.githubusercontent.com/Boytobeaman/learnnote.site/master/static/documents/images/nestjs-lifecycle.png)