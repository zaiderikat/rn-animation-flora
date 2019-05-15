/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Animated,
    Easing,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class TestApp extends Component<Props> {

    state = {
        openCounterCompleted: false,
        counterValue: 0,
        btnPlusRotation: new Animated.Value(0),
        btnPlusScale: new Animated.Value(1.6),
        btnPlusTransitionX: new Animated.Value(-45),
        counterScale: new Animated.Value(0.5),
        counterTransitionX: new Animated.Value(50),
        btnMinusTransitionX: new Animated.Value(75),
        counterTextScale: new Animated.Value(1),
    };

    /**
     * Handle counter value changing
     * @param type: Defines the type action to be done ont he counter value
     */
    toggleCounterValue(type) {
        const {counterValue, openCounterCompleted} = this.state;
        // If the animation didn't yet start, then start it
        if (!openCounterCompleted) {
            this.startAnimation();
            this.setState({openCounterCompleted: false})
            return;
        }
        // Toggle the counter value between addititon and subtraction
        if (type == 'plus') {
            this.setState({counterValue: counterValue + 1})
        } else if (type == 'minus') {
            if(counterValue == 0){return}
            this.setState({counterValue: counterValue - 1})
        }
        // DO the counter number animation
        this.counterTextAnimation();
    }

    /**
     * Animated the counter component to revel it's components
     */
    startAnimation() {
        Animated.parallel([
            // btnPlusRotation
            Animated.timing(this.state.btnPlusRotation, {toValue: 1, duration: 300, easing: Easing.linear}),
            // btnPlusScale
            Animated.timing(this.state.btnPlusScale, {toValue: 1, duration: 300, easing: Easing.linear}),
            // btnPlusTransitionX
            Animated.timing(this.state.btnPlusTransitionX, {toValue: 0, duration: 300, easing: Easing.linear}),
            // counterScale
            Animated.timing(this.state.counterScale, {toValue: 1, duration: 300, easing: Easing.linear}),
            // counterTransitionX
            Animated.timing(this.state.counterTransitionX, {toValue: 0, duration: 300, easing: Easing.linear}),
            // btnMinusTransitionX
            Animated.timing(this.state.btnMinusTransitionX, {toValue: 0, duration: 300, easing: Easing.linear}),
        ]).start(() => {
            this.setState({openCounterCompleted: true})
        });
    }

    /**
     * Animate the counter number bouncing
     */
    counterTextAnimation() {
        Animated.sequence([
            // counterTextScale
            Animated.timing(this.state.counterTextScale, {toValue: 0.8, duration: 400, easing: Easing.linear}),
            // counterTextScale
            Animated.timing(this.state.counterTextScale, {toValue: 1.2, duration: 400, easing: Easing.linear}),
            // counterTextScale
            Animated.timing(this.state.counterTextScale, {toValue: 1, duration: 400, easing: Easing.linear})
        ]).start();
    }

    render() {

        let {
            counterValue,
            btnPlusRotation,
            btnPlusScale,
            btnPlusTransitionX,
            counterScale,
            counterTransitionX,
            btnMinusTransitionX,
            counterTextScale
        } = this.state;

        // Handle the animation value out for rotation
        btnPlusRotation = btnPlusRotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['270deg', '360deg']
        });

        return (
            <View style={styles.container}>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>

                    <TouchableWithoutFeedback onPress={() => this.toggleCounterValue('minus')}>
                        <Animated.View style={{
                            ...styles.btnMinusStyle,
                            transform: [
                                {translateX: btnMinusTransitionX}
                            ]
                        }}>
                            <Text style={styles.btnMinusTextStyle}>-</Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>

                    <Animated.View style={{
                        ...styles.counterStyle,
                        transform: [
                            {scale: counterScale},
                            {translateX: counterTransitionX}
                        ]
                    }}>
                        <Animated.Text style={{
                            ...styles.counterTextStyle,
                            transform: [
                                {scale: counterTextScale}
                            ]
                        }}>{counterValue}</Animated.Text>
                    </Animated.View>

                    <TouchableWithoutFeedback onPress={() => this.toggleCounterValue('plus')}>
                        <Animated.View style={{
                            ...styles.btnPlusStyle,
                            transform: [
                                {scale: btnPlusScale},
                                {translateX: btnPlusTransitionX},
                            ]
                        }}>
                            <Animated.Text style={{
                                ...styles.btnPlusTextStyle,
                                transform: [
                                    {rotate: btnPlusRotation}
                                ]
                            }}>+</Animated.Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>

            </View>
        );
    }
}

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
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    btnPlusStyle: {
        backgroundColor: '#26b4ae',
        width: 70,
        height: 70,
        borderRadius: 35,
        marginLeft: -15,
        zIndex: 9999
    },
    btnPlusTextStyle: {
        color: '#ffffff',
        fontSize: 60,
        textAlign: 'center',
        lineHeight: 65
    },
    btnMinusStyle: {
        backgroundColor: '#ffffff',
        borderColor: '#848472',
        borderWidth: 3,
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: -15,
        zIndex: 9999
    },
    btnMinusTextStyle: {
        color: '#848472',
        fontSize: 60,
        textAlign: 'center',
        lineHeight: 65
    },
    counterStyle: {
        backgroundColor: '#e3e3e5',
        width: 105,
        height: 105,
        borderRadius: 70
    },
    counterTextStyle: {
        color: '#848472',
        fontSize: 60,
        textAlign: 'center',
        lineHeight: 100
    },
});
