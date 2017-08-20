var models = ['../users/user.model.js',
              '../pods/pod.model.js'];

exports.initialize = function() {
    var l = models.length;
    for (var i = 0; i < l; i++) {
        require(models[i])();
    }
};
