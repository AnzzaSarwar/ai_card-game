import { CONFIG } from 'src/config-global';

import { LoginView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Login in - ${CONFIG.appName}`}</title>

      <LoginView />
    </>
  );
}
