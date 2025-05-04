import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simuler une base de données d'utilisateurs
  const [mockUsers, setMockUsers] = useState({
    'candidate@example.com': {
      email: 'candidate@example.com',
      password: 'password123',
      type: 'candidate',
      profile: {
        firstName: 'Jean',
        lastName: 'Dupont',
        completedProfile: false
      }
    },
    'recruiter@example.com': {
      email: 'recruiter@example.com',
      password: 'password123',
      type: 'recruiter',
      profile: {
        companyName: 'TechCorp',
        fullName: 'Martin Dupont'
      }
    }
  });

  useEffect(() => {
    // Vérifier si un utilisateur est déjà connecté dans le localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setUserType(user.type);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulation de la connexion
    const user = mockUsers[email];
    
    if (user && user.password === password) {
      setCurrentUser(user);
      setUserType(user.type);
      
      // Stocker l'utilisateur dans le localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      return { type: user.type };
    } else {
      throw new Error('Identifiants incorrects');
    }
  };

  const signupCandidate = async (candidateData) => {
    // Simulation de l'inscription candidat
    const newUser = {
      email: candidateData.email,
      password: candidateData.password,
      type: 'candidate',
      profile: {
        firstName: candidateData.firstName,
        lastName: candidateData.lastName,
        completedProfile: false
      }
    };
    
    // Simuler l'ajout à la base de données
    setMockUsers(prev => ({
      ...prev,
      [newUser.email]: newUser
    }));
    
    // Stocker l'utilisateur 
    setCurrentUser(newUser);
    setUserType('candidate');
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return newUser;
  };

  const signupRecruiter = async (recruiterData) => {
    // Simulation de l'inscription recruteur
    const newUser = {
      email: recruiterData.email,
      password: recruiterData.password,
      type: 'recruiter',
      profile: {
        companyName: recruiterData.companyName,
        fullName: recruiterData.fullName,
        sector: recruiterData.sector,
        companySize: recruiterData.companySize
      }
    };
    
    // Simuler l'ajout à la base de données
    setMockUsers(prev => ({
      ...prev,
      [newUser.email]: newUser
    }));
    
    // Stocker l'utilisateur 
    setCurrentUser(newUser);
    setUserType('recruiter');
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return newUser;
  };

  const completeLinkedInProfile = async (profileData) => {
    // Mettre à jour le profil utilisateur
    const updatedUser = {
      ...currentUser,
      profile: {
        ...currentUser.profile,
        ...profileData,
        completedProfile: true
      }
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Mettre à jour dans la "base de données"
    setMockUsers(prev => ({
      ...prev,
      [updatedUser.email]: updatedUser
    }));
    
    return updatedUser;
  };
  
  const completeProfile = async (profileData) => {
    // Similaire à la fonction précédente, mais pour d'autres méthodes de complétion de profil
    const updatedUser = {
      ...currentUser,
      profile: {
        ...currentUser.profile,
        ...profileData
      }
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Mettre à jour dans la "base de données"
    setMockUsers(prev => ({
      ...prev,
      [updatedUser.email]: updatedUser
    }));
    
    return updatedUser;
  };

  const logout = () => {
    setCurrentUser(null);
    setUserType(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    userType,
    loading,
    login,
    logout,
    signupCandidate,
    signupRecruiter,
    completeLinkedInProfile,
    completeProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}