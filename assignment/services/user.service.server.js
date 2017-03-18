module.exports = function (app, model) {
    var userModel = model.userModel;
    app.post("/api/user", createUser);
    app.get("/api/user", findUser); // by username and cred
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);


    // var users = [
    //     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    //     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    // ];


    function createUser(req, res) {
        var newUser = req.body;
        //newUser._id = (new Date()).getTime() + ""; // the last quote is to convert to string
        // users.push(newUser);
        // res.json(newUser);

        userModel
            .createUser(newUser)
            .then(function (newUser) {
                res.json(newUser);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;

        userModel
            .deleteUser(userId)
            .then(function (status) {
                    res.send(200);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });


        // for (var u in users) {
        //     if (users[u]._id === userId) {
        //         users.splice(u, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);


    }


    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;


        userModel
            .updateUser(userId, newUser)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
        // for (var u in users) {
        //     if (users[u]._id == userId) {
        //         users[u].firstName = newUser.firstName;
        //         users[u].lastName = newUser.lastName;
        //         res.json(users[u]);
        //         return;
        //     }
        // }
    }


    function findUserById(req, res) {
        var userId = req.params.userId;

        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });

        // var user = users.find(function (u) {
        //     return u._id == userId;
        // });
        // res.json(user);


    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            findUserByCredentials(req, res);
        }
        else if (username) {
            findUserByUsername(req, res);
        }

    }

    function findUserByUsername(req, res) {
        var usernamesent = req.query.username;

        userModel
            .findUserByUsername(usernamesent)
            .then(function (users) {
                if (users.length != 0) {
                    res.json(users[0]);
                }
                else {
                    res.sendStatus(404);
                }

            }, function (err) {
                console.log("error");
                res.sendStatus(404).send(error);
            });

        // var user = users.find(function (u) {
        //     return u.username == req.query.username;
        // });
        // if (user) {
        //     res.json(user);
        // } else {
        //     res.sendStatus(404);
        // }


    }


    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;


        userModel
            .findUserByCredentials(username, password)
            .then(function (userArray) {
                if (userArray.length != 0) {
                    res.json(userArray[0]);
                } else {
                    res.sendStatus(404);
                }

            }, function (err) {
                res.sendStatus(404).send(err);
            });

        // var user = users.find(function (user) {
        //     return user.password == password && user.username == username;
        //
        // });
        //
        // res.json(user);
    }
};