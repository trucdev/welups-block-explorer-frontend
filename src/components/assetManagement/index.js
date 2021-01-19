import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { List, Row, Col, Modal, Input, Button } from 'antd';
import {currencyFormat} from '../../utils/utils';
import {AppstoreAddOutlined} from '@ant-design/icons';

const StyledLink = styled(Link)`
	&:link, &:visited {
		color: #c23631;
	}
`;
const ColHead = styled(Col)`
	font-weight: bold;
`;
const StyleRow = styled(Row)`
	margin:1% 0%;
`;
const Wrapper = styled.div`
	margin: 3% 0%;
	text-align: left;
`;
const Header = styled.div`
	text-align: left;
	border-bottom: 5px solid #C23631;
	font-size: 20px;
	text-transform: uppercase;
`;
const StyleList = styled.div`
	margin-left:2%;
`;
const StyleItem = styled.div`
	width: 100%;
`;
const AddIcon = styled.div`
  float:right;
`;



class AssetManagement extends React.Component {
	listAccount = (acc) => {
		return <List.Item key={acc.address}>
		        <StyleItem>
		        	<div>
	        			<StyledLink to={"/account/"+acc.address} target="_blank"><Header>{acc.address}</Header></StyledLink>
					</div>
					<div>
						<List
							itemLayout="horizontal"
							dataSource={acc.assets}
							renderItem={item => (
								this.listItem(item)
							)}
						/>
					</div>
		        </StyleItem>
		</List.Item>;
	}

	listItem = (item) => {
		return <List.Item key={item.id}>
				<StyleItem>
					<StyleRow >
						<ColHead span={2}>
							Asset name:
						</ColHead>
						<Col span={22}>
							<StyledLink to={"/token/"+item.id} target="_blank">{item.name}</StyledLink>
						</Col>
					</StyleRow>
					<StyleRow >
						<ColHead span={2}>
							Asset balance:
						</ColHead>
						<Col span={22}>
							{currencyFormat(item.balance)}
						</Col>
					</StyleRow>
				</StyleItem>
		</List.Item>;
	}

	state = {
    	loading: false,
    	visible: false,
  	};

    showModal = () => {
	    this.setState({
	      visible: true,
	    });
    };

    handleOk = () => {
	    this.setState({ loading: true });
	    setTimeout(() => {
	        this.setState({ loading: false, visible: false });
	    }, 3000);
    };

    handleCancel = () => {
    	this.setState({ visible: false });
    };
	
	render() {
		let {assetManagement} = this.props;
		const { visible, loading } = this.state;
		return (
			<Wrapper>
				<Header>
					<Row >
						<Col span={6}>
							{assetManagement.name}
						</Col>
						<Col span={18}>
							<AddIcon>
							    <AppstoreAddOutlined onClick={this.showModal}/>
							    <Modal
						            visible={visible}
						            title="Enter private key to add:"
						            onOk={this.handleOk}
						            onCancel={this.handleCancel}
						            footer={[
							            <Button key="back" onClick={this.handleCancel}>
							                Cancel
							            </Button>,
							            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
							                Add
							            </Button>,
						            ]}
						        >
						            <Input/>
						        </Modal>
							</AddIcon>
						</Col>
					</Row>
				</Header>
				<StyleList>
					<div>
						<List
							itemLayout="horizontal"
							dataSource={assetManagement.addresses}
							renderItem={item => (
								this.listAccount(item)
							)}
						/>
					</div>
				</StyleList>
			</Wrapper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		assetManagement: state.assetManagement,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		
	};
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(AssetManagement);