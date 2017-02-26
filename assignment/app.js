module.exports =  function (app) {
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);


    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    
    function findUserById(req,res) {
        var userId = req.params.userId;
        var user = users.find(function (u) {
            return u._id == userId;
        });
        res.json(user);

    }
    function findUserByCredentials(req,res) {
        var username = req.query.username;
        var password = req.query.password;
        console.log("find user by cred HTTP Service");


        var user = users.find(function (user) {
            return user.password == password && user.username == username;

        });

        res.json(user);
    }
     
}