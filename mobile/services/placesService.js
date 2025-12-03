import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const getTrendingPlaces = async () => {
    try {
        const q = query(collection(db, 'places'), orderBy('createdAt', 'desc'), limit(5));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error fetching trending places:", error);
        return [];
    }
};

export const getPlacesByCategory = async (category) => {
    // TODO: Implement category filtering
    return [];
};
