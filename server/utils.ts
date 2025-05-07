export const isAdmin = (source: number): boolean => {
    return GetPlayerName(source) === 'admin';
  };
  