// src/components/profile/ProfileSelector.tsx
import React, { useState } from 'react';
import { ProgressStorage, ProgressData } from '../../utils/progress/storage';

interface ProfileSelectorProps {
  onProfileSelected: (profileId: string) => void;
}

interface ProfileSelectorState {
  profileId: string;
  profileName: string;
}

export const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onProfileSelected }) => {
  const [state, setState] = useState<ProfileSelectorState>({
    profileId: '',
    profileName: ''
  });

  const [profiles, setProfiles] = useState<string[]>([]);

  // Cargar perfiles existentes del localStorage
  const loadProfiles = () => {
    try {
      const data = localStorage.getItem(ProgressStorage.STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        const profileIds = Object.keys(parsed.profiles || {});
        setProfiles(profileIds);
      }
    } catch (error) {
      console.error('Error al cargar perfiles:', error);
    }
  };

  // Manejar selección de perfil existente
  const handleProfileSelect = (profileId: string) => {
    setState(prev => ({
      ...prev,
      profileId
    }));
    onProfileSelected(profileId);
  };

  // Manejar creación de nuevo perfil
  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.profileName.trim()) return;

    const profileId = `profile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newProfile: ProgressData = ProgressStorage.createDefaultProgress(profileId);
    ProgressStorage.saveProfileProgress(profileId, newProfile);

    setProfiles(prev => [...prev, profileId]);
    setState({
      profileId,
      profileName: ''
    });
    onProfileSelected(profileId);
  };

  // Manejar cambio en el campo de nombre
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
      ...prev,
      profileName: e.target.value
    }));
  };

  // Cargar perfiles al montar el componente
  React.useEffect(() => {
    loadProfiles();
  }, []);

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Seleccionar Perfil de Estudiante</h2>
      
      {profiles.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Perfiles Existentes:
          </label>
          <div className="space-y-2">
            {profiles.map(profileId => (
              <div
                key={profileId}
                className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                  state.profileId === profileId
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleProfileSelect(profileId)}
              >
                <div className="flex-1">
                  <p className="font-medium">Perfil {profileId.slice(0, 8)}...</p>
                  <p className="text-sm text-gray-500">
                    Último acceso: {new Date().toLocaleDateString()}
                  </p>
                </div>
                {state.profileId === profileId && (
                  <span className="ml-2 h-3 w-3 bg-blue-500 rounded-full"></span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-3">Crear Nuevo Perfil</h3>
        <form onSubmit={handleCreateProfile} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Estudiante:
            </label>
            <input
              type="text"
              value={state.profileName}
              onChange={handleNameChange}
              placeholder="Ej: William Danilo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={!state.profileName.trim()}
          >
            Crear Perfil y Empezar a Aprender
          </button>
        </form>
      </div>
    </div>
  );
};
