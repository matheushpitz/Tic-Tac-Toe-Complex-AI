module.exports.checkArrays = (arr1, arr2) => {
	if(arr1.length === arr2.length) {
		return arr1.every((elem, id) => {
			return elem === arr2[id];
		});
	}
	
	return false;
}