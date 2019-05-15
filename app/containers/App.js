import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Animated, Easing, TouchableOpacity, Dimensions} from 'react-native';
import Card from '../components/Card'

type Props = {};
export default class App extends Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                <Card />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
