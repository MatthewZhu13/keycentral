import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import Colors from './Colors'
import { ScrollView } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Fire from './Fire';

export default class EditListModal extends React.Component {
    backgroundColors = ['#5D93E1', '#F9D288']

    constructor(props) {
        super(props);
        this.props.firebase
        const {id, name, when, where, what, description, color} = this.props.list;
        this.state = {
            id,
            name,
            when,
            where,
            what,
            description,
            color
        }
    }

    saveChanges = () => {
    const updatedList = this.state;
    console.log("EditListModal: Saving changes for list:", updatedList);
    this.props.saveChanges(updatedList); // Calling the prop passed from App component
    this.props.closeModal();
    }


    renderColors() {
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity key = {color} 
                    style = {[styles.colorSelect, {backgroundColor: color}]} 
                    onPress = {() =>{
                        this.setState({color})}
                    } 
                />
            )
        })
    }

    render() {
        return (
            <View style = {styles.container}>

                <ScrollView style={{alignSelf: "stretch", marginHorizontal: 32}}>
                    <Text style = {styles.title}>Edit Event</Text>

                    <TextInput 
                        style = {styles.input} 
                        placeholder = 'Event Name' 
                        onChangeText = {text => this.setState({name: text})}
                        value={this.state.name}
                    />

                    <TextInput 
                        style = {styles.input} 
                        placeholder = 'When' 
                        onChangeText = {text => this.setState({when: text})}
                        value={this.state.when}
                    />

                    <TextInput 
                        style = {styles.input} 
                        placeholder = 'Where' 
                        onChangeText = {text => this.setState({where: text})}
                        value={this.state.where}
                    />

                    <TextInput 
                        style = {styles.input} 
                        placeholder = 'What' 
                        onChangeText = {text => this.setState({what: text})}
                        value={this.state.what}
                    />

                    <TextInput 
                        style = {styles.descriptionInput} 
                        placeholder = 'Description' 
                        onChangeText = {text => this.setState({description: text})}
                        value={this.state.description}
                        multiline = {true}
                    />

                    <View style = {{flexDirection: "row", marginTop: 12, color: Colors.grey}}>
                        {this.renderColors()}
                    </View>

                    <TouchableOpacity 
                        style = {[styles.saveButton, {backgroundColor: this.state.color}]} 
                        onPress = {() => {
                            this.saveChanges();
                        }}
                        disabled={this.state.isCreating}
                    >
                        <Text style = {{color: Colors.white, fontWeight: '600'}}>Save Changes</Text>
                    </TouchableOpacity>

                    </ScrollView>
                </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        width: '90%',
    },
    descriptionInput: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.blue,
        borderRadius: 6,
        height: 100, // Increase the height of the description box
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4
    },
    saveButton: {
        height: 50,
        borderRadius: 6,
        backgroundColor: Colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: '600',
    }
});
