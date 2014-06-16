
/**
The LocalStore singleton.

@class TemplateStore
@constructor
**/
LocalStore = {
    /**
    This object stores all keys and their values.

    @property keys
    @type Object
    @default {}
    @example

        {
            name->myProperty: "myValue",
            ...
        }

    **/
    keys: {},


    /**
    Keeps the dependencies for the keys in the store.

    @property deps
    @type Object
    @default {}
    @example

        {
            name->myProperty: new Deps.Dependency,
            ...
        }

    **/
    deps: {},

    // METHODS

    // PRIVATE
    /**
    Creates at least ones a `Deps.Dependency` object to a key.

    @method _ensureDeps
    @private
    @param {String} key     the name of the key to add a dependecy tracker to
    @return undefined
    **/
    _ensureDeps: function (key) {
        if (!this.deps[key]){
            this.deps[key] = new Deps.Dependency;
        }
    },
	set: function(key, value, options, callback){

        this._ensureDeps(key);

		// USE CHROME STORAGE
		if(chrome && chrome.storage) {
			var item = {};
			item[key] = value;

			// set
			chrome.storage.local.set(item, function(){

				// re-run reactive functions
				if(!options || options.reactive !== false)
	                this.deps[key].changed();

	            // run callbacks
				if(_.isFunction(callback))
					callback();
			});


		// USE LOCALSTORAGE
		} else {
			// stringify
			if(_.isObject(value))
				value = EJSON.stringify(value);

			// set
			localStorage.setItem(key, value);

			// re-run reactive functions
			if(!options || options.reactive !== false)
                this.deps[key].changed();

			// run callbacks
			if(_.isFunction(callback))
				callback();
		}
	},
	get: function(key, options, callback){

        this._ensureDeps(key);


        // DEPEND REACTIVE FUNCTIONS
		if(!options || options.reactive !== false)
            this.deps[key].depend();


		// use chrome storage
		if(chrome && chrome.storage) {

			// get
			chrome.storage.local.get(key, callback);


		// USE LOCALSTORAGE
		} else {
			// get
			var value = localStorage.getItem(key),
				retunValue = value;

			// try to parse
            if(value && _.isString(value)) {
            	try {
	                retunValue = EJSON.parse(value);
            	} catch(error){
            		retunValue = value;
            	}
            }

            return retunValue;
		}

	}
}