import { getLangNameFromCode } from 'language-name-map';
import { getString } from '../utils/storage';
import { get, navigatorConfig } from '../utils';
import en from '../../translations/en.json';
import fr from '../../translations/fr.json';
// import mn from '../../translations/mn.json';
import I18n from 'react-native-i18n';
import moment from 'moment';
import 'moment/locale/fr';
import { fr as dateFnsFr } from 'date-fns/locale';
import { format } from 'date-fns';

export const translations = {
    en,
    fr,
    // mn,
};

// date-fns locales for languages that have a translation file (English is date-fns' default).
const dateFnsLocales = { fr: dateFnsFr };

export function getDateFnsLocale(locale) {
    return dateFnsLocales[locale];
}

/** date-fns `format` in the current app language (e.g. 'PP HH:mm' → "18 nov. 2026 10:48" in French). */
export function formatDateLocalized(date, pattern) {
    return format(date, pattern, { locale: dateFnsLocales[I18n.locale] });
}

/**
 * Locale prop for react-native-calendar-strip. The strip bundles its own copy of moment without
 * extra locales, so we hand it the full locale definition from our moment. English needs none.
 */
export function getCalendarStripLocale(locale) {
    const data = locale && locale !== 'en' ? moment.localeData(locale) : null;
    return data ? { name: locale, config: data._config } : undefined;
}

/** Human label for an order status, translated when known, otherwise the status itself in title case. */
export function translateStatus(status, fallback) {
    const key = String(status).replace(/[\s-]/g, '_').toLowerCase();
    return I18n.t(`orderStatuses.${key}`, { defaultValue: fallback ?? status });
}

/** Applies a language everywhere it matters: translations, moment (calendar strip) and date-fns callers. */
export function applyLocale(locale) {
    I18n.locale = locale;
    moment.locale(locale);
}

export function getAvailableLocales() {
    const availableLocales = navigatorConfig('availableLocales', ['en']);
    return Object.fromEntries(Object.entries(translations).filter(([locale]) => availableLocales.includes(locale)));
}

export function getLocale() {
    return getString('_locale') ?? navigatorConfig('defaultLocale', 'en');
}

export function getLanguage() {
    const locale = getLocale();
    return { code: locale, ...getLangNameFromCode(locale) };
}

export function translate(key, options) {
    return I18n.t(key, options);
}
