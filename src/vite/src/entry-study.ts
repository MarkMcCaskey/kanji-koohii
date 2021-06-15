/**
 * This bundle is used on all pages, except landing (home) & flashcard review.
 */

// stylesheets
import "@css/main.build.scss";
import "@css/study-base.build.scss";

import rootBundleInit from "@app/root-bundle";
rootBundleInit();

// components instanced by external code
import LeitnerChartJs from "@/vue/LeitnerChart";
window.Koohii.Refs.LeitnerChart = LeitnerChartJs;

import { domContentLoaded } from "@lib/dom";
import StudyPage from "@app/study-page";

domContentLoaded(() => {
  console.log("@entry study ...");

  StudyPage.initialize({
    URL_SEARCH: window.KK_STUDY_KANJI_URL
  });
});