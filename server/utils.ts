export const isAdmin = (source: number): boolean => {
  return IsPlayerAceAllowed(String(source), 'metropole.admin');
};
