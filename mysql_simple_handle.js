/**
 * Created by Wong on 2014/7/7.
 */

var mysql = require('mysql'),
    mysql_handle_lib = {
        init: function (param) {
            if (param.host && param.user && param.database && param.password && param.port) {
                this.DataBase = mysql.createConnection({
                    host: param.host,
                    user: param.user,
                    database: param.database,
                    password: param.password,
                    port: param.port
                });
                this.DataBase.connect(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log('Database connect success!');
                });
            } else {
                console.log('The "param" is Error!');
            }
        },
        select: function (param, callback) {
            var table = param.table,
                field = param.field,
                condition = param.condition,
                callback = callback;
            if (field && table) {
                this.DataBase.query('SELECT ' + field + ' from ' + table + (condition ? ' where ' + condition : ''), function (err, result) {
                    callback && callback(err, result);
                });
            } else {
                console.log('The "param" is Error!');
            }
        },
        insert: function (param, callback) {
            var table = param.table,
                rows = param.rows,
                values = param.values,
                callback = callback;

            if (table && values) {
                this.DataBase.query('insert into ' + table + (rows ? ' (' + rows + ') ' : '') + ' values(' + values + ')', function (err, result) {
                    callback && callback(err, result);
                });
            } else {
                console.log('The "param" is Error!');
            }

        },
        update: function (param, callback) {
            var table = param.table,
                newValues = param.newValues,
                condition = param.condition,
                callback = callback;

            if (table && newValues && condition) {
                this.DataBase.query('update ' + table + ' set ' + newValues + (condition ? ' where ' + condition : ''), function (err, result) {
                    callback && callback(err, result);
                });
            } else {
                console.log('The "param" is Error!');
            }
        },
        delete: function (param, callback) {
            var table = param.table,
                condition = param.condition,
                callback = callback;

            if (table) {
                this.DataBase.query('delete from ' + table + (condition ? ' where ' + condition : ''), function (err, result) {
                    callback && callback(err, result);
                })
            } else {
                console.log('The "param" is Error!');
            }
        },
        loadLocalFile: function (param, callback) {
            var table = param.table,
                dir = param.dir,
                field = param.field,
                callback = callback;

            if (table && dir && field) {
                this.DataBase.query('load data local infile"' + dir + '" into table ' + table + '(' + field + ')', function (err, result) {
                    console.log('load data local "' + dir + '" into table ' + table + '(' + field + ')')
                    callback && callback(err, result);
                });
            } else {
                console.log('The "param" is Error!');
            }
        },
        outToFile: function (param, callback) {
            var table = param.table,
                dir = param.dir,
                condition = param.condition || '*',
                lineTerminated = param.terminatedMark || '  ',
                callback = callback;

            if (table && dir && condition) {
                this.DataBase.query('select ' + condition + ' into outfile "' + dir + '" lines terminated by "' + lineTerminated + '" from ' + table, function (err, result) {
                    callback && callback(err, result);
                });
            } else {

            }
        },
        createTable: function (param, callback) {
            var table = param.table,
                items = param.items,
                engine = param.engine || 'InnoDB',
                charset = param.charset || 'uft8',
                callback = callback;

            if (table && items && items.length > 0) {
                var _items = '';
                for (var i = 0, len = items.length; i < len; i++) {
                    _items += items[i].name + ' ' + items[i].set + (i == (len - 1) ? '' : ',');
                }

                this.DataBase.query('create table ' + table + '(' +
                        _items +
                        ')' +
                        ' engine=' + engine +
                        ' charset=' + charset
                    ,
                    function (err, result) {
                        callback && callback(err, result);
                    });
            } else {
                console.log('The "param" is Error!');
            }
        }
    };

exports.mysqlSimpleHandle = mysql_handle_lib;
