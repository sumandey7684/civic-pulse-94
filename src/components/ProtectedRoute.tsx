// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: JSX.Element;
  requiredRole?: "admin" | "citizen";
}) {
  const { user, loading } = useAuth();
  const [roleOk, setRoleOk] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    const checkRole = async () => {
      if (!user) {
        setRoleOk(false);
        return;
      }
      if (!requiredRole) {
        setRoleOk(true);
        return;
      }
      const snap = await getDoc(doc(db, "users", user.uid));
      const role = snap.exists() ? (snap.data() as any).role : null;
      if (mounted) setRoleOk(role === requiredRole);
    };
    checkRole();
    return () => {
      mounted = false;
    };
  }, [user, requiredRole]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (requiredRole && roleOk === false)
    return <Navigate to="/not-authorized" />;
  if (requiredRole && roleOk === null)
    return <div>Checking permissions...</div>;
  return children;
}
