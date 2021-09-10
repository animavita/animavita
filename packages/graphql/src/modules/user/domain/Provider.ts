namespace Provider {
  export type Origin = 'facebook' | 'google' | 'apple';

  type Provider = {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
    origin: Origin;
    lastLogIn: number;
  };

  export const create = ({id, email, name, profileImage, origin, lastLogIn}: Provider): Provider => ({
    id,
    name,
    email,
    profileImage,
    origin,
    lastLogIn,
  });

  export type Type = Provider;
}

export default Provider;
