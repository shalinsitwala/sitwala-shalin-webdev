(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "createUser": createUser,
            "deleteUser": deleteUser

        };
        return api;


        function getNewUserId() {
            var date = new Date();

            var components = [
                date.getYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
                date.getMilliseconds()
            ];

            var id = components.join("");

            return id;
        }

        function deleteUser(userId) {
            for(var u in users){
                if(users[u]._id === userId){
                    users.splice(u,1);
                    break;
                }
            }
            return users;
        }

        function findUserByUsername(username) {
            for(var u in users){
                if(users[u].username === username){
                    return users[u];
                }
            }
            return null;
        }

        function findUserById(userId) {
            for(var u in users){
                if(users[u]._id == userId){
                    return users[u];
                }
            }
            return null;
        }


        function createUser(user) {

            if(!findUserByUsername(user.username)){
                var newUser = {
                    _id: getNewUserId(),
                    username: user.username,
                    password: user.password,
                    firstName: "",
                    lastName: ""

                };
                users.push(newUser);

                return newUser;
            }
            // if username already exists
            return null;

        }
        
        
        function updateUser(userId, newUser) {
            for(var u in users){
                if(users[u]._id == userId){
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    return users[u];
                }
            }
            return null;
        }


        
        function findUserByCredentials(username, password) {
            for(var u in users){
                if(users[u].username == username && users[u].password == password){
                    return users[u];
                }
            }
            return null;
            
        }
    }
    
})();