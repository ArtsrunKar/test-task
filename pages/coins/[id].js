import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import MainContainer from '../../components/MainContainer/MainContainer';
import { addFav, removeFav, useValues } from '../../helper/helper';
import styles from '../../styles/coins.module.scss';

const Coin = ({ coin: { coin } }) => {
	const [favCoins, setFavCoins] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		setFavCoins(useValues());
	}, [isFetching]);
	return (
		<MainContainer>
			<div style={{ marginTop: '20px' }} className={`container  `}>
				<h1>COINS DETAILS</h1>
				<div className={styles.coins}>
					<div className={styles.coinPreview}>
						<div className={styles.coinsImg}>
							<img src={coin.icon} alt={coin.id} />
						</div>
						<div className={styles.coinMainInfo}>
							<div style={{ display: 'flex' }}>
								<span
									className={
										styles.coinColor
									}>{`${coin.name} (${coin.symbol})`}</span>
								<span className={`${styles.coinColor} ${styles.rank}`}>
									#{coin.rank}
								</span>
								<div style={{ marginLeft: '10px' }}>
									{favCoins.some((e) => e.id === coin.id) ? (
										<div
											style={{ color: 'red', cursor: 'pointer' }}
											onClick={() => {
												setIsFetching((prev) => !prev);
												return removeFav(coin);
											}}>
											REMOVE
										</div>
									) : (
										<div
											style={{ color: 'green', cursor: 'pointer' }}
											onClick={() => {
												setIsFetching((prev) => !prev);
												return addFav(coin);
											}}>
											ADD FAV
										</div>
									)}
								</div>
							</div>
							<div className='jsx-2619512678 price-with-percent big'>
								<div className={styles.price}>
									<span className={`${styles.coinColor} `}>${coin.price}</span>
								</div>

								<div className='jsx-2619512678 percent-preview text-up'>
									<span
										style={
											coin.priceChange1d < 0
												? { color: 'red' }
												: { color: 'green' }
										}
										className={styles.coinColor}>
										{coin.priceChange1d}%
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.coinTotal}>
						<div className={styles.innerTotal}>
							<span className={styles.title}>MARKET CAP</span>
							<span className={styles.coinColor}>$1.0T</span>
						</div>
						<div className={styles.innerTotal}>
							<span className={styles.title}>VOLUME 24H</span>
							<span className={styles.coinColor}>{`$${coin.volume}`}</span>
						</div>

						<div className={styles.innerTotal}>
							<span className={styles.title}>AVAILABLE SUPPLY</span>
							<span className={styles.coinColor}>{coin.availableSupply}</span>
						</div>
						<div className={styles.innerTotal}>
							<span className={styles.title}>TOTAL SUPPLY</span>
							<span className={styles.coinColor}>{coin.totalSupply}</span>
						</div>
					</div>
				</div>
			</div>
		</MainContainer>
	);
};

export default Coin;
export async function getServerSideProps({ params }) {
	const coin = await fetch(`${process.env.FETCH_URL}/${params.id}?currency=USD`)
		.then((res) => res.json())
		.catch((err) => console.log('error', err));

	return { props: { coin } };
}

Coin.propTypes = {
	coins: PropTypes.objectOf(PropTypes.array),
};
