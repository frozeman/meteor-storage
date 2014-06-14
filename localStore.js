

LocalStore = {
	set: function(key, value, callback){

		// use chrome storage
		if(chrome && chrome.storage) {
			var item = {};
			item[key] = value;

			// set
			chrome.storage.local.set(item, callback);

		// use localstorage
		} else {
			// stringify
			if(_.isObject(value))
				value = EJSON.stringify(value);

			// set
			localStorage.setItem(key, value);

			if(_.isFunction(callback))
				callback();
		}

	},
	get: function(key, callback){

		// use chrome storage
		if(chrome && chrome.storage) {

			// get
			chrome.storage.local.get(key, callback);

		// use localstorage
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