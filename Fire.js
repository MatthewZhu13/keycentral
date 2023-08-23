import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, onSnapshot, addDoc, deleteDoc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { sendPasswordResetEmail } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDCcDVgO5wxSKqTYEULnfMGACjwB2TVpbk",
    authDomain: "keyclubphoneapp.firebaseapp.com",
    projectId: "keyclubphoneapp",
    storageBucket: "keyclubphoneapp.appspot.com",
    messagingSenderId: "232543161824",
    appId: "1:232543161824:web:8c21d104871419a14eef85",
    measurementId: "G-560NXV1VR4"
}
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

class Fire {
    constructor(callback) {
      this.init(callback || (() => {}));
    }

    init(callback) {
        const app = initializeApp(firebaseConfig);
        this.auth = getAuth(app);
        this.db = getFirestore(app);

        onAuthStateChanged(this.auth, user => {
            if (user) {
                callback(null, user);
            } else {
                signInAnonymously(this.auth)
                    .catch(error => {
                        callback(error);
                    });
            }
        });
    }
    async addUserRole(uid, isAdmin = false) {
        const userRoleRef = doc(db, 'user_roles', uid);
        return setDoc(userRoleRef, { isAdmin: isAdmin });
      }

    async getUserRole(uid) {
        const userRoleRef = doc(db, 'user_roles', uid);
        const userRoleDoc = await getDoc(userRoleRef);
        return userRoleDoc.data().isAdmin;
      }  

      sendPasswordResetEmail = async (email) => {
        return await sendPasswordResetEmail(this.auth, email);
      };
      
    signUpWithEmail = async (email, password) => {
        return await createUserWithEmailAndPassword(this.auth, email, password);
      };
      
    signInWithEmail = async (email, password) => {
        return await signInWithEmailAndPassword(this.auth, email, password);
    };
    
    getLists(callback) {
        let ref = collection(this.db, 'sharedLists');
        this.unsubscribe = onSnapshot(ref, snapshot => {
            let lists = [];
            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data()});
            });
            lists.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            callback(lists);
        });
    }
    
    signOut = async () => {
        return await this.auth.signOut();
    };

    addList = async list => {
        const ref = collection(this.db, 'sharedLists');
        const newList = { ...list, timestamp: new Date().toISOString() };
        return addDoc(ref, newList);
    };
    

    deleteList = async list => {
        const ref = doc(this.db, 'sharedLists', list.id);
        return deleteDoc(ref);
    };

    updateList = async list => {
        const { id, ...listWithoutId } = list;
        const ref = doc(this.db, 'sharedLists', id);
        return updateDoc(ref, listWithoutId);
    };
    
    get userId() {
        if (!this.auth.currentUser) {
            throw new Error('Firebase Auth not ready yet, try again later');
        }
        return this.auth.currentUser.uid;
    }

    detach(){
        this.unsubscribe();
    }
}

export default Fire;
export { auth, db };
