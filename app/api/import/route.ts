import { NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

// This would ideally be an environment variable
const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export async function POST(request: Request) {
    try {
        const { query, type } = await request.json();

        if (!GOOGLE_PLACES_API_KEY) {
            return NextResponse.json(
                { error: "Google Maps API Key is missing" },
                { status: 500 }
            );
        }

        // 1. Search Google Places
        const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
            query
        )}&key=${GOOGLE_PLACES_API_KEY}`;

        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data.status !== "OK") {
            console.error("Google Places API Error:", data);
            return NextResponse.json(
                {
                    error: `Google API Error: ${data.status}`,
                    details: data.error_message || "No additional details",
                    status: data.status
                },
                { status: 400 }
            );
        }

        const results = data.results;
        const importedCount = 0;
        const importedPlaces = [];

        // 2. Process and Save to Firestore
        for (const place of results) {
            // Basic mapping
            const newPlace = {
                name: place.name,
                description: place.formatted_address, // Use address as desc for now
                category: type || "General",
                halalStatus: "Unknown", // Default
                address: place.formatted_address,
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
                priceRange: place.price_level ? "$".repeat(place.price_level) : "$$",
                rating: place.rating,
                googlePlaceId: place.place_id,
                photos: place.photos ? place.photos.map((p: any) => p.photo_reference) : [],
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                isImported: true,
            };

            // Add to Firestore
            const docRef = await addDoc(collection(db, "places"), newPlace);
            importedPlaces.push({ id: docRef.id, ...newPlace });
        }

        return NextResponse.json({
            success: true,
            count: importedPlaces.length,
            places: importedPlaces,
        });
    } catch (error: any) {
        console.error("Import error:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
