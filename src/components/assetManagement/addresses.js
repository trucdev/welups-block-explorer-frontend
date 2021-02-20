import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { List, Row, Col, Collapse } from 'antd';
import { currencyFormat } from '../../utils/utils';
import { loadAssetApi } from '../../actions/assetManagement';

const StyledLink = styled(Link)`
	&:link, &:visited {
		color: #c23631;
		word-break: break-all;
	}
`;
const ColHead = styled(Col)`
	font-weight: bold;
`;
const StyleRow = styled(Row)`
	margin:1% 0%;
`;
const StyleRowACG = styled(Row)`
	margin-top:1%;
`;
const StyleList = styled.div`
	margin-left:2%;
`;
const StyleItem = styled.div`
	width: 100%;
`;
const StyleCollapse = styled(Collapse)`
	margin-top:1%;
`;
const LineBreak = styled.div`
	word-break: break-all;
`;



class Addresses extends React.Component {

	listItem = (key, value) => {
		return <List.Item key={key}>
			<StyleItem>
				<StyleRow >
					<ColHead xs={10} sm={4} md={4} lg={4} xl={2}>
						Asset name:
						</ColHead>
					<Col xs={14} sm={20} md={20} lg={20} xl={22}>
						<StyledLink to={"/token/" + key}>{key}</StyledLink>
					</Col>
				</StyleRow>
				<StyleRow >
					<ColHead xs={10} sm={4} md={4} lg={4} xl={2}>
						Asset balance:
						</ColHead>
					<Col xs={14} sm={20} md={20} lg={20} xl={22}>
						<LineBreak>{currencyFormat(value)}</LineBreak>
					</Col>
				</StyleRow>
			</StyleItem>
		</List.Item>;
	}

	
	constructor(props) {
		super(props);
		let { login} = this.props;
		if (login.token !== "") {
			this.props.loadAssetApi(login.id, login.token);
		} 
	}

	render() {
		let { assetManagement} = this.props;
		let addresses = [];
		if (Object.keys(assetManagement.addresses).length === 0 && assetManagement.addresses.constructor === Object) {

		} else {
			Object.entries(assetManagement.addresses).forEach(([key, value]) => {
				addresses.push(value);
			});
		}
		return (
			<StyleList>
				<div>
					<StyleCollapse expandIconPosition="right">
						{addresses.map((acc, index)=>{
							if (acc.address === '') return;
							let assets = [];
							if (acc.asset !== null && acc.asset !== undefined) {
								assets = Object.entries(acc.asset);
							}
							return <Collapse.Panel header={<StyledLink to={"/account/" + acc.address}>{acc.address}</StyledLink>} key={acc.address}>
									<StyleRowACG>
										<ColHead xs={10} sm={4} md={4} lg={4} xl={2}>
											ACG balance:
											</ColHead>
										<Col xs={14} sm={20} md={20} lg={20} xl={22}>
											<LineBreak>{currencyFormat(acc.trxBalance/Math.pow(10,6))+" ACG"}</LineBreak>
										</Col>
									</StyleRowACG>
									<div>
										<List
											itemLayout="horizontal"
											dataSource={assets}
											renderItem={([key, value]) => (
												this.listItem(key, value)
											)}
										/>
									</div>
							    </Collapse.Panel>;
						})}
					</StyleCollapse>
				</div>
			</StyleList>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		assetManagement: state.assetManagement,
		account: state.account,
		login: state.login,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		loadAssetApi: (id, token) => {
			dispatch(loadAssetApi(id, token));
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Addresses);