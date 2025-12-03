import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { getTrendingPlaces } from '../services/placesService';

export default function MapScreen({ navigation }) {
    const [location, setLocation] = useState(null);
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            // Request permission
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            // Get current location
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);

            // Fetch places
            const placesData = await getTrendingPlaces();
            setPlaces(placesData);
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location ? location.latitude : 51.5074, // Default to London
                    longitude: location ? location.longitude : -0.1278,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
            >
                {places.map((place) => (
                    <Marker
                        key={place.id}
                        coordinate={{
                            latitude: place.latitude || 51.5074,
                            longitude: place.longitude || -0.1278,
                        }}
                        title={place.name}
                        description={place.category}
                        onCalloutPress={() => navigation.navigate('PlaceDetails', { place })}
                    >
                        <Callout>
                            <View style={styles.callout}>
                                <Text style={styles.calloutTitle}>{place.name}</Text>
                                <Text style={styles.calloutText}>{place.category}</Text>
                                <Text style={styles.calloutText}>{place.halalStatus}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
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
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    callout: {
        width: 150,
        padding: 5,
    },
    calloutTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 2,
    },
    calloutText: {
        fontSize: 12,
        color: '#666',
    },
});
