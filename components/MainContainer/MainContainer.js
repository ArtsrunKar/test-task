import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import styles from './Maincontainer.module.scss';

const MainContainer = ({ children, keywords }) => {
	const { asPath } = useRouter();
	return (
		<div className={`${styles.mainContainer} container`}>
			<Head>
				<meta keywords={`test task,next js ${keywords}`}></meta>
			</Head>
			<div className={styles.inner}>
				<h1>Test Task</h1>
				<div className={styles.pages}>
					<Link href='/'>
						<a style={asPath === '/' ? { color: 'green' } : null}>
							CRYPTOCURRENCIES
						</a>
					</Link>
					<Link href='/favorite'>
						<a style={asPath === '/favorite' ? { color: 'green' } : null}>
							FAVORITE
						</a>
					</Link>
				</div>
			</div>
			<div>{children}</div>
		</div>
	);
};
MainContainer.propTypes = {
	children: PropTypes.elementType.isRequired,
	keywords: PropTypes.string,
};

export default MainContainer;
