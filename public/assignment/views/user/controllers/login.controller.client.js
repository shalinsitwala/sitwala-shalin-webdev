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
                var promise = UserService
                    .findUserByCredentials(user.username, user.password);
                console.log(user);
                promise.success(function (user) {
                    if (user) {
                        $location.url("/user/" + user._id);
                    }
                    else {
                        vm.error = "User not found";
                    }
                });

            }
            else {
                // value missing
                vm.error = "Please enter values";
            }
        }
    }

})();