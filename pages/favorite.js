import CoinsTable from '../components/CoinsTable/CoinsTable';
import { useValues } from '../helper/helper';

const Favorite = () => {
	const coinsFav = useValues();
	return <CoinsTable coinsFav={coinsFav} />;
};

export default Favorite;
