import React, {Component, PropTypes} from 'react';
import {
    PanResponder,
    View,
    TouchableWithoutFeedback,
    TextInput,
    Dimensions,
    StyleSheet,
    Animated,
    Easing
} from 'react-native';

const Expand = class extends Component {
    displayName: 'Expand'

    constructor (props, context) {
        super(props, context);
        this.state = { height: this.props.animatedValue || new Animated.Value(this.props.minHeight || 0) };
    }

    componentWillReceiveProps = (newProps) => {
        if (this.props.value !== newProps.value) {
            newProps.value ? this.open() : this.close();
        }
    };

    close = () => {
        Animated.timing(this.state.height, {
            easing: Easing.inOut(Easing.ease),
            duration: 300,
            toValue: this.props.minHeight || 0
        }).start();
    };

    open = () => {
        Animated.timing(this.state.height, {
            easing: Easing.inOut(Easing.ease),
            duration: 270,
            toValue: this.state.maxHeight
        }).start();
    };

    _setMaxHeight (event) {
        this.setState({
            maxHeight: Math.max((this.props.maxHeight || 0), event.nativeEvent.layout.height)
        });
    }

    render () {
        var { style, children, containerStyle, style } = this.props;
        var { height } = this.state;
        return (
            <View style={[styles.containerStyle]}>
                <Animated.View style={[styles.menuStyle, { height }, containerStyle]}>
                    <View ref="expand" onLayout={this._setMaxHeight.bind(this)} style={style}>
                        {children}
                    </View>
                </Animated.View>
            </View>
        );
    }
};

Expand.propTypes = {};

var styles = StyleSheet.create({
    containerStyle: {
        overflow: 'hidden'
    },
    menuStyle: {
        overflow: 'scroll'
    }
});

module.exports = Expand;