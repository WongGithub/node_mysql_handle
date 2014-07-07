node_mysql_handle
=================

simple handle mysql in nodejs

为nodejs处理mysql写了一个简易的模块，便于在nodejs下可以轻松操作mysql

功能如下：

init：初始化数据库

select：检索

update：更新

insert：插入

delete：删除

loadLocalFile：读取本地文件

outToFile：输出本地文件

createTable：创建表


使用方式：

1.在nodejs下安装mysql并创建好数据库。

2.安装node_mysql_handle模块：npm install node_mysql_handle

3.在nodejs业务逻辑里加载node_sql_handle模块，例如：var mssh = require('node_mysql_handle');

4.所有操作方法都在 mssh.mysqlSimpleHandle 对象下


方法用例：

var mssh = require('node_mysql_handle'); // 加载模块

//连接数据库，并初始化

    mssh.mysqlSimpleHandle.init({
      host:'localhost',//服务器地址
      user:'root',//用户名
      database:'nodedb',//连接的数据库名
      password:'1234',//密码
      port:3306 //端口
    });

//创建表

    mssh.mysqlSimpleHandle.createTable({
    table:'table001', //表名
    items:[ //创建表项
        {
            name:'id',
            set:'int unsigned not null auto_increment primary key'
        },
        {
            name:'ua',
            set:'text'
        },
        {
            name:'tp',
            set:'int'
        }
    ],
    engine:'MyISAM', //数据库类型 默认值innodb
    charset:'utf8' //字符类型 默认值 ntf8
    },function(err,result){ //回调函数
    res.send(err?err:result);
    });


//插入记录or添加记录

    mssh.mysqlSimpleHandle.insert({
         table:操作的表名,
        values:'记录值1,值2,值3'
    },function(err,result){ // 回调函数
        
    });

//删除

     mssh.mysqlSimpleHandle.delete({
        table:操作的表名,
        condition:删选条件(非必须)
        }
        ,function(err,result){ // 回调函数
            
      });
    
//检索

    mssh.mysqlSimpleHandle.select({
       table:操作的表名,
       field:列名/项名,
       condition:检索条件
       },
       function(err,result){ // 回调函数
            
      });

//更新项

    mssh.mysqlSimpleHandle.update({
        table:操作的表名,
        newValues:'ua="IOS"', //更新的内容
        condition:'ua="iphone"'//筛选条件
        },
        function(err,result){ // 回调函数
        
    });

//导出数据到文件

      mssh.mysqlSimpleHandle.outToFile({
          table:操作表,
          dir:'c:/work/ing/sql_test03.txt',//导出的文件及路径
          condition:'model,ua,tp,t1,t2,t3,t4' //要导出的项
          },function(err,result){ // 回调函数
          

      });
      
//导入文件数据

     mssh.mysqlSimpleHandle.loadLocalFile({
       table:操作表,
        dir:'c:/work/ing/sql_test01.txt', //导入的文件路径
        field:'model,ua,tp,t1,t2,t3,t4' //导入项
        },function(err,result){ // 回调函数
        
    });
