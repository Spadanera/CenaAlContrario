app.controller('CenaController', function ($scope, $http, $mdDialog, $mdMedia, $mdToast, $localStorage) {

    // VARIABLE
    $scope.newCena = new Cena();
    $scope.selectedCena = new Cena();
    $scope.insertFormClass = "closed-form";
    $scope.toolbarClass = "opened";
    $scope.scrollForm = false;
    
    if (localStorage.getItem("insertedItem") == null)
        localStorage.setItem("insertedItem", "");


    // METHOD

    // RESET INSERT CENA
    $scope.resetCena = function () {
        $scope.newCena.Portatas = new Array();
        $scope.scrollForm = false;
        $("#resetForm").click();
        $("#content > aside > content").animate({ scrollTop: 0 }, 1000);
    }

    // GET ALL CENA
    $scope.getAllCenas = function () {
        $http({
            method: 'GET',
            url: "/api/Cenas"
        }).then(function (response) {
            $scope.cene = JSON.parse(response.data);
            var ownedCenas = localStorage.getItem("insertedItem").split(",");
            $scope.cene.forEach(function (item, index) {
                item.OwnedByUser = $.inArray("" + item.CenaId, ownedCenas) > -1;
            });
        });
    }

    // INSERT CENA
    $scope.insertCena = function () {
        if (document.getElementById("insertForm").checkValidity()) {
            $http({
                method: 'POST',
                url: '/api/Cenas',
                data: $scope.newCena,
            }).then(function (response) {
                if (response.status == 200) {
                    var ownedCenas = localStorage.getItem("insertedItem").split(",");
                    ownedCenas.push(response.data);
                    localStorage.setItem("insertedItem", ownedCenas.join(","));
                    $scope.resetCena();
                    $mdToast.show($mdToast.simple().textContent("Nuova cena inserita!"));
                    $scope.insertFormClass == "closed-form"
                    $scope.getAllCenas();
                } else
                    $mdToast.show($mdToast.simple().textContent("Si è verificato un errore che non ha permesso il corretto inserimento della cena"));
            }, function (response) {
            });
        } else
            $mdToast.show($mdToast.simple().textContent("Inserire tutti i campi"));
    }

    // INSERT PORTATA
    $scope.addPortata = function () {
        $scope.scrollForm = true;
        var numPortatas = $scope.newCena.Portatas.length;
        $scope.newCena.Portatas.push(new Portata(numPortatas + 1, ""));
    }

    // DELETE CENA
    $scope.deleteCena = function (cenaId, ev) {
        var confirm = $mdDialog.confirm()
          .title('Vuoi cancellare la cena inserita?')
          .textContent('Una volta cancellata non sarà possibile recuperare i dati.')
          .ariaLabel('Elimina cena')
          .targetEvent(ev)
          .ok('Elimina')
          .cancel('Annulla');
        $mdDialog.show(confirm).then(function () {
            $http({
                method: "DELETE",
                url: "/api/Cenas/" + cenaId
            }).then(function (response) {
                if (response.status == 200) {
                    $mdToast.show($mdToast.simple().textContent("Cena correttamente eliminata"));
                    $scope.getAllCenas();
                } else
                    $mdToast.show($mdToast.simple().textContent("Si è verificato un errore che non ha permesso la cancellazione"));
            });
        }, function () {
            
        });
    }

    // DELETE PORTATA
    $scope.deletePortata = function (ordine) {
        $scope.newCena.Portatas.splice(ordine - 1, 1);
        for (var i = 0; i < $scope.newCena.Portatas.length; i++) {
            $scope.newCena.Portatas[i].Ordine = i + 1;
        }
    }

    // OPEN AND CLOSE INSERT FORM
    $scope.toggleInsertForm = function () {
        $scope.insertFormClass = $scope.insertFormClass == "closed-form" ? "opened-form" : "closed-form";
        window.history.pushState(null, "Home", "/");
    }

    // SHOW STORY
    $scope.showStory = function () {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        window.history.pushState(null, "Home", "/");
        $mdDialog.show({
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            templateUrl: "/Content/Template/_Story.html",
            controller: function DialogController($scope, $mdDialog) {
                $scope.closeDialog = function () {
                    $mdDialog.hide();
                }
            },
            fullscreen: true,
            parent: angular.element(document.body)
        });
    }

    // OPEN CENA
    $scope.openCena = function (cenaId) {
        $http({
            method: 'GET',
            url: '/api/Cenas/' + cenaId
        }).then(function (response) {
            $scope.selectedCena = JSON.parse(response.data);
            $mdDialog.show({
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                locals: {
                    selectedCena: $scope.selectedCena
                },
                templateUrl: "/Content/Template/Cena.html",
                controller: function DialogController($scope, $mdDialog) {
                    $scope.closeDialog = function () {
                        $mdDialog.hide();
                    }
                },
                fullscreen: true,
                parent: angular.element(document.body)
            });
        });
    };

    $scope.getAllCenas();
});