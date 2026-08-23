import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { api } from '../utils/api';
import { CmsContext, defaultServices, defaultTheme, type CmsService, type CmsTheme } from './cms-context';
import { defaultPackages, type CmsPackage } from '../data/packages';

export function CmsProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<CmsService[]>(defaultServices);
  const [packages, setPackages] = useState<CmsPackage[]>(defaultPackages);
  const [theme, setTheme] = useState<CmsTheme>(defaultTheme);

  useEffect(() => {
    Promise.all([
      api.get('/api/public/services'),
      api.get('/api/public/packages'),
      api.get('/api/public/theme'),
    ]).then(([serviceData, packageData, themeData]) => {
      if (Array.isArray(serviceData)) setServices(serviceData);
      if (Array.isArray(packageData)) setPackages(packageData);
      if (themeData && typeof themeData === 'object') {
        setTheme((current) => ({ ...current, ...themeData }));
      }
    }).catch(() => undefined);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--cms-primary', theme.primary_color);
    root.style.setProperty('--cms-secondary', theme.secondary_color);
    root.style.setProperty('--cms-accent', theme.accent_color);
    root.style.setProperty('--cms-heading-font', theme.heading_font);
    root.style.setProperty('--cms-body-font', theme.body_font);
    document.body.style.backgroundColor = theme.bg_color;
    document.body.style.color = theme.text_color;
    document.body.style.fontFamily = theme.body_font;
  }, [theme]);

  const value = useMemo(() => ({ services, packages, theme }), [services, packages, theme]);
  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}
