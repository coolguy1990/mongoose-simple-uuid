(function(){
'use strict';

module.exports = function(schema, options = {format: 'v4'}) {
    const uuid = require(`uuid/${options.format}`);

    if(!schema.paths.uuid) {
        schema.add({
            'uuid': {
                type: String,
                index: {
                    unique: true
                }
            }
        });
    }

    schema.pre('save', function(next) {
        if (this.isNew) {
            if ((typeof options.hyphen === 'undefined') || options.hyphen) {
                this.uuid = uuid();
            } else {
                this.uuid = uuid().split('-').join('');
            }
        }

        return next();
    });
};

})();