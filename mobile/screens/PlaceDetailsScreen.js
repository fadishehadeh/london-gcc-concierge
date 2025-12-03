import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PlaceDetailsScreen({ route, navigation }) {
    const { place } = route.params;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Image Header */}
                <View style={styles.imageContainer}>
                    <View style={styles.placeholderImage}>
                        <Text style={styles.placeholderText}>No Image Available</Text>
                    </View>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton}>
                        <Ionicons name="heart-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <View style={styles.contentContainer}>
                    <View style={styles.headerRow}>
                        <View style={styles.categoryBadge}>
                            <Text style={styles.categoryText}>{place.category}</Text>
                        </View>
                        <View style={styles.halalBadge}>
                            <Text style={styles.halalText}>{place.halalStatus}</Text>
                        </View>
                    </View>

                    <Text style={styles.title}>{place.name}</Text>

                    <View style={styles.infoRow}>
                        <Ionicons name="location-outline" size={16} color="#666" />
                        <Text style={styles.infoText}>{place.address || 'No address provided'}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons name="pricetag-outline" size={16} color="#666" />
                        <Text style={styles.infoText}>{place.priceRange || 'Price not set'}</Text>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>About</Text>
                    <Text style={styles.description}>{place.description || 'No description available.'}</Text>

                    {place.facilities && place.facilities.length > 0 && (
                        <>
                            <Text style={styles.sectionTitle}>Facilities</Text>
                            <View style={styles.facilitiesContainer}>
                                {place.facilities.map((facility, index) => (
                                    <View key={index} style={styles.facilityChip}>
                                        <Text style={styles.facilityText}>{facility}</Text>
                                    </View>
                                ))}
                            </View>
                        </>
                    )}

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Contact</Text>
                    {place.phone && (
                        <View style={styles.infoRow}>
                            <Ionicons name="call-outline" size={16} color="#666" />
                            <Text style={styles.infoText}>{place.phone}</Text>
                        </View>
                    )}
                    {place.website && (
                        <View style={styles.infoRow}>
                            <Ionicons name="globe-outline" size={16} color="#666" />
                            <Text style={styles.infoText}>{place.website}</Text>
                        </View>
                    )}

                </View>
            </ScrollView>

            {/* Bottom Action Bar */}
            <SafeAreaView style={styles.bottomBar}>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="navigate-outline" size={20} color="white" />
                    <Text style={styles.actionButtonText}>Get Directions</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    imageContainer: {
        height: 250,
        backgroundColor: '#eee',
        position: 'relative',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
    },
    placeholderText: {
        color: '#888',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        backgroundColor: '#fff',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    categoryBadge: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    categoryText: {
        fontSize: 12,
        color: '#666',
    },
    halalBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    halalText: {
        fontSize: 12,
        color: '#2E7D32',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    infoText: {
        marginLeft: 8,
        color: '#666',
        fontSize: 14,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    description: {
        fontSize: 14,
        color: '#444',
        lineHeight: 22,
    },
    facilitiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    facilityChip: {
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,
    },
    facilityText: {
        fontSize: 12,
        color: '#555',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    actionButton: {
        backgroundColor: '#D32F2F',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});
