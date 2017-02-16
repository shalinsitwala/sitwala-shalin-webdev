(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);
    
    
    function registerController(UserService, $location) {
        var vm = this;


        // event handlers
        vm.register = register;

        function register(user) {

            if(!angular.isUndefined(user)){
                if(user.password === user.verpassword && user.password!= null){
                    newUser = UserService.createUser(user);
                    if(newUser != null){
                        // user is created
                        $location.url("user/" + newUser._id);
                    }
                    else{
                        // user not created from the service funcion
                        // bcoz username is taken already
                        vm.error = "Username already taken. Try a new one."
                    }
                }
                else
                {
                    if(user.password== null){
                        vm.error = "Please enter password";
                    }
                    else{
                        vm.error = "Passwords do not match. Try again.";
                    }
                }
            }
            else
            {
                // fields empty
                vm.error = "Please enter values";
            }
        }
    }
})();