import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import colors from './Colors';
import { AntDesign } from '@expo/vector-icons';
import TodoList from './TodoList';
import AddListModal from './AddListModal';
import EditListModal from './EditListModal';
import Fire from './Fire';
import { FontAwesome } from '@expo/vector-icons';

export default class App extends React.Component{
  state = {
    refreshKey: 0,
    addTodoVisible: false,
    editListVisible: false,
    user: {},
    loading: true,
    currentList: null,
  };

  handleLogout = () => {
    this.firebase
      .signOut()
      .then(() => {
        this.props.navigation.replace('Login'); // Navigate back to login screen
      })
      .catch(error => {
        alert(error.message);
      });
  };

  deleteList = async list => {
    await this.firebase.deleteList(list);
    this.setState(prevState => {
      const newList = prevState.lists.filter(item => item.id !== list.id);
      return { lists: newList };
    });
  }
  

  componentDidMount() {
    this.firebase = new Fire((error, user) => {
      if (user) {
        this.firebase.getUserRole(user.uid).then(isAdmin => {
          this.setState({ isAdmin }); // Set isAdmin in the state
        });
      }
  
      this.firebase.getLists(lists => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        });
      });
  
      this.setState({ user });
    });
  }

  saveChanges = (updatedList) => {
    console.log("App: Saving changes for list:", updatedList);
    this.setState(prevState => {
      const newList = prevState.lists.map(list => {
          return list.id === updatedList.id ? updatedList : list;
      });
      return { lists: newList };
    });
  }


  componentWillUnmount() {
      this.firebase.detach()
  }


  toggleAddTodoModal() {
    this.setState({addTodoVisible: !this.state.addTodoVisible});
  }

  renderList = list => {
    return <TodoList list={list} updateList={this.updateList} saveChanges={this.saveChanges} />;
  }
  


  addList = async list => {
    await this.firebase.addList(list);
  }

  updateList = async (list) => {
    console.log("App: Calling updateList method with list:", list); 
    await this.firebase.updateList(list);
    this.saveChanges(list); // Call saveChanges to update the local state
    this.setState(prevState => ({ refreshKey: prevState.refreshKey + 1 }));
  }

  handleAbout = () => {
    // Navigate to the About page or display an About modal
    Alert.alert('About', 'This is the about information for the app.');
  };


  render(){
    const {isAdmin} = this.state;
    if (this.state.loading){
      return (
        <View style = {styles.container}>
          <ActivityIndicator size = 'large' color = {colors.blue} />
        </View>
      )
    }
  
    return (
      
      <View style={styles.container}>

      <Modal 
          animationType="slide" 
          visible={this.state.addTodoVisible} 
          onRequestClose={() => this.toggleAddTodoModal()}
      >
          <AddListModal 
              closeModal={() => this.toggleAddTodoModal()} 
              addList={this.addList} 
          />
      </Modal>

      <Modal 
          animationType="slide" 
          visible={this.state.editListVisible} 
          onRequestClose={() => this.toggleEditListModal()}
      >
    <EditListModal 
        list={this.state.currentList} 
        closeModal={() => this.toggleEditListModal()} 
        saveChanges={this.saveChanges} // Pass saveChanges here
        firebase={this.firebase}
    />


      </Modal>

        <View style = {{flexDirection : "row"}}>

          <View style = {styles.divider} />

          <Text style = {styles.title}>
            D27N <Text style = {{fontWeight: "300", color: colors.blue}}>Key Club</Text>
          </Text>

          <View  style = {styles.divider }/>

        </View>

        <View style = {{marginVertical: 40}}>
        {isAdmin && (
          <TouchableOpacity style = {styles.addList} onPress = {() => this.toggleAddTodoModal()}>
            <AntDesign name = "plus" size ={16} color = {colors.blue}  />
          </TouchableOpacity>
        )}
        </View>

        <View style = {{height: 300, paddingLeft: 32}}>

        <FlatList 
            key={this.state.lists.refreshKey}
            data={this.state.lists} 
            keyExtractor={item => item.id.toString()} 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
                <TodoList 
                    list={item} 
                    isAdmin={isAdmin}
                    updateList={this.updateList} 
                    saveChanges={this.saveChanges}
                    deleteList={this.deleteList}
                />
            )}
            extraData={this.state.lists}
            keyboardShouldPersistTaps='always'
        />
        </View>

        <TouchableOpacity
          style={[styles.button, styles.aboutButton]}
          onPress={() => this.props.navigation.navigate('About')}
        >
          <FontAwesome name="info-circle" size={18} color={colors.blue} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={this.handleLogout}>
          <FontAwesome name="sign-out" size={18} color={colors.blue} />
        </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 5,
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    alignItems: 'center',
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alginSelf: 'center'
  },
  title: {
    fontSize: 38, 
    fontWeight: "800",
    color: colors.black,
    paddingHorizontal: 64
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8
  },
  button: {
    width: 30, // Equal width and height for a square shape
    height: 30,
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center', // Center the icon in the square
    marginVertical: 5, // Space between the buttons
  },

  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },

  aboutButton: {
    position: 'absolute',
    top: 60, // Adjust this value based on the logout button's position and desired spacing
    right: 20,
  },
});