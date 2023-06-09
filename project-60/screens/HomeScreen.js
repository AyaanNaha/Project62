import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import firebase from 'firebase';
import db from '../config';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      all_students: [],
    };
  }

  goToSummaryScreen = () => {
    var presentNum = 0;
    var absentNum = 0;
    var classData;
    var class_ref = db.ref('/class_a/').on('value', (data) => {
      console.log(data.val());
      classData=data.val();
    })

    var status;
    for(var i in classData) {
      var classRef = db.ref('/class_a/'+i+'/status').on('value', (data)=> {
        status=data.val()
        console.log(status);
      })
      if(status === 'present') {
        presentNum++;
      } else {
        absentNum++;
      }
    }
    this.props.navigation.navigate('SummaryScreen', {presentNum:presentNum, absentNum:absentNum});
  };

  sortStudents = async () => {
    var class_ref = await db.ref('/').on('value', (data) => {
      var all_students = [];
      var class_A = data.val().class_a;
      for (var i in class_A) {
        all_students.push(class_A[i]);
      }
      all_students.sort(function (a, b) {
        return a.roll_no - b.roll_no;
      });
      this.setState({
        all_students: all_students,
      });
    });
    // console.log(this.state.all_students);
  };

  componentDidMount() {
    this.sortStudents();
  }

  updateAttendance = (roll_no, status) => {
    var id = '';
    id = '0' + roll_no;

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    today = dd + '-' + mm + '-' + yyyy;

    var ref_path = 'class_a/' + id + '/';
    var class_ref = db.ref(ref_path);
    class_ref.update({
      [today]:status
    });
    }

  setPresent = (id) => {
    classRef = db.ref('/class_a/0' + id + '/');
    classRef.update({
      status: 'present',
      presentColor: '#007700',
      absentColor: '#FFFFFF',
    });
    updateAttendance(id,'present');
  };

  setAbsent = (id) => {
    classRef = db.ref('/class_a/0' + id + '/');
    classRef.update({
      status: 'absent',
      absentColor: '#AA0000',
      presentColor: '#FFFFFF',
    });
    updateAttendance(id,'absent');
  };

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

        {this.state.all_students.map((student) => (
          <View style={styles.studentList}>
            <View>
              <Text style={styles.student}>
                {student.roll_no}. {student.name}
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '30%',
              }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: student.presentColor },
                ]}
                onPress={() => this.setPresent(student.roll_no)}>
                <Text style={{ textAlign: 'center' }}>Present</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: student.absentColor },
                ]}
                onPress={() => this.setAbsent(student.roll_no)}>
                <Text style={{ textAlign: 'center' }}>Absent</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity
          onPress={() => {
            this.goToSummaryScreen();
          }}
          style={styles.submit}>
          <Text style={{fontFamily: 'sans-serif',textAlign: 'center',}}>
          Submit
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  submit: {
    backgroundColor: '#FFFF00',
    textAlign: 'center',
    padding: 20,
    fontFamily: 'sans-serif',
    marginTop: 10,
  },
  studentList: {
    display: 'flex',
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  student: {
    fontWeight: 'bold',
    paddingRight: 10,
    fontSize: 16,
  },
  button: {
    borderWidth: 4,
    paddingLeft: 2,
    paddingRight: 2,
    width: 60,
    marginLeft: 2,
    marginRight: 2,
  },
});
