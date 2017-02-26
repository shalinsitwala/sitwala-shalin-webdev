(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);


    function registerController(UserService, $location) {
        var vm = this;


        // event handlers
        vm.register = register;

        function register(user) {
            UserService
                .findUserByUsername(user.username)
                .success(function (user) {
                    vm.error = "That username is already taken.";
                })
                .error(function () {
                    // username not found. so go ahead and create one
                   UserService
                       .createUser(user)
                       .success(function (user) {
                           $location.url('/user/' + user._id);
                       })
                       .error(function () {
                           vm.error = "Sorry, could not register";
                       });
                });
            //.error is when username not found, so all code should be in that

        }

        // function register(user) {
        //
        //     if(!angular.isUndefined(user)){
        //         if(user.password === user.verpassword && user.password!= null){
        //             newUser = UserService.createUser(user);
        //             if(newUser != null){
        //                 // user is created
        //                 $location.url("user/" + newUser._id);
        //             }
        //             else{
        //                 // user not created from the service funcion
        //                 // bcoz username is taken already
        //                 vm.error = "Username already taken. Try a new one."
        //             }
        //         }
        //         else
        //         {
        //             if(user.password== null){
        //                 vm.error = "Please enter password";
        //             }
        //             else{
        //                 vm.error = "Passwords do not match. Try again.";
        //             }
        //         }
        //     }
        //     else
        //     {
        //         // fields empty
        //         vm.error = "Please enter values";
        //     }
        // }
    }
})();