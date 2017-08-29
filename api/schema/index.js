var models = ['../users/user.model.js',
              '../drafts/draft.model.js'];

exports.initialize = function(autoIncrement) {
    var l = models.length;
    for (var i = 0; i < l; i++) {
        require(models[i])(autoIncrement);
    }
};
