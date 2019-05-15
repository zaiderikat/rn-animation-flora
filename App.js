/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Animated, Easing, TouchableOpacity, Dimensions} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

    state = {
        opacity: new Animated.Value(0),
        rotation: new Animated.Value(0),
        counterTransition: new Animated.Value(70),
        minusBtnTransition: new Animated.Value(140),
    };

    animateElmenetsOpacity() {
        Animated.timing(
            this.state.opacity,
            {
                toValue: 1,
                duration: 300,
                easing: Easing.linear
            }
        ).start();
    }

    animateElementsRotation(){
        Animated.timing(
            this.state.rotation,
            {
                toValue: 1,
                duration: 300,
                easing: Easing.linear
            }
        ).start();
    }

    animateCounter() {
        Animated.timing(
            this.state.counterTransition,
            {
                toValue: 0,
                duration: 300,
                easing: Easing.linear
            }
        ).start();
    }

    animateMinusBtn() {
        Animated.timing(
            this.state.minusBtnTransition,
            {
                toValue: 0,
                duration: 300,
                easing: Easing.linear
            }
        ).start();
    }

    startAnimation() {
        this.animateElmenetsOpacity();
        this.animateCounter();
        this.animateMinusBtn();
        this.animateElementsRotation();
    }

    render() {

        let {opacity, counterTransition, minusBtnTransition, rotation} = this.state;

        rotation = rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        return (
            <View style={styles.container}>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: Dimensions.get('window').width
                }}>

                    <Animated.View style={{
                        ...styles.btnIconView,
                        opacity: opacity,
                        transform: [
                            {translateX: minusBtnTransition},
                            {rotate: rotation}
                        ]
                    }}>
                        <Text style={styles.btnIconText}>-</Text>
                    </Animated.View>

                    <Animated.View
                        style={{
                            ...styles.counterView,
                            opacity: opacity,
                            transform: [
                                {translateX: counterTransition},
                                {rotate: rotation}
                            ],
                        }}>
                        <Text style={styles.counterText}>0</Text>
                    </Animated.View>

                    <TouchableOpacity onPress={this.startAnimation.bind(this)}>
                        <View style={styles.btnIconView}>
                            <Text style={styles.btnIconText}>+</Text>
                        </View>
                    </TouchableOpacity>
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
    btnIconView: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'blue'
    },
    btnIconText: {
        fontSize: 40,
        lineHeight: 65,
        textAlign: 'center'
    },
    counterView: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#c9c9c9'
    },
    counterText: {
        fontSize: 40,
        lineHeight: 65,
        textAlign: 'center'
    }
});
