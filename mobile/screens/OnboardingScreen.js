import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const COUNTRIES = ['Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Lebanon', 'Jordan', 'Iraq', 'Egypt', 'Morocco', 'Tunisia', 'Algeria'];
const PROFILES = ['Family', 'Couple', 'Solo', 'Friends'];
const PREFERENCES = ['100% Halal Only', 'No Alcohol Options', 'Shisha Friendly', 'Family-friendly Only', 'Luxury Only', 'Budget Only'];

export default function OnboardingScreen() {
    const navigation = useNavigation();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [selectedPreferences, setSelectedPreferences] = useState([]);

    const togglePreference = (pref) => {
        if (selectedPreferences.includes(pref)) {
            setSelectedPreferences(selectedPreferences.filter(p => p !== pref));
        } else {
            setSelectedPreferences([...selectedPreferences, pref]);
        }
    };

    const handleComplete = () => {
        // TODO: Save user profile to Firestore
        navigation.replace('Main');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Welcome to London</Text>
                <Text style={styles.subtitle}>Customize your experience</Text>

                <Text style={styles.sectionTitle}>Where are you from?</Text>
                <View style={styles.chipContainer}>
                    {COUNTRIES.map((country) => (
                        <TouchableOpacity
                            key={country}
                            style={[styles.chip, selectedCountry === country && styles.chipSelected]}
                            onPress={() => setSelectedCountry(country)}
                        >
                            <Text style={[styles.chipText, selectedCountry === country && styles.chipTextSelected]}>{country}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Who are you traveling with?</Text>
                <View style={styles.chipContainer}>
                    {PROFILES.map((profile) => (
                        <TouchableOpacity
                            key={profile}
                            style={[styles.chip, selectedProfile === profile && styles.chipSelected]}
                            onPress={() => setSelectedProfile(profile)}
                        >
                            <Text style={[styles.chipText, selectedProfile === profile && styles.chipTextSelected]}>{profile}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Preferences</Text>
                <View style={styles.chipContainer}>
                    {PREFERENCES.map((pref) => (
                        <TouchableOpacity
                            key={pref}
                            style={[styles.chip, selectedPreferences.includes(pref) && styles.chipSelected]}
                            onPress={() => togglePreference(pref)}
                        >
                            <Text style={[styles.chipText, selectedPreferences.includes(pref) && styles.chipTextSelected]}>{pref}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleComplete}>
                    <Text style={styles.buttonText}>Start Exploring</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        marginTop: 12,
        color: '#333',
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        marginRight: 8,
        marginBottom: 8,
    },
    chipSelected: {
        backgroundColor: '#D32F2F', // Red accent
    },
    chipText: {
        color: '#333',
    },
    chipTextSelected: {
        color: '#fff',
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#D32F2F',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 32,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
