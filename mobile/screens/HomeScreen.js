import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { getTrendingPlaces } from '../services/placesService';
import PlaceCard from '../components/PlaceCard';

export default function HomeScreen({ navigation }) {
    const [trendingPlaces, setTrendingPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const places = await getTrendingPlaces();
            setTrendingPlaces(places);
            setLoading(false);
        };
        loadData();
    }, []);

    const renderSection = (title, data) => (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <Text style={styles.seeAll}>See All</Text>
            </View>
            <FlatList
                horizontal
                data={data}
                renderItem={({ item }) => (
                    <PlaceCard
                        place={item}
                        onPress={() => navigation.navigate('PlaceDetails', { place: item })}
                    />
                )}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.greeting}>Marhaba, Traveler 👋</Text>
                    <Text style={styles.subGreeting}>Discover the best of London</Text>
                </View>

                {renderSection('Trending Now', trendingPlaces)}

                {/* Placeholder for other sections */}
                {renderSection('Near You', [])}
                {renderSection('Top Rated', [])}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        padding: 20,
        paddingTop: 10,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    subGreeting: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    seeAll: {
        fontSize: 14,
        color: '#D32F2F',
        fontWeight: '600',
    },
    listContent: {
        paddingHorizontal: 20,
    },
});
