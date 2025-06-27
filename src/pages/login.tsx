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

// 6856cb94b74adf891e303151