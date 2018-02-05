const uuid = require('uuid');

(function(){
'use strict';

module.exports = function(schema, options) {
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
        if(this.isNew) {
            if (options && options.format === 'v4') {
                if (options && options.hyphen === true) {
                    this.uuid = uuid.v4();
                } else if (options && options.hyphen === false) {
                    this.uuid = (uuid.v4()).split('-').join('');
                }
            }
            this.uuid = uuid.v4();
        }

        return next();
    });
};

})();