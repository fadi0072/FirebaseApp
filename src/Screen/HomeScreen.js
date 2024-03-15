import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import * as Animatable from 'react-native-animatable'; 
import ItemModal from '../Components/ItemModal/ItemModal';
import { styles } from './style';

const HomeScreen = () => {
    const [itemName, setItemName] = useState('');
    const [items, setItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [showInputField, setShowInputField] = useState(false);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('shoppingList')
            .onSnapshot(snapshot => {
                const list = [];
                snapshot.forEach(doc => {
                    list.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setItems(list);
                setTotalItems(list.length);
            });

        return () => unsubscribe();
    }, []);

    const handleAddItem = () => {
        if (itemName.trim() !== '') {
            firestore()
                .collection('shoppingList')
                .add({
                    name: itemName,
                    completed: false,
                })
                .then(() => {
                    console.log('Item added!');
                    setItemName('');
                    setShowInputField(false);
                })
                .catch(error => {
                    console.error('Error adding item: ', error);
                });
        }
    };

    const handleDeleteItem = itemId => {
        firestore()
            .collection('shoppingList')
            .doc(itemId)
            .delete()
            .then(() => {
                console.log('Item deleted!');
            })
            .catch(error => {
                console.error('Error deleting item: ', error);
            });
    };

    const handleUpdateItem = () => {
        if (updatedName.trim() !== '') {
            firestore()
                .collection('shoppingList')
                .doc(selectedItem.id)
                .update({ name: updatedName })
                .then(() => {
                    console.log('Item updated!');
                    setModalVisible(false);
                    setUpdatedName('');
                })
                .catch(error => {
                    console.error('Error updating item: ', error);
                });
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={require('../assets/Images/shopping-bag.png')} style={styles.icon1} />
            <Text style={styles.txtName}>{item.name}</Text>
            <TouchableOpacity onPress={() => { setSelectedItem(item); setModalVisible(true); }}>
                <Image source={require('../assets/Images/pen.png')} style={styles.icon2} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                <Image source={require('../assets/Images/delete.png')} style={styles.icon2} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.direction}>
                <Text style={styles.headerText}>Shopping List </Text>
                <View style={styles.direction}>
                    <Text style={styles.itemText}>{totalItems}</Text>
                    <Image source={require('../assets/Images/add-to-cart.png')} style={styles.icon2} />
                </View>
            </View>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{ marginTop: 20 }}
            />
            {showInputField && (
                <Animatable.View
                    style={styles.inputContainer}
                    animation="slideInUp"
                    duration={500}
                >
                    <TextInput
                        placeholder="Enter item name"
                        value={itemName}
                        onChangeText={text => setItemName(text)}
                        style={styles.input}
                    />

                    <TouchableOpacity onPress={handleAddItem} >
                        <Image source={require('../assets/Images/add-list.png')} style={styles.icon2} />
                    </TouchableOpacity>
                </Animatable.View>
            )}

            <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => setShowInputField(true)}
            >
                <Image source={require('../assets/Images/plus.png')} style={styles.icon} />

            </TouchableOpacity>

            <ItemModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                updatedName={updatedName}
                setUpdatedName={setUpdatedName}
                handleUpdateItem={handleUpdateItem}
            />
        </View>
    );
};
 



export default HomeScreen;
