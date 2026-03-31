import { useState, useEffect } from "react";
import { db } from "@/src/services/firebase";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";

export const useProperties = (filterType: string = "All") => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let q = collection(db, "properties");

    const firestoreQuery =
      filterType !== "All" ? query(q, where("type", "==", filterType)) : q;

    const unsubscribe = onSnapshot(firestoreQuery, (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProperties(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [filterType]);

  return { properties, loading };
};
