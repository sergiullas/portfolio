// src/context/HeaderNameContext.jsx
// Context for controlling whether the Header should show the name chip.

import * as React from "react";

const HeaderNameVisibilityContext = React.createContext({
  showName: true,
  // noop default; real function provided by the provider
  setShowName: () => {},
});

export function HeaderNameVisibilityProvider({ children }) {
  const [showName, setShowName] = React.useState(true);

  const value = React.useMemo(
    () => ({ showName, setShowName }),
    [showName]
  );

  return (
    <HeaderNameVisibilityContext.Provider value={value}>
      {children}
    </HeaderNameVisibilityContext.Provider>
  );
}

export function useHeaderNameVisibility() {
  return React.useContext(HeaderNameVisibilityContext);
}
