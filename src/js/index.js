import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

const initialState = {
    value: 0
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'DECREMENT':
            return {
                value: state.value - 1
            };
        case 'INCREMENT':
            return {
                value: state.value + 1
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

class App extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.decrement}>-</button>
                <span> {this.props.value} </span>
                <button onClick={this.props.increment}>+</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {value: state.value};
}

function mapDispatchToProps(dispatch) {
    return {
        decrement: function () {
            dispatch({
                type: 'DECREMENT'
            });
        },
        increment: function () {
            dispatch({
                type: 'INCREMENT'
            });
        }
    };
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

render(
    <Provider store={store}>
    <App/>
</Provider>, document.getElementById('app'));
