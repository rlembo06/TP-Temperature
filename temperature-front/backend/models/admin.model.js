var express = require('express');
var database = require('../database/database');

/* ---------------------------------- */
/* Category handle */

module.exports.CreateCategory = function (data, callback) {
    database.getConnection(function (err, connection) {
        connection.query(
            'SELECT createCategory(\"'+ data.libelle +'\")'
        , callback);
    });
}

module.exports.AllCategories = function (callback) {
    database.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM category', callback);
    })
}

module.exports.UpdateCategory = function (data, callback) {
    database.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(
            'SELECT updateCategory('+ data.id +', \"'+ data.libelle +'\")'
        , callback);
    })
}

module.exports.DeleteCategory = function (data, callback) {
    database.getConnection(function (err, connection) {
        connection.query('DELETE FROM category WHERE id = '+ data.id, callback);
    });
}
/* ---------------------------------- */

/* ---------------------------------- */
/* Product handle */

module.exports.CreateProduct = function (data, callback) {
    database.getConnection(function (err, connection) {
        connection.query(
              'INSERT INTO product (libelle, photo, description, price, id_category)'
            + 'VALUES (\"'+ data.libelle +'\", \"'+ data.photo +'\", \"'+ data.description +'\", '+ data.price +', '+ data.id_category +')'
        , callback);
    });
}

module.exports.AllProducts = function (callback) {
    database.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM product', callback);
    })
}

module.exports.GetPhoto = function (data, callback) {
    database.getConnection(function (err, connection) {
        connection.query(
            'SELECT photo FROM product WHERE id = \"'+ data.id +'\"'
        , callback);
    });
}

module.exports.GetProduct = function (data, callback) {
    database.getConnection(function (err, connection) {
        connection.query(
            'SELECT id, libelle, description, price, id_category, CONVERT(photo USING utf8) as photo FROM product WHERE id = \"'+ data.id +'\"'
        , callback);
    });
}

module.exports.UpdateProduct = function (data, callback) {
    database.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(
            'CALL updateProduct('+ data.id +', \"'+ data.libelle +'\", \"'+ data.photo +'\", \"'+ data.description +'\", '+ data.price +', '+ data.id_category +')'
        , callback);
    })
}

module.exports.DeleteProduct = function (data, callback) {
    database.getConnection(function (err, connection) {
        connection.query('DELETE FROM product WHERE id = '+ data.id, callback);
    });
}
/* ---------------------------------- */