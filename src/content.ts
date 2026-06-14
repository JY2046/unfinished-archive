import * as defaults from './content.defaults';
import { notionContent } from './generated/notion-content';

export const brand = notionContent?.brand ?? defaults.brand;
export const features = notionContent?.features ?? defaults.features;
export const selectedFiles = notionContent?.selectedFiles ?? defaults.selectedFiles;
export const signals = notionContent?.signals ?? defaults.signals;
export const audioNotes = notionContent?.audioNotes ?? defaults.audioNotes;
export const capabilities = notionContent?.capabilities ?? defaults.capabilities;
export const roamingNotes = notionContent?.roamingNotes ?? defaults.roamingNotes;
export const socialLinks = notionContent?.socialLinks ?? defaults.socialLinks;
