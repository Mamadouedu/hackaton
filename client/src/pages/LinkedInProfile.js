import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

const LinkedInProfile = () => {
  const navigate = useNavigate();
  const { completeLinkedInProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    headline: '',
    location: '',
    industry: '',
    bio: '',
    skills: '',
    education: [],
    certifications: [],
    languages: [],
    password: '',
    confirmPassword: ''
  });
  
  const [passwordError, setPasswordError] = useState('');
  
  // Fonction pour simuler la récupération des données LinkedIn
  const fetchLinkedInData = async () => {
    // Dans un environnement réel, vous feriez un appel à l'API LinkedIn
    const mockLinkedInData = {
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@example.com',
      headline: 'Développeur Full Stack',
      location: 'Paris, France',
      industry: 'Informatique et Technologies',
      bio: 'Passionné de développement web avec 5 ans d\'expérience dans la création d\'applications web innovantes.',
      skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 'Docker', 'AWS'],
      education: [
        {
          school: 'Université Paris Tech',
          degree: 'Master en Développement Web',
          startDate: '2017-09',
          endDate: '2019-07'
        },
        {
          school: 'Université de Bordeaux',
          degree: 'Licence Informatique',
          startDate: '2014-09',
          endDate: '2017-06'
        }
      ],
      certifications: [
        {
          name: 'Certified AWS Developer',
          issuer: 'Amazon Web Services',
          dateEarned: '2022-03'
        },
        {
          name: 'React Advanced Developer',
          issuer: 'React Certification Board',
          dateEarned: '2021-11'
        }
      ],
      languages: [
        { language: 'Français', proficiency: 'Langue maternelle' },
        { language: 'Anglais', proficiency: 'Courant' },
        { language: 'Espagnol', proficiency: 'Intermédiaire' }
      ]
    };
    
    return mockLinkedInData;
  };
  
  useEffect(() => {
    const loadLinkedInData = async () => {
      try {
        // Récupérer les données LinkedIn
        const linkedInData = await fetchLinkedInData();
        
        // Mettre à jour le formulaire avec les données LinkedIn
        setFormData(prevData => ({
          ...prevData,
          firstName: linkedInData.firstName,
          lastName: linkedInData.lastName,
          email: linkedInData.email,
          headline: linkedInData.headline,
          location: linkedInData.location,
          industry: linkedInData.industry,
          bio: linkedInData.bio,
          skills: linkedInData.skills.join(', '),
          education: linkedInData.education,
          certifications: linkedInData.certifications,
          languages: linkedInData.languages
        }));
      } catch (error) {
        console.error('Erreur lors du chargement des données LinkedIn:', error);
      }
    };
    
    loadLinkedInData();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Réinitialiser l'erreur de mot de passe
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };
  
  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas');
      return false;
    }
    
    if (formData.password.length < 8) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }
    
    setPasswordError('');
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePasswords()) {
      return;
    }
    
    try {
      // Compléter le profil avec les données
      await completeLinkedInProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        headline: formData.headline,
        location: formData.location,
        industry: formData.industry,
        bio: formData.bio,
        skills: formData.skills.split(',').map(skill => skill.trim()),
        education: formData.education,
        certifications: formData.certifications,
        languages: formData.languages
      });
      
      // Rediriger vers le tableau de bord candidat
      navigate('/candidate-dashboard');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="linkedin-profile-container">
        <div className="linkedin-profile-card">
          <h2>Compléter votre profil LinkedIn</h2>
          <p className="linkedin-profile-intro">
            Vos informations ont été importées depuis LinkedIn. Veuillez vérifier et compléter votre profil.
          </p>
          
          <form onSubmit={handleSubmit}>
            {/* Informations principales */}
            <div className="form-row">
              <div className="form-group">
                <label>Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Titre professionnel</label>
                <input
                  type="text"
                  name="headline"
                  value={formData.headline}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Localisation</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            {/* Autres sections comme précédemment */}
            {/* Biographie, compétences, formations, certifications, etc. */}
            
            <div className="form-row">
              <div className="form-group">
                <label>Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Créez un mot de passe"
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirmer le mot de passe</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmez votre mot de passe"
                  required
                />
              </div>
            </div>
            
            {passwordError && (
              <div className="password-error">
                {passwordError}
              </div>
            )}
            
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={() => navigate('/candidate-dashboard')}
              >
                Annuler
              </button>
              <button type="submit" className="create-profile-btn">
                Finaliser mon profil
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LinkedInProfile;