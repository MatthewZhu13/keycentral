import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from './Colors';
import { ScrollView } from 'react-native';
import EditListModal from './EditListModal';
import { MaterialIcons } from '@expo/vector-icons';
import { Linking } from 'react-native';


export default class TodoModal extends React.Component {
    state = {
        list: this.props.list,
        editListVisible: false
    };


    toggleEditListModal = () => {
        this.setState({ editListVisible: !this.state.editListVisible });
    };

    updateList = (updatedList) => {
        this.setState({list: updatedList}, () => {
            // Call the function passed from App to update the main state
            this.props.saveChanges(updatedList);
        });
    }

    handleLinkPress = (url) => {
        console.log("URL passed to handleLinkPress:", url);
        if (!url) {
            console.log("URL is undefined");
            return;
        }
    
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'http://' + url;
        }
    
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    };
    
    
    
    
    parseDescriptionForLinks(description) {
        const urlRegex = /https?:\/\/[^\s]+|tinyurl\.com\/\w+/g;
        const parts = description.split(urlRegex);
        const urls = description.match(urlRegex) || []; 
        const descriptionStyle = [styles.todo, { paddingLeft: 55, paddingRight: 20, fontSize: 16 }];
    
        let elements = [];
        
        for (let i = 0; i < parts.length; i++) {
            elements.push(<Text style={descriptionStyle} key={`part-${i}`}>{parts[i]}</Text>); 
            if (urls[i]) {
                elements.push(
                    <Text 
                        style={[descriptionStyle, {color: 'blue'}]}
                        key={`url-${i}`}
                        onPress={() => {
                            console.log("URL from Text Component:", urls[i]);
                            this.handleLinkPress(urls[i]);
                        }}
                    >
                        {urls[i]}
                    </Text>
                );
            }
        }
        
        return elements;
    }
    
    
    
       
    render() {
        const { list } = this.state;
        const { isAdmin } = this.props;

        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity 
                        style={{ position: 'absolute', top: 44, right: 32, zIndex: 10 }} 
                        onPress={this.props.closeModal}
                    >
                        <AntDesign name='close' size={24} color={Colors.black} />
                    </TouchableOpacity>
                    {isAdmin && (
                        <TouchableOpacity 
                            style={{ position: 'absolute', top: 44, right: 64, zIndex: 10 }} 
                            onPress={this.toggleEditListModal}
                        >
                            <AntDesign name='edit' size={24} color={Colors.black} />
                        </TouchableOpacity>
                    )}

                    {isAdmin && (
                        <TouchableOpacity 
                            style={{ position: 'absolute', top: 44, right: 96, zIndex: 10 }} 
                            onPress={() => this.props.deleteList(list)}
                        >
                            <MaterialIcons name="delete" size={24} color= {Colors.black} />
                        </TouchableOpacity>
                    )}
    
                    <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
                        <View>
                            <Text style={styles.title}
                                selectable={true}
                            >
                                {list.name}
                            </Text>
                            <Text style={[styles.eventType, { marginLeft: 8, marginBottom: 8 }]}
                                selectable={true}
                            >
                                {list.what}
                            </Text>
                        </View>
                    </View>
    
                    <ScrollView style={[styles.section, { flex: 3, marginVertical: 16 }]}>
                        <Text style={[styles.todo, { paddingLeft: 55, paddingRight: 20, fontSize: 16 }]}
                            selectable={true}
                        >
                            {this.parseDescriptionForLinks(String(list.description))}
                        </Text>
                    </ScrollView>
    
                    {
                        this.state.editListVisible && 
                        <EditListModal 
                            list={this.state.list}
                            closeModal={() => this.toggleEditListModal()} 
                            saveChanges={this.props.updateList}
                            isVisible={this.state.editListVisible} 
                        />
                    }
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}    


const styles = StyleSheet.create ({
    todo: {
        color: Colors.black,
        fontWeight: '700',       
        paddingLeft: 40,     
        
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    eventType: {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.gray
    },
    section: {
        alignSelf: 'stretch',
        marginBottom: 40
    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 35,
        borderBottomWidth: 3,
        paddingTop: 22
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: Colors.black,
        marginLeft: 4
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: Colors.gray,
        fontWeight: '600'
    },
    footer: {
        paddingHorizontal: 32, 
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16

    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        paddingHorizontal: 8
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItem: 'center',
        justifyContent: 'center'
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 32
    },
    todo: {
        color: Colors.black,
        fontWeight: '700',
        fontSize: 16
    },
    deleteButton:{
        flex: 1,
        backgroundColor: Colors.red,
        justifyContent: 'center', 
        alignItems: 'center',
        width: 80
    }
})