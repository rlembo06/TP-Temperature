var express = require('express');
var database = require('../database/database');

module.exports.All = function (callback) {
    database.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM user', callback);
    })
}

module.exports.Login = function (data, callback) {
    database.getConnection(function (err, connection) {
        connection.query('SELECT * FROM user WHERE username = \"'+ data.username +'\" AND password = MD5(\"'+ data.password +'\")', callback);
    });
}

module.exports.Create = function (data, callback) {
    database.getConnection(function (err, connection) {
        connection.query(
            'SELECT createUser('
            + '\"'+ data.username +'\", '
            + '\"'+ data.password +'\", '
            + '\"'+ data.email +'\", '
            + '\"'+ data.firstname +'\", '
            + '\"'+ data.lastname +'\", '
            + '\"'+ data.city +'\", '
            + '\"'+ data.street +'\", '
            + data.cp +', '
            + '\"'+ data.country +'\")'
        , callback);
    });
}

module.exports.Get = function (data, callback) {
    database.getConnection(function (err, connection) {
        connection.query(
            'SELECT * FROM user WHERE username = \"'+ data.username +'\"'
        , callback);
    });
}

module.exports.Update = function (data, callback) {
    database.getConnection(function (err, connection) {
        connection.query(
            'CALL updateUser('
            + '\"'+ data.username +'\", '
            + '\"'+ data.email +'\", '
            + '\"'+ data.lastname +'\", '
            + '\"'+ data.firstname +'\", '
            + '\"'+ data.city +'\", '
            + '\"'+ data.street +'\", '
            + data.cp +', '
            + '\"'+ data.country +'\")'
        , callback);
    });
}

module.exports.UpdatePassword = function (data, callback) {
    database.getConnection(function (err, connection) {
        connection.query('SELECT updatePassword (\"'+ data.username +'\", \"'+ data.old_password +'\", \"'+ data.new_password +'\")', callback);
    });
}

module.exports.Delete = function (data, callback) {
    database.getConnection(function (err, connection) {
        connection.query('DELETE FROM user WHERE username = \"'+ data.username +'\"', callback);
    });
}

/*
module.exports.Create = function (data, callback) {
    database.getConnection(function (err, connection) {
        var values = [data.username, data.password, data.email, data.lastname, data.firstname];
        connection.query( 'SELECT createUser(?, ?, ?, ?, ?)', values);
    });
}
*/
