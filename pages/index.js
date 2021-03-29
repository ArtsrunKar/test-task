import PropTypes from 'prop-types';

import CoinsTable from '../components/CoinsTable/CoinsTable';

const Index = ({ coins: { coins } }) => {
	return <CoinsTable coins={coins} />;
};

export default Index;
export async function getServerSideProps() {
	let server = `${process.env.FETCH_URL}?skip=0&limit=15&currency=USD`;

	const request = {
		method: 'GET',
	};

	const res = await fetch(server, request);
	const coins = await res.json();

	return { props: { coins } };
}

Index.propTypes = {
	coins: PropTypes.objectOf(PropTypes.array),
};
