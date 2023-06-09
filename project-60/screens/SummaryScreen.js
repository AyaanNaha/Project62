import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class SummaryScreen extends React.Component {

  goToHomeScreen=()=> {
    this.props.navigation.navigate('HomeScreen');
  }
  render() {
    return (
      <View>
        <View style={{ backgroundColor: '#FF7700', paddingBottom: 15 }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              paddingTop:15
            }}>
            SCHOOL ATTENDANCE
          </Text>
        </View>

        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 10,
          }}>
          Absent Students Today: {this.props.navigation.getParam('absentNum')}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
          Present Students Today: {this.props.navigation.getParam('presentNum')}
        </Text>

        <TouchableOpacity
          onPress={() => {
            this.goToHomeScreen();
          }}
          style={{
            backgroundColor: '#FFFF00',
            
            padding: 20,
            
            marginTop: 10,
          }}>
          <Text style={{fontFamily: 'sans-serif',textAlign: 'center',}}>
          Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
