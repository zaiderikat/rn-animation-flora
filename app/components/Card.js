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
import {responsiveHeight, responsiveFontSize, responsiveWidth} from 'react-native-responsive-dimensions';
import Counter from './Counter';

type Props = {};
export default class TestApp extends Component<Props> {

    render() {

        return (
            <View style={styles.cardContainerStyle}>

                {/* Title Place Holder */}
                <View style={{
                    backgroundColor: '#c9c9c9',
                    width: responsiveWidth(70),
                    height: responsiveHeight(3),
                    borderRadius: 3
                }}/>

                {/* Details */}
                <View style={{marginTop: 25, flexDirection: 'row'}}>
                    <View style={{
                        backgroundColor: '#c9c9c9',
                        width: responsiveWidth(30),
                        height: responsiveHeight(1.5),
                        borderRadius: 3
                    }}/>
                    <View style={{
                        backgroundColor: '#c9c9c9',
                        width: responsiveWidth(20),
                        height: responsiveHeight(1.5),
                        borderRadius: 3,
                        marginLeft: 10
                    }}/>
                </View>

                {/* Counter */}
                <View style={styles.cardBottomContainer}>

                    <Text style={{
                        fontSize: responsiveFontSize(6),
                        color: '#6c6c6a'
                    }}>$29</Text>

                    <Counter/>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardContainerStyle: {
        width: responsiveWidth(95),
        paddingLeft: responsiveWidth(3),
        paddingRight: responsiveWidth(3),
        paddingTop: responsiveWidth(4),
        paddingBottom: responsiveWidth(4),
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 3
    },
    cardBottomContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});
