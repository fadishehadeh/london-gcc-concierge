import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function PlaceCard({ place, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.imagePlaceholder}>
                {/* TODO: Use place.image if available */}
                <Text style={styles.placeholderText}>No Image</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.category}>{place.category}</Text>
                    <Text style={styles.halalStatus}>{place.halalStatus}</Text>
                </View>
                <Text style={styles.name} numberOfLines={1}>{place.name}</Text>
                <Text style={styles.address} numberOfLines={1}>{place.address}</Text>
                <Text style={styles.price}>{place.priceRange}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 200,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    imagePlaceholder: {
        height: 120,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#888',
    },
    content: {
        padding: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    category: {
        fontSize: 10,
        color: '#666',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    halalStatus: {
        fontSize: 10,
        color: '#2E7D32',
        fontWeight: 'bold',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    address: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    price: {
        fontSize: 12,
        color: '#333',
        fontWeight: '600',
    },
});
