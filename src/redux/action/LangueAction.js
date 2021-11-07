import { useTranslation } from 'react-i18next';
import '../../utils/i18n.js';

export default function changeLanguage(event) {
  const { i18n } = useTranslation();
  return i18n.changeLanguage(event.target.value);
}
