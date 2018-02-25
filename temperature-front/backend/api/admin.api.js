var express = require('express');
var jwt = require('jsonwebtoken');
var app = express();

var user = require('../models/user.model');
var admin = require('../models/admin.model');

var fs = require("fs");
var Datauri = require('datauri');
var datauri = new Datauri();


/* ---------------------------------- */
/* Login Admin */

app.post('/login', function (req, res) {
    var data = req.body;

	user.Login(data, function (err, rows, fields) {
        var token;

        if (!err) {
            if(rows[0] && data.username === "admin") {
                var user = JSON.stringify(rows[0]);
                token = jwt.sign( user, 'secret');
                res.send(token);
            }
            else res.status(500).send("Connexion refusé !");
        } else err;
	});
});

/* ---------------------------------- */

/* ---------------------------------- */
/* Category handle */

app.post('/category/create', function (req, res) {
    var data = req.body;

    req.accepts('application/json');
	admin.CreateCategory(data, function (err, rows, fields) {
        if (!err)
        {
            for (var key in rows[0]) {
                res.send(rows[0][key]);
            }
        }
		else console.log(err);
	});
});

app.get('/category/all', function (req, res) {

	req.accepts('application/json');
	admin.AllCategories(function (err, rows, fields) {
		if (!err) res.json(rows);
		else console.log(err);
	});

});

app.put('/category', function (req, res) {
    var data = req.body;

    req.accepts('application/json');
	admin.UpdateCategory(data, function (err, rows, fields) {
        if (!err)
        {
            for (var key in rows[0]) {
                res.send(rows[0][key]);
            }
        }
		else console.log(err);
	});
});

app.put('/category/delete', function (req, res) {
    var data = req.body;

    req.accepts('application/json');
	admin.DeleteCategory(data, function (err, rows, fields) {
        if (!err) res.send("Categorie supprimé !");
		else res.send("Echec de la suppression de la catégorie !");
	});
});

/* ---------------------------------- */

/* ---------------------------------- */
/* Product handle */

app.post('/product/create', function (req, res) {
    var data = req.body;

    req.accepts('application/json');
	admin.CreateProduct(data, function (err, rows, fields) {
        if (!err) res.send("Produit ajouté !");
		else res.send("Echec de la création du produit !");
	});
});


app.get('/product/all', function (req, res) {

	req.accepts('application/json');
	admin.AllProducts(function (err, rows, fields) {
		if (!err) res.json(rows);
		else console.log(err);
	});

});

app.post('/product/get', function (req, res) {
    var data = req.body;

    req.accepts('application/json');
	admin.GetProduct(data, function (err, rows, fields) {
        if (!err) res.json(rows[0]);
		else console.log(err);
	});
});


app.put('/product', function (req, res) {
    var data = req.body;

    req.accepts('application/json');
	admin.UpdateProduct(data, function (err, rows, fields) {
        console.log('ERREUR :', err);

        if (!err) res.send("Produit modifié !");
		else res.send("Echec de la modification du produit !");
	});
});

app.put('/product/delete', function (req, res) {
    var data = req.body;

    req.accepts('application/json');
	admin.DeleteProduct(data, function (err, rows, fields) {
        if (!err) res.send("Produit supprimé !");
		else res.send("Echec de la suppression du produit !");
	});
});

/* ---------------------------------- */


module.exports = app;
