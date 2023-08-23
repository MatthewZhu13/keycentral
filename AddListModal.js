import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import {AntDesign} from '@expo/vector-icons'
import Colors from './Colors'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import * as Notifications from 'expo-notifications';

export default class AddListModal extends React.Component {
    backgroundColors = ['#5D93E1', '#F9D288']
    state = {
        name: '',
        when: '',
        where: '',
        what: '',
        description: '',
        color: this.backgroundColors[0],
        isCreating: false
    }

    createTodo = async () => {
        this.setState({isCreating: true});
        const {name, when, where, what, description, color} = this.state
      
        const list = {name, when, where, what, description, color};
        this.props.addList(list);
      
        // Schedule a local notification
        await Notifications.scheduleNotificationAsync({
            content: {
              title: `New ${what} Posted`,
              body: name, // Make sure this is a string
              sound: 'default',
            },
            trigger: {
              seconds: 3, // This will show the notification 3 seconds from now
            },
          });
      
        const db = getFirestore();
      
        this.setState({name: '', when: '', where: '', what: '', description: '', isCreating: false})
        this.props.closeModal();
      };

    componentDidMount() {
        // Add a notification received listener
        this.notificationSubscription = Notifications.addNotificationReceivedListener(
          (notification) => {
            // Handle the received notification here
            console.log('Notification received:', notification);
          }
        );
    // Add a response received listener
    this.responseSubscription = Notifications.addNotificationResponseReceivedListener(
        (response) => {
          console.log('Response received:', response);
        }
      );
    }    
    
    componentWillUnmount() {
        // Remove the notification listener when the component is unmounted
        if (this.notificationSubscription) {
          this.notificationSubscription.remove();
        }
    }
    renderColors(){
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity key = {color} 
                    style = {[styles.colorSelect, {backgroundColor: color}]} 
                    onPress = {() => this.setState({color})}
                />
            )
        })
    }

    render() {
        return (
            <KeyboardAvoidingView style = {styles.container} behavior = "padding">
                <TouchableOpacity style = {{position: "absolute", top: 64, right: 32}} onPress = {this.props.closeModal}>
                    <AntDesign name = 'close' size = {24} color = {Colors.black} />
                </TouchableOpacity>

                <View style = {{alignSelf: "stretch", marginHorizontal: 32}}>
                    <Text style = {styles.title}>Create Event</Text>

                    <TextInput 
                        style = {styles.input} 
                        placeholder = 'Event Name' 
                        placeholderTextColor={Colors.gray}
                        onChangeText = {text => this.setState({name: text})}
                    />

                    <TextInput 
                        style = {styles.input} 
                        placeholder = 'When' 
                        placeholderTextColor={Colors.gray}
                        onChangeText = {text => this.setState({when: text})}
                    />

                    <TextInput 
                        style = {styles.input} 
                        placeholder = 'Where' 
                        placeholderTextColor={Colors.gray}
                        onChangeText = {text => this.setState({where: text})}
                    />

                    <TextInput 
                        style = {styles.input} 
                        placeholder = 'What' 
                        placeholderTextColor={Colors.gray}
                        onChangeText = {text => this.setState({what: text})}
                    />

                    <TextInput 
                        style = {styles.input} 
                        placeholder = 'Description' 
                        placeholderTextColor={Colors.gray}
                        onChangeText = {text => this.setState({description: text})}
                        multiline = {true}
                    />

                    <View style = {{flexDirection: "row", marginTop: 12}}>
                        {this.renderColors()}
                    </View>

                    <TouchableOpacity 
                        style = {[styles.create, {backgroundColor: this.state.color}]} 
                        onPress = {this.createTodo}
                        disabled={this.state.isCreating}   // Disable the button if isCreating is true
                    >
                <Text style = {{color: Colors.white, fontWeight: '600'}}>Create</Text>
            </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: Colors.black
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.black,
        alignSelf: 'center',
        marginBottom: 16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18,
        color: Colors.black
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems:'center',
        justifyContent: 'center'
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4,
        marginRight: 10
    }
})