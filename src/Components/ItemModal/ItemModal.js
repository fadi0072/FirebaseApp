import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const ItemModal = ({ modalVisible, setModalVisible, updatedName, setUpdatedName, handleUpdateItem }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.editText}>Edit your shopping item </Text>
                    <TextInput
                        value={updatedName}
                        placeholder={updatedName}
                        onChangeText={text => setUpdatedName(text)}
                        style={styles.input}
                    />
                    <View style={styles.direction}>
                        <TouchableOpacity style={styles.btnContainer} onPress={handleUpdateItem} >
                            <Text style={styles.txtName}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnContainer} onPress={() => setModalVisible(false)} >
                            <Text style={styles.txtName}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        width: '90%',
        height: 200,
    },
    editText: {
        fontSize: 20,
        fontWeight: '800',
        color: 'black'
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderColor: '#ccc',
        borderRadius: 10,
        width: '100%',
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    txtName: {
        fontSize: 14,
        fontWeight: '700',
        color: 'black',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#ADD8E6',
        marginHorizontal: 10
    },
    direction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnContainer: {
        borderRadius: 10,
        overflow: 'hidden'
    }
});

export default ItemModal;
