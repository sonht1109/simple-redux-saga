import React, { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
// json
import vi from "assets/languages/vi.json";
import en from "assets/languages/en.json";
import { appSelector } from "./store";

const translatesJson = {
  vi: vi,
  en: en,
};

export type TLang = "vi" | "en";

interface Props {
  children: JSX.Element;
}

export default function LanguageProvider({ children }: Props): ReactElement {
  const { lang } = useSelector(appSelector);

  return (
    <IntlProvider
      locale={lang}
      messages={lang === "vi" ? translatesJson["vi"] : translatesJson["en"]}
      defaultLocale={"vi"}
    >
      {children}
    </IntlProvider>
  );
}

export { translatesJson };
