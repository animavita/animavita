import { useAuth } from '../use-auth-provider';

const getInitials = (firstName: string, lastName?: string) => {
  const firstNameInitial = firstName[0];
  const lastNameInitial = lastName?.[0] || '';

  return `${firstNameInitial}${lastNameInitial}`;
};

const useProfile = () => {
  const auth = useAuth();

  if (!auth.user) return {};

  const fullname = auth.user.name;
  const names = fullname.split(' ');
  const firstName = names?.[0].trim();
  const lastName = names?.slice(-1)[0].trim();
  const initials = getInitials(firstName, lastName);

  return {
    fullname,
    firstName,
    lastName,
    initials,
  };
};

export default useProfile;
