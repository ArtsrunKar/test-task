import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import MainContainer from '../MainContainer/MainContainer';
import styles from './CoinsTable.module.scss';

const CoinsTable = ({ coins, coinsFav }) => {
	const [favCoins, setFavCoins] = useState([]);
	const coin = coins || coinsFav;
	const [allCoins, setAllCoins] = useState(coin);
	const [skip, setSkip] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [fetchCoins, setFetchCoins] = useState(coins);
	const isScrolling = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop <
			document.documentElement.offsetHeight
		) {
			return;
		}
		setIsFetching(true);
	};
	useEffect(() => {
		window.addEventListener('scroll', isScrolling);
		return () => window.removeEventListener('scroll', isScrolling);
	}, []);
	const nextCoins = () => {
		fetch(
			`${process.env.NEXT_PUBLIC_FETCH_URL}?skip=${
				skip + 15
			}&limit=15&currency=USD`,
		)
			.then((res) => res.json())
			.then(({ coins }) => {
				setIsLoading(false);
				setFetchCoins(coins);
				if (coins.length === 0) {
					return;
				}
				return setAllCoins((prev) => [...prev, ...coins]);
			})
			.catch((err) => console.log('error', err));
		setSkip(skip + 15);
		setIsFetching(false);
	};
	useEffect(() => {
		if (isFetching && !coinsFav) {
			setIsLoading(true);

			nextCoins();
		}
	}, [isFetching]);

	const useValues = () => {
		let values = [];
		const keys = Object.keys(window.localStorage);
		let i = keys.length;

		while (i--) {
			if (keys[i].includes('coin-')) {
				values = [...values, JSON.parse(localStorage.getItem(keys[i]))];
			}
		}

		setFavCoins(values);
		coinsFav && setAllCoins(values);
	};
	useEffect(() => {
		useValues();
	}, []);

	const addFav = (coin) => {
		window !== 'undefined'
			? window.localStorage.setItem(`coin-${coin.id}`, JSON.stringify(coin))
			: null;
		useValues();
	};
	const removeFav = (coin) => {
		window !== 'undefined'
			? window.localStorage.removeItem(`coin-${coin.id}`, JSON.stringify(coin))
			: null;
		useValues();
	};

	return (
		<MainContainer keywords='coins'>
			<div className='container'>
				<div className={styles.table}>
					{allCoins && allCoins.length > 0 ? (
						<table className=''>
							<thead>
								<tr>
									<th className={styles.left}>
										<span>#</span>
									</th>
									<th className={styles.left}>
										<span>Name</span>
									</th>
									<th className={styles.right}>
										<span>24h Change</span>
									</th>
									<th className={styles.right}>
										<span>Price</span>
									</th>

									<th>
										<span>Market Cap</span>
									</th>
									<th>
										<span>Price in BTC</span>
									</th>
									<th>
										<span>Favorites</span>
									</th>
								</tr>
							</thead>

							<tbody>
								{allCoins.map((coin, index) => {
									return (
										<tr key={coin.id}>
											<Link href={`coins/${coin.id}`}>
												<td className={styles.left}>
													<a>
														<span>
															<span>{index + 1}</span>
														</span>
													</a>
												</td>
											</Link>
											<Link href={`coins/${coin.id}`}>
												<td className={styles.left}>
													<a>
														<img
															className={styles.tableCoinImage}
															src={coin.icon}
															alt={coin.name}
														/>
														<span>
															<span style={{ color: 'white' }}>
																{coin.name}
															</span>
														</span>
														<span>
															<span>{`• ${coin.symbol}`}</span>
														</span>
													</a>
												</td>
											</Link>
											<Link href={`coins/${coin.id}`}>
												<td className={styles.right}>
													<a>
														<span>
															<span
																className={
																	coin.priceChange1d > 0
																		? styles.green
																		: styles.red
																}>
																{coin.priceChange1d}%
															</span>
														</span>
													</a>
												</td>
											</Link>
											<Link href={`coins/${coin.id}`}>
												<td className={styles.right}>
													<a>
														<span className={styles.price}>
															${coin.price.toString().slice(0, 8)}
														</span>
													</a>
												</td>
											</Link>
											<Link href={`coins/${coin.id}`}>
												<td className={styles.right}>
													<a>
														<span>{coin.marketCap}</span>
													</a>
												</td>
											</Link>
											<Link href={`coins/${coin.id}`}>
												<td className={styles.right}>
													<a>
														<span>{coin.priceBtc}</span>
													</a>
												</td>
											</Link>
											<td title='' className={styles.favorite}>
												{coinsFav ? (
													<div
														style={{ color: 'red' }}
														className={styles.addRem}
														onClick={() => removeFav(coin)}>
														REMOVE
													</div>
												) : favCoins.some((e) => e.id === coin.id) ? (
													<div
														style={{ color: 'red' }}
														className={styles.addRem}
														onClick={() => removeFav(coin)}>
														REMOVE
													</div>
												) : (
													<div
														style={{ color: 'green' }}
														className={styles.addRem}
														onClick={() => addFav(coin)}>
														ADD FAV
													</div>
												)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					) : (
						<div>
							<h1> NO CURRENCIES</h1>
						</div>
					)}
				</div>
				<div style={{ marginTop: '20px' }}>
					{fetchCoins && fetchCoins.length > 0 && allCoins.length >= 15 ? (
						isLoading ? (
							<div>LOADING....</div>
						) : (
							<div>LOAD MORE (SCROLL DOWN)</div>
						)
					) : null}
				</div>
			</div>
		</MainContainer>
	);
};

export default CoinsTable;

CoinsTable.propTypes = {
	coins: PropTypes.array,
	coinsFav: PropTypes.array,
};
