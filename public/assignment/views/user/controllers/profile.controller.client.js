(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController($routeParams, UserService, $location) {
        var vm = this;

        //event handlers
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;


        var userId = $routeParams['uid'];
        vm.userId = userId;

        function init() {
            var promise = UserService.findUserById(userId);
            promise.success(function (user) {
                vm.user = user;
            });

        }

        init();

        function unregisterUser(user) {
            var answer = confirm("Are you sure?");
            if (answer) {
                UserService
                    .deleteUser(user._id)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = "Unable to remove user";
                    });
            }
        }


        function updateUser(newUser) {

            UserService
                .updateUser(userId, newUser)
                .success(function (user) {
                    if (user != null) {
                        vm.message = "User Successfully Updated";
                    }
                    else {
                        vm.error = "Unable to update user";
                    }
                })
                .error(function (err) {
                    vm.error = "Unable to update user";
                });
        }
    }
})();