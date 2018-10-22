var Storage = {};

/**
 * 检查是否支持localStorage
 * @return Boolean
 */
Storage.isAvailable = function() {
	if (typeof sessionStorage === 'object') {
		return true;
	} else {
		return false;
	}
};
Storage.set = function(key, value) {
	sessionStorage.setItem(key, value + "");
};
Storage.get = function(key) {
	return sessionStorage.getItem(key);
}
Storage.remove = function(key) {
	sessionStorage.removeItem(key);
};
Storage.clear = function() {
	sessionStorage.clear();
}

module.exports = Storage;