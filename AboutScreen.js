import React from 'react';
import { View, Text, StyleSheet, SafeAreaView,   KeyboardAvoidingView } from 'react-native';
import Colors from './Colors';
import { ScrollView } from 'react-native';


export default class AboutScreen extends React.Component {

    
    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <SafeAreaView style={styles.container}>
                    <View style={[styles.section, styles.header, { borderBottomColor: '#5D93E1'}]}>
                        <View>
                            <Text style={styles.title}>
                                About This App
                            </Text>
                            <Text style={[styles.eventType, { marginLeft: 8, marginBottom: 8 }]}>
                                by Matthew Zhu
                            </Text>
                        </View>
                    </View>
    
                    <ScrollView style={[styles.section, { flex: 3, marginVertical: 16 }]}>
                        <Text style={[styles.todo, { paddingLeft: 55, paddingRight: 20, fontSize: 16 }]}>This app is a place where you can view upcoming D27N Key Club events and activities. </Text>
                        <Text style={[styles.todo, { paddingLeft: 55, paddingRight: 20, fontSize: 16, paddingTop: 20 }]}>To get notifications when a new event is posted please enable sms notifications in your settings app.</Text>
                        <Text style={[styles.todo, { paddingLeft: 55, paddingRight: 20, fontSize: 16, paddingTop: 20 }]}>If you have any questions, concerns, or spot any bugs feel free to reach out to me at my: </Text>
                        <Text style={[styles.todo, { paddingLeft: 55, paddingRight: 20, fontSize: 16, paddingTop: 20 }]}>Instagram: @matthew._.zhu</Text>
                        <Text style={[styles.todo, { paddingLeft: 55, paddingRight: 20, fontSize: 16}]}>Email: matthewzhu2006@gmail.com</Text>
                        <Text style={[styles.todo, { paddingLeft: 55, paddingRight: 20, fontSize: 16, paddingTop: 20 }]}>Thanks for using! ૮₍˶• . • ˶ ₎ა</Text>
                    </ScrollView>
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
    eventType: {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.gray,
        paddingLeft: 10
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
        marginBottom: 20
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
})