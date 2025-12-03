"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { Plus, MapPin, DollarSign } from "lucide-react";

interface Place {
    id: string;
    name: string;
    category: string;
    halalStatus: string;
    address: string;
    priceRange: string;
}

const IMPORT_QUERIES = [
    { label: "Halal Restaurants", query: "Halal restaurants in London", type: "Food & Dining" },
    { label: "Mosques", query: "Mosques in London", type: "Prayer & Faith" },
    { label: "Luxury Hotels", query: "Luxury hotels in London", type: "Hotels & Stays" },
    { label: "Shopping Malls", query: "Shopping malls in London", type: "Shopping" },
];

export default function PlacesPage() {
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState(true);
    const [showImport, setShowImport] = useState(false);
    const [importing, setImporting] = useState(false);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const q = query(collection(db, "places"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const placesData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Place[];
                setPlaces(placesData);
            } catch (error) {
                console.error("Error fetching places: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, []);

    const handleImport = async (query: string, type: string) => {
        setImporting(true);
        try {
            const res = await fetch("/api/import", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query, type }),
            });
            const data = await res.json();
            if (data.success) {
                alert(`Successfully imported ${data.count} places!`);
                setShowImport(false);
                // Refresh list
                window.location.reload();
            } else {
                alert("Import failed: " + data.error);
            }
        } catch (error) {
            console.error("Import error:", error);
            alert("Import failed");
        } finally {
            setImporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Places</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowImport(true)}
                            className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-gray-700 shadow hover:bg-gray-50"
                        >
                            <Plus className="h-4 w-4 rotate-45" />
                            Auto Import
                        </button>
                        <Link
                            href="/places/new"
                            className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
                        >
                            <Plus className="h-4 w-4" />
                            Add Place
                        </Link>
                    </div>
                </div>

                {/* Import Modal */}
                {showImport && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                            <h2 className="mb-4 text-xl font-bold">Auto Import Places</h2>
                            <p className="mb-4 text-sm text-gray-600">
                                Select a category to import from Google Places.
                            </p>
                            <div className="space-y-2">
                                {IMPORT_QUERIES.map((item) => (
                                    <button
                                        key={item.label}
                                        onClick={() => handleImport(item.query, item.type)}
                                        disabled={importing}
                                        className="flex w-full items-center justify-between rounded-md border p-3 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <span>{item.label}</span>
                                        {importing ? (
                                            <span className="text-xs text-gray-400">Importing...</span>
                                        ) : (
                                            <Plus className="h-4 w-4 text-gray-400" />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setShowImport(false)}
                                className="mt-4 w-full rounded-md bg-gray-100 py-2 text-gray-600 hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
                    </div>
                ) : places.length === 0 ? (
                    <div className="flex h-64 flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow">
                        <p className="text-gray-500">No places found.</p>
                        <p className="text-sm text-gray-400">Add your first place to get started.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {places.map((place) => (
                            <div key={place.id} className="overflow-hidden rounded-lg bg-white shadow transition hover:shadow-md">
                                <div className="h-48 bg-gray-200">
                                    {/* Placeholder for image */}
                                    <div className="flex h-full items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                                                {place.category}
                                            </span>
                                            <h3 className="mt-2 text-lg font-bold text-gray-900">{place.name}</h3>
                                        </div>
                                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                            {place.halalStatus}
                                        </span>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <MapPin className="mr-2 h-4 w-4" />
                                            <span className="truncate">{place.address || "No address"}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <DollarSign className="mr-2 h-4 w-4" />
                                            <span>{place.priceRange}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
