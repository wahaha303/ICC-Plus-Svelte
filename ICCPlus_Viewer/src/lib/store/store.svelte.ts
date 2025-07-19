import { get, readable, writable } from 'svelte/store';
import type { App, RowDesignGroup, ObjectDesignGroup, Group, Row, Choice, PointType, GlobalRequirement, Word, Variable, Requireds, Score, ActivatedMap, ChoiceMap, BgmPlayer, SaveSlot, Discount, TempScore, DlgVariables, SnackBarVariables, Addon, ViewerSetting } from './types';
import { SvelteMap, SvelteSet } from 'svelte/reactivity';
import { z } from 'zod';
import canvasSize from '$lib/utils/canvas-size.esm.min.js';
import { toBlob } from 'html-to-image';

export const appVersion = '2.1.7';
export const filterStyling = {
    selFilterBlurIsOn: false,
    selFilterBlur: 0,
    selFilterBrightIsOn: false,
    selFilterBright: 100,
    selFilterContIsOn: false,
    selFilterCont: 100,
    selFilterGrayIsOn: false,
    selFilterGray: 0,
    selFilterHueIsOn: false,
    selFilterHue: 0,
    selFilterInvertIsOn: false,
    selFilterInvert: 0,
    selFilterOpacIsOn: false,
    selFilterOpac: 100,
    selFilterSaturIsOn: false,
    selFilterSatur: 1,
    selFilterSepiaIsOn: false,
    selFilterSepia: 0,
    selBgColorIsOn: true,
    selOverlayOnImage: false,
    selFilterBgColor: '#70FF7EFF',
    selBorderColorIsOn: false,
    selFilterBorderColor: '#000000FF',
    selCTitleColorIsOn: false,
    selFilterCTitleColor: '#000000FF',
    selCTextColorIsOn: false,
    selFilterCTextColor: '#000000FF',
    selATitleColorIsOn: false,
    selFilterATitleColor: '#000000FF',
    selATextColorIsOn: false,
    selFilterATextColor: '#000000FF',
    selScoreTextColorIsOn: false,
    selFilterSTextColor: '#000000FF',
    reqFilterBlurIsOn: false,
    reqFilterBlur: 0,
    reqFilterBrightIsOn: false,
    reqFilterBright: 100,
    reqFilterContIsOn: false,
    reqFilterCont: 100,
    reqFilterGrayIsOn: false,
    reqFilterGray: 0,
    reqFilterHueIsOn: false,
    reqFilterHue: 0,
    reqFilterInvertIsOn: false,
    reqFilterInvert: 0,
    reqFilterOpacIsOn: true,
    reqFilterOpac: 50,
    reqFilterSaturIsOn: false,
    reqFilterSatur: 1,
    reqFilterSepiaIsOn: false,
    reqFilterSepia: 0,
    reqBgColorIsOn: false,
    reqOverlayOnImage: false,
    reqFilterBgColor: '#FFFFFFFF',
    reqBorderColorIsOn: false,
    reqFilterBorderColor: '#000000FF',
    reqCTitleColorIsOn: false,
    reqFilterCTitleColor: '#000000FF',
    reqCTextColorIsOn: false,
    reqFilterCTextColor: '#000000FF',
    reqATitleColorIsOn: false,
    reqFilterATitleColor: '#000000FF',
    reqATextColorIsOn: false,
    reqFilterATextColor: '#000000FF',
    reqScoreTextColorIsOn: false,
    reqFilterSTextColor: '#000000FF',
    reqFilterVisibleIsOn: false,
    unselFilterBlurIsOn: false,
    unselFilterBlur: 0,
    unselFilterBrightIsOn: false,
    unselFilterBright: 100,
    unselFilterContIsOn: false,
    unselFilterCont: 100,
    unselFilterGrayIsOn: false,
    unselFilterGray: 0,
    unselFilterHueIsOn: false,
    unselFilterHue: 0,
    unselFilterInvertIsOn: false,
    unselFilterInvert: 0,
    unselFilterOpacIsOn: false,
    unselFilterOpac: 100,
    unselFilterSaturIsOn: false,
    unselFilterSatur: 1,
    unselFilterSepiaIsOn: false,
    unselFilterSepia: 0
};
export const textStyling = {
    customRowTitle: false,
    rowTitle: 'Times New Roman',
    customRowText: false,
    rowText: 'Times New Roman',
    customObjectTitle: false,
    objectTitle: 'Times New Roman',
    customObjectText: false,
    objectText: 'Times New Roman',
    customAddonTitle: false,
    addonTitle: 'Times New Roman',
    customAddonText: false,
    addonText: 'Times New Roman',
    customScoreText: false,
    scoreText: 'Times New Roman',
    rowTitleTextSize: 200,
    rowTextTextSize: 100,
    objectTitleTextSize: 200,
    objectTextTextSize: 100,
    addonTitleTextSize: 200,
    addonTextTextSize: 100,
    scoreTextSize: 75,
    rowTitleColor: '#000000',
    rowTextColor: '#000000',
    objectTitleColor: '#000000',
    objectTextColor: '#000000',
    addonTitleColor: '#000000',
    addonTextColor: '#000000',
    scoreTextColor: '#000000',
    rowTitleAlign: 'center',
    rowTextAlign: 'center',
    objectTitleAlign: 'center',
    objectTextAlign: 'center',
    addonTitleAlign: 'center',
    addonTextAlign: 'center',
    scoreTextAlign: 'center'
};
export const objectImageStyling = {
    objectImgBorderStyle: 'solid',
    objectImgBorderWidth: 2,
    objectImageWidth: 100,
    objectImageMarginTop: 0,
    objectImageMarginBottom: 0,
    objectImgBorderRadiusTopLeft: 0,
    objectImgBorderRadiusTopRight: 0,
    objectImgBorderRadiusBottomRight: 0,
    objectImgBorderRadiusBottomLeft: 0,
    objectImgBorderRadiusIsPixels: true,
    objectImgBorderIsOn: false,
    objectImgOverflowIsOn: false,
    objectImgBorderColor: 'red',
    objectImgObjectFillStyle: '',
    objectImgObjectFillIsOn: false,
    objectImageBoxWidth: 50
};
export const rowImageStyling = {
    rowImgBorderStyle: 'solid',
    rowImgBorderWidth: 2,
    rowImageWidth: 100,
    rowImageMarginTop: 0,
    rowImageMarginBottom: 0,
    rowImgBorderRadiusTopLeft: 0,
    rowImgBorderRadiusTopRight: 0,
    rowImgBorderRadiusBottomRight: 0,
    rowImgBorderRadiusBottomLeft: 0,
    rowImgBorderRadiusIsPixels: true,
    rowImgBorderIsOn: false,
    rowImgOverflowIsOn: false,
    rowImgBorderColor: 'red',
    rowImageBoxWidth: 50
};
export const addonImageStyling = {
    useAddonImage: false,
    addonImgBorderStyle: 'solid',
    addonImgBorderWidth: 2,
    addonImageWidth: 100,
    addonImageMarginTop: 0,
    addonImageMarginBottom: 0,
    addonImgBorderRadiusTopLeft: 0,
    addonImgBorderRadiusTopRight: 0,
    addonImgBorderRadiusBottomRight: 0,
    addonImgBorderRadiusBottomLeft: 0,
    addonImgBorderRadiusIsPixels: true,
    addonImgBorderIsOn: false,
    addonImgOverflowIsOn: false,
    addonImgBorderColor: 'red',
    addonImgObjectFillStyle: '',
    addonImgObjectFillIsOn: false,
    addonImageBoxWidth: 50
};
export const backgroundStyling = {
    bgColorIsOn: false,
    backgroundColor: '#FFFFFFFF',
    rowBgColorIsOn: false,
    rowBgColor: '#FFFFFFFF',
    objectBgColorIsOn: false,
    objectBgColor: '#FFFFFFFF',
    isBackgroundRepeat: false,
    isBackgroundFitIn: false,
    backgroundImage: '',
    isRowBackgroundRepeat: false,
    isRowBackgroundFitIn: false,
    rowBackgroundImage: '',
    isObjectBackgroundRepeat: false,
    isObjectBackgroundFitIn: false,
    objectBackgroundImage: ''
};
export const objectStyling = {
    objectHeight: true,
    objectDesignIsAdvanced: false,
    objectMargin: 10,
    objectTextPadding: 10,
    objectBorderStyle: 'solid',
    objectBorderWidth: 2,
    objectBorderIsOn: false,
    objectDropShadowH: 0,
    objectDropShadowV: 0,
    objectDropShadowBlur: 0,
    objectDropShadowSpread: 0,
    objectDropShadowIsOn: false,
    objectUseBoxShadowIsOn: false,
    objectBorderRadiusTopLeft: 0,
    objectBorderRadiusTopRight: 0,
    objectBorderRadiusBottomRight: 0,
    objectBorderRadiusBottomLeft: 0,
    objectBorderRadiusIsPixels: true,
    objectOverflowIsOn: true,
    objectDropShadowColor: 'grey',
    objectGradientIsOn: false,
    objectGradient: '',
    objectGradientOnSelect: '',
    objectGradientOnReq: '',
    objectBorderColor: 'red',
    objectBorderImage: '',
    objectBorderImageRepeat: 'stretch',
    objectBorderImageWidth: 5,
    objectBorderImageSliceTop: 5,
    objectBorderImageSliceBottom: 5,
    objectBorderImageSliceLeft: 5,
    objectBorderImageSliceRight: 5,
    removeSpaceAddonIsOn: false,
    titlePaddingIsOn: false
};
export const rowStyling = {
    rowDesignIsAdvanced: false,
    rowMargin: 10,
    rowBodyMarginSides: 1,
    rowBodyMarginTop: 25,
    rowBodyMarginBottom: 25,
    rowTextPaddingY: 5,
    rowTextPaddingX: 10,
    rowOverflowIsOn: true,
    rowDropShadowH: 0,
    rowDropShadowV: 0,
    rowDropShadowBlur: 0,
    rowDropShadowSpread: 0,
    rowDropShadowColor: 'grey',
    rowButtonXPadding: 0,
    rowButtonYPadding: 0,
    rowDropShadowIsOn: false,
    rowUseBoxShadowIsOn: false,
    rowBorderRadiusTopLeft: 0,
    rowBorderRadiusTopRight: 0,
    rowBorderRadiusBottomRight: 0,
    rowBorderRadiusBottomLeft: 0,
    rowBorderRadiusIsPixels: true,
    rowBorderStyle: 'solid',
    rowBorderWidth: 2,
    rowBorderIsOn: false,
    rowBorderColor: 'red',
    rowGradientIsOn: false,
    rowGradient: '',
    rowBorderImage: '',
    rowBorderImageRepeat: 'stretch',
    rowBorderImageWidth: 5,
    rowBorderImageSliceTop: 5,
    rowBorderImageSliceBottom: 5,
    rowBorderImageSliceLeft: 5,
    rowBorderImageSliceRight: 5
};
export const addonStyling = {
    useAddonDesign: false,
    addonDesignIsAdvanced: false,
    addonMargin: 10,
    addonTextPadding: 10,
    addonBorderStyle: 'solid',
    addonBorderWidth: 2,
    addonBorderIsOn: false,
    addonDropShadowH: 0,
    addonDropShadowV: 0,
    addonDropShadowBlur: 0,
    addonDropShadowSpread: 0,
    addonDropShadowIsOn: false,
    addonUseBoxShadowIsOn: false,
    addonBorderRadiusTopLeft: 0,
    addonBorderRadiusTopRight: 0,
    addonBorderRadiusBottomRight: 0,
    addonBorderRadiusBottomLeft: 0,
    addonBorderRadiusIsPixels: true,
    addonOverflowIsOn: true,
    addonDropShadowColor: 'grey',
    addonGradientIsOn: false,
    addonGradient: '',
    addonGradientOnSelect: '',
    addonGradientOnReq: '',
    addonBorderColor: 'red',
    addonBorderImage: '',
    addonBorderImageRepeat: 'stretch',
    addonBorderImageWidth: 5,
    addonBorderImageSliceTop: 5,
    addonBorderImageSliceBottom: 5,
    addonBorderImageSliceLeft: 5,
    addonBorderImageSliceRight: 5,
    useAddonBackgroundImage: false,
    addonBackgroundImage: '',
    isAddonBackgroundFitIn: false,
    isAddonBackgroundRepeat: false,
    addonBgColorIsOn: false,
    addonBgColor: '#FFFFFFFF',
    addonTitlePaddingIsOn: false
};
export const multiChoiceStyling = {
    customMultiTextFont: false,
    multiChoiceCounterPosition: 0,
    multiChoiceCounterSize: 170,
    multiChoiceTextFont: 'Times New Roman',
    multiChoiceTextSize: 100
};
export const pointBarStyling = {
    barTextPadding: 17,
    barTextMargin: 0,
    customBarTextFont: false,
    barTextFont: 'Times New Roman',
    barPadding: 0,
    barMargin: 0,
    barTextSize: 15,
    barTextColor: '#000000',
    barPointPos: '#FF0000FF',
    barPointNeg: '#FF0000FF',
    barIconColor: '#0000008A',
    barBackgroundColor: '#FFFFFFFF'
};
export const backpackStyling = {
    useBackpackDesign: false,
    backpackBgColor: '#FFFFFF',
    isBackpackBgRepeat: false,
    isBackpackBgFitIn: false,
    backpackBgImage: '',
    backPackWidth: 1200
};
/*! Delete and replace this part with your project if you're pasting it in, leave it here if you have placed your project.json file under index.html. */
export const app = $state<App>({
    version: appVersion,
    isEditModeOnAll: true,
    isStyleOpen: false,
    isPointsOpen: false,
    isChoicesOpen: false,
    isDesignOpen: false,
    isFadingOut: false,
    isPointerCursor: false,
    importedChoicesIsOpen: true,
    curBgmTime: 0,
    curBgmLength: 0,
    curVolume: 100,
    isSeeking: false,
    isMute: false,
    lastFadeTime: 0,
    showMusicPlayer: false,
    fadeTransitionColor: '#000000FF',
    fadeTransitionTime: 0.25,
    fadeTransitionIsOn: false,
    hideBackpackBtn: 0,
    btnBackpackIsOn: 0,
    showAllAddons: 0,
    tmpRequired: [],
    rowIdLength: 4,
    objectIdLength: 4,
    words: [],
    wordChangeComplete: false,
    groups: [],
    rowDesignGroups: [],
    objectDesignGroups: [],
    objectsPerRow: 'col-6',
    globalRequirements: [],
    googleFonts: [],
    customFonts: [],
    compressImageAuto: false,
    hideScoresUpdated: false,
    hideChoiceDT: false,
    hideImages: false,
    preloadImages: false,
    preloadExternalImages: false,
    useVW: false,
    addPrefix: true,
    activated: [],
    rows: [],
    pointTypes: [],
    variables: [],
    mdObjects: [],
    printThis: false,
    autoSaveIsOn: false,
    autoSaveInterval: 10,
    buildAutoSaveIsOn: false,
    buildAutoSaveInterval: 10,
    tooltipDelay: 1000,
    checkDeleteRow: true,
    checkDeleteObject: false,
    defaultRowTitle: 'Row',
    defaultRowText: 'This is a row, and inside of it, you can place choices. On both rows and choices Requirements can be placed, which will block a row from being viewed, or make the player unable to select a choice, depending on either Point-types or the Ids of other choices. Point-types can be made in Features then Manage Points. Hovering over buttons will explain what they do. The Design of the project can be changed in \'Modify Design\' at the side navigation bar, and private styling for each row can be turned on in the rows Settings. Default text like this can be turned off in Features -> Manage Defaults.',
    defaultChoiceTitle: 'Choice',
    defaultChoiceText: 'This is a Choice, and inside of it, you can place images and text. Scores can be added to it, and have Point-types attached. Addons can be added underneath the image and text. In the Functions at the bottom of the choice, there is an array of different things that can be done. Default text like this can be turned off in Features then Manage Defaults.',
    defaultBeforePoint: 'Cost:',
    defaultAfterPoint: 'points',
    defaultBeforeReq: 'Required:',
    defaultAfterReq: 'choice',
    defaultAddonTitle: 'Addon',
    defaultAddonText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    enableShortcut: true,
    orderOrReqText: '0',
    defaultOrReq: 'of',
    orderSelReqText: '0',
    defaultSelReq: 'choice from',
    backpack: [{
        index: 0,
        id: 'default_backpack_row',
        isBackpack: true,
        title: 'Result',
        debugTitle: '',
        titleText: '',
        objectWidth: 'col-md-3',
        image: '',
        template: 1,
        isButtonRow: false,
        buttonType: true,
        buttonId: '',
        buttonText: 'Click',
        buttonRandom: false,
        buttonRandomNumber: 1,
        isResultRow: true,
        resultGroupId: '',
        isInfoRow: true,
        defaultAspectWidth: 1,
        defaultAspectHeight: 1,
        allowedChoices: 0,
        currentChoices: 0,
        requireds: [],
        isEditModeOn: false,
        isRequirementOpen: false,
        objects: [],
        rowDesignGroups: []
    }],
    styling: {...filterStyling, ...textStyling, ...objectImageStyling, ...rowImageStyling, ...addonImageStyling, ...backgroundStyling, ...objectStyling, ...rowStyling, ...addonStyling, ...multiChoiceStyling, ...pointBarStyling, ...backpackStyling}
});

/*! End */

