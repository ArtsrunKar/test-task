export const useValues = () => {
	let values = [];
	if (typeof window !== 'undefined') {
		const keys = Object.keys(window.localStorage);
		let i = keys.length;

		while (i--) {
			if (keys[i].includes('coin-')) {
				values = [...values, JSON.parse(localStorage.getItem(keys[i]))];
			}
		}
	}
	return values;
	setFavCoins(values);
};

export const addFav = (coin) => {
	window !== 'undefined'
		? window.localStorage.setItem(`coin-${coin.id}`, JSON.stringify(coin))
		: null;
	useValues();
};
export const removeFav = (coin) => {
	window !== 'undefined'
		? window.localStorage.removeItem(`coin-${coin.id}`, JSON.stringify(coin))
		: null;
	useValues();
};
