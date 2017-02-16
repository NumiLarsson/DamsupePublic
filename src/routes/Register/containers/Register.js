import React, {Component} from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { goBack } from 'react-router-redux';
import Back from 'react-icons/lib/md/arrow-back';
import RegisterForm from '../components/RegisterForm';
import api from '../../../api/Api';
import { animateErrorButton } from '../../../utils/animations';

//TODO: Use css modules
import './styles/Register.css';

class RegisterScreen extends Component {

    constructor() {
        super();
        this.handleError = this.handleError.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    componentWillMount() {
        this.props.setDoneLoading();
    }

    createUser(values) {
        this.props.setLoading();
        const { email, password } = values;
        return api.auth.createUser(email, password)
        .catch((e) => { throw new SubmissionError({ _error: e }); });
    }

    handleError() {
        this.props.setDoneLoading();
        animateErrorButton("#registerBtn");
    }

    render() {
        return (
             <div className="registerScreen">
                <span className="backButton" role="button"><Back color="#fff" size="32" onClick={this.props.goBack} /></span>
                <div className="registerScreenHeader">
                    <h1 className="registerScreenHeaderTitle">REGISTER</h1>
                </div>
                <div className="registerScreenFormWrapper">
                    <RegisterForm onSubmit={this.createUser} onSubmitFail={this.handleError} loading={this.props.loading} />
                </div> 
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        loading: state.register.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLoading: () => dispatch({type: 'REGISTER_LOADING'}),
        setDoneLoading: () => dispatch({type: 'REGISTER_DONE_LOADING'}),
        goBack: () => dispatch(goBack())
    }
}



module.exports = connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);