export const defaultApp: App = {
    version: appVersion,
    isEditModeOnAll: true,
    isStyleOpen: false,
    isPointsOpen: false,
    isChoicesOpen: false,
    isDesignOpen: false,
    isFadingOut: false,
    isPointerCursor: false,
    importedChoicesIsOpen: true,
    curBgmTime: 0,
    curBgmLength: 0,
    curVolume: 100,
    isSeeking: false,
    isMute: false,
    lastFadeTime: 0,
    showMusicPlayer: false,
    fadeTransitionColor: '#000000FF',
    fadeTransitionTime: 0.25,
    fadeTransitionIsOn: false,
    hideBackpackBtn: 0,
    btnBackpackIsOn: 0,
    showAllAddons: 0,
    tmpRequired: [],
    rowIdLength: 4,
    objectIdLength: 4,
    words: [],
    wordChangeComplete: false,
    groups: [],
    rowDesignGroups: [],
    objectDesignGroups: [],
    objectsPerRow: 'col-6',
    globalRequirements: [],
    googleFonts: [],
    customFonts: [],
    compressImageAuto: false,
    hideScoresUpdated: false,
    hideChoiceDT: false,
    hideImages: false,
    preloadImages: false,
    preloadExternalImages: false,
    useVW: false,
    addPrefix: true,
    activated: [],
    rows: [],
    pointTypes: [],
    variables: [],
    mdObjects: [],
    printThis: false,
    autoSaveIsOn: false,
    autoSaveInterval: 10,
    buildAutoSaveIsOn: false,
    buildAutoSaveInterval: 10,
    tooltipDelay: 1000,
    checkDeleteRow: true,
    checkDeleteObject: false,
    defaultRowTitle: 'Row',
    defaultRowText: 'This is a row, and inside of it, you can place choices. On both rows and choices Requirements can be placed, which will block a row from being viewed, or make the player unable to select a choice, depending on either Point-types or the Ids of other choices. Point-types can be made in Features then Manage Points. Hovering over buttons will explain what they do. The Design of the project can be changed in \'Modify Design\' at the side navigation bar, and private styling for each row can be turned on in the rows Settings. Default text like this can be turned off in Features -> Manage Defaults.',
    defaultChoiceTitle: 'Choice',
    defaultChoiceText: 'This is a Choice, and inside of it, you can place images and text. Scores can be added to it, and have Point-types attached. Addons can be added underneath the image and text. In the Functions at the bottom of the choice, there is an array of different things that can be done. Default text like this can be turned off in Features then Manage Defaults.',
    defaultBeforePoint: 'Cost:',
    defaultAfterPoint: 'points',
    defaultBeforeReq: 'Required:',
    defaultAfterReq: 'choice',
    defaultAddonTitle: 'Addon',
    defaultAddonText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    enableShortcut: true,
    orderOrReqText: '0',
    defaultOrReq: 'of',
    orderSelReqText: '0',
    defaultSelReq: 'choice from',
    backpack: [{
        index: 0,
        id: 'default_backpack_row',
        isBackpack: true,
        title: 'Result',
        debugTitle: '',
        titleText: '',
        objectWidth: 'col-md-3',
        image: '',
        template: 1,
        isButtonRow: false,
        buttonType: true,
        buttonId: '',
        buttonText: 'Click',
        buttonRandom: false,
        buttonRandomNumber: 1,
        isResultRow: true,
        resultGroupId: '',
        isInfoRow: true,
        defaultAspectWidth: 1,
        defaultAspectHeight: 1,
        allowedChoices: 0,
        currentChoices: 0,
        requireds: [],
        isEditModeOn: false,
        isRequirementOpen: false,
        objects: [],
        rowDesignGroups: []
    }],
    styling: {...filterStyling, ...textStyling, ...objectImageStyling, ...rowImageStyling, ...addonImageStyling, ...backgroundStyling, ...objectStyling, ...rowStyling, ...addonStyling, ...multiChoiceStyling, ...pointBarStyling, ...backpackStyling}
};
export const objectWidths = [{
    text: 'Row',
    value: ''
}, {
    text: '1 per row',
    value: 'col-12'
}, {
    text: '11/12',
    value: 'col-sm-11'
}, {
    text: '10/12',
    value: 'col-sm-10'
}, {
    text: '9/12',
    value: 'col-sm-9'
}, {
    text: '8/12',
    value: 'col-sm-8'
}, {
    text: '7/12',
    value: 'col-sm-7'
}, {
    text: '2 per row',
    value: 'col-sm-6'
}, {
    text: '5/12',
    value: 'col-sm-5'
}, {
    text: '3 per Row',
    value: 'col-md-4'
}, {
    text: '4 per Row',
    value: 'col-md-3'
}, {
    text: '5 per Row',
    value: 'w-20'
}, {
    text: '6 per Row',
    value: 'col-lg-2'
}, {
    text: '7 per Row ',
    value: 'w-14'
}, {
    text: '8 per Row ',
    value: 'w-12'
}, {
    text: '9 per Row ',
    value: 'w-11'
}, {
    text: '10 per Row',
    value: 'w-10'
}, {
    text: '11 per Row ',
    value: 'w-9'
}, {
    text: '12 per Row',
    value: 'col-xl-1'
}];
export const activatedMap = $state<SvelteMap<string, ActivatedMap>>(new SvelteMap);
export const tmpActivatedMap = $state<SvelteMap<string, ActivatedMap>>(new SvelteMap);
export const pointTypeMap = $state<SvelteMap<string, PointType>>(new SvelteMap());
export const rowMap = $state<SvelteMap<string, Row>>(new SvelteMap());
export const choiceMap = $state<SvelteMap<string, ChoiceMap>>(new SvelteMap());
export const groupMap = $state<SvelteMap<string, Group>>(new SvelteMap());
export const globalReqMap = $state<SvelteMap<string, GlobalRequirement>>(new SvelteMap());
export const wordMap = $state<SvelteMap<string, Word>>(new SvelteMap());
export const variableMap = $state<SvelteMap<string, Variable>>(new SvelteMap());
export const rowDesignMap = $state<SvelteMap<string, RowDesignGroup>>(new SvelteMap());
export const objectDesignMap = $state<SvelteMap<string, ObjectDesignGroup>>(new SvelteMap());
export const scoreSet = $state<SvelteSet<string>>(new SvelteSet());
export const mdObjects = $state<Choice[]>([]);
export const currentTheme = $state({ value: 'light' });
export const sanitizeArg = {
    ALLOWED_TAGS: ['address', 'article', 'aside', 'footer', 'header', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hgroup', 'main', 'nav', 'section', 'blockquote', 'dd', 'div', 'dl', 'dt', 'figcaption', 'figure', 'hr', 'li', 'main', 'ol', 'p', 'pre', 'ul', 'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr', 'caption', 'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'font', 'iframe', 'img'],
    ADD_ATTR: ['href', 'target', 'style']
};
export const bgmPlayer = writable<YT.Player | null>(null);
export const bgmVariables = $state<BgmPlayer>({
    isBgmInit: false,
    bgmIsPlaying: false,
    bgmPlayInterval: 0,
    bgmTitleInterval: 0,
    bgmFadeInterval: 0,
    bgmFadeTimer: 0,
    bgmTitle: 'No Audio Title',
    curBgmTime: 0,
    curBgmLength: 0,
    isSeeking: false,
    lastFadeTime: 0,
    isFadingOut: false,
    bgmObjectId: ''
});
export const dlgVariables = $state<DlgVariables>({
    currentDialog: 'none',
});
export const snackbarVariables = $state<SnackBarVariables>({
    labelText: '',
    timeoutMs: 4000,
    isOpen: false
});
export const viewerSettings = $state<ViewerSetting>({
    allowDeselect: false,
    isSingleFile: false
});
export const buildAutoSaveSlot = $state<SaveSlot>({
   stored: false,
   name: 'Auto Save',
   time: '',
   app: ''
});
export const buildSaveSlots = $state<SaveSlot[]>(Array.from({ length: 99 }, (_, i) => ({
    stored: false,
    name: `Slot ${i + 1}`,
    time: '',
    app: ''
})));
export const oldSaveSlots = $state<SaveSlot[]>(Array.from({ length: 99 }, (_, i) => ({
    stored: false,
    name: `Slot ${i + 1}`,
    time: '',
    app: ''
})));
export const defaultVariables = $state({
    backgroundColor: '',
    backgroundImage: '',
    barBgColor: ''
});
export const externalImages = new Set<string>();
export const hasAvif = { value: false };
export const winWidth = readable(window.innerWidth, (set) => {
    const update = () => set(window.innerWidth);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
});
let dbInstance: IDBDatabase | null = null;
function createCyoaPlusDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('cyoaPlusDB');

        request.onupgradeneeded = (e) => {
            const db = (e.target as IDBOpenDBRequest).result;

            if (!db.objectStoreNames.contains('cyoaStore')) {
                db.createObjectStore('cyoaStore');
            }

            if (!db.objectStoreNames.contains('buildStore')) {
                db.createObjectStore('buildStore');
            }
        };

        request.onsuccess = (e) => {
            const db = (e.target as IDBOpenDBRequest).result;
            resolve(db);
        };

        request.onerror = reject;
    });
}
export function getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        if (dbInstance) {
            return resolve(dbInstance);
        }
    
        const request = indexedDB.open('cyoaDB');
        let isFirst = false;
        let oldCyoaData: any[] = [];
        let oldBuildData: any[] = [];
        let newBuildData: any[] = [];

        request.onupgradeneeded = (e) => {
            const db = (e.target as IDBOpenDBRequest).result;
            
            if (!db.objectStoreNames.contains('buildStore')) {
                db.createObjectStore('buildStore', { keyPath: 'title' });
            }
            isFirst = true;
        }
    
        request.onsuccess = (e) => {
            const db = (e.target as IDBOpenDBRequest).result;
            if (db.version === 1) {
                if (isFirst) {
                    createCyoaPlusDB()
                        .then((newDB) => {
                            dbInstance = newDB;
                            resolve(dbInstance);
                        })
                        .catch(reject)
                        .finally(() => {
                            db.close();
                        });
                } else {
                    if (db.objectStoreNames.contains('buildStore')) {
                        const tx = db.transaction(['buildStore'], 'readonly');
                        const store = tx.objectStore('buildStore');
                        const req = store.getAll();

                        req.onsuccess = () => {
                            const result = req.result;
                            
                            for (let i = 0; i < result.length; i++) {
                                const item = req.result[i];

                                oldSaveSlots[i].stored = true;
                                oldSaveSlots[i].name = item.title;
                                oldSaveSlots[i].time = 'Unknown';
                                oldSaveSlots[i].app = Array.isArray(item.value) ? item.value.join(',') : item.value;
                            }

                            createCyoaPlusDB()
                                .then((newDB) => {
                                    dbInstance = newDB;
                                    resolve(dbInstance);
                                })
                                .catch(reject)
                                .finally(() => {
                                    db.close();
                                });
                        };

                        req.onerror = (e) => {
                            console.error(e);
                            createCyoaPlusDB()
                                .then((newDB) => {
                                    dbInstance = newDB;
                                    resolve(dbInstance);
                                })
                                .catch(reject)
                                .finally(() => {
                                    db.close();
                                });
                        };
                    } else {
                        createCyoaPlusDB()
                            .then((newDB) => {
                                dbInstance = newDB;
                                resolve(dbInstance);
                            })
                            .catch(reject)
                            .finally(() => {
                                db.close();
                            });
                    }
                }
            } else {
                const readPromises = [
                    new Promise<void>((res, rej) => {
                        if (db.objectStoreNames.contains('cyoaStore')) {
                            const cyoaTx = db.transaction('cyoaStore', 'readonly');
                            const cyoaStore = cyoaTx.objectStore('cyoaStore');
                            const req = cyoaStore.openCursor();
                            req.onsuccess = (e) => {
                                const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;

                                if (cursor) {
                                    oldCyoaData.push({key: cursor.key, value: cursor.value});
                                    cursor.continue();
                                } else {
                                    res();
                                }
                            };
                            req.onerror = rej;
                        } else {
                            res();
                        }
                    }),
                    new Promise<void>((res, rej) => {
                        if (db.objectStoreNames.contains('buildStore')) {
                            const buildTx = db.transaction('buildStore', 'readonly');
                            const buildStore = buildTx.objectStore('buildStore');
                            const req = buildStore.openCursor();
                            req.onsuccess = (e) => {
                                const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;

                                if (cursor) {
                                    oldBuildData.push({key: cursor.key, value: cursor.value});
                                    cursor.continue();
                                } else {
                                    res();
                                }
                            };
                            req.onerror = rej;
                        } else {
                            res();
                        }
                    }),
                ];

                Promise.all(readPromises)
                .then(() => {
                    db.close();
                    return new Promise<void>((res, rej) => {
                        const delReq = indexedDB.deleteDatabase('cyoaDB');

                        delReq.onsuccess = () => {
                            const newReq = indexedDB.open('cyoaDB', 1);

                            newReq.onupgradeneeded = (e) => {
                                const newDB = (e.target as IDBOpenDBRequest).result;
                                newDB.createObjectStore('buildStore', { keyPath: 'title' });
                                const newTx = (e.target as IDBOpenDBRequest).transaction;

                                if (newTx) {
                                    const store = newTx.objectStore('buildStore');

                                    let num = 0;
                                    for (let i = 0; i < oldBuildData.length; i++) {
                                        const item = oldBuildData[i];

                                        if (typeof item.value.title !== 'undefined') {
                                            store.put(item.value);
                                            oldSaveSlots[num].stored = true;
                                            oldSaveSlots[num].name = item.title;
                                            oldSaveSlots[num].time = 'Unknown';
                                            oldSaveSlots[num].app = Array.isArray(item.value) ? item.value.join(',') : item.value;
                                            num += 1;
                                        } else {
                                            newBuildData.push(item);
                                        }
                                    }
                                }
                            }

                            newReq.onsuccess = (e) => {
                                const newDB = (e.target as IDBOpenDBRequest).result;
                                newDB.close();
                                res();
                            }

                            newReq.onerror = (e) => {
                                console.error(e, 'L872');
                                rej(e);
                            }
                        }

                        delReq.onerror = (e) => {
                            console.error(e, 'L877');
                            rej(e);
                        }
                    });
                })
                .catch((e) => {
                    console.error(e);
                    db.close();
                })
                .finally(() => {
                    const newReq = indexedDB.open('cyoaPlusDB');
                    
                    newReq.onupgradeneeded = (e) => {
                        const newDB = (e.target as IDBOpenDBRequest).result;

                        if (!newDB.objectStoreNames.contains('cyoaStore') && oldCyoaData.length > 0) {
                            newDB.createObjectStore('cyoaStore');
                        }

                        if (!newDB.objectStoreNames.contains('buildStore')) {
                            newDB.createObjectStore('buildStore');
                        }

                        const newTx = (e.target as IDBOpenDBRequest).transaction;

                        if (newTx) {
                            if (oldCyoaData.length > 0) {
                                const store = newTx.objectStore('cyoaStore');

                                for (let i = 0; i < oldCyoaData.length; i++) {
                                    const item = oldCyoaData[i];

                                    store.put(item.value, item.key);
                                }
                            }

                            if (newBuildData.length > 0) {
                                const store = newTx.objectStore('buildStore');

                                for (let i = 0; i < newBuildData.length; i++) {
                                    const item = newBuildData[i];

                                    store.put(item.value, item.key);
                                }
                            }
                        }
                    };

                    newReq.onsuccess = (e) => {
                        const newDB = (e.target as IDBOpenDBRequest).result;

                        dbInstance = newDB;
                        resolve(dbInstance);
                    };

                    newReq.onerror = (e) => {
                        reject(e);
                    };
                })
            }
        };
    
        request.onerror = (e) => {
            reject(e);
        };
    });
};
export let buildAbortController: AbortController | null = null;
function delay(ms: number, signal?: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => resolve(), ms);

        if (signal) {
            signal.addEventListener('abort', () => {
                clearTimeout(timer);
                reject(new DOMException('Aborted', 'AbortError'));
            });
        }
    });
}
export async function buildAutoSave() {
    const abort = new AbortController();
    buildAbortController = abort;
    const key = `${location.pathname.replace(/\/index\.html$/, '/')}autoSave`;

    while (app.buildAutoSaveIsOn) {
        try {
            await delay(app.buildAutoSaveInterval * 1000 * 60, abort.signal);
        } catch (error) {
            break;
        }
        if (!app.buildAutoSaveIsOn) break;

        const db = await getDB();
        const tx = db.transaction('buildStore', 'readwrite');
        const store = tx.objectStore('buildStore');
        const userLocale = navigator.language;
        const now = new Date();
        const formatter = new Intl.DateTimeFormat(userLocale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const currentTimeString = formatter.format(now);
        const saveSlot: SaveSlot = {
            stored: true,
            name: 'Auto Save',
            time: currentTimeString,
            app: getSelectedObjectId()
        };
        try {
            await new Promise<void>((resolve, reject) => {
                const request = store.put(saveSlot, key);
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
            buildAutoSaveSlot.stored = true;
            buildAutoSaveSlot.time = currentTimeString;
            buildAutoSaveSlot.app = saveSlot.app;
            snackbarVariables.labelText = 'Auto-save completed successfully.';
            snackbarVariables.isOpen = true;
        } catch (error) {
            console.error(error);
        }
    }
}
export async function saveToSlot(slotData: SaveSlot, key: string, index: number, storeKey: string, isBuild?: boolean) {
    const db = await getDB();
    const tx = db.transaction(storeKey, 'readwrite');
    const store = tx.objectStore(storeKey);
    try {
        await new Promise<void>((resolve, reject) => {
            const request = store.put(slotData, key);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
        if (isBuild) {
            buildSaveSlots[index].stored = true;
            buildSaveSlots[index].time = slotData.time;
            buildSaveSlots[index].name = slotData.name;
            buildSaveSlots[index].app = slotData.app;
        }
    } catch (error) {
        console.error(error);
    }
};
export async function deleteSlot(key: string, index: number, storeKey: string, isBuild?: boolean) {
    const db = await getDB();
    const tx = db.transaction(storeKey, 'readwrite');
    const store = tx.objectStore(storeKey);
    try {
        await new Promise<void>((resolve, reject) => {
            const request = store.delete(key);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
        if (isBuild) {
            buildSaveSlots[index].stored = false;
            buildSaveSlots[index].name = `Slot ${index + 1}`;
            buildSaveSlots[index].time = '';
            buildSaveSlots[index].app = '';
        }
    } catch (error) {
        console.error(error);
    }
};
export async function initBuildSaves(): Promise<void> {
    const db = await getDB();

    const tx = db.transaction('buildStore', 'readonly');
    const store = tx.objectStore('buildStore');

    const regex = location.pathname.replace(/\/index\.html$/, '/');

    await new Promise<void>((resolve, reject) => {
        const reqest = store.openCursor();
        
        reqest.onsuccess = (e) => {
            const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
            if (!cursor) {
                resolve();
                return;
            }

            const key = cursor.key;
            const value = cursor.value;

            if (typeof key === 'string') {
                if (key.startsWith(regex)) {
                    const suffix = key.slice(regex.length);

                    if (suffix === 'autoSave') {
                        buildAutoSaveSlot.stored = true;
                        buildAutoSaveSlot.time = value.time;
                        buildAutoSaveSlot.app = value.app;
                    } else {
                        const match = suffix.match(/^slot-(\d+)$/);
                        const index = Number(match?.[1]);
                        buildSaveSlots[index].stored = true;
                        buildSaveSlots[index].name = typeof value.name !== 'undefined' ? value.name : `Slot ${index + 1}`;
                        buildSaveSlots[index].time = value.time;
                        buildSaveSlots[index].app = value.app;
                    }
                }
            }

            cursor.continue();
        };
        reqest.onerror = reject;
    });
};
export function getSelectedObjectId() {
    let result: string[] = [];

    Array.from(activatedMap.entries()).forEach(([id, val]) => {
        let cMap = choiceMap.get(id);

        if (typeof cMap !== 'undefined') {
            const aChoice = cMap.choice;
            let text = id;

            if (val.multiple === 0) {
                if (aChoice.isActivateRandom && aChoice.activatedRandom) {
                    text += `/RND#${aChoice.activatedRandom.join('/AND#').replace(/\/ON#/g, '/RON#')}`;
                }
                
                if (aChoice.textfieldIsOn && aChoice.customTextfieldIsOn && typeof aChoice.wordChangeSelect !== 'undefined') {
                    text += `/WORD#${aChoice.wordChangeSelect.replace(/,/g, '/CHAR#')}`;
                }
                
                if (aChoice.isImageUpload && aChoice.image !== aChoice.defaultImage) {
                    text += `/IMG#${aChoice.image.replace(/,/g, '/CHAR#')}`;
                }

                result.push(text);
            } else {
                text += `/ON#${val.multiple}`;
                
                if (aChoice.isActivateRandom&& aChoice.activatedRandomMul) {
                    text += `/RND#${aChoice.activatedRandomMul.flat(2).join('/AND#').replace(/\/ON#/g, '/RON#')}`;
                }

                result.push(text);
            }
        }
    });

    return result.join(',');
};
export function getTimestamp() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mi = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}_${hh}-${mi}-${ss}`;
};
export function getChoiceTitle(req: Requireds) {
    if (req.customTextIsOn) {
        return typeof req.customText !== 'undefined' ? req.customText : '';
    }

    switch (req.type) {
        case 'id': {
            let id = req.reqId.split('/ON#');
            let cMap = choiceMap.get(id[0]);
            if (typeof cMap !== 'undefined') {
                let thisChoice = cMap.choice;

                return `${req.beforeText} ${id.length > 1 ? `${id[1]} ` : ''} ${thisChoice.title} ${req.afterText}`;
            }
            break;
        }
        case 'point': {
            let thisPoint = pointTypeMap.get(req.reqId);
            if (typeof thisPoint !== 'undefined') {
                
                return `${req.beforeText} ${req.reqPoints} ${thisPoint.name} ${req.afterText}`;
            }
            break;
        }
        case 'or': {
            let val = [];
            for (let i = 0; i < req.orRequired.length; i++) {
                let orReq = req.orRequired[i].req;
                if (typeof orReq !== 'undefined') {
                    let id = orReq.split('/ON#');
                    let cMap = choiceMap.get(id[0]);
                    let num = '';
                    if (typeof cMap !== 'undefined') {
                        let thisChoice = cMap.choice;
                        num = id.length > 1 ? `${id[1]} ` : '';
                        val.push(`${num}${thisChoice.title}`);
                    }
                }
            }
            if (app.orderOrReqText === '1') {
                return `${req.beforeText} ${val.join(', ')} ${typeof req.orNum !== 'undefined' ? `${app.defaultOrReq} ${req.orNum}` : `${app.defaultOrReq} 1`} ${req.afterText}`;
            } else {
                return `${req.beforeText} ${typeof req.orNum !== 'undefined' ? `${req.orNum} ${app.defaultOrReq}` : `1 ${app.defaultOrReq}`} ${val.join(', ')} ${req.afterText}`;
            }
        }
        case 'selFromGroups': {
            if (typeof req.selGroups !== 'undefined') {
                let val = [];
                for (let i = 0; i < req.selGroups.length; i++) {
                    let id = req.selGroups[i];
                    let thisGroup = groupMap.get(id);
                    if (typeof thisGroup !== 'undefined') {
                        val.push(thisGroup.name);
                    }
                }
                if (app.orderSelReqText === '1') {
                    return `${req.beforeText} ${val.join(', ')} ${app.defaultOrReq} ${req.selNum} ${req.afterText}`;
                } else {
                    return `${req.beforeText} ${req.selNum} ${app.defaultOrReq} ${val.join(', ')} ${req.afterText}`;
                }
            }
        }
        case 'selFromRows': {
            if (typeof req.selRows !== 'undefined') {
                let val = [];
                for (let i = 0; i < req.selRows.length; i++) {
                    let id = req.selRows[i];
                    let thisRow = rowMap.get(id);
                    if (typeof thisRow !== 'undefined') {
                        val.push(thisRow.title);
                    }
                }
                if (app.orderSelReqText === '1') {
                    return `${req.beforeText} ${val.join(', ')} ${app.defaultOrReq} ${req.selNum} ${req.afterText}`;
                } else {
                    return `${req.beforeText} ${req.selNum} ${app.defaultOrReq} ${val.join(', ')} ${req.afterText}`;
                }
            }
        }
        case 'selFromWhole': {
            if (app.orderSelReqText === '1') {
                return `${req.beforeText} ${app.defaultOrReq} ${req.selNum} ${req.afterText}`;
            } else {
                return `${req.beforeText} ${req.selNum} ${app.defaultOrReq} ${req.afterText}`;
            }
        }
    }
    return `${req.beforeText} ${req.afterText}`;
}
function checkInitId(id: string) {
    return rowMap.has(id) || choiceMap.has(id) || wordMap.has(id) || pointTypeMap.has(id) || rowDesignMap.has(id) || objectDesignMap.has(id) || groupMap.has(id) || variableMap.has(id)
}
export function generateRowId(repeated: number, strLength: number) {
    let id = app.addPrefix ? 'row-' : '';
    let str = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var o = 0; o < strLength; o++) {
        id += str.charAt(Math.floor(Math.random() * str.length));
    }
    if (checkInitId(id)) {
        if (repeated > 2) {
            return generateRowId(0, ++strLength);
        } else {
            return generateRowId(++repeated, strLength);
        }
    } else {
        return id;
    }
};
export function generateWordId(repeated: number, strLength: number) {
    let id = app.addPrefix ? 'word-' : '';
    let str = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var o = 0; o < strLength; o++) {
        id += str.charAt(Math.floor(Math.random() * str.length));
    }
    if (checkInitId(id)) {
        if (repeated > 2) {
            return generateWordId(0, ++strLength);
        } else {
            return generateWordId(++repeated, strLength);
        }
    } else {
        return id;
    }
};
export function generateObjectId(repeated: number, strLength: number) {
    let id = app.addPrefix ? 'choice-' : '';
    let str = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var o = 0; o < strLength; o++) {
        id += str.charAt(Math.floor(Math.random() * str.length));
    }
    if (checkInitId(id)) {
        if (repeated > 2) {
            return generateObjectId(0, ++strLength);
        } else {
            return generateObjectId(++repeated, strLength);
        }
    } else {
        return id;
    }
};
export function generateDesignId(repeated: number, strLength: number, isRow: boolean) {
    let id = app.addPrefix ? 'design-' : '';
    let str = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var o = 0; o < strLength; o++) {
        id += str.charAt(Math.floor(Math.random() * str.length));
    }
    if (checkInitId(id)) {
        if (repeated > 2) {
            return generateDesignId(0, ++strLength, isRow);
        } else {
            return generateDesignId(++repeated, strLength, isRow);
        }
    } else {
        return id;
    }
};
export function generateGroupId(repeated: number, strLength: number) {
    let id = app.addPrefix ? 'group-' : '';
    let str = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var o = 0; o < strLength; o++) {
        id += str.charAt(Math.floor(Math.random() * str.length));
    }
    if (checkInitId(id)) {
        if (repeated > 2) {
            return generateGroupId(0, ++strLength);
        } else {
            return generateGroupId(++repeated, strLength);
        }
    } else {
        return id;
    }
};
export function generatePointTypeId(repeated: number, strLength: number) {
    let id = app.addPrefix ? 'point-' : '';
    let str = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var o = 0; o < strLength; o++) {
        id += str.charAt(Math.floor(Math.random() * str.length));
    }
    if (checkInitId(id)) {
        if (repeated > 2) {
            return generatePointTypeId(0, ++strLength);
        } else {
            return generatePointTypeId(++repeated, strLength);
        }
    } else {
        return id;
    }
};
export function generateVariableId(repeated: number, strLength: number) {
    let id = app.addPrefix ? 'variable-' : '';
    let str = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var o = 0; o < strLength; o++) {
        id += str.charAt(Math.floor(Math.random() * str.length));
    }
    if (checkInitId(id)) {
        if (repeated > 2) {
            return generateVariableId(0, ++strLength);
        } else {
            return generateVariableId(++repeated, strLength);
        }
    } else {
        return id;
    }
};
export function generateScoreId(repeated: number, strLength: number) {
    let id = 's-';
    let str = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var o = 0; o < strLength; o++) {
        id += str.charAt(Math.floor(Math.random() * str.length));
    }
    if (scoreSet.has(id)) {
        if (repeated > 2) {
            return generateScoreId(0, ++strLength);
        } else {
            return generateScoreId(++repeated, strLength);
        }
    } else {
        return id;
    }
};
export function objectWidthToNum(str: string) {
    switch(str) {
        case 'col-sm-6':
        case 'col-sm-5': return 2
        case 'col-md-4': return 3
        case 'col-md-3': return 4
        case 'w-20': return 5
        case 'col-lg-2': return 6
        case 'w-14': return 7
        case 'w-12': return 8
        case 'w-11': return 9
        case 'w-10': return 10
        case 'w-9': return 11
        case 'col-xl-1': return 12
        default: return 1
    }
};
let preWords: Word[] = [];
let cachedRegex: RegExp;
function checkWordChange() {
    if (preWords.length !== app.words.length) return true;
    for (let i = 0; i < preWords.length; i++) {
        if (preWords[i].id !== app.words[i].id) return true;
        if (preWords[i].replaceText !== app.words[i].replaceText) return true;
    }
    return false;
}
function getCombinedRegex() {
    if (checkWordChange()) {
        preWords = JSON.parse(JSON.stringify(app.words));
        cachedRegex = new RegExp(app.words.map(key => key.id).sort((a, b) => b.length - a.length).map(id => id.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')).join('|'),'g');
    }
    return cachedRegex;
}
export function replaceText(str: string) {
    let text = str;
    if (app.words) {
        text = text.replace(getCombinedRegex(), (match) => {
            const point = pointTypeMap.get(match);
            if (typeof point !== 'undefined') {
                const value = point.startingSum % 1 === 0 ? point.startingSum : parseFloat(point.startingSum.toFixed(typeof point.decimalPlaces !== 'undefined' ? point.decimalPlaces : 2));
                return value.toString();
            } else {
                const cMap = choiceMap.get(match);
                if (typeof cMap !== 'undefined') {
                    const multiChoice = cMap.choice;
                    if (multiChoice.isSelectableMultiple && multiChoice.isMultipleUseVariable) {
                        return multiChoice.multipleUseVariable.toString();
                    }
                } else {
                    const word = wordMap.get(match);
                    if (typeof word !== 'undefined') {
                        return word.replaceText;
                    }
                }
            }
            return match;
        });
    }
    return text;
};
export function getStyling(prop: string, row?: Row, choice?: Choice) {
    if (typeof choice !== 'undefined') {
        if (typeof choice.styling !== 'undefined' && choice.isPrivateStyling && choice[prop]) return choice.styling;
        if (typeof app.objectDesignGroups !== 'undefined' && choice.objectDesignGroups) {
            for (let i = 0; i < choice.objectDesignGroups.length; i++) {
                let objectDesignGroup = objectDesignMap.get(choice.objectDesignGroups[i]);
                if (typeof objectDesignGroup !== 'undefined') {
                    if (objectDesignGroup[prop]) {
                        let id = objectDesignGroup.activatedId;
                        let globalReq = globalReqMap.get(id);
                        if (id === '' || checkActivated(objectDesignGroup.activatedId)) {
                            return objectDesignGroup.styling;
                        } else if (typeof app.globalRequirements !== 'undefined' && typeof globalReq !== 'undefined') {
                            if (checkRequirements(globalReq.requireds)) return objectDesignGroup.styling;
                        }
                    }
                }
            }
        }
    }
    if (typeof row !== 'undefined') {
        if (typeof row.styling !== 'undefined' && row.isPrivateStyling && row[prop]) return row.styling;
        if (typeof app.rowDesignGroups !== 'undefined' && row.rowDesignGroups) {
            for (let i = 0; i < row.rowDesignGroups.length; i++) {
                let rowDesignGroup = rowDesignMap.get(row.rowDesignGroups[i]);
                if (typeof rowDesignGroup !== 'undefined') {
                    if (rowDesignGroup[prop]) {
                        let id = rowDesignGroup.activatedId;
                        let globalReq = globalReqMap.get(id);
                        if (id === '' || checkActivated(rowDesignGroup.activatedId)) {
                            return rowDesignGroup.styling;
                        } else if (typeof app.globalRequirements !== 'undefined' && typeof globalReq !== 'undefined') {
                            if (checkRequirements(globalReq.requireds)) return rowDesignGroup.styling;
                        }
                    }
                }
            }
        }
    }
    return app.styling;
};
export function checkDupId(id: string, dataMap: Map<string, PointType | Row | ChoiceMap | Group | Variable | Word | RowDesignGroup | ObjectDesignGroup | GlobalRequirement> | Set<string>) {
    if (dataMap.has(id)) {
        let tempId = `${id}_dup`;
        return checkDupId(tempId, dataMap);
    }
    return id;
};
export function checkPointEnable(point: PointType) {
    if (point.isNotShownPointBar) {
        if (typeof point.activatedId !== 'undefined' && point.activatedId !== '') {
            let globalReq = globalReqMap.get(point.activatedId);
            let variable = variableMap.get(point.activatedId);
            if (typeof globalReq !== 'undefined') {
                return checkRequirements(globalReq.requireds);
            }
            if (typeof variable !== 'undefined') {
                return variable.isTrue;
            }
            return checkActivated(point.activatedId)
        }
        return false;
    }
    return true;
};
export function checkActivated(str: string, actMap: SvelteMap<string, ActivatedMap> = activatedMap) {
    const [key, val = '0'] = str.split('/ON#');
    const num = parseInt(val);
    if (num > 0) {
        const actNum = actMap.get(key)?.multiple || 0;
        return actNum >= num;
    }
    return actMap.has(key);
};
export function checkReq(req: Requireds, aMap: SvelteMap<string, ActivatedMap> = activatedMap) {
    if (req.required) {
        switch (req.type) {
            case 'id':
                return checkActivated(req.reqId, aMap);
            case 'points':
                const pointData = pointTypeMap.get(req.reqId);
                if (typeof pointData !== 'undefined') {
                    if (typeof req.operator === 'undefined') {
                        return pointData.startingSum > req.reqPoints;
                    } else {
                        switch (req.operator) {
                            case '1':
                                return pointData.startingSum > req.reqPoints;
                            case '2':
                                return pointData.startingSum >= req.reqPoints;
                            case '3':
                                return pointData.startingSum == req.reqPoints;
                            case '4':
                                return pointData.startingSum <= req.reqPoints;
                            case '5':
                                return pointData.startingSum < req.reqPoints;
                        }
                    }
                }
                return false;
            case 'or':
                let orNum = typeof req.orNum === 'undefined' ? 1 : req.orNum;
                let orCount = 0;
                for (let i = 0; i < req.orRequired.length; i++) {
                    let orReq = req.orRequired[i].req;
                    if (typeof orReq !== 'undefined' && checkActivated(orReq, aMap)) orCount++;
                }
                return orCount >= orNum;
            case 'pointCompare':
                const point1 = pointTypeMap.get(req.reqId);
                const point2 = pointTypeMap.get(req.reqId1);
                if (typeof point1 !== 'undefined' && typeof point2 !== 'undefined') {
                    let compareVal = point2.startingSum;
                    if (req.more) {
                        for (let i = 0; i < req.more.length; i++) {
                            let temp = 0;
                            let moreId = req.more[i].id;
                            let morePoint = req.more[i].points;
                            if (typeof moreId !== 'undefined') {
                                let moreData = pointTypeMap.get(moreId);
                                if (typeof moreData !== 'undefined') {
                                    temp = moreData.startingSum;
                                }
                            } else if (typeof morePoint !== 'undefined') {
                                temp = morePoint;
                            }
                            switch (req.more[i].operator) {
                                case '1':
                                    compareVal += temp;
                                    break;
                                case '2':
                                    compareVal -= temp;
                                    break;
                                case '3':
                                    compareVal *= temp;
                                    break;
                                case '4':
                                    compareVal /= temp;
                                    break;
                                case '5':
                                    compareVal %= temp;
                                    break;
                            }
                        }
                    }
                    switch (req.operator) {
                        case '1':
                            return point1.startingSum > compareVal;
                        case '2':
                            return point1.startingSum >= compareVal;
                        case '3':
                            return point1.startingSum == compareVal;
                        case '4':
                            return point1.startingSum <= compareVal;
                        case '5':
                            return point1.startingSum < compareVal;
                        default:
                            return false;
                    }
                }
                return false;
            case 'selFromGroups':
                if (req.selGroups) {
                    let count = 0;
                    let selFromOperators = typeof req.selFromOperators === 'undefined' ? '1' : req.selFromOperators;
                    let selNum = typeof req.selNum === 'undefined' ? 1 : req.selNum;
                    for (let i = 0; i < req.selGroups.length; i++) {
                        const data = groupMap.get(req.selGroups[i]);
                        if (typeof data !== 'undefined') {
                            const groupElements = data.elements;
                            for (let j = 0; j < groupElements.length; j++) {
                                if (activatedMap.has(groupElements[j])) count++;
                            }
                        }
                    }
                    switch (selFromOperators) {
                        case '1':
                            return !(selNum > count || (selNum === 0 && count > 0));
                        case '2':
                            return selNum === count;
                        case '3':
                            return !(selNum < count || (selNum === 0 && count > 0));
                        default:
                            return false;
                    }
                }
            case 'selFromRows':
                if (req.selRows) {
                    let count = 0;
                    let selFromOperators = typeof req.selFromOperators === 'undefined' ? '1' : req.selFromOperators;
                    let selNum = typeof req.selNum === 'undefined' ? 1 : req.selNum;
                    for (let i = 0; i < req.selRows.length; i++) {
                        const data = rowMap.get(req.selRows[i]);
                        if (typeof data !== 'undefined') {
                            count += data.currentChoices;
                        }
                    }
                    switch (selFromOperators) {
                        case '1':
                            return !(selNum > count || (selNum === 0 && count > 0));
                        case '2':
                            return selNum === count;
                        case '3':
                            return !(selNum < count || (selNum === 0 && count > 0));
                        default:
                            return false;
                    }
                }
            case 'selFromWhole':
                let count = 0;
                let selFromOperators = typeof req.selFromOperators === 'undefined' ? '1' : req.selFromOperators;
                let selNum = typeof req.selNum === 'undefined' ? 1 : req.selNum;
                for (let i = 0; i < app.rows.length; i++) {
                    count += app.rows[i].currentChoices;
                }
                switch (selFromOperators) {
                    case '1':
                        return !(selNum > count || (selNum === 0 && count > 0));
                    case '2':
                        return selNum === count;
                    case '3':
                        return !(selNum < count || (selNum === 0 && count > 0));
                    default:
                        return false;
                }
            case 'gid':
                const globalReq = globalReqMap.get(req.reqId);
                if (typeof globalReq !== 'undefined' && typeof app.globalRequirements !== 'undefined') {
                    return checkRequirements(globalReq.requireds, aMap);
                }
                return false;
            case 'word':
                const word = wordMap.get(req.reqId);
                if (typeof word !== 'undefined') {
                    let orCount = 0;
                    for (let i = 0; i < req.orRequired.length; i++) {
                        let orReq = req.orRequired[i].req;
                        if (typeof orReq !== 'undefined' && word.replaceText === orReq) orCount++;
                    }
                    return orCount >= 1;
                }
                return false;
        }
    } else {
        switch (req.type) {
            case 'id':
                return !checkActivated(req.reqId, aMap);
            case 'or':
                let orNum = typeof req.orNum === 'undefined' ? 1 : req.orNum;
                let orCount = 0;
                for (let i = 0; i < req.orRequired.length; i++) {
                    let orReq = req.orRequired[i].req;
                    if (orReq === '' || typeof orReq !== 'undefined' && checkActivated(orReq, aMap)) orCount++;
                }
                return orCount < req.orRequired.length - orNum + 1;
            case 'gid':
                const globalReq = globalReqMap.get(req.reqId);
                if (typeof globalReq !== 'undefined' && typeof app.globalRequirements !== 'undefined') {
                    return !checkRequirements(globalReq.requireds, aMap);
                }
                return false;
        }
    }
    return false;
}
export function checkRequirements(requireds: Requireds[], actMap: SvelteMap<string, ActivatedMap> = activatedMap): boolean {
    let result = true;

    if (typeof requireds !== 'undefined') {        
        for (let i = 0; i < requireds.length; i++) {
            const req = requireds[i];
            let subResult = true;

            if (typeof req.requireds !== 'undefined') {
                for (let j = 0; j < req.requireds.length; j++) {
                    subResult = subResult && checkReq(req.requireds[j], actMap);
                }
            }
            if (subResult) result = result && checkReq(requireds[i], actMap);
        }
    }
    return result;
};
function bgmFadeIn(localChoice: Choice, bgmId: string, isFirst: boolean, player: YT.Player) {
    function playProc () {
        let vol = 0;
        let bgmTime = 0;
        let checkTime = 0;

        if (isFirst) {
            player.loadVideoById(bgmId);
            if (localChoice.bgmNoLoop) {
                player.setLoop(false);
            } else {
                player.loadPlaylist(bgmId);
                player.setLoop(true);
            }
        }

        if (localChoice.bgmFadeIn && typeof localChoice.bgmFadeInSec !== 'undefined' && localChoice.bgmFadeInSec > 0) {
            const stepSec = localChoice.bgmFadeInSec / 20;

            bgmVariables.lastFadeTime = localChoice.bgmFadeInSec;
            player.setVolume(0);
            player.playVideo();
            
            if (bgmVariables.bgmFadeInterval !== 0) {
                window.clearInterval(bgmVariables.bgmFadeInterval);
                bgmVariables.bgmFadeInterval = 0;
            }
            
            if (bgmVariables.bgmPlayInterval !== 0) {
                window.clearInterval(bgmVariables.bgmPlayInterval);
                bgmVariables.bgmPlayInterval = 0;
            }
            
            if (bgmVariables.isFadingOut) {
                bgmVariables.isFadingOut = false;
            }

            bgmVariables.bgmFadeInterval = window.setInterval(() => {
                if (player.getPlayerState() === 1) {
                    if (vol < app.curVolume) {
                        vol += 5;
                        player.setVolume(vol);
                        bgmVariables.lastFadeTime = bgmVariables.lastFadeTime - stepSec;
                    } else {
                        player.setVolume(app.curVolume);
                        window.clearInterval(bgmVariables.bgmFadeInterval);
                        bgmVariables.bgmFadeInterval = 0;
                        bgmVariables.lastFadeTime = 0;
                    }
                }
            }, stepSec);
        } else {
            if (bgmVariables.isFadingOut) {
                bgmVariables.isFadingOut = false;
                window.clearInterval(bgmVariables.bgmFadeInterval);
                bgmVariables.bgmFadeInterval = 0;
            }
            player.playVideo();
            player.setVolume(app.curVolume);
        }
        bgmVariables.bgmObjectId = localChoice.id;
        if (app.showMusicPlayer) {
            if (bgmVariables.bgmTitleInterval !== 0) {
                window.clearInterval(bgmVariables.bgmTitleInterval);
                bgmVariables.bgmTitleInterval = 0;
            }

            bgmVariables.bgmTitleInterval = window.setInterval(() => {
                if (typeof player.playerInfo.videoData !== 'undefined') {
                    let videoData = player.playerInfo.videoData;

                    if (videoData.video_id === bgmId && typeof videoData.title !== 'undefined' && videoData.title !== '') {
                        bgmVariables.bgmTitle = videoData.title;
                        bgmVariables.curBgmLength = player.getDuration();
                        window.clearInterval(bgmVariables.bgmTitleInterval);
                        bgmVariables.bgmTitleInterval = 0;
                    }
                }
            }, 1000);

            if (bgmVariables.bgmPlayInterval !== 0) {
                window.clearInterval(bgmVariables.bgmPlayInterval);
                bgmVariables.bgmPlayInterval = 0;
            }

            bgmVariables.bgmPlayInterval = window.setInterval(() => {
                if (typeof player.playerInfo.videoData !== 'undefined' && !bgmVariables.isSeeking && player.getPlayerState() === 1) {
                    const curTime = Math.floor(player.getCurrentTime());

                    if (curTime !== bgmVariables.curBgmTime) {
                        if (bgmTime !== curTime) {
                            bgmVariables.curBgmTime = curTime
                        } else {
                            checkTime++;
                            if (checkTime > bgmVariables.curBgmLength) checkTime = 1;
                            bgmVariables.curBgmTime = checkTime;
                        }
                    } else {
                        bgmTime = curTime;
                        checkTime = curTime + 1;
                        bgmVariables.curBgmTime = checkTime;
                    }
                }
            }, 1000);
        }
    }

    if (bgmVariables.isFadingOut) {
        const lastTime = bgmVariables.lastFadeTime;

        if (bgmVariables.bgmFadeTimer !== 0) {
            window.clearTimeout(bgmVariables.bgmFadeTimer);
            bgmVariables.bgmFadeTimer = 0;
        }

        bgmVariables.bgmFadeTimer = window.setTimeout(() => {
            playProc();
        }, lastTime);
    } else {
        playProc();
    }
}
function bgmFadeOut(localChoice: Choice, player: YT.Player) {
    const steps = app.curVolume / 5;

    if (localChoice.bgmFadeOut && typeof localChoice.bgmFadeOutSec !== 'undefined' && localChoice.bgmFadeOutSec > 0 && steps > 0) {
        const stepSec = localChoice.bgmFadeOutSec / steps;
        let vol = app.curVolume;

        bgmVariables.lastFadeTime = localChoice.bgmFadeOutSec;
        bgmVariables.isFadingOut = true;

        if (bgmVariables.bgmFadeInterval !== 0) {
            window.clearInterval(bgmVariables.bgmFadeInterval);
            bgmVariables.bgmFadeInterval = 0;
        }

        bgmVariables.bgmFadeInterval = window.setInterval(() => {
            if (typeof player.setVolume !== 'undefined') {
                if (vol > 0) {
                    vol -= 5;
                    player.setVolume(vol);
                    bgmVariables.lastFadeTime -= stepSec;
                } else {
                    if (bgmVariables.isFadingOut) {
                        player.pauseVideo();
                        player.setVolume(app.curVolume);
                        window.clearInterval(bgmVariables.bgmFadeInterval);
                        bgmVariables.bgmFadeInterval = 0;
                        bgmVariables.lastFadeTime = 0;
                        bgmVariables.isFadingOut = false;

                        if (bgmVariables.bgmTitleInterval !== 0) {
                            window.clearInterval(bgmVariables.bgmTitleInterval);
                            bgmVariables.bgmTitleInterval = 0;
                        }

                        if (bgmVariables.bgmPlayInterval !== 0) {
                            window.clearInterval(bgmVariables.bgmPlayInterval);
                            bgmVariables.bgmPlayInterval = 0;
                        }

                        bgmVariables.bgmTitle = 'No Audio Title';
                        bgmVariables.curBgmTime = 0;
                        bgmVariables.curBgmLength = 0;
                    }
                }
            }
        }, stepSec);
    } else {
        player.pauseVideo();

        if (bgmVariables.bgmTitleInterval !== 0) {
            window.clearInterval(bgmVariables.bgmTitleInterval);
            bgmVariables.bgmTitleInterval = 0;
        }

        if (bgmVariables.bgmPlayInterval !== 0) {
            window.clearInterval(bgmVariables.bgmPlayInterval);
            bgmVariables.bgmPlayInterval = 0;
        }

        bgmVariables.bgmTitle = 'No Audio Title';
        bgmVariables.curBgmTime = 0;
        bgmVariables.curBgmLength = 0;
    }
}
export function playBgm(localChoice: Choice, bgmId: string, count: number) {
    const player = get(bgmPlayer);

    if (player && typeof player.playerInfo.videoData !== 'undefined') {
        const isPlaying = bgmVariables.bgmIsPlaying;
        const videoId = player.playerInfo.videoData.video_id;
        const playerState = player.getPlayerState();

        if (videoId === bgmId) {
            if (bgmVariables.bgmObjectId === localChoice.id) {
                if (isPlaying) {
                    if (playerState === 2) {
                        bgmFadeIn(localChoice, bgmId, false, player);
                    } else {
                        player.stopVideo();
                        bgmFadeIn(localChoice, bgmId, false, player);
                    }
                } else {
                    bgmFadeOut(localChoice, player);
                }
            } else {
                if (isPlaying) {
                    player.stopVideo();
                    bgmFadeIn(localChoice, bgmId, false, player);
                } else {
                    bgmFadeOut(localChoice, player);
                }
            }
        } else {
            if (isPlaying) {
                bgmFadeIn(localChoice, bgmId, true, player);
            }
        }
    } else {
        if (count < 10) {
            window.setTimeout(() => {
                playBgm(localChoice, bgmId, ++count);
            }, 200);
        } else {
            console.log('Failed to play bgm');
        }
    }
}
export function loadYouTubeAPI(): Promise<typeof YT> {
    return new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
            resolve(window.YT);
        } else {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.head.appendChild(tag);
            window.onYouTubeIframeAPIReady = () => resolve(window.YT);
        }
    });
}
export async function initYoutubePlayer(localChoice: Choice) {
    const YT = await loadYouTubeAPI();
    const player = new YT.Player('bgm-player', {
        width: 0,
        height: 0,
        events: {
            onReady: () => {
                bgmPlayer.set(player);
                playBgm(localChoice, localChoice.bgmId || '', 0);
                if (app.isMute && !player.isMuted()) {
                    player.mute();
                }
            }
        }
    });
}
export function initStyling(styling: any, oldVersion: boolean, isMain = false) {
    if (typeof styling !== 'undefined') {
        if (oldVersion) {
            const keysToMultiply = ['addonBorderRadiusTopLeft', 'addonBorderRadiusTopRight', 'addonBorderRadiusBottomLeft', 'addonBorderRadiusBottomRight', 'addonImgBorderRadiusTopLeft', 'addonImgBorderRadiusTopRight', 'addonImgBorderRadiusBottomLeft', 'addonImgBorderRadiusBottomRight', 'objectBorderRadiusTopLeft', 'objectBorderRadiusTopRight', 'objectBorderRadiusBottomLeft', 'objectBorderRadiusBottomRight', 'objectImgBorderRadiusTopLeft', 'objectImgBorderRadiusTopRight', 'objectImgBorderRadiusBottomLeft', 'objectImgBorderRadiusBottomRight', 'rowBorderRadiusTopLeft', 'rowBorderRadiusTopRight', 'rowBorderRadiusBottomLeft', 'rowBorderRadiusBottomRight', 'rowImgBorderRadiusTopLeft', 'rowImgBorderRadiusTopRight', 'rowImgBorderRadiusBottomLeft', 'rowImgBorderRadiusBottomRight']
            
            for (let i = 0; i < keysToMultiply.length; i++) {
                const key = keysToMultiply[i];

                if (typeof styling[key] !== 'undefined') {
                    styling[key] = styling[key] * 10;
                }
            }
        }

        const keysToChange = ['selFilterBgColor', 'selFilterBorderColor', 'selFilterCTitleColor', 'selFilterCTextColor', 'selFilterATitleColor', 'selFilterATextColor', 'selFilterSTextColor', 'reqFilterBgColor', 'reqFilterBorderColor', 'reqFilterCTitleColor', 'reqFilterCTextColor', 'reqFilterATitleColor', 'reqFilterATextColor', 'reqFilterSTextColor', 'rowTitleColor', 'rowTextColor', 'objectTitleColor', 'objectTextColor', 'addonTitleColor', 'addonTextColor', 'scoreTextColor', 'objectImgBorderColor', 'rowImgBorderColor', 'addonImgBorderColor', 'backgroundColor', 'rowBgColor', 'objectBgColor', 'objectDropShadowColor', 'objectBorderColor', 'rowDropShadowColor', 'rowBorderColor', 'addonDropShadowColor', 'addonBorderColor', 'addonBgColor', 'barTextColor', 'barIconColor', 'barBackgroundColor', 'backpackBgColor', 'barPointNeg', 'barPointPos'];

        for (let i = 0; i < keysToChange.length; i++) {
            const key = keysToChange[i];

            if (typeof styling[key] === 'object') {
                styling[key] = styling[key].hexa;
            }
        }

        if (isMain) {
            if (typeof styling.customMultiTextFont === 'undefined') styling.customMultiTextFont = false;
            if (typeof styling.multiChoiceCounterPosition === 'undefined') styling.multiChoiceCounterPosition = 0;
            if (typeof styling.multiChoiceCounterSize === 'undefined') styling.multiChoiceCounterSize = 170;
            if (typeof styling.multiChoiceTextFont === 'undefined') styling.multiChoiceTextFont = 'Times New Roman';
            if (typeof styling.multiChoiceTextSize === 'undefined') styling.multiChoiceTextSize = 100;
        }
    }
}
function calcStackDiscount(scoreVal: number, operator: string, value: number) {
    switch (operator) {
        case '1': return scoreVal - value;
        case '2': return scoreVal + value;
        case '3': return scoreVal * value;
        case '4': return scoreVal / value;
        default: return scoreVal;
    }
};
function deleteDiscount(score: Score) {
    delete score.tmpDiscount;
    delete score.discountTextA;
    delete score.discountTextB;
    delete score.dupTextA;
    delete score.dupTextB;
    delete score.discountedFrom;
    delete score.discountIsOn;
    delete score.discountScore;
    delete score.discountScoreCal;
    delete score.notStackableDiscount;
};
export function deselectDiscount(localChoice: Choice, score: Score) {
    const point = pointTypeMap.get(score.id);
    if (typeof point !== 'undefined' && typeof localChoice.discountOperator !== 'undefined' && typeof localChoice.discountValue !== 'undefined') {
        let scoreVal = point.allowFloat ? score.value : Math.floor(score.value);
        let tmpDisScore = score.discountIsOn && typeof score.discountScore !== 'undefined' ? score.discountScore : score.value;
        tmpDisScore = point.allowFloat ? tmpDisScore : Math.floor(tmpDisScore);
        let discountVal = 0;
        let discountCal = 0;
        let discountedFrom: string[] = [];
        let bTmpChanged = false;
        let tmpNum = 0;
        
        if (localChoice.stackableDiscount) {
            if (score.notStackableDiscount) {
                if (typeof score.tmpDiscount !== 'undefined') {
                    for (let i = 0; i < score.tmpDiscount.length; i++) {
                        if (score.tmpDiscount[i].isStackable) {
                            discountedFrom = score.tmpDiscount[i].discountedFrom;
                            scoreVal = score.tmpDiscount[i].discountedValue;
                            tmpNum = i;
                        }
                    }

                    score.tmpDiscount.splice(tmpNum, 1);
                }
            } else {
                if (typeof score.discountedFrom !== 'undefined') {
                    let idx = score.discountedFrom.indexOf(localChoice.id);
                    score.discountedFrom.splice(idx, 1);

                    if (typeof score.discountedFrom !== 'undefined' && score.discountedFrom.length > 0) {
                        discountVal = scoreVal;
                        for (let i = 0; i < score.discountedFrom.length; i++) {
                            const cMap = choiceMap.get(score.discountedFrom[i]);
                            if (typeof cMap !== 'undefined') {
                                const aChoice = cMap.choice;
                                if (typeof aChoice.discountOperator !== 'undefined' && typeof aChoice.discountValue !== 'undefined') {
                                    discountVal = calcStackDiscount(discountVal, aChoice.discountOperator, aChoice.discountValue);
                                    discountVal = point.allowFloat ? discountVal : Math.floor(discountVal);
                                    discountCal = discountVal;
                                    if (aChoice.discountLowLimitIsOn && typeof aChoice.discountLowLimit !== 'undefined') {
                                        discountVal = Math.max(discountVal, aChoice.discountLowLimit);
                                    }
                                }
                            }
                        }

                        if (localChoice.discountShow) {
                            let aIndex = typeof localChoice.discountAfterText !== 'undefined' && typeof score.discountTextA !== 'undefined' ? score.discountTextA.indexOf(localChoice.discountAfterText) : -1;
                            let bIndex = typeof localChoice.discountBeforeText !== 'undefined' && typeof score.discountTextB !== 'undefined' ? score.discountTextB.indexOf(localChoice.discountBeforeText) : -1;
                            if (localChoice.discountTextDuplicated) {
                                if (aIndex !== -1 && typeof score.dupTextA !== 'undefined' && typeof localChoice.discountAfterText !== 'undefined') {
                                    score.dupTextA[localChoice.discountAfterText] -= 1;
                                    if (score.dupTextA[localChoice.discountAfterText] === 0) {
                                        score.discountTextA?.splice(aIndex, 1);
                                        delete score.dupTextA[localChoice.discountAfterText];
                                    }
                                }
                                if (bIndex !== -1 && typeof score.dupTextB !== 'undefined' && typeof localChoice.discountBeforeText !== 'undefined') {
                                    score.dupTextB[localChoice.discountBeforeText] -= 1;
                                    if (score.dupTextB[localChoice.discountBeforeText] === 0) {
                                        score.discountTextB?.splice(aIndex, 1);
                                        delete score.dupTextB[localChoice.discountBeforeText];
                                    }
                                }
                            } else {
                                if (aIndex !== -1 && typeof score.discountTextA !== 'undefined') {
                                    score.discountTextA.splice(aIndex, 1);
                                    score.discountAfterText = score.discountTextA.join('');
                                }
                                if (bIndex !== -1 && typeof score.discountTextB !== 'undefined') {
                                    score.discountTextB.splice(bIndex, 1);
                                    score.discountBeforeText = score.discountTextB.join('');
                                }
                            }
                        }
                        
                        score.discountScore = discountVal;
                        score.discountScoreCal = discountCal;
                    } else {
                        if (typeof score.tmpDiscount !== 'undefined') {
                            for (let i = 0; i < score.tmpDiscount.length; i++) {
                                if (!score.tmpDiscount[i].isStackable) {
                                    if (discountVal > score.tmpDiscount[i].discountedValue) {
                                        discountedFrom = score.tmpDiscount[i].discountedFrom;
                                        discountCal = score.tmpDiscount[i].calcValue;
                                        discountVal = score.tmpDiscount[i].discountedValue;
                                        tmpNum = i;
                                        bTmpChanged = true;
                                    }
                                }
                            }
                        }

                        if (bTmpChanged && typeof score.tmpDiscount !== 'undefined') {
                            if (discountedFrom.length === 0) {
                                score.tmpDiscount.splice(tmpNum, 1);
                            } else {
                                score.discountedFrom = discountedFrom;
                                if (score.tmpDiscount[tmpNum].showDiscount) {
                                    score.discountBeforeText = score.tmpDiscount[tmpNum].beforeText;
                                    score.discountAfterText = score.tmpDiscount[tmpNum].afterText;
                                }
                                score.tmpDiscount.splice(tmpNum, 1);
                                score.notStackableDiscount = true;
                            }
                        } else {
                            deleteDiscount(score);
                        }
                    }
                }
            }
        } else {
            if (score.notStackableDiscount) {
                if (typeof score.discountedFrom !== 'undefined' && score.discountedFrom.length > 0 && typeof score.tmpDiscount !== 'undefined') {
                    if (score.discountedFrom.indexOf(localChoice.id) !== -1) {
                        if (score.tmpDiscount.length > 0) {
                            scoreVal = score.tmpDiscount[0].discountedValue;
                            bTmpChanged = true;
                            for (let i = 1; i < score.tmpDiscount.length; i++) {
                                if (scoreVal > score.tmpDiscount[i].discountedValue) {
                                    scoreVal = score.tmpDiscount[i].discountedValue;
                                    tmpNum = i;
                                }
                            }
                        }

                        if (bTmpChanged) {
                            score.discountScore = scoreVal;
                            score.discountScoreCal = score.tmpDiscount[tmpNum].calcValue;
                            score.discountedFrom = score.tmpDiscount[tmpNum].discountedFrom;
                            score.notStackableDiscount = !score.tmpDiscount[tmpNum].isStackable;
                            score.discountShow = score.tmpDiscount[tmpNum].showDiscount;

                            if (score.tmpDiscount[tmpNum].isStackable && score.tmpDiscount[tmpNum].showDiscount) {
                                score.discountBeforeText = score.discountTextB?.join('');
                                score.discountAfterText = score.discountTextA?.join('');
                            } else {
                                if (score.tmpDiscount[tmpNum].showDiscount) {
                                    score.discountBeforeText = score.tmpDiscount[tmpNum].beforeText;
                                    score.discountAfterText = score.tmpDiscount[tmpNum].afterText;
                                } else {
                                    score.discountBeforeText = '';
                                    score.discountAfterText = '';
                                }
                            }

                            score.tmpDiscount.splice(tmpNum, 1);
                        } else {
                            deleteDiscount(score);
                        }
                    } else {
                        for (let i = 0; i < score.tmpDiscount.length; i++) {
                            if (score.tmpDiscount[i].discountedFrom.indexOf(localChoice.id) !== -1) {
                                score.tmpDiscount.splice(i, 1);
                                break;
                            }
                        }
                    }
                } else {
                    deleteDiscount(score);
                }
            } else {
                if (typeof score.tmpDiscount !== 'undefined') {
                    score.tmpDiscount = score.tmpDiscount.filter(item => item.discountedFrom.indexOf(localChoice.id) !== -1);
                    if (score.tmpDiscount.length > 0) {
                        scoreVal = score.tmpDiscount[0].discountedValue;
                        bTmpChanged = true;
                        for (let i = 1; i < score.tmpDiscount.length; i++) {
                            if (scoreVal > score.tmpDiscount[i].discountedValue) {
                                scoreVal = score.tmpDiscount[i].discountedValue;
                                tmpNum = i;
                            }
                        }
                    }

                    if (bTmpChanged) {
                        score.discountScore = scoreVal;
                        score.discountScoreCal = score.tmpDiscount[tmpNum].calcValue;
                        score.discountedFrom = score.tmpDiscount[tmpNum].discountedFrom;
                        score.notStackableDiscount = !score.tmpDiscount[tmpNum].isStackable;
                        
                        if (score.notStackableDiscount) {
                            if (score.tmpDiscount[tmpNum].showDiscount) {
                                score.discountBeforeText = score.tmpDiscount[tmpNum].beforeText;
                                score.discountAfterText = score.tmpDiscount[tmpNum].afterText;
                            } else {
                                score.discountBeforeText = '';
                                score.discountAfterText = '';
                            }
                        } else {
                            score.discountBeforeText = score.discountTextB?.join('');
                            score.discountAfterText = score.discountTextA?.join('');
                        }
                        score.tmpDiscount.splice(tmpNum, 1);
                    } else {
                        deleteDiscount(score);
                    }
                } else {
                    deleteDiscount(score);
                }
            }
        }

        let resultVal = typeof score.discountScore !== 'undefined' ? score.discountScore : score.value;
        resultVal = point.allowFloat ? resultVal : Math.floor(resultVal);

        if (resultVal !== tmpDisScore) {
            score.tmpDisScore = tmpDisScore - resultVal;
            score.isChangeDiscount = true;
        } else {
            delete score.isChangeDiscount;
        }
    }
};
export function selectDiscount(localChoice: Choice, score: Score) {
    const point = pointTypeMap.get(score.id);
    if (typeof point !== 'undefined' && typeof localChoice.discountOperator !== 'undefined' && typeof localChoice.discountValue !== 'undefined') {
        let scoreVal = point.allowFloat ? score.value : Math.floor(score.value);
        let tmpDisScore = score.discountIsOn && typeof score.discountScore !== 'undefined' ? score.discountScore : scoreVal;
        let discountVal = 0;
        let discountCal = 0;
        let discountedFrom: string[] = [];
        let aDiscount: Discount;
        let bTempStacked = false;
        let tmpNum = 0;

        if (typeof score.discountedFrom === 'undefined') score.discountedFrom = [];
        
        if (localChoice.stackableDiscount) {
            if (score.notStackableDiscount) {
                if (typeof score.tmpDiscount !== 'undefined') {
                    for (let i = 0; i < score.tmpDiscount.length; i++) {
                        if (score.tmpDiscount[i].isStackable) {
                            discountedFrom = score.tmpDiscount[i].discountedFrom;
                            discountedFrom.push(localChoice.id);
                            scoreVal = score.tmpDiscount[i].discountedValue;
                            bTempStacked = true;
                            tmpNum = i;
                        }
                    }

                    discountVal = calcStackDiscount(scoreVal, localChoice.discountOperator, localChoice.discountValue);
                    discountVal = point.allowFloat ? discountVal : Math.floor(discountVal);
                    discountCal = discountVal;
            
                    if (localChoice.discountLowLimitIsOn && typeof localChoice.discountLowLimit !== 'undefined') {
                        discountVal = Math.max(discountVal, localChoice.discountLowLimit);
                    }
                
                    if (typeof score.discountScore !== 'undefined' && score.discountScore > discountVal) {
                        score.tmpDisScore = score.discountScore - discountVal;
                        score.isChangeDiscount = true;
                        aDiscount = {
                            isStackable: false,
                            discountedFrom: score.discountedFrom,
                            calcValue: typeof score.discountScoreCal !== 'undefined' ? score.discountScoreCal : score.discountScore,
                            discountedValue: score.discountScore,
                            showDiscount: false
                        };

                        if (score.discountShow) {
                            aDiscount.showDiscount = true;
                            aDiscount.beforeText = localChoice.discountBeforeText;
                            aDiscount.afterText = localChoice.discountAfterText;
                        }

                        score.discountScore = discountVal;
                        score.discountScoreCal = discountCal;

                        if (localChoice.discountShow) {
                            score.discountShow = true;
                            updateDiscountTexts(localChoice, score);
                        }

                        if (typeof score.discountTextA !== 'undefined') score.discountAfterText = score.discountTextA.join('');
                        if (typeof score.discountTextB !== 'undefined') score.discountBeforeText = score.discountTextB.join('');

                        score.discountedFrom.push(...discountedFrom);

                        if (bTempStacked) {
                            score.tmpDiscount.splice(tmpNum, 1);
                        }

                        score.tmpDiscount.push(aDiscount);
                        score.notStackableDiscount = false;
                    } else {
                        score.isChangeDiscount = false;
                        discountedFrom.push(localChoice.id);

                        if (localChoice.discountShow) {
                            updateDiscountTexts(localChoice, score);
                        }
                
                        if (bTempStacked) {
                            score.tmpDiscount[tmpNum].discountedFrom = discountedFrom;
                            score.tmpDiscount[tmpNum].calcValue = discountCal;
                            score.tmpDiscount[tmpNum].discountedValue = discountVal;
                        } else {
                            aDiscount = {
                                isStackable: localChoice.stackableDiscount || false,
                                discountedFrom: discountedFrom,
                                calcValue: discountCal,
                                discountedValue: discountVal,
                                showDiscount: localChoice.discountShow || false
                            };
                            score.tmpDiscount.push(aDiscount);
                        }
                    }
                }
            } else {
                scoreVal = score.discountIsOn ? (typeof score.discountScoreCal !== 'undefined' ? score.discountScoreCal : score.value) : score.value;
                scoreVal = point.allowFloat ? scoreVal : Math.floor(scoreVal);
                tmpDisScore = score.discountIsOn && typeof score.discountScore !== 'undefined' ? score.discountScore : score.value;
                tmpDisScore = point.allowFloat ? tmpDisScore : Math.floor(tmpDisScore);
            
                discountVal = calcStackDiscount(scoreVal, localChoice.discountOperator, localChoice.discountValue);
                discountVal = point.allowFloat ? discountVal : Math.floor(discountVal);
                discountCal = discountVal;
            
                if (localChoice.discountLowLimitIsOn && typeof localChoice.discountLowLimit !== 'undefined') {
                    discountVal = Math.max(discountVal, localChoice.discountLowLimit);
                }
            
                if (!Array.isArray(score.discountedFrom)) score.discountedFrom = [];
            
                score.discountScore = discountVal;
                score.discountScoreCal = discountCal;
                score.discountedFrom.push(localChoice.id);

                if (score.discountScore !== tmpDisScore) {
                    score.tmpDisScore = tmpDisScore - score.discountScore;
                    score.isChangeDiscount = true;
                } else {
                    score.isChangeDiscount = false;
                }
            
                if (!score.discountIsOn) score.discountIsOn = true;
                
                if (localChoice.discountShow) {
                    score.discountShow = true;
                    updateDiscountTexts(localChoice, score);
                }

                if (typeof score.discountTextA !== 'undefined') score.discountAfterText = score.discountTextA.join('');
                if (typeof score.discountTextB !== 'undefined') score.discountBeforeText = score.discountTextB.join('');
            }
        } else {
            if (typeof score.tmpDiscount === 'undefined') score.tmpDiscount = [];
    
            discountVal = calcStackDiscount(scoreVal, localChoice.discountOperator, localChoice.discountValue);
            discountVal = point.allowFloat ? discountVal : Math.floor(discountVal);
            discountCal = discountVal;
        
            if (localChoice.discountLowLimitIsOn && typeof localChoice.discountLowLimit !== 'undefined') {
                discountVal = Math.max(discountVal, localChoice.discountLowLimit);
            }
        
            if (score.discountIsOn) {
                if (typeof score.discountScore !== 'undefined') {
                    if (score.discountScore > discountVal) {
                        aDiscount = {
                            isStackable: !score.notStackableDiscount,
                            discountedFrom: score.discountedFrom,
                            calcValue: typeof score.discountScoreCal !== 'undefined' ? score.discountScoreCal : score.discountScore,
                            discountedValue: score.discountScore,
                            showDiscount: score.discountShow || false
                        }
                        
                        if (score.discountShow) {
                            aDiscount.showDiscount = true;
                            aDiscount.beforeText = score.discountBeforeText;
                            aDiscount.afterText = score.discountAfterText;
                        }
                        
                        score.discountScore = discountVal;
                        score.discountScoreCal = discountCal;
                        score.discountShow = localChoice.discountShow;
                        score.discountBeforeText = localChoice.discountBeforeText;
                        score.discountAfterText = localChoice.discountAfterText;
                        score.discountedFrom = [localChoice.id];
                        score.notStackableDiscount = true;
                    } else {
                        aDiscount = {
                            isStackable: typeof localChoice.stackableDiscount !== 'undefined' ? localChoice.stackableDiscount : false,
                            discountedFrom: [localChoice.id],
                            calcValue: discountCal,
                            discountedValue: discountVal,
                            showDiscount: typeof localChoice.discountShow !== 'undefined' ? localChoice.discountShow : false
                        }

                        if (localChoice.discountShow) {
                            aDiscount.showDiscount = true;
                            aDiscount.beforeText = localChoice.discountBeforeText;
                            aDiscount.afterText = localChoice.discountAfterText;
                        }
                    }
                    score.tmpDiscount.push(aDiscount);
                }
            } else {
                score.discountScore = discountVal;
                score.discountScoreCal = discountCal;
                if (localChoice.discountShow) {
                    score.discountShow = localChoice.discountShow;
                    score.discountBeforeText = localChoice.discountBeforeText;
                    score.discountAfterText = localChoice.discountAfterText;
                }
                if (!Array.isArray(score.discountedFrom)) score.discountedFrom = [];
                score.discountIsOn = true;
                score.discountedFrom.push(localChoice.id);
                score.notStackableDiscount = true;
            }
        
            if (typeof score.discountScore !== 'undefined' && score.discountScore !== tmpDisScore) {
                score.tmpDisScore = tmpDisScore - score.discountScore;
                score.isChangeDiscount = true;
            } else {
                score.isChangeDiscount = false;
            }
        }
    }
};
function updateDiscountTexts(localChoice: Choice, score: Score) {
    if (typeof score.discountTextA === 'undefined') score.discountTextA = [];
    if (typeof score.discountTextB === 'undefined') score.discountTextB = [];
    if (typeof score.dupTextA === 'undefined') score.dupTextA = {};
    if (typeof score.dupTextB === 'undefined') score.dupTextB = {};

    if (localChoice.discountTextDuplicated) {
        if (typeof localChoice.discountAfterText !== 'undefined' ) {
            if (score.discountTextA.indexOf(localChoice.discountAfterText) !== -1) {
                score.dupTextA[localChoice.discountAfterText] = (score.dupTextA[localChoice.discountAfterText] || 0) + 1;
            } else {
                score.dupTextA[localChoice.discountAfterText] = 1;
                score.discountTextA.push(localChoice.discountAfterText);
            }
        }
        
        if (typeof localChoice.discountBeforeText !== 'undefined') {
            if (score.discountTextB.indexOf(localChoice.discountBeforeText) !== -1) {
                score.dupTextB[localChoice.discountBeforeText] = (score.dupTextB[localChoice.discountBeforeText] || 0) + 1;
            } else {
                score.dupTextB[localChoice.discountBeforeText] = 1;
                score.discountTextB.push(localChoice.discountBeforeText);
            }
        }
    } else {
        if (typeof localChoice.discountAfterText !== 'undefined') {
            score.discountTextA.push(localChoice.discountAfterText);
        }
        if (typeof localChoice.discountBeforeText !== 'undefined') {
            score.discountTextB.push(localChoice.discountBeforeText);
        }
    }
};
export function checkPoints(localChoice: Choice, isSel: boolean) {
    let isPositve = true;
    let scoreMap = new Map<string, number>();

    for (let i = 0; i < localChoice.scores.length; i++) {
        let score = localChoice.scores[i];
        let scoreVal = score.discountIsOn && typeof score.discountScore !== 'undefined' ? score.discountScore : score.value;
        if (score.multiplyByTimes) {
            scoreVal = scoreVal * (Math.abs(localChoice.multipleUseVariable) + 1);
        }

        if (checkRequirements(score.requireds) && !score.isActive) {
            let point = pointTypeMap.get(score.id);

            if (typeof point !== 'undefined' && point.belowZeroNotAllowed) {
                let data = scoreMap.get(score.id);

                if (typeof data !== 'undefined') {
                    isPositve = isPositve && (isSel ? data - scoreVal >= 0 : data + scoreVal >= 0);
                    scoreMap.set(score.id, data - score.value);
                } else {
                    isPositve = isPositve && (isSel ? point.startingSum - scoreVal >= 0 : point.startingSum + scoreVal >= 0);
                    scoreMap.set(score.id, point.startingSum - scoreVal);
                }
            }
        }
    }

    /*

    if (localChoice.multiplyPointtypeIsOn && typeof localChoice.pointTypeToMultiply !== 'undefined' && typeof localChoice.multiplyWithThis !== 'undefined') {
        for (let i = 0; i < localChoice.pointTypeToMultiply.length; i++) {
            let id = localChoice.pointTypeToMultiply[i];
            let point = pointTypeMap.get(id);

            if (typeof point !== 'undefined' && point.belowZeroNotAllowed) {
                let data = scoreMap.get(id);

                if (typeof localChoice.multiplyWithThis === 'string') {
                    let calPoint = pointTypeMap.get(localChoice.multiplyWithThis);

                    if (typeof calPoint !== 'undefined') {
                        if (typeof data !== 'undefined') {
                            isNegative = isSel ? data * calPoint.startingSum < 0 : data / calPoint.startingSum < 0;
                        } else {
                            isNegative = isSel ? point.startingSum * calPoint.startingSum < 0 : point.startingSum / calPoint.startingSum < 0;
                        }
                    }
                } else {
                    if (typeof data !== 'undefined') {
                        isNegative = isSel ? data * localChoice.multiplyWithThis < 0 : data / localChoice.multiplyWithThis < 0;
                    } else {
                        isNegative = isSel ? point.startingSum * localChoice.multiplyWithThis < 0 : point.startingSum / localChoice.multiplyWithThis < 0;
                    }
                }
            }
        }
    }

    if (localChoice.dividePointtypeIsOn && typeof localChoice.pointTypeToMultiply !== 'undefined' && typeof localChoice.divideWithThis !== 'undefined') {
        for (let i = 0; i < localChoice.pointTypeToMultiply.length; i++) {
            let id = localChoice.pointTypeToMultiply[i];
            let point = pointTypeMap.get(id);

            if (typeof point !== 'undefined' && point.belowZeroNotAllowed) {
                let data = scoreMap.get(id);

                if (typeof localChoice.divideWithThis === 'string') {
                    let calPoint = pointTypeMap.get(localChoice.divideWithThis);

                    if (typeof calPoint !== 'undefined') {
                        if (typeof data !== 'undefined') {
                            isNegative = isSel ? data / calPoint.startingSum < 0 : data * calPoint.startingSum < 0;
                        } else {
                            isNegative = isSel ? point.startingSum / calPoint.startingSum < 0 : point.startingSum * calPoint.startingSum < 0;
                        }
                    }
                } else {
                    if (typeof data !== 'undefined') {
                        isNegative = isSel ? data / localChoice.divideWithThis < 0 : data * localChoice.divideWithThis < 0;
                    } else {
                        isNegative = isSel ? point.startingSum / localChoice.divideWithThis < 0 : point.startingSum * localChoice.divideWithThis < 0;
                    }
                }
            }
        }
    }

    */

    return isPositve;
};
export function cleanActivated() {
    const preserveList = new Set();

    function checkActivateOther(localChoice: Choice) {
        if (localChoice.activateOtherChoice && typeof localChoice.activateThisChoice !== 'undefined') {
            if (localChoice.activatedRandom) {
                if (localChoice.isSelectableMultiple) {
                    for (let i = 0; i < localChoice.multipleUseVariable; i++) {
                        if (typeof localChoice.activatedRandomMul !== 'undefined') {
                            for (var j = 0; j < localChoice.activatedRandomMul[j].length; j++) {
                                const val = localChoice.activatedRandomMul[i][j].split("/ON#");
                                const cMap = choiceMap.get(val[0]);

                                if (typeof cMap !== 'undefined') {
                                    const fChoice = cMap.choice;
                                    if (activatedMap.has(fChoice.id)) {
                                        if (!localChoice.isAllowDeselect) {
                                            preserveList.add(fChoice.id);

                                            if (val.length > 1 && fChoice.isSelectableMultiple) {
                                                if (typeof fChoice.tempMultipleValue === 'undefined') {
                                                    fChoice.tempMultipleValue = parseInt(val[1]);
                                                } else {
                                                    fChoice.tempMultipleValue += parseInt(val[1]);
                                                }
                                            }
                                            checkActivateOther(fChoice);
                                        }
                                    } else {
                                        const tChoice = tmpActivatedMap.get(fChoice.id);

                                        if (typeof tChoice !== 'undefined') {
                                            if (val.length > 1) tChoice.multiple += parseInt(val[1]);
                                        } else {
                                            tmpActivatedMap.set(fChoice.id, {multiple: val.length > 1 ? parseInt(val[1]) : 0, isAllowDeselect: fChoice.isAllowDeselect || false});
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (typeof localChoice.activatedRandom !== 'undefined') {
                        for (let i = 0; i < localChoice.activatedRandom.length; i++) {
                            const val = localChoice.activatedRandom[i].split("/ON#");
                            const cMap = choiceMap.get(val[0]);

                            if (typeof cMap !== 'undefined') {
                                const fChoice = cMap.choice;
                                if (activatedMap.has(fChoice.id)) {
                                    if (!localChoice.isAllowDeselect) {
                                        preserveList.add(fChoice.id);

                                        if (val.length > 1 && fChoice.isSelectableMultiple) {
                                            if (typeof fChoice.tempMultipleValue === 'undefined') {
                                                fChoice.tempMultipleValue = parseInt(val[1]);
                                            } else {
                                                fChoice.tempMultipleValue += parseInt(val[1]);
                                            }
                                        }
                                        checkActivateOther(fChoice);
                                    }
                                } else {
                                    const tChoice = tmpActivatedMap.get(fChoice.id);

                                    if (typeof tChoice !== 'undefined') {
                                        if (val.length > 1) tChoice.multiple += parseInt(val[1]);
                                    } else {
                                        tmpActivatedMap.set(fChoice.id, {multiple: val.length > 1 ? parseInt(val[1]) : 0, isAllowDeselect: fChoice.isAllowDeselect || false});
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                const actList = localChoice.activateThisChoice.split(',');

                for (let i = 0; i < actList.length; i++) {
                    const val = actList[i].split('/ON#');
                    const cMap = choiceMap.get(val[0]);

                    if (typeof cMap !== 'undefined') {
                        const fChoice = cMap.choice;
                        if (activatedMap.has(fChoice.id)) {
                            if (!localChoice.isAllowDeselect) {
                                preserveList.add(fChoice.id);

                                if (val.length > 1 && fChoice.isSelectableMultiple) {
                                    if (typeof fChoice.tempMultipleValue === 'undefined') {
                                        fChoice.tempMultipleValue = parseInt(val[1]);
                                    } else {
                                        fChoice.tempMultipleValue += parseInt(val[1]);
                                    }
                                }
                                checkActivateOther(fChoice);
                            }
                        } else {
                            const tChoice = tmpActivatedMap.get(fChoice.id);

                            if (typeof tChoice !== 'undefined') {
                                if (val.length > 1) tChoice.multiple += parseInt(val[1]);
                            } else {
                                tmpActivatedMap.set(fChoice.id, {multiple: val.length > 1 ? parseInt(val[1]) : 0, isAllowDeselect: fChoice.isAllowDeselect || false});
                            }
                        }
                    }
                }
            }
        }
    }

    tmpActivatedMap.clear();

    Array.from(activatedMap.entries()).forEach(([id]) => {
        const cMap = choiceMap.get(id);

        if (typeof cMap !== 'undefined') {
            const aChoice = cMap.choice;

            if (aChoice.notDeselectedByClean) {
                preserveList.add(aChoice.id);
                checkActivateOther(aChoice);
            }
        } else {
            activatedMap.delete(id);
        }
    });

    let actkeys = [...activatedMap.keys()];
    let rawKeys = Array.from(choiceMap.entries()).filter(([key, value]) => value.choice.isActive === true).map(([key]) => key);

    let keys = Array.from(new Set([...actkeys, ...rawKeys]));

    for (let i = keys.length - 1; i >= 0; i--) {
        const cMap = choiceMap.get(keys[i]);

        if (typeof cMap !== 'undefined') {
            const cChoice = cMap.choice;

            if (!preserveList.has(cChoice.id)) {
                delete cChoice.multiplyPointtypeIsOnCheck;
                delete cChoice.startingSumAtMultiply;
                delete cChoice.multiplyPointtypeIsOnCheck;
                delete cChoice.startingSumAtDivide;
                delete cChoice.activatedRandom;
                delete cChoice.activatedRandomMul;

                if (cChoice.addToAllowChoice && typeof cChoice.idOfAllowChoice !== 'undefined' && typeof cChoice.numbAddToAllowChoice !== 'undefined') {
                    for (let i = 0; i < cChoice.idOfAllowChoice.length; i++) {
                        const aRow = rowMap.get(cChoice.idOfAllowChoice[i]);
                        if (typeof aRow !== 'undefined') {
                            aRow.allowedChoices -= cChoice.numbAddToAllowChoice;
                        }
                    }
                }

                if (cChoice.isChangeVariables && typeof cChoice.changedVariables !== 'undefined') {
                    for (let i = 0; i < cChoice.changedVariables.length; i++) {
                        const variable = variableMap.get(cChoice.changedVariables[i]);
                        if (typeof variable !== 'undefined') {
                            if (cChoice.changeType === '1') {
                                variable.isTrue = true;
                            } else if (cChoice.changeType === '2') {
                                variable.isTrue = false;
                            } else if (cChoice.changeType === '3') {
                                variable.isTrue = !variable.isTrue;
                            }
                        }
                    }
                }
                
                if (cChoice.textfieldIsOn && typeof cChoice.idOfTheTextfieldWord !== 'undefined' && typeof cChoice.wordChangeSelect !== 'undefined') {
                    const word = wordMap.get(cChoice.idOfTheTextfieldWord);
                    if (typeof word !== 'undefined') {
                        word.replaceText = typeof cChoice.wordChangeDeselect === 'undefined' ? '' : cChoice.wordChangeDeselect;
                    }
                }

                if (cChoice.isImageUpload) {
                    if (typeof cChoice.defaultImage !== 'undefined') cChoice.image = cChoice.defaultImage;
                }

                if (cChoice.setBgmIsOn && bgmPlayer) {
                    if (cChoice.bgmId) {
                        const player = get(bgmPlayer);

                        if (player && typeof player.playerInfo.videoData !== 'undefined') {
                            const videoId = player.playerInfo.videoData.video_id;

                            if (cChoice.bgmId === videoId) {
                                player.stopVideo();
                                bgmVariables.bgmIsPlaying = false;
                                if (bgmVariables.bgmFadeInterval !== 0) {
                                    window.clearInterval(bgmVariables.bgmFadeInterval);
                                    bgmVariables.bgmFadeInterval = 0;
                                }
                                if (bgmVariables.bgmTitleInterval !== 0) {
                                    window.clearInterval(bgmVariables.bgmTitleInterval);
                                    bgmVariables.bgmTitleInterval = 0;
                                }
                                if (bgmVariables.bgmPlayInterval !== 0) {
                                    window.clearInterval(bgmVariables.bgmPlayInterval);
                                    bgmVariables.bgmPlayInterval = 0;
                                }
                                bgmVariables.lastFadeTime = 0;
                                bgmVariables.isFadingOut = false;
                                bgmVariables.bgmTitle = 'No Audio Title';
                                bgmVariables.curBgmTime = 0;
                                bgmVariables.curBgmLength = 0;
                            }
                        }
                    }
                }

                if (cChoice.isContentHidden && typeof cChoice.hiddenContentsRow !== 'undefined' && typeof cChoice.hiddenContentsType !== 'undefined') {
                    for (let i = 0; i < cChoice.hiddenContentsRow.length; i++) {
                        const hRow = rowMap.get(cChoice.hiddenContentsRow[i]);
                        if (typeof hRow !== 'undefined') {
                            for (let j = 0; j < cChoice.hiddenContentsType.length; j++) {
                                switch (cChoice.hiddenContentsType[j]) {
                                    case '1':
                                        delete hRow.objectTitleRemoved;
                                        break;
                                    case '2':
                                        delete hRow.objectImageRemoved;
                                        break;
                                    case '3':
                                        delete hRow.objectTextRemoved;
                                        break;
                                    case '4':
                                        delete hRow.objectScoreRemoved;
                                        break;
                                    case '5':
                                        delete hRow.objectRequirementRemoved;
                                        break;
                                    case '6':
                                        delete hRow.addonTitleRemoved;
                                        break;
                                    case '7':
                                        delete hRow.addonImageRemoved;
                                        break;
                                    case '8':
                                        delete hRow.addonTextRemoved;
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                    }
                }

                cChoice.multipleUseVariable = 0;
                cChoice.isActive = false;
                activatedMap.delete(cChoice.id);
            }
        } else {
            activatedMap.delete(keys[i]);
        }
    }

    for (let i = 0; i < app.pointTypes.length; i++) {
        const point = app.pointTypes[i];

        point.startingSum = point.initValue;
    }

    for (let i = 0; i < app.rows.length; i++) {
        const cRow = app.rows[i];
        
        cRow.isEditModeOn = false;
        cRow.currentChoices = 0;
        cRow.index = i;

        for (let j = 0; j < cRow.objects.length; j++) {
            const cChoice = cRow.objects[j];            
            cChoice.index = j;

            if (typeof cChoice.defaultTemplate !== 'undefined') {
                cChoice.template = cChoice.defaultTemplate
            }

            if (typeof cChoice.defaultWidth !== 'undefined') {
                cChoice.width = cChoice.defaultWidth;
            }

            if (!cChoice.isActive) {
                delete cChoice.forcedActivated;
                delete cChoice.activatedFrom;
            }

            delete cChoice.templateStack;
            delete cChoice.widthStack;

            for (let k = 0; k < cChoice.scores.length; k++) {
                const cScore = cChoice.scores[k];

                if (cChoice.isSelectableMultiple) {
                    delete cScore.isActiveMul;
                    delete cScore.isActiveMulMinus;
                } else {
                    delete cScore.isActive;
                }
                deleteDiscount(cScore);
            }
        }
    }

    for (let i = 0; i < app.backpack.length; i++) {
        const cRow = app.backpack[i];

        cRow.isEditModeOn = false;
        cRow.currentChoices = 0;
        cRow.index = i;

        for (let j = 0; j < cRow.objects.length; j++) {
            const cChoice = cRow.objects[j];
            cChoice.index = j;

            if (typeof cChoice.defaultTemplate !== 'undefined') {
                cChoice.template = cChoice.defaultTemplate
            }

            if (typeof cChoice.defaultWidth !== 'undefined') {
                cChoice.width = cChoice.defaultWidth;
            }

            if (!cChoice.isActive) {
                delete cChoice.forcedActivated;
                delete cChoice.activatedFrom;
            }

            delete cChoice.templateStack;
            delete cChoice.widthStack;

            for (let k = 0; k < cChoice.scores.length; k++) {
                const cScore = cChoice.scores[k];

                if (cChoice.isSelectableMultiple) {
                    delete cScore.isActiveMul;
                    delete cScore.isActiveMulMinus;
                } else {
                    delete cScore.isActive;
                }
                deleteDiscount(cScore);
            }
        }
    }

    if (typeof app.defaultBgColor !== 'undefined') {
        app.styling.backgroundColor = app.defaultBgColor;
        delete app.defaultBgColor;
    }
    if (typeof app.defaultBgImage !== 'undefined') {
        app.styling.backgroundImage = app.defaultBgImage;
        delete app.defaultBgImage;
    }
    if (typeof app.defaultBarBgColor !== 'undefined') {
        app.styling.barBackgroundColor = app.defaultBarBgColor;
        delete app.defaultBarBgColor;
    }
    if (typeof app.defaultBarIconColor !== 'undefined') {
        app.styling.barIconColor = app.defaultBarIconColor;
        delete app.defaultBarIconColor;
    }
    if (typeof app.defaultBarTextColor !== 'undefined') {
        app.styling.barTextColor = app.defaultBarTextColor;
        delete app.defaultBarTextColor;
    }
    delete app.bgColorStack;
    delete app.bgImageStack;
    delete app.barBgColorStack;
    delete app.barIconColorStack;
    delete app.barTextColorStack;
    app.btnBackpackIsOn = 0;
    app.showAllAddons = 0;
    app.isMute = false;
    app.curVolume = 100;

    if (bgmPlayer) {
        const player = get(bgmPlayer);

        if (player && typeof player.unMute === 'function') {
            player.unMute();
        }
    }

    mdObjects.splice(0);

    keys = [...activatedMap.keys()];

    for (let i = 0; i < keys.length; i++) {
        const cMap = choiceMap.get(keys[i]);

        if (typeof cMap !== 'undefined') {
            const aChoice = cMap.choice;

            if (checkRequirements(aChoice.requireds)  && checkPoints(aChoice, true)) {
                if (aChoice.discountOther) {
                    if (typeof aChoice.discountOperator !== 'undefined' && typeof aChoice.discountValue !== 'undefined') {
                        if (aChoice.isDisChoices) {
                            if (typeof aChoice.discountChoices !== 'undefined') {
                                for (let i = 0; i < aChoice.discountChoices.length; i++) {
                                    const cMap = choiceMap.get(aChoice.discountChoices[i]);
                                    if (typeof cMap !== 'undefined') {
                                        for (let j = 0; j < cMap.choice.scores.length; j++) {
                                            const score = cMap.choice.scores[j];
                                            if (!score.isNotDiscountable && (aChoice.discountPointTypes?.length === 0 || aChoice.discountPointTypes?.indexOf(score.id) !== -1)) {
                                                selectDiscount(aChoice, score);
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if (typeof aChoice.discountGroups !== 'undefined') {
                                for (let i = 0; i < aChoice.discountGroups.length; i++) {
                                    const groupData = groupMap.get(aChoice.discountGroups[i]);
                                    if (typeof groupData !== 'undefined') {
                                        for (let j = 0; j < groupData.elements.length; j++) {
                                            const cMap = choiceMap.get(groupData.elements[j]);
                                            if (typeof cMap !== 'undefined') {
                                                for (let k = 0; k < cMap.choice.scores.length; k++) {
                                                    const score = cMap.choice.scores[k];
                                                    if (!score.isNotDiscountable && (aChoice.discountPointTypes?.length === 0 || aChoice.discountPointTypes?.indexOf(score.id) !== -1)) {
                                                        selectDiscount(aChoice, score);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (aChoice.addToAllowChoice && typeof aChoice.idOfAllowChoice !== 'undefined' && typeof aChoice.numbAddToAllowChoice !== 'undefined') {
                    for (let i = 0; i < aChoice.idOfAllowChoice.length; i++) {
                        const tRow = rowMap.get(aChoice.idOfAllowChoice[i]);
                        if (typeof tRow !== 'undefined') {
                            tRow.allowedChoices += aChoice.numbAddToAllowChoice;
                        }
                    }
                }
            }
        }
    }

    for (let i = 0; i < keys.length; i++) {
        const cMap = choiceMap.get(keys[i]);

        if (typeof cMap !== 'undefined') {
            const aChoice = cMap.choice;
            const aRow = cMap.row;

            if (checkRequirements(aChoice.requireds) && checkPoints(aChoice, true)) {
                for (let j = 0; j < aChoice.scores.length; j++) {
                    const score = aChoice.scores[j];
                    const point = pointTypeMap.get(score.id);

                    if (typeof point !== 'undefined') {
                        if (aChoice.isSelectableMultiple && aChoice.isMultipleUseVariableultiple) {
                            for (let k = 0; k < aChoice.multipleUseVariable; k++) {
                                if (checkRequirements(score.requireds)) {
                                    if (typeof score.isActiveMul === 'undefined') score.isActiveMul = [];
                                    if (!score.isActiveMul[k]) {
                                        if (score.multiplyByTimes) {
                                            point.startingSum -= score.discountIsOn && typeof score.discountScore !== 'undefined' ? (score.discountScore * (k + 1)) : (score.value * (k + 1));
                                        } else {
                                            point.startingSum -= score.discountIsOn && typeof score.discountScore !== 'undefined' ? score.discountScore : score.value;
                                        }
                                        score.isActiveMul[k] = true;
                                    }
                                }
                            }
                        } else if (!aChoice.isSelectableMultiple) {
                            if (checkRequirements(score.requireds) && !score.isActive) {
                                point.startingSum -= score.discountIsOn && typeof score.discountScore !== 'undefined' ? score.discountScore : score.value;
                                score.isActive = true;
                            }
                        }
                    }
                }

                if (aChoice.multiplyPointtypeIsOn && typeof aChoice.pointTypeToMultiply !== 'undefined' && typeof aChoice.multiplyWithThis !== 'undefined') {
                    let count = 0;
                    aChoice.multiplyPointtypeIsOnCheck = true;
                    if (typeof aChoice.startingSumAtMultiply !== 'object') aChoice.startingSumAtMultiply = [];
                    for (let j = 0; j < aChoice.pointTypeToMultiply.length; j++) {
                        let point = pointTypeMap.get(aChoice.pointTypeToMultiply[j]);

                        if (typeof point !== 'undefined') {
                            if (aChoice.multiplyPointtypeIsId && typeof aChoice.multiplyWithThis === 'string') {
                                let calcPoint = pointTypeMap.get(aChoice.multiplyWithThis);

                                if (typeof calcPoint !== 'undefined') {
                                    aChoice.startingSumAtMultiply[j] = {value: point.startingSum, calcVal: calcPoint.startingSum};
                                    point.startingSum *= calcPoint.startingSum;
                                } else {
                                    count++;
                                }
                            } else if (typeof aChoice.multiplyWithThis === 'number') {
                                aChoice.startingSumAtMultiply[j] = {value: point.startingSum, calcVal: aChoice.multiplyWithThis};
                                point.startingSum *= aChoice.multiplyWithThis;
                            }
                        } else {
                            count++;
                        }
                    }
                    if (count === aChoice.pointTypeToMultiply.length) delete aChoice.multiplyPointtypeIsOnCheck;
                    if (aChoice.multiplyPointtypeIsOnCheck) mdObjects.push(aChoice);
                }

                if (aChoice.dividePointtypeIsOn && typeof aChoice.pointTypeToDivide !== 'undefined' && typeof aChoice.divideWithThis !== 'undefined') {
                    let count = 0;
                    aChoice.dividePointtypeIsOnCheck = true;
                    if (typeof aChoice.startingSumAtDivide !== 'object') aChoice.startingSumAtDivide = [];
                    for (let j = 0; j < aChoice.pointTypeToDivide.length; j++) {
                        let point = pointTypeMap.get(aChoice.pointTypeToDivide[j]);

                        if (typeof point !== 'undefined') {
                            if (aChoice.dividePointtypeIsId && typeof aChoice.divideWithThis === 'string') {
                                let calcPoint = pointTypeMap.get(aChoice.divideWithThis);

                                if (typeof calcPoint !== 'undefined') {
                                    if (calcPoint.startingSum === 0) {
                                        count++;
                                    } else {
                                        aChoice.startingSumAtDivide[j] = {value: point.startingSum, calcVal: calcPoint.startingSum};
                                        point.startingSum /= calcPoint.startingSum;
                                    }
                                } else {
                                    count++;
                                }
                            } else if (typeof aChoice.divideWithThis === 'number') {
                                if (aChoice.dividedWithThis === 0) {
                                    count++;
                                } else {
                                    aChoice.startingSumAtDivide[j] = {value: point.startingSum, calcVal: aChoice.divideWithThis};
                                    point.startingSum /= aChoice.divideWithThis;
                                }
                            }
                        } else {
                            count++;
                        }
                    }
                    if (count === aChoice.pointTypeToDivide.length) delete aChoice.dividePointtypeIsOnCheck;
                    if (!aChoice.multiplyPointtypeIsOnCheck && aChoice.dividePointtypeIsOnCheck) mdObjects.push(aChoice);
                }

                if (aChoice.changeBackground) {
                    if (aChoice.changeBgImage) {
                        if (typeof aChoice.bgImage !== 'undefined') {
                            if (typeof app.bgImageStack === 'undefined') {
                                app.bgImageStack = [];
                                app.defaultBgImage = app.styling.backgroundImage || '';
                            }
                            app.bgImageStack.push({id: aChoice.id, data: aChoice.bgImage});
                            app.styling.backgroundImage = aChoice.bgImage;
                        }
                    } else {
                        if (typeof aChoice.changedBgColorCode !== 'undefined') {
                            if (typeof app.bgColorStack === 'undefined') {
                                app.bgColorStack = [];
                                app.defaultBgColor = app.styling.backgroundColor || '';
                            }
                            app.bgColorStack.push({id: aChoice.id, data: aChoice.changedBgColorCode});
                            app.styling.backgroundColor = aChoice.changedBgColorCode;
                        }
                    }
                }
                
                if (aChoice.changePointBar) {
                    if (aChoice.changeBarBgColorIsOn && typeof aChoice.changedBarBgColor !== 'undefined') {
                        if (typeof app.barBgColorStack === 'undefined') {
                            app.barBgColorStack = [];
                            app.defaultBarBgColor = app.styling.barBackgroundColor || '#FFFFFFFF';
                        }
                        app.barBgColorStack.push({id: aChoice.id, data: aChoice.changedBarBgColor});
                        app.styling.barBackgroundColor = aChoice.changedBarBgColor;
                    }
                    if (aChoice.changeBarIconColorIsOn && typeof aChoice.changedBarIconColor !== 'undefined') {
                        if (typeof app.barIconColorStack === 'undefined') {
                            app.barIconColorStack = [];
                            app.defaultBarIconColor = app.styling.barIconColor || '#0000008A';
                        }
                        app.barIconColorStack.push({id: aChoice.id, data: aChoice.changedBarIconColor});
                        app.styling.barIconColor = aChoice.changedBarIconColor;
                    }
                    if (aChoice.changeBarTextColorIsOn && typeof aChoice.changedBarTextColor !== 'undefined') {
                        if (typeof app.barTextColorStack === 'undefined') {
                            app.barTextColorStack = [];
                            app.defaultBarTextColor = app.styling.barTextColor || '#000000';
                        }
                        app.barTextColorStack.push({id: aChoice.id, data: aChoice.changedBarTextColor});
                        app.styling.barTextColor = aChoice.changedBarTextColor;
                    }
                }

                if (aChoice.changeTemplates) {
                    if (aChoice.changeTemplatesList && aChoice.changeToThisTemplate) {
                        const list = aChoice.changeTemplatesList.split(',');
                        
                        for (let i = 0; i < list.length; i++) {
                            const item = list[i];
                            const cMap = choiceMap.get(item);
                            if (typeof cMap !== 'undefined') {
                                const tChoice = cMap.choice;
                                applyTemplate(tChoice, aChoice.id, aChoice.changeToThisTemplate);

                                if(aChoice.changeAddonTemplate) {
                                    for (let j = 0; j < tChoice.addons.length; j++) {
                                        const tAddon = tChoice.addons[j];
                                        applyTemplate(tAddon, aChoice.id, aChoice.changeToThisTemplate);
                                    }
                                }
                                continue;
                            }

                            const tRow = rowMap.get(item);
                            if (typeof tRow !== 'undefined') {
                                applyTemplate(tRow, aChoice.id, aChoice.changeToThisTemplate);
                                continue;
                            }

                            const groupData = groupMap.get(item[0]);
                            if (typeof groupData !== 'undefined') {
                                const groupRowEle = groupData.rowElements;

                                for (let j = 0; j < groupRowEle.length; j++) {
                                    const gtRow = rowMap.get(groupRowEle[j]);
                                    if (typeof gtRow !== 'undefined') {
                                        applyTemplate(gtRow, aChoice.id, aChoice.changeToThisTemplate);
                                    }
                                }
                                const groupEle = groupData.elements;                                    
                                for (let j = 0; j < groupEle.length; j++) {
                                    const gcMap = choiceMap.get(groupEle[j]);
                                    if (typeof gcMap !== 'undefined') {
                                        const gtChoice = gcMap.choice;
                                        applyTemplate(gtChoice, aChoice.id, aChoice.changeToThisTemplate);
                                    }
                                }
                                continue;
                            }
                        }
                    }
                }

                if (aChoice.changeWidth) {
                    if (aChoice.changeWidthList && aChoice.changeToThisWidth) {
                        const list = aChoice.changeWidthList.split(',');
                        
                        for (let i = 0; i < list.length; i++) {
                            const item = list[i];
                            const cMap = choiceMap.get(item);
                            if (typeof cMap !== 'undefined') {
                                const tChoice = cMap.choice;
                                applyWidth(tChoice, aChoice.id, aChoice.changeToThisWidth);
                                continue;
                            }

                            const tRow = rowMap.get(item);
                            if (typeof tRow !== 'undefined') {
                                applyWidth(tRow, aChoice.id, aChoice.changeToThisWidth);
                                continue;
                            }

                            const groupData = groupMap.get(item[0]);
                            if (typeof groupData !== 'undefined') {
                                const groupRowEle = groupData.rowElements;

                                for (let j = 0; j < groupRowEle.length; j++) {
                                    const gtRow = rowMap.get(groupRowEle[j]);
                                    if (typeof gtRow !== 'undefined') {
                                        applyWidth(gtRow, aChoice.id, aChoice.changeToThisWidth);
                                    }
                                }
                                const groupEle = groupData.elements;                                    
                                for (let j = 0; j < groupEle.length; j++) {
                                    const gcMap = choiceMap.get(groupEle[j]);
                                    if (typeof gcMap !== 'undefined') {
                                        const gtChoice = gcMap.choice;
                                        applyWidth(gtChoice, aChoice.id, aChoice.changeToThisWidth);
                                    }
                                }
                                continue;
                            }
                        }
                    }
                }

                if (aChoice.muteBgm && bgmPlayer) {
                    const player = get(bgmPlayer);

                    app.isMute = true;
                    if (player && typeof player.mute === 'function') {
                        player.mute();
                    }
                }

                if (aChoice.backpackBtnRequirement) {
                    app.btnBackpackIsOn += 1;
                }

                if (aChoice.showAllAddons) {
                    app.showAllAddons += 1;
                }

                aRow.currentChoices += 1;
            } else {
                if (aChoice.discountOther) {
                    if (typeof aChoice.discountOperator !== 'undefined' && typeof aChoice.discountValue !== 'undefined') {
                        if (aChoice.isDisChoices) {
                            if (typeof aChoice.discountChoices !== 'undefined') {
                                for (let i = 0; i < aChoice.discountChoices.length; i++) {
                                    const cMap = choiceMap.get(aChoice.discountChoices[i]);
                                    if (typeof cMap !== 'undefined') {
                                        for (let j = 0; j < cMap.choice.scores.length; j++) {
                                            const score = cMap.choice.scores[j];
                                            if (!score.isNotDiscountable && (aChoice.discountPointTypes?.length === 0 || aChoice.discountPointTypes?.indexOf(score.id) !== -1)) {
                                                deselectDiscount(aChoice, score);
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if (typeof aChoice.discountGroups !== 'undefined') {
                                for (let i = 0; i < aChoice.discountGroups.length; i++) {
                                    const groupData = groupMap.get(aChoice.discountGroups[i]);
                                    if (typeof groupData !== 'undefined') {
                                        for (let j = 0; j < groupData.elements.length; j++) {
                                            const cMap = choiceMap.get(groupData.elements[j]);
                                            if (typeof cMap !== 'undefined') {
                                                for (let k = 0; k < cMap.choice.scores.length; k++) {
                                                    const score = cMap.choice.scores[k];
                                                    if (!score.isNotDiscountable && (aChoice.discountPointTypes?.length === 0 || aChoice.discountPointTypes?.indexOf(score.id) !== -1)) {
                                                        deselectDiscount(aChoice, score);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (aChoice.addToAllowChoice && typeof aChoice.idOfAllowChoice !== 'undefined' && typeof aChoice.numbAddToAllowChoice !== 'undefined') {
                    for (let i = 0; i < aChoice.idOfAllowChoice.length; i++) {
                        const tRow = rowMap.get(aChoice.idOfAllowChoice[i]);
                        if (typeof tRow !== 'undefined') {
                            tRow.allowedChoices -= aChoice.numbAddToAllowChoice;
                        }
                    }
                }

                activatedMap.delete(aChoice.id);

                if (aChoice.forcedActivated) {
                    tmpActivatedMap.set(aChoice.id, {multiple: aChoice.multipleUseVariable});
                }
            }
        } else {
            activatedMap.delete(keys[i]);
        }
    }
};
function updateScores(localChoice: Choice, tmpScores: TempScore, count: number, changedScores = new Set<string>()) {
    Array.from(activatedMap.entries()).forEach(([id]) => {
        const cMap = choiceMap.get(id);
        if (typeof cMap !== 'undefined') {
            const aRow = cMap.row;
            const aChoice = cMap.choice;
            const thisTmpScores = new SvelteMap<string, number>();
            let isChanged = false;
            for (let i = 0; i < aChoice.scores.length; i++) {
                const aScore = aChoice.scores[i];
                if (!aScore.isNotRecalculatable) {
                    const point = pointTypeMap.get(aScore.id);
                    if (typeof point !== 'undefined') {
                        if (localChoice.discountOther && aScore.isChangeDiscount && typeof aScore.tmpDisScore !== 'undefined') {
                            const mul = aChoice.multipleUseVariable;

                            if (aChoice.isSelectableMultiple && aChoice.isMultipleUseVariable && typeof aChoice.numMultipleTimesMinus !== 'undefined') {
                                for (let j = mul - 1; j >= 0; j--) {
                                    if (aChoice.isActive) {
                                        point.startingSum += aScore.tmpDisScore;
                                    }
                                }

                                if (aChoice.isActive) {
                                    thisTmpScores.set(aScore.id, aScore.tmpDisScore);
                                    delete aScore.isChangeDiscount;
                                    delete aScore.tmpDisScore;
                                }
                            } else if (!aChoice.isSelectableMultiple) {
                                    point.startingSum += aScore.tmpDisScore;
                                    thisTmpScores.set(aScore.id, aScore.tmpDisScore);
                                    delete aScore.isChangeDiscount;
                                    delete aScore.tmpDisScore;
                            }
                        }
                        if (!changedScores.has(aScore.idx)) {
                            const hasScore = localChoice.scores.length > 0;
                                const scoreLeng = localChoice.scores.length || 1;
                                for (let j = 0; j < scoreLeng; j++) {
                                    const lScore = hasScore ? localChoice.scores[j] : null;
                                    const tmpScore = lScore ? (tmpScores.get(lScore.id) || 0) : 0;
                                    const lPoint = lScore ? pointTypeMap.get(lScore.id) : null;
                                    if (!hasScore || hasScore && lPoint) {
                                    if (aChoice.isActive) {
                                        const afterSelected = checkRequirements(aScore.requireds);
                                        const tmpActivated: SvelteMap<string, ActivatedMap> = new SvelteMap(JSON.parse(JSON.stringify([...activatedMap])));
                                        tmpActivated.delete(localChoice.id);
                                        aRow.currentChoices -= 1;
                                        if (lPoint) lPoint.startingSum += tmpScore;
                                        const beforeSelected = checkRequirements(aScore.requireds, tmpActivated);
                                        aRow.currentChoices += 1;
                                        if (lPoint) lPoint.startingSum -= tmpScore;
                                        if (beforeSelected !== afterSelected) {
                                            let scoreVal = aScore.discountIsOn && typeof aScore.discountScore !== 'undefined' ? aScore.discountScore : aScore.value;
                                            if (beforeSelected) {
                                                if (aChoice.isSelectableMultiple && aChoice.isMultipleUseVariable && typeof aChoice.numMultipleTimesMinus !== 'undefined') {
                                                    const mul = aChoice.multipleUseVariable;
                                                    
                                                    for (let k = mul - 1; k >= 0; k--) {
                                                        if (typeof aScore.isActiveMul !== 'undefined' && aScore.isActiveMul[k]) {
                                                            point.startingSum += scoreVal;
                                                            thisTmpScores.set(aScore.id, scoreVal);
                                                            aScore.isActiveMul[k] = false;
                                                        }
                                                    }
                                                } else if (!aChoice.isSelectableMultiple) {
                                                    if (aScore.isActive) {
                                                        point.startingSum += scoreVal;
                                                        thisTmpScores.set(aScore.id, scoreVal);
                                                        delete aScore.isActive;
                                                    }
                                                }
                                            } else {
                                                if (aChoice.isSelectableMultiple && aChoice.isMultipleUseVariable && typeof aChoice.numMultipleTimesMinus !== 'undefined') {
                                                    const mul = aChoice.multipleUseVariable;
                                                    if (typeof aScore.isActiveMul === 'undefined') aScore.isActiveMul = [];
                                                    for (let k = mul - 1; k >= 0; k--) {
                                                        if (!aScore.isActiveMul[k]) {
                                                            point.startingSum -= scoreVal;
                                                            thisTmpScores.set(aScore.id, scoreVal);
                                                            aScore.isActiveMul[k] = true;
                                                        }
                                                    }
                                                } else if (!aChoice.isSelectableMultiple) {
                                                    if (!aScore.isActive) {
                                                        point.startingSum -= scoreVal;
                                                        thisTmpScores.set(aScore.id, scoreVal);
                                                        aScore.isActive = true;
                                                    }
                                                }
                                            }
                                            isChanged = true;
                                            changedScores.add(aScore.idx);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (isChanged) updateScores(aChoice, thisTmpScores, ++count, changedScores);
        }
    });
};
function selectObject(str: string, newActivatedList: string[]) {
    let cStr = str.split('/IMG#');
    const strImg = cStr.length > 1 ? cStr[1] : '';
    cStr = cStr[0].split('/WORD#');
    const strWord = cStr.length > 1 ? cStr[1].replace(/\/CHAR#/g, ',') : '';
    cStr = cStr[0].split('/RND#');
    const strRnd = cStr.length > 1 ? cStr[1].split('/AND#') : '';
    const strId = cStr[0];
    const cMap = choiceMap.get(strId);

    if (typeof cMap !== 'undefined') {
        const localRow = cMap.row;
        const localChoice = cMap.choice;

        for (let i = 0; i < localChoice.scores.length; i++) {
            const score = localChoice.scores[i];
            const point = pointTypeMap.get(score.id);
            if (typeof point !== 'undefined' && score.isRandom && !score.setValue && typeof score.maxValue !== 'undefined' && typeof score.minValue !== 'undefined') {
                score.value = Math.floor(Math.random() * (score.maxValue - score.minValue + 1)) + score.minValue;
                score.value = point.allowFloat ? score.value : Math.floor(score.value);
                score.setValue = true;
            }
        }
        const tmpScores = new SvelteMap<string, number>();

        localChoice.isActive = true;
        activatedMap.set(localChoice.id, {multiple: 0});
        localRow.currentChoices += 1;

        if (localChoice.discountOther) {
            if (typeof localChoice.discountOperator !== 'undefined' && typeof localChoice.discountValue !== 'undefined') {
                if (localChoice.isDisChoices) {
                    const dList = new Set<string>();
                    if (typeof localChoice.discountRows !== 'undefined') {
                        for (let i = 0; i < localChoice.discountRows.length; i++) {
                            const dRow = rowMap.get(localChoice.discountRows[i]);
                            if (typeof dRow !== 'undefined') {
                                for (let j = 0; j < dRow.objects.length; j++) {
                                    const dChoice = dRow.objects[j];
                                    for (let k = 0; k < dChoice.scores.length; k++) {
                                        const score = dChoice.scores[k];
                                        if (!score.isNotDiscountable && (localChoice.discountPointTypes?.length === 0 || localChoice.discountPointTypes?.indexOf(score.id) !== -1)) {
                                            selectDiscount(localChoice, score);
                                        }
                                    }
                                    dList.add(dChoice.id);
                                }
                            }
                        }
                    }
                    if (typeof localChoice.discountChoices !== 'undefined') {
                        for (let i = 0; i < localChoice.discountChoices.length; i++) {
                            if (!dList.has(localChoice.discountChoices[i])) {
                                const cMap = choiceMap.get(localChoice.discountChoices[i]);
                                if (typeof cMap !== 'undefined') {
                                    const dChoice = cMap.choice;
                                    for (let j = 0; j < dChoice.scores.length; j++) {
                                        const score = dChoice.scores[j];
                                        if (!score.isNotDiscountable && (localChoice.discountPointTypes?.length === 0 || localChoice.discountPointTypes?.indexOf(score.id) !== -1)) {
                                            selectDiscount(localChoice, score);
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (typeof localChoice.discountGroups !== 'undefined') {
                        for (let i = 0; i < localChoice.discountGroups.length; i++) {
                            const groupData = groupMap.get(localChoice.discountGroups[i]);
                            if (typeof groupData !== 'undefined') {
                                for (let j = 0; j < groupData.elements.length; j++) {
                                    const cMap = choiceMap.get(groupData.elements[j]);
                                    if (typeof cMap !== 'undefined') {
                                        for (let k = 0; k < cMap.choice.scores.length; k++) {
                                            const score = cMap.choice.scores[k];
                                            if (!score.isNotDiscountable && (localChoice.discountPointTypes?.length === 0 || localChoice.discountPointTypes?.indexOf(score.id) !== -1)) {
                                                selectDiscount(localChoice, score);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        for (let i = 0; i < localChoice.scores.length; i++) {
            const score = localChoice.scores[i];
            if (checkRequirements(score.requireds) && !score.isActive) {
                const point = pointTypeMap.get(score.id);
                if (typeof point !== 'undefined') {
                    let val = score.discountIsOn && typeof score.discountScore !== 'undefined' ? score.discountScore : score.value;
                    val = point.allowFloat ? val : Math.floor(val);
                    point.startingSum -= val;
                    score.isActive = true;
                    let tmpScore = tmpScores.get(score.id);
                    if (typeof tmpScore !== 'undefined') {
                        tmpScores.set(score.id, val + tmpScore);
                    } else {
                        tmpScores.set(score.id, val);
                    }
                }
            }
        }

        if (localChoice.duplicateRow) {
            if (typeof localChoice.duplicateRowId !== 'undefined' && typeof localChoice.duplicateRowPlace !== 'undefined') {
                duplicateRow(localChoice, localRow);
            }
        }
        
        if (localChoice.activateOtherChoice && typeof localChoice.activateThisChoice !== 'undefined') {
            const activatedIds = new Set(newActivatedList.map(item => item.split('/ON#')[0]));

            if (localChoice.isActivateRandom && typeof localChoice.numActivateRandom !== 'undefined') {
                if (strRnd === '') {
                    let rList = localChoice.activateThisChoice.split(',').filter(item => activatedIds.has(item.split('/ON#')[0]));
                    const rNum = localChoice.numActivateRandom > rList.length ? rList.length : localChoice.numActivateRandom;
                    let tmpSet = new Set<string>();

                    for (let i = 0; i < rList.length; i++) {
                        const cMap = choiceMap.get(rList[i]);

                        if (typeof cMap !== 'undefined') {
                            const rChoice = cMap.choice;

                            if (!checkRequirements(rChoice.requireds)) {
                                const tmp = rList[i];

                                rList.splice(i, 1);
                                rList.push(tmp);
                            }
                        }
                    }

                    for (let i = rList.length - 1; i >= 0; i--) {
                        tmpSet.add(rList[i]);
                    }

                    rList = [...tmpSet].reverse();
                    localChoice.activatedRandom = rList.slice(0, rNum);

                    for (let i = 0; i < rNum; i++) {
                        const rId = localChoice.activatedRandom[i].split('/ON#');
                        const cMap = choiceMap.get(rId[0]);

                        if (typeof cMap !== 'undefined') {
                            const rChoice = cMap.choice;

                            if (!localChoice.isAllowDeselect) {
                                if (rChoice.isSelectableMultiple && rChoice.isMultipleUseVariable) {
                                    const tmpNum = parseInt(rId[1]);
                                    for (let j = 0; j < Math.abs(tmpNum); j++) {
                                        if (tmpNum > 0 && typeof rChoice.numMultipleTimesMinus !== 'undefined') {
                                            rChoice.numMultipleTimesMinus++;
                                        } else if (tmpNum < 0 && typeof rChoice.numMultipleTimesPluss !== 'undefined') {
                                            rChoice.numMultipleTimesPluss--;
                                        }
                                    }
                                }
                                rChoice.forcedActivated = true;
                            }
                        }
                    }
                } else {
                    let rList = strRnd.filter(item => activatedIds.has(item.split('/RON#')[0]));

                    localChoice.activatedRandom = rList;

                    for (let i = 0; i < rList.length; i++) {
                        const rId = localChoice.activatedRandom[i].split('/RON#');
                        const cMap = choiceMap.get(rId[0]);
                        
                        if (typeof cMap !== 'undefined') {
                            const rChoice = cMap.choice;

                            if (!localChoice.isAllowDeselect) {
                                if (rChoice.isSelectableMultiple && rChoice.isMultipleUseVariable) {
                                    const tmpNum = parseInt(rId[1]);
                                    for (let j = 0; j < Math.abs(tmpNum); j++) {
                                        if (tmpNum > 0 && typeof rChoice.numMultipleTimesMinus !== 'undefined') {
                                            rChoice.numMultipleTimesMinus++;
                                        } else if (tmpNum < 0 && typeof rChoice.numMultipleTimesPluss !== 'undefined') {
                                            rChoice.numMultipleTimesPluss--;
                                        }
                                    }
                                }
                                rChoice.forcedActivated = true;
                            }
                        }
                    }
                }
            } else {
                const list = localChoice.activateThisChoice.split(',').filter(item => activatedIds.has(item.split('/ON#')[0]));
                for (let i = 0; i < list.length; i++) {
                    const item = list[i].split('/ON#');
                    const forceNum = item.length > 1 ? parseInt(item[1]) : 0;
                    const cMap = choiceMap.get(item[0]);
                    if (typeof cMap !== 'undefined') {
                        const fChoice = cMap.choice;
                        
                        if (!localChoice.isAllowDeselect) {
                            if (fChoice.isSelectableMultiple && fChoice.isMultipleUseVariable) {
                                if (localChoice.isSelectableMultiple && localChoice.isMultipleUseVariable) {
                                    for (let j = 0; j < Math.abs(localChoice.multipleUseVariable); j++) {
                                        for (let k = 0; k < Math.abs(forceNum); k++) {
                                            if (forceNum > 0 && typeof fChoice.numMultipleTimesMinus !== 'undefined') {
                                                fChoice.numMultipleTimesMinus++;
                                            } else if (forceNum < 0 && typeof fChoice.numMultipleTimesPluss !== 'undefined') {
                                                fChoice.numMultipleTimesPluss--;
                                            }
                                        }
                                    }
                                } else {
                                    for (let j = 0; j < Math.abs(forceNum); j++) {
                                        if (forceNum > 0 && typeof fChoice.numMultipleTimesMinus !== 'undefined') {
                                            fChoice.numMultipleTimesMinus++;
                                        } else if (forceNum < 0 && typeof fChoice.numMultipleTimesPluss !== 'undefined') {
                                            fChoice.numMultipleTimesPluss--;
                                        }
                                    }
                                }
                            }
                            fChoice.forcedActivated = true;
                        }
                    } else {
                        const groupData = groupMap.get(item[0]);
                        if (typeof groupData !== 'undefined') {
                            const groupEle = groupData.elements;
                            for (let j = 0; j < groupEle.length; j++) {
                                const cMap = choiceMap.get(groupEle[j]);
                                if (typeof cMap !== 'undefined') {
                                    const fChoice = cMap.choice;
                                    
                                    if (!localChoice.isAllowDeselect) {
                                        if (fChoice.isSelectableMultiple && fChoice.isMultipleUseVariable) {
                                            if (localChoice.isSelectableMultiple && localChoice.isMultipleUseVariable) {
                                                for (let k = 0; k < Math.abs(localChoice.multipleUseVariable); k++) {
                                                    for (let l = 0; l < Math.abs(forceNum); l++) {
                                                        if (forceNum > 0 && typeof fChoice.numMultipleTimesMinus !== 'undefined') {
                                                            fChoice.numMultipleTimesMinus++;
                                                        } else if (forceNum < 0 && typeof fChoice.numMultipleTimesPluss !== 'undefined') {
                                                            fChoice.numMultipleTimesPluss--;
                                                        }
                                                    }
                                                }
                                            } else {
                                                for (let k = 0; k < Math.abs(forceNum); k++) {
                                                    if (forceNum > 0 && typeof fChoice.numMultipleTimesMinus !== 'undefined') {
                                                        fChoice.numMultipleTimesMinus++;
                                                    } else if (forceNum < 0 && typeof fChoice.numMultipleTimesPluss !== 'undefined') {
                                                        fChoice.numMultipleTimesPluss--;
                                                    }
                                                }
                                            }
                                        }
                                        fChoice.forcedActivated = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if (localChoice.multiplyPointtypeIsOn && typeof localChoice.pointTypeToMultiply !== 'undefined' && typeof localChoice.multiplyWithThis !== 'undefined') {
            let count = 0;
            localChoice.multiplyPointtypeIsOnCheck = true;
            if (typeof localChoice.startingSumAtMultiply !== 'object') localChoice.startingSumAtMultiply = [];
            for (let i = 0; i < localChoice.pointTypeToMultiply.length; i++) {
                let point = pointTypeMap.get(localChoice.pointTypeToMultiply[i]);

                if (typeof point !== 'undefined') {
                    if (localChoice.multiplyPointtypeIsId && typeof localChoice.multiplyWithThis === 'string') {
                        let calcPoint = pointTypeMap.get(localChoice.multiplyWithThis);

                        if (typeof calcPoint !== 'undefined') {
                            localChoice.startingSumAtMultiply[i] = {value: point.startingSum, calcVal: calcPoint.startingSum};
                            point.startingSum *= calcPoint.startingSum;
                            point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                        } else {
                            count++;
                        }
                    } else if (typeof localChoice.multiplyWithThis === 'number') {
                        localChoice.startingSumAtMultiply[i] = {value: point.startingSum, calcVal: localChoice.multiplyWithThis};
                        point.startingSum *= localChoice.multiplyWithThis;
                        point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                    }
                } else {
                    count++;
                }
            }
            if (count === localChoice.pointTypeToMultiply.length) delete localChoice.multiplyPointtypeIsOnCheck;
            if (localChoice.multiplyPointtypeIsOnCheck) mdObjects.push(localChoice);
        }

        if (localChoice.dividePointtypeIsOn && typeof localChoice.pointTypeToDivide !== 'undefined' && typeof localChoice.divideWithThis !== 'undefined') {
            let count = 0;
            localChoice.dividePointtypeIsOnCheck = true;
            if (typeof localChoice.startingSumAtDivide !== 'object') localChoice.startingSumAtDivide = [];
            for (let i = 0; i < localChoice.pointTypeToDivide.length; i++) {
                let point = pointTypeMap.get(localChoice.pointTypeToDivide[i]);

                if (typeof point !== 'undefined') {
                    if (localChoice.dividePointtypeIsId && typeof localChoice.divideWithThis === 'string') {
                        let calcPoint = pointTypeMap.get(localChoice.divideWithThis);

                        if (typeof calcPoint !== 'undefined') {
                            if (calcPoint.startingSum === 0) {
                                count++;
                            } else {
                                localChoice.startingSumAtDivide[i] = {value: point.startingSum, calcVal: calcPoint.startingSum};
                                point.startingSum /= calcPoint.startingSum;
                                point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                            }
                        } else {
                            count++;
                        }
                    } else if (typeof localChoice.divideWithThis === 'number') {
                        if (localChoice.dividedWithThis === 0) {
                            count++;
                        } else {
                            localChoice.startingSumAtDivide[i] = {value: point.startingSum, calcVal: localChoice.divideWithThis};
                            point.startingSum /= localChoice.divideWithThis;
                            point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                        }
                    }
                } else {
                    count++;
                }
            }
            if (count === localChoice.pointTypeToDivide.length) delete localChoice.dividePointtypeIsOnCheck;
            if (!localChoice.multiplyPointtypeIsOnCheck && localChoice.dividePointtypeIsOnCheck) mdObjects.push(localChoice);
        }

        if (localChoice.isChangeVariables && typeof localChoice.changedVariables !== 'undefined') {
            for (let i = 0; i < localChoice.changedVariables.length; i++) {
                const variable = variableMap.get(localChoice.changedVariables[i]);
                if (typeof variable !== 'undefined') {
                    if (localChoice.changeType === '1') {
                        variable.isTrue = true;
                    } else if (localChoice.changeType === '2') {
                        variable.isTrue = false;
                    } else if (localChoice.changeType === '3') {
                        variable.isTrue = !variable.isTrue;
                    }
                }
            }
        }

        if (localChoice.addToAllowChoice && typeof localChoice.idOfAllowChoice !== 'undefined' && typeof localChoice.numbAddToAllowChoice !== 'undefined') {
            for (let i = 0; i < localChoice.idOfAllowChoice.length; i++) {
                const aRow = rowMap.get(localChoice.idOfAllowChoice[i]);
                if (typeof aRow !== 'undefined') {
                    aRow.allowedChoices += localChoice.numbAddToAllowChoice;
                }
            }
        }

        if (localChoice.textfieldIsOn && typeof localChoice.idOfTheTextfieldWord !== 'undefined' && typeof localChoice.wordChangeSelect !== 'undefined') {
            const word = wordMap.get(localChoice.idOfTheTextfieldWord);
            if (typeof word !== 'undefined') {
                if (localChoice.customTextfieldIsOn) {
                    word.replaceText = strWord;
                } else {
                    word.replaceText = localChoice.wordChangeSelect;
                }
            }
        }

        if (localChoice.isImageUpload) {
            localChoice.defaultImage = localChoice.image;
            localChoice.image = strImg;
        }

        if (localChoice.backpackBtnRequirement) {
            if (typeof app.btnBackpackIsOn === 'undefined') app.btnBackpackIsOn = 0;
            app.btnBackpackIsOn += 1;
        }

        if (localChoice.showAllAddons) {
            if (typeof app.showAllAddons === 'undefined') app.showAllAddons = 0;
            app.showAllAddons += 1;
        }

        if (localChoice.changeBackground) {
            if (localChoice.changeBgImage) {
                if (typeof localChoice.bgImage !== 'undefined') {
                    if (typeof app.bgImageStack === 'undefined') {
                        app.bgImageStack = [];
                        app.defaultBgImage = app.styling.backgroundImage || '';
                    }
                    app.bgImageStack.push({id: localChoice.id, data: localChoice.bgImage});
                    app.styling.backgroundImage = localChoice.bgImage;
                }
            } else {
                if (typeof localChoice.changedBgColorCode !== 'undefined') {
                    if (typeof app.bgColorStack === 'undefined') {
                        app.bgColorStack = [];
                        app.defaultBgColor = app.styling.backgroundColor || '';
                    }
                    app.bgColorStack.push({id: localChoice.id, data: localChoice.bgColor});
                    app.styling.backgroundColor = localChoice.bgColor;
                }
            }
        }
        
        if (localChoice.changePointBar) {
            if (localChoice.changeBarBgColorIsOn && typeof localChoice.changedBarBgColor !== 'undefined') {
                if (typeof app.barBgColorStack === 'undefined') {
                    app.barBgColorStack = [];
                    app.defaultBarBgColor = app.styling.barBackgroundColor || '#FFFFFFFF';
                }
                app.barBgColorStack.push({id: localChoice.id, data: localChoice.changedBarBgColor});
                app.styling.barBackgroundColor = localChoice.changedBarBgColor;
            }
            if (localChoice.changeBarIconColorIsOn && typeof localChoice.changedBarIconColor !== 'undefined') {
                if (typeof app.barIconColorStack === 'undefined') {
                    app.barIconColorStack = [];
                    app.defaultBarIconColor = app.styling.barIconColor || '#0000008A';
                }
                app.barIconColorStack.push({id: localChoice.id, data: localChoice.changedBarIconColor});
                app.styling.barIconColor = localChoice.changedBarIconColor;
            }
            if (localChoice.changeBarTextColorIsOn && typeof localChoice.changedBarTextColor !== 'undefined') {
                if (typeof app.barTextColorStack === 'undefined') {
                    app.barTextColorStack = [];
                    app.defaultBarTextColor = app.styling.barTextColor || '#000000';
                }
                app.barTextColorStack.push({id: localChoice.id, data: localChoice.changedBarTextColor});
                app.styling.barTextColor = localChoice.changedBarTextColor;
            }
        }

        if (localChoice.changeTemplates) {
            if (localChoice.changeTemplatesList && localChoice.changeToThisTemplate) {
                const list = localChoice.changeTemplatesList.split(',');
                
                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    const cMap = choiceMap.get(item);
                    if (typeof cMap !== 'undefined') {
                        const tChoice = cMap.choice;
                        applyTemplate(tChoice, localChoice.id, localChoice.changeToThisTemplate);

                        if(localChoice.changeAddonTemplate) {
                            for (let j = 0; j < tChoice.addons.length; j++) {
                                const tAddon = tChoice.addons[j];
                                applyTemplate(tAddon, localChoice.id, localChoice.changeToThisTemplate);
                            }
                        }
                        continue;
                    }

                    const tRow = rowMap.get(item);
                    if (typeof tRow !== 'undefined') {
                        applyTemplate(tRow, localChoice.id, localChoice.changeToThisTemplate);
                        continue;
                    }

                    const groupData = groupMap.get(item[0]);
                    if (typeof groupData !== 'undefined') {
                        const groupRowEle = groupData.rowElements;

                        for (let j = 0; j < groupRowEle.length; j++) {
                            const gtRow = rowMap.get(groupRowEle[j]);
                            if (typeof gtRow !== 'undefined') {
                                applyTemplate(gtRow, localChoice.id, localChoice.changeToThisTemplate);
                            }
                        }
                        const groupEle = groupData.elements;                                    
                        for (let j = 0; j < groupEle.length; j++) {
                            const gcMap = choiceMap.get(groupEle[j]);
                            if (typeof gcMap !== 'undefined') {
                                const gtChoice = gcMap.choice;
                                applyTemplate(gtChoice, localChoice.id, localChoice.changeToThisTemplate);
                            }
                        }
                        continue;
                    }
                }
            }
        }

        if (localChoice.changeWidth) {
            if (localChoice.changeWidthList && localChoice.changeToThisWidth) {
                const list = localChoice.changeWidthList.split(',');
                
                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    const cMap = choiceMap.get(item);
                    if (typeof cMap !== 'undefined') {
                        const tChoice = cMap.choice;
                        applyWidth(tChoice, localChoice.id, localChoice.changeToThisWidth);
                        continue;
                    }

                    const tRow = rowMap.get(item);
                    if (typeof tRow !== 'undefined') {
                        applyWidth(tRow, localChoice.id, localChoice.changeToThisWidth);
                        continue;
                    }

                    const groupData = groupMap.get(item[0]);
                    if (typeof groupData !== 'undefined') {
                        const groupRowEle = groupData.rowElements;

                        for (let j = 0; j < groupRowEle.length; j++) {
                            const gtRow = rowMap.get(groupRowEle[j]);
                            if (typeof gtRow !== 'undefined') {
                                applyWidth(gtRow, localChoice.id, localChoice.changeToThisWidth);
                            }
                        }
                        const groupEle = groupData.elements;                                    
                        for (let j = 0; j < groupEle.length; j++) {
                            const gcMap = choiceMap.get(groupEle[j]);
                            if (typeof gcMap !== 'undefined') {
                                const gtChoice = gcMap.choice;
                                applyWidth(gtChoice, localChoice.id, localChoice.changeToThisWidth);
                            }
                        }
                        continue;
                    }
                }
            }
        }

        if (localChoice.setBgmIsOn) {
            if (localChoice.bgmId) {
                bgmVariables.bgmIsPlaying = true;
                
                if (bgmVariables.isBgmInit) {
                    playBgm(localChoice, localChoice.bgmId, 0);
                } else {
                    initYoutubePlayer(localChoice);
                    bgmVariables.isBgmInit = true;
                }
            }
        }

        if (localChoice.muteBgm && bgmPlayer) {
            const player = get(bgmPlayer);

            if (player && typeof player.mute === 'function') {
                app.isMute = true;
                player.mute();
            }
        }

        if (localChoice.isContentHidden && typeof localChoice.hiddenContentsRow !== 'undefined' && typeof localChoice.hiddenContentsType !== 'undefined') {
            for (let i = 0; i < localChoice.hiddenContentsRow.length; i++) {
                const hRow = rowMap.get(localChoice.hiddenContentsRow[i]);
                if (typeof hRow !== 'undefined') {
                    if (!hRow.textIsRemoved) hRow.textIsRemoved = true;
                    for (let j = 0; j < localChoice.hiddenContentsType.length; j++) {
                        switch (localChoice.hiddenContentsType[j]) {
                            case '1':
                                hRow.objectTitleRemoved = true;
                                break;
                            case '2':
                                hRow.objectImageRemoved = true;
                                break;
                            case '3':
                                hRow.objectTextRemoved = true;
                                break;
                            case '4':
                                hRow.objectScoreRemoved = true;
                                break;
                            case '5':
                                hRow.objectRequirementRemoved = true;
                                break;
                            case '6':
                                hRow.addonTitleRemoved = true;
                                break;
                            case '7':
                                hRow.addonImageRemoved = true;
                                break;
                            case '8':
                                hRow.addonTextRemoved = true;
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }
        updateScores(localChoice, tmpScores, 0);
    }
}
function selectedOneMore(str: string[], newActivatedList: string[]) {
    const strRnd = str.length > 1 ? str[1].split('/AND#') : '';
    const strId = str[0].split('/ON#');
    const cMap = choiceMap.get(strId[0]);

    if (typeof cMap !== 'undefined') {
        const localChoice = cMap.choice;
        const localRow = cMap.row;

        for (let i = 0; i < localChoice.scores.length; i++) {
            const score = localChoice.scores[i];
            const point = pointTypeMap.get(score.id);
            if (typeof point !== 'undefined' && score.isRandom && !score.setValue && typeof score.maxValue !== 'undefined' && typeof score.minValue !== 'undefined') {
                score.value = Math.floor(Math.random() * (score.maxValue - score.minValue + 1)) + score.minValue;
                score.value = point.allowFloat ? score.value : Math.floor(score.value);
                score.setValue = true;
            }
        }

        const tmpScores = new SvelteMap<string, number>();
        const wasActive = localChoice.isActive;
        const isPos = localChoice.multipleUseVariable >= 0;
        const selNum = Math.abs(localChoice.multipleUseVariable);

        if (!localChoice.isActive) {
            localChoice.isActive = true;
            localRow.currentChoices += 1;
        }
        localChoice.multipleUseVariable += 1;
        activatedMap.set(localChoice.id, {multiple: localChoice.multipleUseVariable});

        if (isPos) {
            if (localChoice.discountOther) {
                if (typeof localChoice.discountOperator !== 'undefined' && typeof localChoice.discountValue !== 'undefined') {
                    if (localChoice.isDisChoices) {
                        const dList = new Set<string>();
                        if (typeof localChoice.discountRows !== 'undefined') {
                            for (let i = 0; i < localChoice.discountRows.length; i++) {
                                const dRow = rowMap.get(localChoice.discountRows[i]);
                                if (typeof dRow !== 'undefined') {
                                    for (let j = 0; j < dRow.objects.length; j++) {
                                        const dChoice = dRow.objects[j];
                                        for (let k = 0; k < dChoice.scores.length; k++) {
                                            const score = dChoice.scores[k];
                                            if (!score.isNotDiscountable && (localChoice.discountPointTypes?.length === 0 || localChoice.discountPointTypes?.indexOf(score.id) !== -1)) {
                                                selectDiscount(localChoice, score);
                                            }
                                        }
                                        dList.add(dChoice.id);
                                    }
                                }
                            }
                        }
                        if (typeof localChoice.discountChoices !== 'undefined') {
                            for (let i = 0; i < localChoice.discountChoices.length; i++) {
                                const cMap = choiceMap.get(localChoice.discountChoices[i]);
                                if (typeof cMap !== 'undefined') {
                                    const dChoice = cMap.choice;
                                    if (!dList.has(dChoice.id)) {
                                        for (let j = 0; j < dChoice.scores.length; j++) {
                                            const score = dChoice.scores[j];
                                            if (!score.isNotDiscountable && (localChoice.discountPointTypes?.length === 0 || localChoice.discountPointTypes?.indexOf(score.id) !== -1)) {
                                                selectDiscount(localChoice, score);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (typeof localChoice.discountGroups !== 'undefined') {
                            for (let i = 0; i < localChoice.discountGroups.length; i++) {
                                const groupData = groupMap.get(localChoice.discountGroups[i]);
                                if (typeof groupData !== 'undefined') {
                                    for (let j = 0; j < groupData.elements.length; j++) {
                                        const cMap = choiceMap.get(groupData.elements[j]);
                                        if (typeof cMap !== 'undefined') {
                                            for (let k = 0; k < cMap.choice.scores.length; k++) {
                                                const score = cMap.choice.scores[k];
                                                if (!score.isNotDiscountable && (localChoice.discountPointTypes?.length === 0 || localChoice.discountPointTypes?.indexOf(score.id) !== -1)) {
                                                    selectDiscount(localChoice, score);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        for (let i = 0; i < localChoice.scores.length; i++) {
            const score = localChoice.scores[i];
            if (typeof score.isActiveMul === 'undefined') score.isActiveMul = [];
            if (checkRequirements(score.requireds) && !score.isActiveMul[selNum]) {
                const point = pointTypeMap.get(score.id);
                if (typeof point !== 'undefined') {
                    let val = score.discountIsOn && typeof score.discountScore !== 'undefined' ? score.discountScore : score.value;
                    val = point.allowFloat ? val : Math.floor(val);
                    if (score.multiplyByTimes) {
                        val = val * (selNum + 1);
                    }
                    point.startingSum -= val;
                    score.isActiveMul[selNum] = true;
                    let tmpScore = tmpScores.get(score.id);
                    if (typeof tmpScore !== 'undefined') {
                        tmpScores.set(score.id, val + tmpScore);
                    } else {
                        tmpScores.set(score.id, val);
                    }
                }
            }
        }

        if (isPos) {
            if (localChoice.duplicateRow) {
                if (typeof localChoice.duplicateRowId !== 'undefined' && typeof localChoice.duplicateRowPlace !== 'undefined') {
                    duplicateRow(localChoice, localRow);
                }
            }
            
            if (localChoice.activateOtherChoice && typeof localChoice.activateThisChoice !== 'undefined') {
                const activatedIds = new Set(newActivatedList.map(item => item.split('/ON#')[0]));
                
                if (localChoice.isActivateRandom && typeof localChoice.numActivateRandom !== 'undefined') {
                    if (typeof localChoice.activatedRandomMul === 'undefined') localChoice.activatedRandomMul = [];
                    if (strRnd === '') {
                        if (localChoice.multipleUseVariable === 1) {
                            let rList = localChoice.activateThisChoice.split(',').filter(item => activatedIds.has(item.split('/ON#')[0]));
                            const rNum = localChoice.numActivateRandom > rList.length ? rList.length : localChoice.numActivateRandom;
                            let tmpSet = new Set<string>();
        
                            for (let i = 0; i < rList.length; i++) {
                                const cMap = choiceMap.get(rList[i]);
        
                                if (typeof cMap !== 'undefined') {
                                    const rChoice = cMap.choice;
        
                                    if (!checkRequirements(rChoice.requireds)) {
                                        const tmp = rList[i];
        
                                        rList.splice(i, 1);
                                        rList.push(tmp);
                                    }
                                }
                            }
        
                            for (let i = rList.length - 1; i >= 0; i--) {
                                tmpSet.add(rList[i]);
                            }
        
                            rList = [...tmpSet].reverse();
                            let tmpNum = 0;
                            let nList = [];
        
                            for (let i = 0; i < localChoice.numActivateRandom; i++) {
                                nList[i] = rList.length / (localChoice.numActivateRandom * (i + 1)) < 1 ? rList.length % (localChoice.numActivateRandom * (i + 1)) : localChoice.numActivateRandom;
                                localChoice.activatedRandomMul.push(rList.slice(tmpNum, nList[i] + tmpNum));

                                for (let j = 0; j < nList[i] - tmpNum; j++) {
                                    const rStr = localChoice.activatedRandomMul[i][j].split('/ON#');
                                    const tNum = rStr.length > 1 ? parseInt(rStr[1]) : 0;
                                    const cMap = choiceMap.get(rStr[0]);

                                    if (typeof cMap !== 'undefined') {
                                        const rChoice = cMap.choice;

                                        if (!localChoice.isAllowDeselect) {
                                            if (rChoice.isSelectableMultiple && rChoice.isMultipleUseVariable) {
                                                for (let k = 0; k < Math.abs(tNum); k++) {
                                                    if (tNum > 0 && typeof rChoice.numMultipleTimesMinus !== 'undefined') {
                                                        rChoice.numMultipleTimesMinus++;
                                                    } else if (tNum < 0 && typeof rChoice.numMultipleTimesPluss !== 'undefined') {
                                                        rChoice.numMultipleTimesPluss--;
                                                    }
                                                }
                                            }
                                            rChoice.forcedActivated = true;
                                        }
                                    }
                                }
                                tmpNum += nList[i];
                            }
                        }
                    } else {
                        const tmpNum = (localChoice.multipleUseVariable - 1) * localChoice.numActivateRandom;
                        const tmpList = strRnd.splice(tmpNum, tmpNum + localChoice.numActivateRandom);

                        localChoice.activatedRandomMul.push(tmpList);

                        for (let i = 0; i < localChoice.activatedRandomMul[localChoice.multipleUseVariable - 1].length; i++) {
                            const rStr = localChoice.activatedRandomMul[localChoice.multipleUseVariable - 1][i].split('/RON#');
                            const tNum = rStr.length > 1 ? parseInt(rStr[1]) : 0;
                            const cMap = choiceMap.get(rStr[0]);
                            
                            if (typeof cMap !== 'undefined') {
                                const rChoice = cMap.choice;

                                if (!localChoice.isAllowDeselect && activatedIds.has(rChoice.id)) {
                                    if (rChoice.isSelectableMultiple && rChoice.isMultipleUseVariable) {
                                        for (let j = 0; j < Math.abs(tNum); j++) {
                                            if (tNum > 0 && typeof rChoice.numMultipleTimesMinus !== 'undefined') {
                                                rChoice.numMultipleTimesMinus++;
                                            } else if (tNum < 0 && typeof rChoice.numMultipleTimesPluss !== 'undefined') {
                                                rChoice.numMultipleTimesPluss--;
                                            }
                                        }
                                    }
                                    rChoice.forcedActivated = true;
                                }
                            }
                        }
                    }
                } else {
                    const list = localChoice.activateThisChoice.split(',').filter(item => activatedIds.has(item.split('/ON#')[0]));
                    for (let i = 0; i < list.length; i++) {
                        const item = list[i].split('/ON#');
                        const forceNum = item.length > 1 ? parseInt(item[1]) : 0;
                        const cMap = choiceMap.get(item[0]);
                        if (typeof cMap !== 'undefined') {
                            const fChoice = cMap.choice;
                            
                            if (!localChoice.isAllowDeselect) {
                                if (fChoice.isSelectableMultiple && fChoice.isMultipleUseVariable) {
                                    if (localChoice.isSelectableMultiple && localChoice.isMultipleUseVariable) {
                                        for (let j = 0; j < Math.abs(localChoice.multipleUseVariable); j++) {
                                            for (let k = 0; k < Math.abs(forceNum); k++) {
                                                if (forceNum > 0 && typeof fChoice.numMultipleTimesMinus !== 'undefined') {
                                                    fChoice.numMultipleTimesMinus++;
                                                } else if (forceNum < 0 && typeof fChoice.numMultipleTimesPluss !== 'undefined') {
                                                    fChoice.numMultipleTimesPluss--;
                                                }
                                            }
                                        }
                                    } else {
                                        for (let j = 0; j < Math.abs(forceNum); j++) {
                                            if (forceNum > 0 && typeof fChoice.numMultipleTimesMinus !== 'undefined') {
                                                fChoice.numMultipleTimesMinus++;
                                            } else if (forceNum < 0 && typeof fChoice.numMultipleTimesPluss !== 'undefined') {
                                                fChoice.numMultipleTimesPluss--;
                                            }
                                        }
                                    }
                                }
                                fChoice.forcedActivated = true;
                            }
                        } else {
                            const groupData = groupMap.get(item[0]);
                            if (typeof groupData !== 'undefined') {
                                const groupEle = groupData.elements;
                                for (let j = 0; j < groupEle.length; j++) {
                                    const cMap = choiceMap.get(groupEle[j]);
                                    if (typeof cMap !== 'undefined') {
                                        const fChoice = cMap.choice;
                                        
                                        if (!localChoice.isAllowDeselect) {
                                            if (fChoice.isSelectableMultiple && fChoice.isMultipleUseVariable) {
                                                if (localChoice.isSelectableMultiple && localChoice.isMultipleUseVariable) {
                                                    for (let k = 0; k < Math.abs(localChoice.multipleUseVariable); k++) {
                                                        for (let l = 0; l < Math.abs(forceNum); l++) {
                                                            if (forceNum > 0 && typeof fChoice.numMultipleTimesMinus !== 'undefined') {
                                                                fChoice.numMultipleTimesMinus++;
                                                            } else if (forceNum < 0 && typeof fChoice.numMultipleTimesPluss !== 'undefined') {
                                                                fChoice.numMultipleTimesPluss--;
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    for (let k = 0; k < Math.abs(forceNum); k++) {
                                                        if (forceNum > 0 && typeof fChoice.numMultipleTimesMinus !== 'undefined') {
                                                            fChoice.numMultipleTimesMinus++;
                                                        } else if (forceNum < 0 && typeof fChoice.numMultipleTimesPluss !== 'undefined') {
                                                            fChoice.numMultipleTimesPluss--;
                                                        }
                                                    }
                                                }
                                            }
                                            fChoice.forcedActivated = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if (localChoice.addToAllowChoice && typeof localChoice.idOfAllowChoice !== 'undefined' && typeof localChoice.numbAddToAllowChoice !== 'undefined') {
            for (let i = 0; i < localChoice.idOfAllowChoice.length; i++) {
                const aRow = rowMap.get(localChoice.idOfAllowChoice[i]);
                if (typeof aRow !== 'undefined') {
                    aRow.allowedChoices += localChoice.numbAddToAllowChoice;
                }
            }
        }

        if (!wasActive) {
            if (localChoice.isChangeVariables && typeof localChoice.changedVariables !== 'undefined') {
                for (let i = 0; i < localChoice.changedVariables.length; i++) {
                    const variable = variableMap.get(localChoice.changedVariables[i]);
                    if (typeof variable !== 'undefined') {
                        if (localChoice.changeType === '1') {
                            variable.isTrue = true;
                        } else if (localChoice.changeType === '2') {
                            variable.isTrue = false;
                        } else if (localChoice.changeType === '3') {
                            variable.isTrue = !variable.isTrue;
                        }
                    }
                }
            }

            if (localChoice.backpackBtnRequirement) {
                app.btnBackpackIsOn += 1;
            }

            if (localChoice.showAllAddons) {
                app.showAllAddons += 1;
            }

            if (localChoice.changeBackground) {
                if (localChoice.changeBgImage) {
                    if (typeof localChoice.bgImage !== 'undefined') {
                        if (typeof app.bgImageStack === 'undefined') {
                            app.bgImageStack = [];
                            app.defaultBgImage = app.styling.backgroundImage || '';
                        }
                        app.bgImageStack.push({id: localChoice.id, data: localChoice.bgImage});
                        app.styling.backgroundImage = localChoice.bgImage;
                    }
                } else {
                    if (typeof localChoice.changedBgColorCode !== 'undefined') {
                        if (typeof app.bgColorStack === 'undefined') {
                            app.bgColorStack = [];
                            app.defaultBgColor = app.styling.backgroundColor || '';
                        }
                        app.bgColorStack.push({id: localChoice.id, data: localChoice.changedBgColorCode});
                        app.styling.backgroundColor = localChoice.changedBgColorCode;
                    }
                }
            }
            
            if (localChoice.changePointBar) {
                if (localChoice.changeBarBgColorIsOn && typeof localChoice.changedBarBgColor !== 'undefined') {
                    if (typeof app.barBgColorStack === 'undefined') {
                        app.barBgColorStack = [];
                        app.defaultBarBgColor = app.styling.barBackgroundColor || '#FFFFFFFF';
                    }
                    app.barBgColorStack.push({id: localChoice.id, data: localChoice.changedBarBgColor});
                    app.styling.barBackgroundColor = localChoice.changedBarBgColor;
                }
                if (localChoice.changeBarIconColorIsOn && typeof localChoice.changedBarIconColor !== 'undefined') {
                    if (typeof app.barIconColorStack === 'undefined') {
                        app.barIconColorStack = [];
                        app.defaultBarIconColor = app.styling.barIconColor || '#0000008A';
                    }
                    app.barIconColorStack.push({id: localChoice.id, data: localChoice.changedBarIconColor});
                    app.styling.barIconColor = localChoice.changedBarIconColor;
                }
                if (localChoice.changeBarTextColorIsOn && typeof localChoice.changedBarTextColor !== 'undefined') {
                    if (typeof app.barTextColorStack === 'undefined') {
                        app.barTextColorStack = [];
                        app.defaultBarTextColor = app.styling.barTextColor || '#000000';
                    }
                    app.barTextColorStack.push({id: localChoice.id, data: localChoice.changedBarTextColor});
                    app.styling.barTextColor = localChoice.changedBarTextColor;
                }
            }

            if (localChoice.changeTemplates) {
                if (localChoice.changeTemplatesList && localChoice.changeToThisTemplate) {
                    const list = localChoice.changeTemplatesList.split(',');
                    
                    for (let i = 0; i < list.length; i++) {
                        const item = list[i];
                        const cMap = choiceMap.get(item);
                        if (typeof cMap !== 'undefined') {
                            const tChoice = cMap.choice;
                            applyTemplate(tChoice, localChoice.id, localChoice.changeToThisTemplate);

                            if(localChoice.changeAddonTemplate) {
                                for (let j = 0; j < tChoice.addons.length; j++) {
                                    const tAddon = tChoice.addons[j];
                                    applyTemplate(tAddon, localChoice.id, localChoice.changeToThisTemplate);
                                }
                            }
                            continue;
                        }

                        const tRow = rowMap.get(item);
                        if (typeof tRow !== 'undefined') {
                            applyTemplate(tRow, localChoice.id, localChoice.changeToThisTemplate);
                            continue;
                        }

                        const groupData = groupMap.get(item[0]);
                        if (typeof groupData !== 'undefined') {
                            const groupRowEle = groupData.rowElements;

                            for (let j = 0; j < groupRowEle.length; j++) {
                                const gtRow = rowMap.get(groupRowEle[j]);
                                if (typeof gtRow !== 'undefined') {
                                    applyTemplate(gtRow, localChoice.id, localChoice.changeToThisTemplate);
                                }
                            }
                            const groupEle = groupData.elements;                                    
                            for (let j = 0; j < groupEle.length; j++) {
                                const gcMap = choiceMap.get(groupEle[j]);
                                if (typeof gcMap !== 'undefined') {
                                    const gtChoice = gcMap.choice;
                                    applyTemplate(gtChoice, localChoice.id, localChoice.changeToThisTemplate);
                                }
                            }
                            continue;
                        }
                    }
                }
            }

            if (localChoice.changeWidth) {
                if (localChoice.changeWidthList && localChoice.changeToThisWidth) {
                    const list = localChoice.changeWidthList.split(',');
                    
                    for (let i = 0; i < list.length; i++) {
                        const item = list[i];
                        const cMap = choiceMap.get(item);
                        if (typeof cMap !== 'undefined') {
                            const tChoice = cMap.choice;
                            applyWidth(tChoice, localChoice.id, localChoice.changeToThisWidth);
                            continue;
                        }

                        const tRow = rowMap.get(item);
                        if (typeof tRow !== 'undefined') {
                            applyWidth(tRow, localChoice.id, localChoice.changeToThisWidth);
                            continue;
                        }

                        const groupData = groupMap.get(item[0]);
                        if (typeof groupData !== 'undefined') {
                            const groupRowEle = groupData.rowElements;

                            for (let j = 0; j < groupRowEle.length; j++) {
                                const gtRow = rowMap.get(groupRowEle[j]);
                                if (typeof gtRow !== 'undefined') {
                                    applyWidth(gtRow, localChoice.id, localChoice.changeToThisWidth);
                                }
                            }
                            const groupEle = groupData.elements;                                    
                            for (let j = 0; j < groupEle.length; j++) {
                                const gcMap = choiceMap.get(groupEle[j]);
                                if (typeof gcMap !== 'undefined') {
                                    const gtChoice = gcMap.choice;
                                    applyWidth(gtChoice, localChoice.id, localChoice.changeToThisWidth);
                                }
                            }
                            continue;
                        }
                    }
                }
            }

            if (localChoice.setBgmIsOn) {
                if (localChoice.bgmId) {
                    bgmVariables.bgmIsPlaying = true;
                    
                    if (bgmVariables.isBgmInit) {
                        playBgm(localChoice, localChoice.bgmId, 0);
                    } else {
                        initYoutubePlayer(localChoice);
                        bgmVariables.isBgmInit = true;
                    }
                }
            }

            if (localChoice.muteBgm && bgmPlayer) {
                const player = get(bgmPlayer);

                if (player && typeof player.mute === 'function') {
                    app.isMute = true;
                    player.mute();
                }
            }

            if (localChoice.isContentHidden && typeof localChoice.hiddenContentsRow !== 'undefined' && typeof localChoice.hiddenContentsType !== 'undefined') {
                for (let i = 0; i < localChoice.hiddenContentsRow.length; i++) {
                    const hRow = rowMap.get(localChoice.hiddenContentsRow[i]);
                    if (typeof hRow !== 'undefined') {
                        if (!hRow.textIsRemoved) hRow.textIsRemoved = true;
                        for (let j = 0; j < localChoice.hiddenContentsType.length; j++) {
                            switch (localChoice.hiddenContentsType[j]) {
                                case '1':
                                    hRow.objectTitleRemoved = true;
                                    break;
                                case '2':
                                    hRow.objectImageRemoved = true;
                                    break;
                                case '3':
                                    hRow.objectTextRemoved = true;
                                    break;
                                case '4':
                                    hRow.objectScoreRemoved = true;
                                    break;
                                case '5':
                                    hRow.objectRequirementRemoved = true;
                                    break;
                                case '6':
                                    hRow.addonTitleRemoved = true;
                                    break;
                                case '7':
                                    hRow.addonImageRemoved = true;
                                    break;
                                case '8':
                                    hRow.addonTextRemoved = true;
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            }
        }

        updateScores(localChoice, tmpScores, 0);

    }
}
function selectedOneLess(localChoice: Choice, localRow: Row) {
    
    const tmpScores = new SvelteMap<string, number>();
    const selNum = Math.abs(localChoice.multipleUseVariable - 1);

    for (let i = 0; i < localChoice.scores.length; i++) {
        const score = localChoice.scores[i];
        if (typeof score.isActiveMulMinus === 'undefined') score.isActiveMulMinus = [];
        if (checkRequirements(score.requireds) && !score.isActiveMulMinus[selNum]) {
            const point = pointTypeMap.get(score.id);
            if (typeof point !== 'undefined') {
                let val = score.discountIsOn && typeof score.discountScore !== 'undefined' ? score.discountScore : score.value;
                val = point.allowFloat ? val : Math.floor(val);
                if (score.multiplyByTimes) {
                    val = val * (Math.abs(selNum));
                }
                point.startingSum += val;
                let tmpScore = tmpScores.get(score.id);
                if (typeof tmpScore !== 'undefined') {
                    tmpScores.set(score.id, -val + tmpScore);
                } else {
                    tmpScores.set(score.id, -val);
                }
                score.isActiveMulMinus[selNum] = true;
            }
        }
    }

    localChoice.multipleUseVariable -= 1;

    if (localChoice.multipleUseVariable === 0) {
        localChoice.isActive = false;
        localRow.currentChoices -= 1;
        activatedMap.delete(localChoice.id);
    } else {
        if (localChoice.multipleUseVariable === -1) {
            localChoice.isActive = true;
            localRow.currentChoices += 1;
        }
        activatedMap.set(localChoice.id, {multiple: localChoice.multipleUseVariable});
    }

    if (localChoice.addToAllowChoice && typeof localChoice.idOfAllowChoice !== 'undefined' && typeof localChoice.numbAddToAllowChoice !== 'undefined') {
        for (let i = 0; i < localChoice.idOfAllowChoice.length; i++) {
            const aRow = rowMap.get(localChoice.idOfAllowChoice[i]);
            if (typeof aRow !== 'undefined') {
                aRow.allowedChoices -= localChoice.numbAddToAllowChoice;
            }
        }
    }

    updateScores(localChoice, tmpScores, 0);
}
export function loadActivated(str: string) {
    cleanActivated();
    const strList = str.split(',');
    
    for (let i = 0; i < strList.length; i++) {
        const cStr = strList[i].split(/\/(IMG|WORD|RND)#/)[0];
        const baseId = cStr.split('/ON#');
        const tmpNum = baseId.length > 1 ? parseInt(baseId[1]) : 0;
        const cMap = choiceMap.get(baseId[0]);

        if (typeof cMap !== 'undefined') {
            const aChoice = cMap.choice;

            if (aChoice.isSelectableMultiple && aChoice.isMultipleUseVariable) {
                for (let j = 0; j < Math.abs(tmpNum); j++) {
                    const mStr = strList[i].split('/RND#');

                    if (tmpNum > 0) { 
                        selectedOneMore(mStr, strList);
                    } else {
                        selectedOneLess(aChoice, cMap.row);
                    }
                }
            } else {
                selectObject(strList[i], strList);
            }
        }
    }
};
export function duplicateRow(localChoice: Choice, localRow: Row) {
    if (typeof localChoice.duplicateRowId !== 'undefined' && typeof localChoice.duplicateRowPlace !== 'undefined') {
        const dRowId = localChoice.duplicateRowId;
        let num = 0;
        Array.from(rowMap.entries()).forEach(([id]) => {
            if (id.split('/D#')[0] === dRowId.split('/D#')[0]) {
                num++;
            }
        });

        const sRow = rowMap.get(localChoice.duplicateRowId);
        const tRow = rowMap.get(localChoice.duplicateRowPlace);
        const suffix = `/D#${num}`;

        if (typeof sRow !== 'undefined' && typeof tRow !== 'undefined') {
            const newRow: Row = JSON.parse(JSON.stringify(sRow));

            newRow.id = `${newRow.id.split('/D#')[0]}${suffix}`;

            if (tRow.isBackpack) {
                app.backpack.splice(tRow.index + 1, 0, newRow);

                for (let i = tRow.index + 1; i < app.backpack.length; i++) {
                    app.backpack[i].index = i;
                }
            } else {
                app.rows.splice(tRow.index + 1, 0, newRow);

                for (let i = tRow.index + 1; i < app.rows.length; i++) {
                    app.rows[i].index = i;
                }
            }

            rowMap.set(newRow.id, newRow);

            for (let i = 0; i < newRow.objects.length; i++) {
                const newChoice = newRow.objects[i];

                newChoice.id = `${newChoice.id.split('/D#')[0]}${suffix}`;
                newChoice.isActive = false;
                delete newChoice.forcedActivated;

                for (let j = 0; j < newChoice.scores.length; j++) {
                    const score = newChoice.scores[j];

                    score.idx = generateScoreId(0, 5);
                    scoreSet.add(score.idx);
                    delete score.isActive;
                    delete score.setValue;
                    delete score.discountIsOn;
                    delete score.discountShow;
                    delete score.discountBeforeText;
                    delete score.discountAfterText;
                    delete score.discountScore;
                    delete score.discountScoreCal;
                    delete score.isChangeDiscount;
                    delete score.tmpDisScore;
                    delete score.tmpDiscount;
                    delete score.discountedFrom;
                    delete score.dupTextA;
                    delete score.dupTextB;
                    delete score.discountTextA;
                    delete score.discountTextB;
                    delete score.notStackableDiscount;
                }

                for (let j = 0; j < newChoice.addons.length; j++) {
                    const addon = newChoice.addons[j];

                    addon.parentId = newChoice.id;
                }

                if (!localChoice.dRowAddSufReq) {
                    for (let j = 0; j < newChoice.requireds.length; j++) {
                        const req = newChoice.requireds[j];

                        if (req.type === 'id') {
                            const reqId = req.reqId.split('/ON#');
                            const baseId = `${reqId[0].split('/D#')[0]}${suffix}`;

                            if (reqId.length > 1) {
                                req.reqId = `${baseId}/ON#${reqId[1]}`;
                            } else {
                                req.reqId = baseId;
                            }
                        } else if (req.type === 'or') {
                            for (let k = 0; k < req.orRequired.length; k++) {
                                const orReq = req.orRequired[k];

                                if (typeof orReq.req !== 'undefined') {
                                    const reqId = orReq.req.split('/ON#');
                                    const baseId = `${reqId[0].split('/D#')[0]}${suffix}`;

                                    if (reqId.length > 1) {
                                        orReq.req = `${baseId}/ON#${reqId[1]}`;
                                    } else {
                                        orReq.req = baseId;
                                    }
                                }
                            }
                        }

                        if (typeof req.requireds !== 'undefined') {
                            for (let k = 0; k < req.requireds.length; k++) {
                                const iReq = newChoice.requireds[j];

                                if (iReq.type === 'id') {
                                    const reqId = iReq.reqId.split('/ON#');
                                    const baseId = `${reqId[0].split('/D#')[0]}${suffix}`;

                                    if (reqId.length > 1) {
                                        iReq.reqId = `${baseId}/ON#${reqId[1]}`;
                                    } else {
                                        iReq.reqId = baseId;
                                    }
                                } else if (iReq.type === 'or') {
                                    for (let l = 0; l < iReq.orRequired.length; l++) {
                                        const orReq = iReq.orRequired[l];

                                        if (typeof orReq.req !== 'undefined') {
                                            const reqId = orReq.req.split('/ON#');
                                            const baseId = `${reqId[0].split('/D#')[0]}${suffix}`;

                                            if (reqId.length > 1) {
                                                orReq.req = `${baseId}/ON#${reqId[1]}`;
                                            } else {
                                                orReq.req = baseId;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    for (let j = 0; j < newChoice.scores.length; j++) {
                        const score = newChoice.scores[j];

                        if (typeof score.requireds !== 'undefined') {
                            for (let k = 0; k < score.requireds.length; k++) {
                                const req = score.requireds[k];

                                if (req.type === 'id') {
                                    const reqId = req.reqId.split('/ON#');
                                    const baseId = `${reqId[0].split('/D#')[0]}${suffix}`;

                                    if (reqId.length > 1) {
                                        req.reqId = `${baseId}/ON#${reqId[1]}`;
                                    } else {
                                        req.reqId = baseId;
                                    }
                                } else if (req.type === 'or') {
                                    for (let l = 0; l < req.orRequired.length; l++) {
                                        const orReq = req.orRequired[l];

                                        if (typeof orReq.req !== 'undefined') {
                                            const reqId = orReq.req.split('/ON#');
                                            const baseId = `${reqId[0].split('/D#')[0]}${suffix}`;

                                            if (reqId.length > 1) {
                                                orReq.req = `${baseId}/ON#${reqId[1]}`;
                                            } else {
                                                orReq.req = baseId;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    for (let j = 0; j < newChoice.addons.length; j++) {
                        const addon = newChoice.addons[j];

                        if (typeof addon.requireds !== 'undefined') {
                            for (let k = 0; k < addon.requireds.length; k++) {
                                const req = addon.requireds[k];

                                if (req.type === 'id') {
                                    const reqId = req.reqId.split('/ON#');
                                    const baseId = `${reqId[0].split('/D#')[0]}${suffix}`;

                                    if (reqId.length > 1) {
                                        req.reqId = `${baseId}/ON#${reqId[1]}`;
                                    } else {
                                        req.reqId = baseId;
                                    }
                                } else if (req.type === 'or') {
                                    for (let l = 0; l < req.orRequired.length; l++) {
                                        const orReq = req.orRequired[l];

                                        if (typeof orReq.req !== 'undefined') {
                                            const reqId = orReq.req.split('/ON#');
                                            const baseId = `${reqId[0].split('/D#')[0]}${suffix}`;

                                            if (reqId.length > 1) {
                                                orReq.req = `${baseId}/ON#${reqId[1]}`;
                                            } else {
                                                orReq.req = baseId;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (!localChoice.dRowAddSufFunc) {
                    if (newChoice.activateOtherChoice && typeof newChoice.activateThisChoice !== 'undefined') {
                        const aList = newChoice.activateThisChoice.split(',');
                        let newList = '';

                        for (let j = 0; j < aList.length; j++) {
                            const aId = aList[j].split('/ON#');
                            const baseId = `${aId[0].split('/D#')[0]}${suffix}`;

                            if (aId.length > 1) {
                                newList += `${baseId}/ON#${aId[1]},`;
                            } else {
                                newList += `${baseId},`;
                            }
                        }
                        newChoice.activateThisChoice = newList;
                    }

                    if (newChoice.deactivateOtherChoice && typeof newChoice.deactivateThisChoice !== 'undefined') {
                        const aList = newChoice.deactivateThisChoice.split(',');
                        let newList = '';

                        for (let j = 0; j < aList.length; j++) {
                            const aId = aList[j].split('/ON#');
                            const baseId = `${aId[0].split('/D#')[0]}${suffix}`;

                            if (aId.length > 1) {
                                newList += `${baseId}/ON#${aId[1]},`;
                            } else {
                                newList += `${baseId},`;
                            }
                        }
                        newChoice.deactivateThisChoice = newList;
                    }

                    if (newChoice.duplicateRow && typeof newChoice.duplicateRowId !== 'undefined' && typeof newChoice.duplicateRowPlace !== 'undefined') {
                        const osId = newChoice.duplicateRowId;
                        const otId = newChoice.duplicateRowPlace;

                        newChoice.duplicateRowId = `${osId.split('/D')[0]}${suffix}`;
                        newChoice.duplicateRowPlace = `${otId.split('/D')[0]}${suffix}`;
                    }
                }

                if (newChoice.backpackBtnRequirement) {
                    if (typeof app.hideBackpackBtn !== 'undefined') {
                        app.hideBackpackBtn += 1;
                    } else {
                        delete newChoice.backpackBtnRequirement;
                    }
                }

                choiceMap.set(newChoice.id, {choice: newChoice, row: newRow});

                if (newChoice.groups) {
                    for (let j = 0; j < newChoice.groups.length; j++) {
                        let group = groupMap.get(newChoice.groups[j]);
                        if (typeof group !== 'undefined') {
                            let elementIndex = group.elements.indexOf(newChoice.id);
                            if (elementIndex === -1) group.elements.push(newChoice.id);
                        }
                    }
                }
                if (newChoice.objectDesignGroups) {
                    for (let j = 0; j < newChoice.objectDesignGroups.length; j++) {
                        let dGroup = objectDesignMap.get(newChoice.objectDesignGroups[j]);
                        if (typeof dGroup !== 'undefined') {
                            let elementIndex = dGroup.elements.indexOf(newChoice.id);
                            if (elementIndex === -1) dGroup.elements.push(newChoice.id);
                        }
                    }
                }
            }
        }
    }
};
export function getDataURL(str: string) {
    const match = str.match(/^data:.+;base64,(.+)$/);
    return match ? match[1] : str;
};
export function isDataURL(str: string) {
    const regex = /^data:[a-zA-Z]+\/[a-zA-Z]+;base64,/;
    return regex.test(str);
};
function isAvif(str: string) {
    const match = str.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,/);
    if (!match) return false;

    const mimeType = match[1].toLowerCase();
    return mimeType === 'image/avif';
}
const filterStylingSchema = z.object({
    selFilterBlur: z.coerce.number().optional(),
    selFilterBright: z.coerce.number().optional(),
    selFilterCont: z.coerce.number().optional(),
    selFilterGray: z.coerce.number().optional(),
    selFilterHue: z.coerce.number().optional(),
    selFilterInvert: z.coerce.number().optional(),
    selFilterOpac: z.coerce.number().optional(),
    selFilterSatur: z.coerce.number().optional(),
    selFilterSepia: z.coerce.number().optional(),
    reqFilterBlur: z.coerce.number().optional(),
    reqFilterBright: z.coerce.number().optional(),
    reqFilterCont: z.coerce.number().optional(),
    reqFilterGray: z.coerce.number().optional(),
    reqFilterHue: z.coerce.number().optional(),
    reqFilterInvert: z.coerce.number().optional(),
    reqFilterOpac: z.coerce.number().optional(),
    reqFilterSatur: z.coerce.number().optional(),
    reqFilterSepia: z.coerce.number().optional(),
    unselFilterBlur: z.coerce.number().optional(),
    unselFilterBright: z.coerce.number().optional(),
    unselFilterCont: z.coerce.number().optional(),
    unselFilterGray: z.coerce.number().optional(),
    unselFilterHue: z.coerce.number().optional(),
    unselFilterInvert: z.coerce.number().optional(),
    unselFilterOpac: z.coerce.number().optional(),
    unselFilterSatur: z.coerce.number().optional(),
    unselFilterSepia: z.coerce.number().optional()
}).passthrough();
const textStylingSchema = z.object({
    rowTitleTextSize: z.coerce.number().optional(),
    rowTextTextSize: z.coerce.number().optional(),
    objectTitleTextSize: z.coerce.number().optional(),
    objectTextTextSize: z.coerce.number().optional(),
    addonTitleTextSize: z.coerce.number().optional(),
    addonTextTextSize: z.coerce.number().optional(),
    scoreTextSize: z.coerce.number().optional(),
}).passthrough();
const objectImageStylingSchema = z.object({
    objectImgBorderWidth: z.coerce.number().optional(),
    objectImageWidth: z.coerce.number().optional(),
    objectImageMarginTop: z.coerce.number().optional(),
    objectImageMarginBottom: z.coerce.number().optional(),
    objectImgBorderRadiusTopLeft: z.coerce.number().optional(),
    objectImgBorderRadiusTopRight: z.coerce.number().optional(),
    objectImgBorderRadiusBottomRight: z.coerce.number().optional(),
    objectImgBorderRadiusBottomLeft: z.coerce.number().optional(),
    objectImageBoxWidth: z.coerce.number().optional()
}).passthrough();
const rowImageStylingSchema = z.object({
    rowImgBorderWidth: z.coerce.number().optional(),
    rowImageWidth: z.coerce.number().optional(),
    rowImageMarginTop: z.coerce.number().optional(),
    rowImageMarginBottom: z.coerce.number().optional(),
    rowImgBorderRadiusTopLeft: z.coerce.number().optional(),
    rowImgBorderRadiusTopRight: z.coerce.number().optional(),
    rowImgBorderRadiusBottomRight: z.coerce.number().optional(),
    rowImgBorderRadiusBottomLeft: z.coerce.number().optional(),
    rowImageBoxWidth: z.coerce.number().optional()
}).passthrough();
const addonImageStylingSchema = z.object({
    addonImgBorderWidth: z.coerce.number().optional(),
    addonImageWidth: z.coerce.number().optional(),
    addonImageMarginTop: z.coerce.number().optional(),
    addonImageMarginBottom: z.coerce.number().optional(),
    addonImgBorderRadiusTopLeft: z.coerce.number().optional(),
    addonImgBorderRadiusTopRight: z.coerce.number().optional(),
    addonImgBorderRadiusBottomRight: z.coerce.number().optional(),
    addonImgBorderRadiusBottomLeft: z.coerce.number().optional(),
    addonImageBoxWidth: z.coerce.number().optional()
}).passthrough();
const objectStylingSchema = z.object({
    objectMargin: z.coerce.number().optional(),
    objectTextPadding: z.coerce.number().optional(),
    objectBorderWidth: z.coerce.number().optional(),
    objectDropShadowH: z.coerce.number().optional(),
    objectDropShadowV: z.coerce.number().optional(),
    objectDropShadowBlur: z.coerce.number().optional(),
    objectDropShadowSpread: z.coerce.number().optional(),
    objectBorderRadiusTopLeft: z.coerce.number().optional(),
    objectBorderRadiusTopRight: z.coerce.number().optional(),
    objectBorderRadiusBottomRight: z.coerce.number().optional(),
    objectBorderRadiusBottomLeft: z.coerce.number().optional(),
    objectBorderImageWidth: z.coerce.number().optional(),
    objectBorderImageSliceTop: z.coerce.number().optional(),
    objectBorderImageSliceBottom: z.coerce.number().optional(),
    objectBorderImageSliceLeft: z.coerce.number().optional(),
    objectBorderImageSliceRight: z.coerce.number().optional(),
}).passthrough();
const rowStylingSchema = z.object({
    rowMargin: z.coerce.number().optional(),
    rowBodyMarginSides: z.coerce.number().optional(),
    rowBodyMarginTop: z.coerce.number().optional(),
    rowBodyMarginBottom: z.coerce.number().optional(),
    rowTextPaddingY: z.coerce.number().optional(),
    rowTextPaddingX: z.coerce.number().optional(),
    rowDropShadowH: z.coerce.number().optional(),
    rowDropShadowV: z.coerce.number().optional(),
    rowDropShadowBlur: z.coerce.number().optional(),
    rowDropShadowSpread: z.coerce.number().optional(),
    rowButtonXPadding: z.coerce.number().optional(),
    rowButtonYPadding: z.coerce.number().optional(),
    rowBorderRadiusTopLeft: z.coerce.number().optional(),
    rowBorderRadiusTopRight: z.coerce.number().optional(),
    rowBorderRadiusBottomRight: z.coerce.number().optional(),
    rowBorderRadiusBottomLeft: z.coerce.number().optional(),
    rowBorderWidth: z.coerce.number().optional(),
    rowBorderImageWidth: z.coerce.number().optional(),
    rowBorderImageSliceTop: z.coerce.number().optional(),
    rowBorderImageSliceBottom: z.coerce.number().optional(),
    rowBorderImageSliceLeft: z.coerce.number().optional(),
    rowBorderImageSliceRight: z.coerce.number().optional(),
}).passthrough();
const addonStylingSchema = z.object({
    addonMargin: z.coerce.number().optional(),
    addonTextPadding: z.coerce.number().optional(),
    addonBorderWidth: z.coerce.number().optional(),
    addonDropShadowH: z.coerce.number().optional(),
    addonDropShadowV: z.coerce.number().optional(),
    addonDropShadowBlur: z.coerce.number().optional(),
    addonDropShadowSpread: z.coerce.number().optional(),
    addonBorderRadiusTopLeft: z.coerce.number().optional(),
    addonBorderRadiusTopRight: z.coerce.number().optional(),
    addonBorderRadiusBottomRight: z.coerce.number().optional(),
    addonBorderRadiusBottomLeft: z.coerce.number().optional(),
    addonBorderImageWidth: z.coerce.number().optional(),
    addonBorderImageSliceTop: z.coerce.number().optional(),
    addonBorderImageSliceBottom: z.coerce.number().optional(),
    addonBorderImageSliceLeft: z.coerce.number().optional(),
    addonBorderImageSliceRight: z.coerce.number().optional(),
}).passthrough();
const multiChoiceStylingSchema = z.object({
    multiChoiceCounterPosition: z.coerce.number().optional(),
    multiChoiceCounterSize: z.coerce.number().optional(),
    multiChoiceTextSize: z.coerce.number().optional()
}).passthrough();
const pointBarStylingSchema = z.object({
    barTextPadding: z.coerce.number().optional(),
    barTextMargin: z.coerce.number().optional(),
    barPadding: z.coerce.number().optional(),
    barMargin: z.coerce.number().optional(),
    barTextSize: z.coerce.number().optional(),
}).passthrough();
const backpackStylingSchema = z.object({
    backPackWidth: z.coerce.number().optional()
}).passthrough();
const StylingSchema = z.preprocess((val) => {
    if (val === '') return {};
    return val;
}, filterStylingSchema.merge(textStylingSchema).merge(objectImageStylingSchema).merge(rowImageStylingSchema).merge(addonImageStylingSchema).merge(objectStylingSchema).merge(rowStylingSchema).merge(addonStylingSchema).merge(multiChoiceStylingSchema).merge(pointBarStylingSchema).merge(backpackStylingSchema).passthrough());
const AddonSchema = z.object({
    template: z.coerce.number().optional()
}).passthrough();
const ScoreSchema = z.object({
    value: z.coerce.number().optional(),
    minValue: z.coerce.number().optional(),
    maxValue: z.coerce.number().optional(),
    discountScore: z.coerce.number().optional(),
    discountScoreCal: z.coerce.number().optional(),
    tmpDisScore: z.coerce.number().optional()
}).passthrough();
const ChoiceSchema = z.object({
    index: z.coerce.number().optional(),
    template: z.coerce.number().optional(),
    multipleUseVariable: z.coerce.number().optional(),
    initMultipleTimesMinus: z.coerce.number().optional(),
    selectedThisManyTimesProp: z.coerce.number().optional(),
    defaultAspectWidth: z.coerce.number().optional(),
    defaultAspectHeight: z.coerce.number().optional(),
    addons: z.array(AddonSchema).optional(),
    scores: z.array(ScoreSchema).optional(),
    styling: StylingSchema.optional(),
    numMultipleTimesMinus: z.coerce.number().optional(),
    numMultipleTimesPluss: z.coerce.number().optional(),
    numActivateRandom: z.coerce.number().optional(),
    discountLowLimit: z.coerce.number().optional(),
    discountValue: z.coerce.number().optional(),
    numbAddToAllowChoice: z.coerce.number().optional(),
    bgmFadeInSec: z.coerce.number().optional(),
    bgmFadeOutSec: z.coerce.number().optional(),
    fadeTransitionTime: z.coerce.number().optional(),
    divideWithThis: z.coerce.number().optional(),
    activatedFrom: z.coerce.number().optional()
}).passthrough();
const RowSchema = z.object({
    index: z.coerce.number().optional(),
    template: z.coerce.number().optional(),
    buttonRandomNumber: z.coerce.number().optional(),
    defaultAspectWidth: z.coerce.number().optional(),
    defaultAspectHeight: z.coerce.number().optional(),
    allowedChoices: z.coerce.number().optional(),
    currentChoices: z.coerce.number().optional(),
    objects: z.array(ChoiceSchema).optional(),
    styling: StylingSchema.optional(),
    objectImgObjectFillHeight: z.coerce.number().optional(),
    randomMin: z.coerce.number().optional(),
    randomMax: z.coerce.number().optional()
}).passthrough();
const PointTypeSchema = z.object({
    startingSum: z.coerce.number().optional(),
    initValue: z.coerce.number().optional(),
    iconWidth: z.coerce.number().optional(),
    iconHeight: z.coerce.number().optional(),
    negativeIconWidth: z.coerce.number().optional(),
    negativeIconHeight: z.coerce.number().optional(),
}).passthrough();
const RowDesignGroupSchema = z.object({
    styling: StylingSchema.optional()
}).passthrough();
const ObjectDesignGroupSchema = z.object({
    styling: StylingSchema.optional()
}).passthrough();
export const AppSchema = z.object({
    curVolume: z.coerce.number().optional(),
    fadeTransitionTime: z.coerce.number().optional(),
    hideBackpackBtn: z.coerce.number().optional(),
    btnBackpackIsOn: z.coerce.number().optional(),
    rowIdLength: z.coerce.number().optional(),
    objectIdLength: z.coerce.number().optional(),
    rowDesignGroups: z.array(RowDesignGroupSchema).optional(),
    objectDesignGroups: z.array(ObjectDesignGroupSchema).optional(),
    rows: z.array(RowSchema).optional(),
    pointTypes: z.array(PointTypeSchema).optional(),
    backpack: z.array(RowSchema).optional(),
    styling: StylingSchema.optional()
}).passthrough();
const keysToRemove = ['autoSaveInterval', 'bgmFadeInterval', 'bgmFadeTimer', 'bgmIsPlaying', 'bgmObjectId', 'bgmPlayInterval', 'bgmTitle', 'bgmTitleInterval', 'cancelForcedActivated', 'comp', 'compG', 'compODG', 'compR', 'compRDG', 'curBgmTime', 'curBgmLength', 'isSeeking', 'isFadingOut', 'lastFadeTime', 'objectMap', 'pointTypeMap', 'wordMap'];
export function removeNulls(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(removeNulls).filter(item => item !== null && !(typeof item === 'object' && Object.keys(item).length === 0));
    } else if (obj && typeof obj === 'object') {
        const newObj: any = {};
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const val = removeNulls(obj[key]);
            if (val !== null) {
                newObj[key] = val;
            }
        }
        return Object.keys(newObj).length > 0 ? newObj : null;
    }
    return obj;
};
function initFilterStyling(data: any) {
    if (data.isPrivateStyling && data.privateFilterIsOn && typeof data.styling !== 'undefined') {
        if (typeof data.styling.unselFilterBlurIsOn === 'undefined') data.styling.unselFilterBlurIsOn = false;
        if (typeof data.styling.unselFilterBlur === 'undefined') data.styling.unselFilterBlur = 0;
        if (typeof data.styling.unselFilterBrightIsOn === 'undefined') data.styling.unselFilterBrightIsOn = false;
        if (typeof data.styling.unselFilterBright === 'undefined') data.styling.unselFilterBright = 100;
        if (typeof data.styling.unselFilterCont === 'undefined') data.styling.unselFilterCont = 100;
        if (typeof data.styling.unselFilterGrayIsOn === 'undefined') data.styling.unselFilterGrayIsOn = false;
        if (typeof data.styling.unselFilterGray === 'undefined') data.styling.unselFilterGray = 0;
        if (typeof data.styling.unselFilterHueIsOn === 'undefined') data.styling.unselFilterHueIsOn = false;
        if (typeof data.styling.unselFilterHue === 'undefined') data.styling.unselFilterHue = 0;
        if (typeof data.styling.unselFilterInvertIsOn === 'undefined') data.styling.unselFilterInvertIsOn = false;
        if (typeof data.styling.unselFilterInvert === 'undefined') data.styling.unselFilterInvert = 0;
        if (typeof data.styling.unselFilterOpacIsOn === 'undefined') data.styling.unselFilterOpacIsOn = false;
        if (typeof data.styling.unselFilterOpac === 'undefined') data.styling.unselFilterOpac = 100;
        if (typeof data.styling.unselFilterSaturIsOn === 'undefined') data.styling.unselFilterSaturIsOn = false;
        if (typeof data.styling.unselFilterSatur === 'undefined') data.styling.unselFilterSatur = 0;
        if (typeof data.styling.unselFilterSepiaIsOn === 'undefined') data.styling.unselFilterSepiaIsOn = false;
        if (typeof data.styling.unselFilterSepia === 'undefined') data.styling.unselFilterSepia = 0;
    }
};
function initPrivateStyling(data: any, isRow: boolean) {
    if (data.isPrivateStyling && typeof data.privateFilterIsOn === 'undefined') {
        if (typeof data.styling !== 'undefined') {
            Object.keys(filterStyling).forEach(key => {
                if (data.styling.hasOwnProperty(key)) {
                    data.privateFilterIsOn = true;
                    return;
                } else {
                    data.privateFilterIsOn = false;
                }
            });
        }
    }

    if (data.isPrivateStyling && typeof data.privateTextIsOn === 'undefined') {
        if (typeof data.styling !== 'undefined') {
            Object.keys(textStyling).forEach(key => {
                if (data.styling.hasOwnProperty(key)) {
                    data.privateTextIsOn = true;
                    return;
                } else {
                    data.privateTextIsOn = false;
                }
            });
        }
    }

    if (data.isPrivateStyling && typeof data.privateObjectImageIsOn === 'undefined') {
        if (typeof data.styling !== 'undefined') {
            Object.keys(objectImageStyling).forEach(key => {
                if (data.styling.hasOwnProperty(key)) {
                    data.privateObjectImageIsOn = true;
                    return;
                } else {
                    data.privateObjectImageIsOn = false;
                }
            });
        }
    }

    if (data.isPrivateStyling && typeof data.privateObjectIsOn === 'undefined') {
        if (typeof data.styling !== 'undefined') {
            Object.keys(objectStyling).forEach(key => {
                if (data.styling.hasOwnProperty(key)) {
                    data.privateObjectIsOn = true;
                    return;
                } else {
                    data.privateObjectIsOn = false;
                }
            });
        }
    }

    if (data.isPrivateStyling && typeof data.privateAddonImageIsOn === 'undefined') {
        if (typeof data.styling !== 'undefined') {
            Object.keys(addonImageStyling).forEach(key => {
                if (data.styling.hasOwnProperty(key)) {
                    data.privateAddonImageIsOn = true;
                    return;
                } else {
                    data.privateAddonImageIsOn = false;
                }
            });
        }
    }

    if (data.isPrivateStyling && typeof data.privateAddonIsOn === 'undefined') {
        if (typeof data.styling !== 'undefined') {
            Object.keys(addonStyling).forEach(key => {
                if (data.styling.hasOwnProperty(key)) {
                    data.privateAddonIsOn = true;
                    return;
                } else {
                    data.privateAddonIsOn = false;
                }
            });
        }
    }

    if (data.isPrivateStyling && typeof data.privateBackgroundIsOn === 'undefined') {
        if (typeof data.styling !== 'undefined') {
            Object.keys(backgroundStyling).forEach(key => {
                if (data.styling.hasOwnProperty(key)) {
                    data.privateBackgroundIsOn = true;
                    return;
                } else {
                    data.privateBackgroundIsOn = false;
                }
            });
        }
    }

    if (isRow) {
        if (data.isPrivateStyling && typeof data.privateRowImageIsOn === 'undefined') {
            if (typeof data.styling !== 'undefined') {
                Object.keys(rowImageStyling).forEach(key => {
                    if (data.styling.hasOwnProperty(key)) {
                        data.privateRowImageIsOn = true;
                        return;
                    } else {
                        data.privateRowImageIsOn = false;
                    }
                });
            }
        }

        if (data.isPrivateStyling && typeof data.privateRowIsOn === 'undefined') {
            if (typeof data.styling !== 'undefined') {
                Object.keys(rowStyling).forEach(key => {
                    if (data.styling.hasOwnProperty(key)) {
                        data.privateRowIsOn = true;
                        return;
                    } else {
                        data.privateRowIsOn = false;
                    }
                });
            }
        }
    }
    
    initFilterStyling(data);
    if (!data.isPrivateStyling && typeof data.styling !== 'undefined') {
        if (typeof data.styling.objectImgObjectFillHeight !== 'undefined') data.objectImgObjectFillHeight = data.styling.objectImgObjectFillHeight;
        delete data.styling;
    }
};
export function initializeApp(tempApp: any) {
    const keys = Object.keys(tempApp);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (keysToRemove.indexOf(key) !== -1) {
            delete tempApp[key];
        } else if (Array.isArray(tempApp[key])) {
            if (key === 'rows' || key === 'backpack') {
                for (let i = 0; i < tempApp[key].length; i++) {
                    const kRow = tempApp[key][i];

                    kRow.index = i;
                    if (key === 'backpack') {
                        kRow.isBackpack = true;
                    }
                    initPrivateStyling(kRow, true);                            
                    if (typeof kRow.styling !== 'undefined') {
                        initStyling(kRow.styling, typeof tempApp.version === 'undefined' || tempApp.version === '2.0.0-beta');
                    }

                    if (typeof kRow.rowDesignGroups !== 'undefined') {
                        for (let j = 0; j < kRow.rowDesignGroups.length; j++) {
                            if (typeof kRow.rowDesignGroups[j] === 'object') kRow.rowDesignGroups[j] = kRow.rowDesignGroups[j].id;
                        }
                    }

                    if (typeof kRow.image) {
                        if (!isDataURL(kRow.image)) {
                            externalImages.add(kRow.image);
                        } else if (!hasAvif.value) {
                            hasAvif.value = isAvif(kRow.image);
                        }
                    }
                    
                    if (typeof kRow.objects !== 'undefined') {
                        for (let j = 0; j < kRow.objects.length; j++) {
                            const kObj = kRow.objects[j];

                            kObj.index = j;
                            initPrivateStyling(kObj, false);
                            if (typeof kObj.styling !== 'undefined') {
                                initStyling(kObj.styling, typeof tempApp.version === 'undefined' || tempApp.version === '2.0.0-beta');
                            }

                            if (kObj.multiplyPointtypeIsOn) {
                                if (typeof kObj.pointTypeToMultiply === 'string') kObj.pointTypeToMultiply = [kObj.pointTypeToMultiply];
                                if (typeof kObj.startingSumAtMultiply === 'number') kObj.startingSumAtMultiply = [kObj.startingSumAtMultiply];
                            }

                            if (kObj.dividePointtypeIsOn) {
                                if (typeof kObj.pointTypeToDivide === 'string') kObj.pointTypeToDivide = [kObj.pointTypeToDivide];
                                if (typeof kObj.startingSumAtDivide === 'number') kObj.startingSumAtDivide = [kObj.startingSumAtDivide];
                            }

                            if (kObj.fadeTransitionIsOn && typeof kObj.fadeTransitionTime !== 'undefined') {
                                kObj.fadeInTransitionTime = kObj.fadeTransitionTime;
                                kObj.fadeOutTransitionTime = kObj.fadeTransitionTime;
                                delete kObj.fadeTransitionTime;
                            }

                            if (kObj.addToAllowChoice && typeof kObj.idOfAllowChoice === 'string') {
                                kObj.idOfAllowChoice = [kObj.idOfAllowChoice];
                            }
                            
                            if (typeof kObj.groups !== 'undefined') {
                                for (let k = 0; k < kObj.groups.length; k++) {
                                    if (typeof kObj.groups[k] === 'object') kObj.groups[k] = kObj.groups[k].id;
                                }
                            }

                            if (typeof kObj.objectDesignGroups !== 'undefined') {
                                for (let k = 0; k < kObj.objectDesignGroups.length; k++) {
                                    if (typeof kObj.objectDesignGroups[k] === 'object') kObj.objectDesignGroups[k] = kObj.objectDesignGroups[k].id;
                                }
                            }

                            if (typeof kObj.image) {
                                if (!isDataURL(kObj.image)) {
                                    externalImages.add(kObj.image);
                                } else if (!hasAvif.value) {
                                    hasAvif.value = isAvif(kObj.image);
                                }
                            }

                            for (let k = 0; k < kObj.addons.length; k++) {
                                const kAddon = kObj.addons[k];

                                if (typeof kAddon.template === 'undefined' || kAddon.template === 0) kAddon.template = 1;
                                kAddon.parentId = kObj.id;

                                if (typeof kAddon.image) {
                                    if (!isDataURL(kAddon.image)) {
                                        externalImages.add(kAddon.image);
                                    } else if (!hasAvif.value) {
                                        hasAvif.value = isAvif(kAddon.image);
                                    }
                                }
                            }
                        }
                    }
                }
            } else if (key === 'objectDesignGroups' || key === 'rowDesignGroups') {
                for (let i = 0; i < tempApp[key].length; i++) {
                    const dGroup = tempApp[key][i];

                    if (typeof dGroup.activatedId === 'undefined') dGroup.activatedId = '';
                    if (typeof dGroup.elements === 'undefined') dGroup.elements = [];
                    if (typeof dGroup.backpackElements === 'undefined') dGroup.backpackElements = [];

                    for (let j = 0; j < dGroup.elements.length; j++) {
                        if (typeof dGroup.elements[j] === 'object') dGroup.elements[j] = dGroup.elements[j].id;
                    }

                    for (let j = 0; j < dGroup.backpackElements.length; j++) {
                        if (typeof dGroup.backpackElements[j] === 'object') dGroup.backpackElements[j] = dGroup.backpackElements[j].id;
                    }

                    initFilterStyling(dGroup);
                    initStyling(dGroup.styling, typeof tempApp.version === 'undefined' || tempApp.version === '2.0.0-beta');
                }
            } else if (key === 'pointTypes') {
                for (let i = 0; i < tempApp[key].length; i++) {
                    const kPoint = tempApp[key][i];

                    if (typeof kPoint.initValue === 'undefined') kPoint.initValue = kPoint.startingSum;
                    if (typeof kPoint.positiveColor === 'object' && typeof kPoint.positiveColor.hexa !== 'undefined') kPoint.positiveColor = kPoint.positiveColor.hexa;
                    if (typeof kPoint.negativeColor === 'object' && typeof kPoint.negativeColor.hexa !== 'undefined') kPoint.negativeColor = kPoint.negativeColor.hexa;
                    if (typeof kPoint.privateColor === 'object' && typeof kPoint.privateColor.hexa !== 'undefined') kPoint.privateColor = kPoint.privateColor.hexa;
                    if (typeof kPoint.privateNegativeColor === 'object' && typeof kPoint.privateNegativeColor.hexa !== 'undefined') kPoint.privateNegativeColor = kPoint.privateNegativeColor.hexa;
                }
            } else if (key === 'groups') {
                for (let i = 0; i < tempApp[key].length; i++) {
                    const group = tempApp[key][i];

                    if (typeof group.elements === 'undefined') group.elements = [];
                    if (typeof group.rowElements === 'undefined') group.rowElements = [];

                    for (let j = 0; j < group.elements.length; j++) {
                        if (typeof group.elements[j] === 'object') {
                            group.elements[j] = group.elements[j].id;
                        }
                    }
                    for (let j = 0; j < group.rowElements.length; j++) {
                        if (typeof group.rowElements[j] === 'object') {
                            group.rowElements[j] = group.rowElements[j].id;
                        }
                    }
                }
            }
        } else if (typeof tempApp[key] === 'object') {
            if (key === 'styling') {
                initStyling(tempApp[key], typeof tempApp.version === 'undefined' || tempApp.version === '2.0.0-beta', true);
            }
        }
    }

    activatedMap.clear();
    pointTypeMap.clear();
    rowMap.clear();
    choiceMap.clear();
    groupMap.clear();
    globalReqMap.clear();
    wordMap.clear();
    variableMap.clear();
    rowDesignMap.clear();
    objectDesignMap.clear();
    mdObjects.splice(0);

    const defaultKeys = Object.keys(defaultApp);
    for (let i = 0; i < defaultKeys.length; i++) {
        const key = defaultKeys[i];
        
        if (defaultApp.hasOwnProperty(key)) {
            app[key] = defaultApp[key];
        } else {
            delete app[key];
        }
    }
    
    const tempKeys = Object.keys(tempApp);
    for (let i = 0; i < tempKeys.length; i++) {
        const key = tempKeys[i];
        
        app[key] = tempApp[key];
    }

    for (let i = 0; i < app.googleFonts.length; i++) {
        const fontId = app.googleFonts[i].replace(/ /g, '+');
        const url = `https://fonts.googleapis.com/css2?family=${fontId}&display=swap`;
        const link = document.createElement('link');

        link.id = fontId;
        link.rel = 'stylesheet';
        link.href = url;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    }

    for (let i = 0; i < app.customFonts.length; i++) {
        const url = app.customFonts[i];
        const link = document.createElement('link');
        
        link.id = url;
        link.rel = 'stylesheet';
        link.href = url;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    }

    for (let i = 0; i < app.pointTypes.length; i++) {
        const iPoint = app.pointTypes[i];

        if (typeof iPoint.id === 'undefined' || iPoint.id === '') iPoint.id = generatePointTypeId(0, 4);
        iPoint.id = checkDupId(iPoint.id, pointTypeMap);
        if (typeof iPoint.initValue === 'undefined') iPoint.initValue = iPoint.startingSum;
        if (typeof iPoint.isNotShownObjects === 'undefined' && iPoint.activatedId !== '') iPoint.isNotShownObjects = true;
        if (typeof iPoint.isNotShownPointBar === 'undefined' && iPoint.activatedId !== '') iPoint.isNotShownPointBar = true;
        pointTypeMap.set(iPoint.id, iPoint);
    }

    for (let i = 0; i < app.rows.length; i++) {
        const iRow = app.rows[i];

        if (typeof iRow.id === 'undefined' || iRow.id === '') iRow.id = generateRowId(0, 4);
        iRow.id = checkDupId(iRow.id, rowMap);
        rowMap.set(iRow.id, iRow);
        for (let j = 0; j < iRow.objects.length; j++) {
            const iChoice = iRow.objects[j];

            if (typeof iChoice.id === 'undefined' || iChoice.id === '') iChoice.id = generateObjectId(0, 4);
            iChoice.id = checkDupId(iChoice.id, choiceMap);
            choiceMap.set(iChoice.id, {choice: iChoice, row: iRow});

            for (let k = 0; k < iChoice.scores.length; k++) {
                const iScore = iChoice.scores[k];

                if (typeof iScore.idx === 'undefined' || iScore.idx === '') iScore.idx = generateScoreId(0, 5);
                iScore.idx = checkDupId(iScore.idx, scoreSet);
                scoreSet.add(iScore.idx);
            }
        }
    }

    for (let i = 0; i < app.backpack.length; i++) {
        const iRow = app.backpack[i];

        if (typeof iRow.id === 'undefined' || iRow.id === '') iRow.id = generateRowId(0, 4);
        iRow.id = checkDupId(iRow.id, rowMap);
        rowMap.set(iRow.id, iRow);
        for (let j = 0; j < iRow.objects.length; j++) {
            const iChoice = iRow.objects[j];

            if (typeof iChoice.id === 'undefined' || iChoice.id === '') iChoice.id = generateObjectId(0, 4);
            iChoice.id = checkDupId(iChoice.id, choiceMap);
            choiceMap.set(iChoice.id, {choice: iChoice, row: iRow});

            for (let k = 0; k < iChoice.scores.length; k++) {
                const iScore = iChoice.scores[k];

                if (typeof iScore.idx === 'undefined' || iScore.idx === '') iScore.idx = generateScoreId(0, 5);
                iScore.idx = checkDupId(iScore.idx, scoreSet);
                scoreSet.add(iScore.idx);
            }
        }
    }

    for (let i = 0; i < app.groups.length; i++) {
        const iGroup = app.groups[i];

        if (typeof iGroup.id === 'undefined' || iGroup.id === '') iGroup.id = generateGroupId(0, 4);
        iGroup.id = checkDupId(iGroup.id, groupMap);
        groupMap.set(iGroup.id, app.groups[i]);
    }

    for (let i = 0; i < app.words.length; i++) {
        const iWord = app.words[i];

        if (typeof iWord.id === 'undefined' || iWord.id === '') iWord.id = generateWordId(0, 4);
        iWord.id = checkDupId(iWord.id, wordMap);
        wordMap.set(iWord.id, app.words[i]);
    }

    for (let i = 0; i < app.variables.length; i++) {
        const iVariable = app.variables[i];

        if (typeof iVariable.id === 'undefined' || iVariable.id === '') iVariable.id = generateVariableId(0, 4);
        iVariable.id = checkDupId(iVariable.id, variableMap);
        variableMap.set(iVariable.id, app.variables[i]);
    }

    if (typeof app.rowDesignGroups !== 'undefined') {
        for (let i = 0; i < app.rowDesignGroups.length; i++) {
            const designGroup = app.rowDesignGroups[i];

            if (typeof designGroup.id === 'undefined' || designGroup.id === '') designGroup.id = generateDesignId(0, 4, true);
            designGroup.id = checkDupId(designGroup.id, rowDesignMap);
            rowDesignMap.set(designGroup.id, designGroup);
        }
    }

    if (typeof app.objectDesignGroups !== 'undefined') {
        for (let i = 0; i < app.objectDesignGroups.length; i++) {
            const designGroup = app.objectDesignGroups[i];

            if (typeof designGroup.id === 'undefined' || designGroup.id === '') designGroup.id = generateDesignId(0, 4, false);
            designGroup.id = checkDupId(designGroup.id, objectDesignMap);
            objectDesignMap.set(app.objectDesignGroups[i].id, app.objectDesignGroups[i]);
        }
    }

    if (typeof app.globalRequirements !== 'undefined') {
        for (let i = 0; i < app.globalRequirements.length; i++) {
            const globalReq = app.globalRequirements[i];

            globalReqMap.set(globalReq.id, globalReq);
        }
    }
    
    if (app.activated.length > 0) {
        loadActivated(app.activated.join(','));
    }

    if (typeof app.customCSS !== 'undefined') {
        applyCustomCSS(app.customCSS);
    }

    if (app.buildAutoSaveIsOn) {
        if (buildAbortController) {
            buildAbortController.abort();
        }
        buildAutoSave();
    }

    if (typeof app.isMute !== 'boolean') {
        app.curVolume = 100;
        app.isMute = false;
    }
}
async function waitForImagesToLoad(container: HTMLElement): Promise<void> {
    const imgs = container.querySelectorAll('img');
    const promises = Array.from(imgs).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
        });
    });
    return Promise.all(promises).then(() => {});
}
function forceEagerImageLoading(container: HTMLElement) {
    const images = container.querySelectorAll('img');
    images.forEach(img => {
        if (img.loading === 'lazy') {
            img.loading = 'eager';
        }
    });
}
function copyComputedStyles(source: HTMLElement, target: HTMLElement) {
    const computed = window.getComputedStyle(source);
    for (const key of computed) {
        try {
            target.style.setProperty(key, computed.getPropertyValue(key), computed.getPropertyPriority(key));
        } catch (error) {
            console.error(error);
        }
    }
}
function deepCopyStyles(source: HTMLElement, target: HTMLElement) {
    copyComputedStyles(source, target);
    const sourceChildren = source.children;
    const targetChildren = target.children;

    for (let i = 0; i < sourceChildren.length; i++) {
        deepCopyStyles(sourceChildren[i] as HTMLElement, targetChildren[i] as HTMLElement);
    }
}
async function waitForBorderImagesToLoad(container: HTMLElement) {
    const elements = container.querySelectorAll<HTMLElement>('*');
    const borderImageUrls: string[] = [];

    elements.forEach(el => {
        const style = getComputedStyle(el);
        const urlMatch = style.borderImageSource.match(/url\(["']?(.*?)["']?\)/);
        if (urlMatch && urlMatch[1]) {
            borderImageUrls.push(urlMatch[1]);
        }
    });

    const loadPromises = borderImageUrls.map(src => {
        return new Promise(resolve => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve;
        });
    });

    await Promise.all(loadPromises);
}
function waitForRenderFrames(frames = 2): Promise<void> {
    return new Promise(resolve => {
        let count = 0;
        function next() {
            if (++count >= frames) return resolve();
                requestAnimationFrame(next);
        }
        requestAnimationFrame(next);
    });
}
export async function downloadAsImage(printDiv?: HTMLDivElement) {
    if (printDiv) {
        let tmpElements: HTMLSpanElement[] = [];
        try {
            snackbarVariables.labelText = 'Downloading image...';
            snackbarVariables.isOpen = true;
            forceEagerImageLoading(printDiv);
            await waitForImagesToLoad(printDiv);

            printDiv.querySelectorAll('span.d-flex').forEach((el) => {
                const span = (el as HTMLSpanElement);
                if (!span.style.height && span.offsetHeight > 0) {
                    span.style.height = `${span.offsetHeight + 1}px`;
                    tmpElements.push(span);
                }
            });

            const maxArea = await canvasSize.maxArea({ usePromise: true });
            const maxHeight = maxArea.height;
            const divHeight = printDiv.offsetHeight;
            const divWidth = printDiv.offsetWidth;

            if (!viewerSettings.isSingleFile && divHeight > maxHeight) {
                let offset = 0;
                let part = 1;
                const maxPart = Math.ceil(divHeight / maxHeight);

                while (offset < divHeight) {
                    const currentHeight = Math.min(maxHeight, divHeight - offset);
                    const wrapper = document.createElement('div');

                    snackbarVariables.labelText = `Splitting large image...(${part} / ${maxPart})`;
                    snackbarVariables.isOpen = true;

                    if (app.styling.useBackpackDesign) {
                        if (app.styling.backpackBgImage) {
                            wrapper.style.backgroundImage = app.styling.backpackBgImage;
                        }
                        if (app.styling.backpackBgColor) {
                            wrapper.style.backgroundColor = hexToRgba(app.styling.backpackBgColor);
                        }
                        if (app.styling.isBackpackBgRepeat) {
                            wrapper.style.backgroundRepeat = 'repeat';
                        } else if (app.styling.isBackpackBgFitIn) {
                            wrapper.style.backgroundSize = '100% 100%';
                        } else {
                            wrapper.style.backgroundSize = 'cover';
                        }
                    } else {
                        if (app.styling.backgroundImage) {
                            wrapper.style.backgroundImage = app.styling.backgroundImage;
                        }
                        if (app.styling.backgroundColor) {
                            wrapper.style.backgroundColor = hexToRgba(app.styling.backgroundColor);
                        }
                        if (app.styling.isBackgroundRepeat) {
                            wrapper.style.backgroundRepeat = 'repeat';
                        } else if (app.styling.isBackgroundFitIn) {
                            wrapper.style.backgroundSize = '100% 100%';
                        } else {
                            wrapper.style.backgroundSize = 'cover';
                        }
                    }
                    if (printDiv.parentElement && printDiv.parentElement.classList.contains('mdc-dialog__content')) {
                        wrapper.classList.add('backpack-wrapper');
                    }
                    wrapper.style.width = `${divWidth}px`;
                    wrapper.style.height = `${currentHeight}px`;
                    wrapper.style.overflow = 'hidden';
                    wrapper.style.position = 'absolute';
                    wrapper.style.display = 'block';
                    wrapper.style.top = '0';
                    wrapper.style.left = '0';
                    wrapper.style.zIndex = '-9999';
                    wrapper.style.pointerEvents = 'none';

                    const clone = printDiv.cloneNode(true) as HTMLElement;
                    forceEagerImageLoading(clone);
                    
                    clone.style.position = 'relative';
                    clone.style.top = `-${offset}px`;

                    wrapper.appendChild(clone);
                    document.body.appendChild(wrapper);

                    await waitForImagesToLoad(wrapper);
                    await waitForBorderImagesToLoad(wrapper);
                    await waitForRenderFrames(5);

                    try {
                        const blob = await toBlob(wrapper, { filter: (node) => {return !node.classList?.contains('mdc-top-app-bar') && !node.classList?.contains('hidden') && node.nodeType !== Node.COMMENT_NODE} });
                        if (!blob) {
                            throw new Error('blob creation failed');
                        }

                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');

                        a.href = url;
                        a.download = `Build_${getTimestamp()}_part${part++}.png`;
                        a.target = '_blank';
                        a.click();

                        setTimeout(() => {
                            URL.revokeObjectURL(url);
                        }, 1000);
                    } catch (error) {
                        snackbarVariables.labelText = 'Download failed: Restricted content detected.';
                        snackbarVariables.isOpen = true;
                        console.error(error);
                    } finally {
                        document.body.removeChild(wrapper);
                    }

                    offset += maxHeight;
                }
                snackbarVariables.labelText = 'Image downloads complete.';
                snackbarVariables.isOpen = true;
            } else {
                const blob = await toBlob(printDiv, { filter: (node) => {return !node.classList?.contains('mdc-top-app-bar') && !node.classList?.contains('hidden') && node.nodeType !== Node.COMMENT_NODE} });
                if (!blob) {
                    throw new Error('blob creation failed');
                }

                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');

                a.href = url;
                a.download = `Build_${getTimestamp()}.png`;
                a.target = '_blank';
                a.click();

                setTimeout(() => {
                    URL.revokeObjectURL(url);
                }, 1000);

                snackbarVariables.labelText = 'Image download complete.';
                snackbarVariables.isOpen = true;
            }
        } catch (error) {
            snackbarVariables.labelText = 'Download failed: Restricted content detected.';
            snackbarVariables.isOpen = true;
            console.error(error);
        } finally {
            for (let i = 0; i < tmpElements.length; i++) {
                const span = tmpElements[i];
                span.style.removeProperty('height');
                if (span.getAttribute('style')?.trim() === '') {
                    span.removeAttribute('style');
                }
            }
        }
    } else {
        snackbarVariables.labelText = 'Download failed: Cannot find window.';
        snackbarVariables.isOpen = true;
    }
}
export function isMediaSupport() {
    if (!window.matchMedia) return false;

    try {
        const mq = window.matchMedia('(prefers-color-scheme: dark)').media;
        return mq !== 'not all';
    } catch (e) {
        return false;
    }
}
export function toggleTheme() {
    const t = localStorage.getItem('theme') as string;
    currentTheme.value = t === 'dark' ? 'light' : 'dark';
    let themeDarkLink: HTMLLinkElement | null = document.head.querySelector('#theme-dark');
    let themeLightLink: HTMLLinkElement | null = document.head.querySelector('#theme-light');
    let isSupport = isMediaSupport();

    if (currentTheme.value === 'dark') {
        if (isSupport) {
            if (themeDarkLink) {
                themeDarkLink.media = 'screen and (prefers-color-scheme: light)';
            }
            if (themeLightLink) {
                themeLightLink.media = 'screen and (prefers-color-scheme: dark)';
            }
        } else {
            if (themeDarkLink) {
                themeDarkLink.media = 'all';
            }
            if (themeLightLink) {
                themeLightLink.media = 'not all';
            }
        }
    } else {
        if (isSupport) {
            if (themeDarkLink) {
                themeDarkLink.media = 'screen and (prefers-color-scheme: dark)';
            }
            if (themeLightLink) {
                themeLightLink.media = 'screen and (prefers-color-scheme: light)';
            }
        } else {
            if (themeDarkLink) {
                themeDarkLink.media = 'not all';
            }
            if (themeLightLink) {
                themeLightLink.media = 'all';
            }
        }
    }
    localStorage.setItem('theme', currentTheme.value);
}
export function applyTemplate(target: Row | Choice | Addon, id: string, template: number) {
    if (typeof target.templateStack === 'undefined') {
        target.templateStack = [];
        target.defaultTemplate = typeof target.template !== 'undefined' ? target.template : 1;
    }
    target.templateStack.push({ id: id, data: template });
    target.template = template;
}
export function revertTemplate(target: Row | Choice | Addon, id: string) {
    if (typeof target.templateStack !== 'undefined') {
        const idx = target.templateStack.findIndex(item => item.id === id);
        if (idx !== -1) target.templateStack.splice(idx, 1);

        const leng = target.templateStack.length;
        if (leng > 0) {
            target.template = target.templateStack[leng - 1].data;
        } else {
            target.template = typeof target.defaultTemplate !== 'undefined' ? target.defaultTemplate : 1;
            delete target.templateStack;
        }
    }
}
export function applyWidth(target: Row | Choice, id: string, width: string) {
    if (typeof target.widthStack === 'undefined') {
        target.widthStack = [];
        target.defaultWidth = typeof target.width !== 'undefined' ? target.width : 'col-md-3';
    }
    target.widthStack.push({ id: id, data: width });
    target.width = width;
}
export function revertWidth(target: Row | Choice, id: string) {
    if (typeof target.widthStack !== 'undefined') {
        const idx = target.widthStack.findIndex(item => item.id === id);
        if (idx !== -1) target.widthStack.splice(idx, 1);

        const leng = target.widthStack.length;
        if (leng > 0) {
            target.width = target.widthStack[leng - 1].data;
        } else {
            target.width = typeof target.defaultWidth !== 'undefined' ? target.defaultWidth : 'col-md-3';
            delete target.widthStack;
        }
    }
}
export function applyCustomCSS(text: string) {
    let style = document.getElementById('customCSS');
    if (style) {
        if (text === '') {
            style.remove();
            delete app.customCSS;
        } else {
            style.textContent = text;
            app.customCSS = text;
        }
    } else {
       style = document.createElement('style');
       style.id = 'customCSS';
       style.textContent = text;
       app.customCSS = text;
       document.head.appendChild(style);
    }
}
const isSupport8DigitHex = CSS.supports('color', '#00000080');
export function hexToRgba(hex?: string) {
    if (typeof hex === 'undefined') return '';
    if (isSupport8DigitHex || !/^#([\da-f]{8})$/i.test(hex)) return hex;

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const a = parseInt(hex.slice(7, 9), 16) / 255;

    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
}