import React from 'react';
import { Input, message } from 'antd';
import { connect } from 'react-redux';
import { search, SEARCH_REQUESTING, SEARCH_SUCCESS } from '../actions/home';
import { Redirect } from 'react-router-dom';
const { Search } = Input;

const PALCEHOLDER = 'Block Num/ Block Hash/ Transaction Hash';
const SEARCHTITLE = 'Search';


class SearchBox extends React.Component {

	constructor(props) {
		super(props);
		this.searchBoxRef = React.createRef();
	}
	onSearch = (key) => {
		if (key === "") {
			message.info('Invalid input', 1);
		} else {
			this.props.search(key, () => this.searchBoxRef.current.setState(state => ({ ...state, value: "" })));
		}
	}
	render() {
		const searchState = this.props.state;
		const objType = this.props.type;
		const key = this.props.searchKey;
		if (searchState === SEARCH_SUCCESS) {
			switch (objType) {
				case 0:
					return <Redirect to={`/notfound`} />;
				case 1:
					return <Redirect to={`/transaction/${key}`} />;
				case 2:
					return <Redirect to={`/block/${key}`} />;
			}
		}
		return (
			<Search
				placeholder={PALCEHOLDER}
				enterButton={SEARCHTITLE}
				onSearch={this.onSearch}
				loading={SEARCH_REQUESTING === this.props.state}
				ref={this.searchBoxRef}
			/>

		);
	}
}
const mapStateToProps = (state) => {
	return {
		state: state.search.state,
		type: state.search.type,
		searchKey: state.search.key,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		search: (para, callback) => {
			dispatch(search(para, callback));
		},
	}
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(SearchBox);