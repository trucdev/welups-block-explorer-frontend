import React from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
const { Search } = Input;

const PALCEHOLDER = 'Block Num/ Block Hash/ Transaction Hash';
const SEARCHTITLE = 'Search';

class BlockList extends React.Component {

	render() {
		return (
			<Search
				placeholder={PALCEHOLDER}
				enterButton={SEARCHTITLE}
				size="large"

			/>
		);
	}
}
// export default BlockList;
const mapStateToProps = (state) => {
	return {
		
	};
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(BlockList);