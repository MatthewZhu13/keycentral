import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native'
import Colors from './Colors'
import TodoModal from './TodoModal'
import { MaterialIcons } from '@expo/vector-icons';
import { Linking } from 'react-native';


export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showListVisible: false,
        };
        this.toggleListModal = this.toggleListModal.bind(this);
    }

    toggleListModal() {
        this.setState({showListVisible: !this.state.showListVisible})
    }

    componentDidUpdate(prevProps) {
        if (prevProps.list !== this.props.list) {
          console.log("Updated props in TodoList:", this.props.list);
        }
      }
    
    
    render() {
        const { list, isAdmin } = this.props;

        return (
            <View>
                <Modal
                    animationType = 'slide'
                    visible = {this.state.showListVisible}
                    onRequestClose = {() => this.toggleListModal()}
                >
                <TodoModal 
                    list={this.props.list} 
                    isAdmin= {isAdmin}
                    closeModal={this.toggleListModal}
                    updateList={this.props.updateList} 
                    saveChanges={this.props.saveChanges}
                    deleteList={this.props.deleteList}
                />
                    
                </Modal>
                <TouchableOpacity 
                    style ={[styles.listContainer, {backgroundColor: list.color}]} 
                    onPress = {() => this.toggleListModal()}
                >
                    <Text style = {styles.listTitle} numberOfLines = {2}>
                        {list.name}
                    </Text>

                    <View>
                        <View style = {{alignItems: "center"}}>
                            <Text style = {styles.subtitle}>When:</Text>
                            <Text style = {styles.count}>{list.when}</Text>
                        </View>

                        <View style = {{alignItems: "center"}}>
                            <Text style = {styles.subtitle}>Where:</Text>
                            <Text style = {styles.count}>{list.where}</Text>
                        </View>

                        <View style = {{alignItems: "center"}}>
                            <Text style = {styles.subtitle}>What:</Text>
                            <Text style = {styles.count}>{list.what}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32, 
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        justifyContent: "center",
        width: 200,
        height: 310
    },
    listTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.white,
        textAlign: 'center',
        marginBottom: 18
    },
    count: {
        fontSize: 16,
        fontWeight: '200',
        color: Colors.white,
        textAlign: 'center',
        marginBottom: 10
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center',
        color: Colors.white
    }
})