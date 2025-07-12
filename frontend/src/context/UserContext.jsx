import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  // Simulate a logged-in user (replace with real auth logic)
  const [user, setUser] = useState({
    name: 'Demo User',
    email: 'demo@rewear.com',
    points: 100,
    listings: [], // { title, ... }
    purchases: [] // { title, ... }
  });

  const addListing = (item) => {
    setUser((prev) => ({ ...prev, listings: [item, ...prev.listings] }));
  };

  const addPurchase = (item) => {
    setUser((prev) => ({ ...prev, purchases: [item, ...prev.purchases] }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, addListing, addPurchase }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
