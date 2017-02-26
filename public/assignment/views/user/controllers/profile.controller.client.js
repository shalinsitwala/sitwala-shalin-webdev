(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController($routeParams, UserService) {
        var vm = this;

        //event handlers
        vm.updateUser = updateUser;


        var userId = $routeParams['uid'];
        vm.userId = userId;

        function init() {
            var promise = UserService.findUserById(userId);
            promise.success(function (user) {
                vm.user = user;
            });

        }

        init();


        function updateUser(newUser) {

            var user = UserService.updateUser(userId, newUser);
            if (user != null) {
                vm.message = "User Successfully Updated";
            }
            else {
                vm.error = "Unable to update user";
            }

        }
    }
})();