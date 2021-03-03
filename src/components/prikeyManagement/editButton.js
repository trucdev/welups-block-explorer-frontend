import React, {Component} from 'react';
import { connect } from 'react-redux';
import {editPriKey} from '../../actions/prikeyManagement';
import { Row, Col, Modal, Input, Button, Form } from 'antd';

class EditButton extends Component{

	state = {
		loading: false,
		visible: false,
	};

	showModal = (e) => {
		e.preventDefault();
		this.setState({
			visible: true,
		});
	};

	handleOk = (values) => {
		var { ind, login } = this.props;
		this.props.editPriKey(ind, values, login.email);
		this.setState({ visible: false });
	};

	handleCancel = () => {
		this.setState({ visible: false });
	};

	render(){
		var { val } = this.props;
		const { visible, loading } = this.state;
		return (
			<Col>
				<Button type="primary" onClick={(e)=>this.showModal(e)}>Edit</Button>
				<Modal
					visible={visible}
					onCancel={this.handleCancel}
					footer={null}
				>
					<Form
						layout = "vertical"
					    name="login"
					    initialValues={{
					       	remember: true,
					    }}
					    onFinish = {this.handleOk}
					    size = "medium"
				    >
					    <Form.Item
					        label="Name"
					        name="name"
					        rules={[
					            {
						            required: true,
						            message: 'Please input your private key name!',
					            }
					        ]}
					        initialValue = {val.name}
					    >
					        <Input placeholder="Private key name"/>
					    </Form.Item>
					    <Form.Item
					        label="Private Key"
					        name="prikey"
					        rules={[
					          {
					            required: true,
					            message: 'Please input your private key!',
					          },
					        ]}
					        initialValue = {val.prikey}
					    >
					        <Input placeholder="Private key"/>
					    </Form.Item>
				    	<Row>
							<Col>
								<Button htmlType="submit" type="primary" loading={loading} >
									Edit
					            </Button>
							</Col>
							<Col span={1}></Col>
							<Col>
								<Button key="back" onClick={this.handleCancel}>
									Cancel
				           		</Button>
							</Col>
						</Row>
				    </Form>
				</Modal>
			</Col>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		prikeys:state.prikeyManagement,
		login: state.login,
	};
};

const mapDispatchToProps = (dispatch,props) => {
	return {
		editPriKey: (index, prikey, email)=>{
			dispatch(editPriKey(index, prikey, email));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(EditButton);