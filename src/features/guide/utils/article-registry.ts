import 'server-only';

import buildArticle from './define';
import gettingStartedEn from '../content/01-getting-started.en.md';
import gettingStartedKo from '../content/01-getting-started.ko.md';
import creatingAnEventEn from '../content/02-creating-an-event.en.md';
import creatingAnEventKo from '../content/02-creating-an-event.ko.md';
import addingAvailabilityEn from '../content/03-adding-availability.en.md';
import addingAvailabilityKo from '../content/03-adding-availability.ko.md';
import viewingResultsEn from '../content/04-viewing-results.en.md';
import viewingResultsKo from '../content/04-viewing-results.ko.md';
import sharingAndConfirmingEn from '../content/05-sharing-and-confirming.en.md';
import sharingAndConfirmingKo from '../content/05-sharing-and-confirming.ko.md';
import recurringScheduleEn from '../content/06-recurring-schedule.en.md';
import recurringScheduleKo from '../content/06-recurring-schedule.ko.md';
import everytimeImportEn from '../content/07-everytime-import.en.md';
import everytimeImportKo from '../content/07-everytime-import.ko.md';
import loadingMyScheduleEn from '../content/08-loading-my-schedule.en.md';
import loadingMyScheduleKo from '../content/08-loading-my-schedule.ko.md';
import { GuideArticle } from '../types';

export const articles: GuideArticle[] = [
  buildArticle({
    slug: 'getting-started',
    section: 'tutorial',
    order: 1,
    ko: gettingStartedKo,
    en: gettingStartedEn,
  }),
  buildArticle({
    slug: 'creating-an-event',
    section: 'tutorial',
    order: 2,
    ko: creatingAnEventKo,
    en: creatingAnEventEn,
  }),
  buildArticle({
    slug: 'adding-availability',
    section: 'tutorial',
    order: 3,
    ko: addingAvailabilityKo,
    en: addingAvailabilityEn,
  }),
  buildArticle({
    slug: 'viewing-results',
    section: 'tutorial',
    order: 4,
    ko: viewingResultsKo,
    en: viewingResultsEn,
  }),
  buildArticle({
    slug: 'sharing-and-confirming',
    section: 'tutorial',
    order: 5,
    ko: sharingAndConfirmingKo,
    en: sharingAndConfirmingEn,
  }),
  buildArticle({
    slug: 'recurring-schedule',
    section: 'my-schedule',
    order: 1,
    ko: recurringScheduleKo,
    en: recurringScheduleEn,
  }),
  buildArticle({
    slug: 'everytime-import',
    section: 'my-schedule',
    order: 2,
    ko: everytimeImportKo,
    en: everytimeImportEn,
  }),
  buildArticle({
    slug: 'loading-my-schedule',
    section: 'my-schedule',
    order: 3,
    ko: loadingMyScheduleKo,
    en: loadingMyScheduleEn,
  }),
];
