/**
 * Declare global interface between legacy js & Vue/Ts build.
 *
 *   Vue               ... exposed as window.Vue
 *   VueInstance       ... exposed as window.VueInstance
 *   Koohii            ... exposed as window.Koohii
 *
 *   Koohii
 *   . API             ... expose axios based API for review & study bundles
 *   . Dom             ... expose DOM utilities
 *   . Util
 *   . . Lang
 *
 */

import Vue, {
  DefineComponent,
  ComponentPublicInstance,
  VueConstructor,
} from "vue";
import { KoohiiAPI } from "@lib/core/api";
import Lang from "@lib/lang";
import Dom from "@lib/dom";
import { Inst as TronFactory } from "@lib/tron";
import VueInstance, { VueInstanceFn } from "@lib/helpers/vue-instance";

/**
 * Vue misc.
 */
declare global {
  // generic component definition (as from an .vue import)
  export type TVueDefine = DefineComponent<{}, {}, any>;

  // typing of props passed to createApps(root, props)
  export type TVuePropsData = Record<string, unknown>;

  // a generic Vue component instance
  export type TVueInstance = ComponentPublicInstance;

  // extract component instance (component T's custom properties, methods, etc)
  export type TVueInstanceOf<T> = T extends new () => infer I ? I : never;
}

declare global {
  export interface KoohiiGlobals {
    API?: KoohiiAPI;

    // DomJS provides simple DOM utilities to the old frontend code
    Dom: typeof Dom;

    // misc. references shared between backend/frontend,
    //  also Vue components from Vite build, instanced from php templates
    Refs: {
      [key: string]: any;
    };

    // references to Vue components that can be instanced later
    UX: { [componentName: string]: any };
  }

  interface Window {
    // base URL for API requests (cf. layout.php & koohii_base_url() helper)
    KK_BASE_URL: string;

    // _SideColumn.php
    KK_STUDY_KANJI_URL: string;

    KK_EDITSTORY_PROPS: Dictionary;

    // 4th/5th edition keywords and kanji, import cf. _SideColumn.php
    //   web/revtk/study/keywords-rtk-0.js
    //   web/revtk/study/keywords-rtk-1.js
    kklist: string;
    kwlist: string[];

    Koohii: KoohiiGlobals;
  }

  /**
   * @see web/revtk/kanji-flashcardreview.juicy.js
   */
  export interface AppKanjiReview {
    oReview: any;
    toggleDictDialog: () => void;
  }
}
