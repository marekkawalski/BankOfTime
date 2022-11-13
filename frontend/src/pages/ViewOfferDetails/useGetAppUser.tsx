import { useState } from 'react';

import { IAppUser } from '../../models/AppUser';

function useGetAppUser() {
  const [appUser, setAppUser] = useState<IAppUser>();
  return { appUser, setAppUser };
}

export default useGetAppUser;
