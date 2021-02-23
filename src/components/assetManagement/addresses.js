import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, Collapse, Table, Skeleton } from 'antd';
import { currencyFormat } from '../../utils/utils';
import { loadAssetApi, loadAssetDetails } from '../../actions/assetManagement';

const StyledLink = styled(Link)`
	&:link, &:visited {
		color: #c23631;
		word-break: break-all;
	}
`;
const ColHead = styled(Col)`
	font-weight: bold;
`;
const StyleRowACG = styled(Row)`
	margin-bottom:1%;
`;
const StyleList = styled.div`
	margin-left:2%;
`;
const StyleCollapse = styled(Collapse)`
	margin-top:1%;
`;
const LineBreak = styled.div`
	word-break: break-all;
`;
const columns = [
    {
		title: 'No.',
		key: 'no',
		render: (value, item, index) => (index + 1),
		fixed: 'left',
		width: 70,
	},
    {
	    title: 'Asset Name',
	    dataIndex: 'name',
	    key: 'name',
	    render: record => <StyledLink to={"/token/" + record} target="_blank">{record}</StyledLink>,
    },
    {
	    title: 'Asset Balance',
	    dataIndex: 'balance',
	    key: 'balance',
	    render: record => <LineBreak>{currencyFormat(record)}</LineBreak>,
    }
];

class Addresses extends React.Component {
	constructor(props) {
		super(props);
		let { login} = this.props;
		if (login.token !== "") {
			this.props.loadAssetApi(login.id, login.token);
		}
		this.state = {
			openTab: 0,
		}
	}

	onChange = (values)=>{
		if(values.length>this.state.openTab){
			let addr = values[values.length-1];
			this.props.loadAssetDetails(addr);
		}
		this.setState({
            openTab:values.length
        });
	}

	render() {
		let { assetManagement} = this.props;
		let addresses = [];
		if (Object.keys(assetManagement.addresses).length === 0 && assetManagement.addresses.constructor === Object) {

		} else {
			Object.entries(assetManagement.addresses).forEach(([key, value]) => {
				addresses.push(key);
			});
		}
		return (
			<StyleList>
				<div>
					{Object.keys(assetManagement.addresses).length !== 0?<StyleCollapse expandIconPosition="right" onChange={this.onChange}>
						{addresses.map((acc, index)=>{
							let info = assetManagement.addresses[acc];
							let assets = [];
							if (info&&info.asset !== null && info.asset !== undefined) {
								Object.entries(info.asset).forEach(([key, value]) => {
									assets.push({name:key,balance:value});
								});
							}
							return <Collapse.Panel header={<StyledLink to={"/account/" + acc}>{acc}</StyledLink>} key={acc} >
									{info?
										<div>
											<StyleRowACG>
	                                            <ColHead xs={10} sm={4} md={4} lg={4} xl={2}>
		                                            ACG balance:
		                                        </ColHead>
		                                        <Col xs={14} sm={20} md={20} lg={20} xl={22}>
		                                            {currencyFormat(info.trxBalance/Math.pow(10,6))+" ACG"}
		                                        </Col>
		                                    </StyleRowACG>
		                                    <Table rowKey="name" columns={columns} dataSource={assets} />
		                                </div>
	                                :<Skeleton active />}
							    </Collapse.Panel>;
						})}
					</StyleCollapse>:null}
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
		},
		loadAssetDetails: (addr) => {
			dispatch(loadAssetDetails(addr));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Addresses);