const React = require('react');
const Expand = require('react-native-simple-expand');

const {
    StyleSheet,
    Animated,
    TouchableOpacity,
    Text,
    View,
} = require('react-native');
const { Component } = React;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    toggle: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#403'
    },
    arrow: {
        color: '#fff'
    }
});

module.exports = class Basic extends Component {
    constructor (props) {
        super(props);
        this.state = { animatedValue: new Animated.Value(40) }
    }

    getMaxHeight = () => {
        if (!this.refs || !this.refs.expand)
            return 9999;

        return this.refs.expand.state.maxHeight;
    };

    render () {
        const { animatedValue } = this.state;
        const maxHeight = this.getMaxHeight();

        const opacity = this.state.animatedValue.interpolate({
            inputRange: [0, 40, maxHeight*.5, maxHeight],
            outputRange: [1, 1, 0.5,  1],
        });

        const height = this.state.animatedValue.interpolate({
            inputRange: [0, maxHeight * .3, maxHeight],
            outputRange: [0, 0, 100],
        });

        return (
            <View style={{ flex: 1, paddingTop: 50 }}>
                <Expand
                    minHeight={40}
                    containerStyle={{ flexGrow: 1 }}
                    ref="expand"
                    value={this.state.open}
                    animatedValue={animatedValue}>
                    <Animated.Text style={[styles.welcome, { opacity }]}>
                        {this.state.open ? 'Tap to Close' : 'Tap to Open'}
                    </Animated.Text>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <View style={{ height: 100 }}>
                            <Animated.View style={{ height, justifyContent: 'center', backgroundColor: '#f1f1f1' }}>
                                <Text style={{ textAlign: 'center' }}>
                                    react-native-simple-expand
                                </Text>
                            </Animated.View>
                        </View>
                    </View>
                </Expand>
                <View>
                    <TouchableOpacity style={styles.toggle} onPress={()=>this.setState({ open: !this.state.open })}>
                        <Text style={styles.arrow}>{this.state.open ? '▲' : '▼'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};