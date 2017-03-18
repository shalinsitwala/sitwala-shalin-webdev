(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;

        //Event Handlers
        vm.login = login;

        function init() {
        }

        init();

        function login(user) {
            if (!angular.isUndefined(user)) {
                //entered values
                var promise = UserService
                    .findUserByCredentials(user.username, user.password)
                    .success(function (user) {
                        if (user) {
                            $location.url("/user/" + user._id);
                        }
                        else {
                            vm.error = "Invalid username/password";
                        }
                    })
                    .error(function (error) {
                        vm.error = "Invalid username/password";
                    })

            }
            else {
                // value missing
                vm.error = "Please enter values";
            }
        }
    }

})();