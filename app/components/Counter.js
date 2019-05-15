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

type Props = {};
export default class Counter extends Component<Props> {

    state = {
        openCounterCompleted: false,
        counterValue: 0,
        btnPlusRotation: new Animated.Value(0),
        btnPlusScale: new Animated.Value(1.6),
        btnPlusTransitionX: new Animated.Value(-responsiveWidth(4)),
        counterScale: new Animated.Value(0.5),
        counterTransitionX: new Animated.Value(responsiveWidth(7)),
        btnMinusTransitionX: new Animated.Value(responsiveWidth(15)),
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
        );
    }
}

const styles = StyleSheet.create({
    btnPlusStyle: {
        flexDirection: 'column',
        backgroundColor: '#26b4ae',
        width: responsiveWidth(10),
        height: responsiveWidth(10),
        borderRadius: responsiveWidth(10)/2,
        marginLeft: -responsiveWidth(2),
        zIndex: 9999
    },
    btnPlusTextStyle: {
        color: '#ffffff',
        fontSize: responsiveFontSize(5),
        lineHeight: responsiveFontSize(5),
        alignSelf: 'center',
    },
    btnMinusStyle: {
        backgroundColor: '#ffffff',
        borderColor: '#848472',
        borderWidth: 3,
        width: responsiveWidth(10),
        height: responsiveWidth(10),
        borderRadius: responsiveWidth(10) / 2,
        marginRight: -responsiveWidth(2),
        zIndex: 9999
    },
    btnMinusTextStyle: {
        color: '#848472',
        fontSize: responsiveFontSize(5),
        lineHeight: responsiveFontSize(4.8),
        alignSelf: 'center',
    },
    counterStyle: {
        backgroundColor: '#e3e3e5',
        width: responsiveWidth(15),
        height: responsiveWidth(15),
        borderRadius: responsiveWidth(15) / 2
    },
    counterTextStyle: {
        color: '#848472',
        fontSize: responsiveFontSize(5),
        lineHeight: responsiveFontSize(7.5),
        alignSelf: 'center',
    },
});
