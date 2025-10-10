<Card class="h-100">
    <CardContent class="p-0">
        <TopAppBar class="viewer-menu" variant="static">
            <AppBarRow>
                <AppBarSection class="py-0 justify-left">
                    <div class="col-12">
                        <IconButton onclick={() => currentComponent.value = 'appMain'} size="mini">
                            <i class="mdi mdi-chevron-left"></i>
                        </IconButton>
                    </div>
                </AppBarSection>
            </AppBarRow>
        </TopAppBar>
        <TabBar tabs={['Changelog', 'QnA']} bind:active>
            {#snippet tab(tab)}
                <Tab {tab}>
                    <TabLabel>{tab}</TabLabel>
                </Tab>
            {/snippet}
        </TabBar>
        {#if active === 'Changelog'}
            <Paper role="tabpanel" variant="unelevated">
                <Content>
                    {#key logCurPage}
                        <div class="col pb-2">
                            <div class="d-row align-items-center justify-end">
                                <IconButton onclick={() => logCurPage > 1 ? logCurPage -= 1 : logCurPage = logPageLeng}><i class="mdi mdi-menu-left"></i></IconButton>
                                <span class="list-text px-2">Page {logCurPage}</span>
                                <IconButton onclick={() => logCurPage < logPageLeng ? logCurPage += 1 : logCurPage = 1}><i class="mdi mdi-menu-right"></i></IconButton>
                            </div>
                        </div>
                        <Accordion>
                            {#each logSlots as log, i}
                                <InfoPanel title={log.title} text={log.text} open={log.open} />
                            {/each}
                        </Accordion>
                    {/key}
                </Content>
            </Paper>
        {:else if active === 'QnA'}
            <Paper role="tabpanel" variant="unelevated">
                <Content>
                    {#key qnaCurPage}
                        <div class="col pb-2">
                            <div class="d-row align-items-center justify-end">
                                <IconButton onclick={() => qnaCurPage > 1 ? qnaCurPage -= 1 : qnaCurPage = qnaPageLeng}><i class="mdi mdi-menu-left"></i></IconButton>
                                <span class="list-text px-2">Page {qnaCurPage}</span>
                                <IconButton onclick={() => qnaCurPage < qnaPageLeng ? qnaCurPage += 1 : qnaCurPage = 1}><i class="mdi mdi-menu-right"></i></IconButton>
                            </div>
                        </div>
                        <Accordion>
                            {#each qnaSlots as qna}
                                <InfoPanel title={qna.title} text={qna.text} />
                            {/each}
                        </Accordion>
                    {/key}
                </Content>
            </Paper>
        {/if}
    </CardContent>
</Card>

<script lang="ts">
    import { currentComponent, getDate } from '$lib/store/store.svelte';
    import Accordion from '$lib/custom/accordion';
    import Card, { Content as CardContent } from '@smui/card';
    import IconButton from '@smui/icon-button';
    import Paper, { Content } from '@smui/paper';
    import Tab, { Label as TabLabel } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import TopAppBar, { Row as AppBarRow, Section as AppBarSection } from '@smui/top-app-bar';
    import InfoPanel from './InfoPanel.svelte';

    const qnaList = [{
        title: 'How do I show off my CYOA?',
        text: `1. Host it yourself on a free hosting service.

            <b>You have two options:</b>

            A. Download the Viewer from the link below. Then, open the <b>JSON</b> file of the project and the <b>app.XXXXXXX.js</b> file in a text editor such as Notepad. Copy all contents from your project and paste them into the space between /*! Delete ~ */ and /*! End */ in the js file.

            <b>OR</b>

            B. Download the Viewer from the link below. Get your project <b>JSON</b> file and make sure it is named <b>project.json</b>. Place this file next to the <b>index.html</b> file inside the Viewer folder.
            Note: This method will not work when running locally from your computer—it must be uploaded to a hosting service. However, once it's hosted, you can easily update your project by simply replacing the project file. This is the more convenient and scalable solution.

            <b>Next:</b>

            Create a user on Neocities or another free hosting service, move to the 'Edit your page' part of the site and upload the Viewer, anyone that enters the page will now see the CYOA.
            
            <a href="https://github.com/wahaha303/ICCPlus/releases/latest" target="_blank">ICC Plus Viewer</a>
            https://github.com/wahaha303/ICCPlus/releases/latest
        `
    }, {
        title: 'Can I use a single Viewer for multiple CYOAs?',
        text: `Place the <b>css</b>, <b>js</b> and <b>fonts</b> folders (excluding the loading.css file) in your desired directory.
        Then, open the <b>index.html</b> file and modify the path in <code>&lt;script src="./js/core.js"&gt;&lt;/script&gt;</code> to match the location of the <b>core.js</b> file.
        After that, each CYOA directory only needs to contain the <b>index.html</b>, <b>css/loading.css</b>, and <b>project.json</b> files.
        `
    }, {
        title: 'Can I create static Image CYOA\'s with this?',
        text: `Yes, you can!
                In the top menu of the Viewer Mode, you will see a button labeled "Download image". Click this button to start downloading the image of your project. The larger your project is, the longer it may take for the download to begin, and the bigger the resulting file will be.

                If your project is too large, it will be automatically split into multiple image files. If you see <i>\'_part\'</i> at the end of the downloading file names, please do not leave the page until all parts have finished downloading.

                If the image doesn\'t download properly or other issues occur, it might be wiser to use an extension with more options, such as <a href="https://www.awesomescreenshot.com/" target="_blank">Awesome Screenshot</a>, which allows you to save your project as a PDF or capture only a specific part of it.`
    }, {
        title: 'How should I go about creating a CYOA with this?',
        text: `First off, after figuring out what you want to make a CYOA about, find a color palette that fits the theme, you can use a <a href="https://color.adobe.com/nb/create/" target="_blank">Color theme generator</a> if you need help. Placing a repeating image in the background that fits the theme is always a good idea.

        Create the point system if you have one, it's not necessary, you can always go for the 'select x from each row' type of Cyoa. Now create the rows you have planned before-hand, give them names, and add any choices you have planned.`
    }, {
        title: 'What is a requirement and how do I create one?',
        text: `A requirement is something that can be created on both rows and choices and will decide if the row is visible, or if the choice can be activated.

        A requirement can be added to a row by pressing the key+ symbol in the right corner, and on the choice by pressing the button that says 'Requirement'.

        When one of these buttons is pressed you a dialog opens up where you have to choose what condition you'll want.

        <b>Add Global Requirement</b>:
        - Use the Global Requirement defined in Manage Global Requirement.
        <b>Add Word Requirement</b>:
        - Insert a requirement to compare the current value of the word (Text to replace id with).
        <b>Add Selected Choice Requirement</b>:
        - Insert a requirement to check whether the user has selected the choice with the specified id.
        - If the choice can be selected multiple times, you can append /ON#Number after the id to check whether it has been selected at least a certain number of times (e.g., choice-id/ON#2).
        <b>Add Non-Selected Choice Requirement</b>:
        - Insert a requirement to check whether the user has not selected the choice with the specified id.
        <b>Add Point Requirement</b>
        - Insert a requirement to compare the current value of the Point-type.
        <b>Add Point Comparison Requirement</b>
        - Insert a requirement to compare the values of two Point-types.
        - Arithmetic operations can be added to the Point-type located on the right-hand side.
        <b>'X of These is Selected' Requirement</b>
        - Insert a requirement to check whether the user has selected at least X choices with the specified id.
        <b>'X of These is Not Selected' Requirement</b>
        - Insert a requirement to check whether the user has selected fewer than X choices with the specified id.
        <b>'Selected X or more From' Requirements</b>
        - Insert a requirement to check whether the user has selected at least X choices among those included in the Group / Row / All Rows.


        More than one of these requirements can be added to each row, choice, addon, score and requirement.`
    }, {
        title: 'What is a Point-type and how do I create one?',
        text: `A point-type is a system where you can create some type of valuta, be it gold points, XP or just points, that the player can spend and earn trough their choices. These can be created in the dialog that pops up when you press the 'Feature' button in the top menu and can be added to choices by pressing the 'Score' button on a choice.

        In the 'Point Type' select you choose the point-type you have created, the value which needs to be in the negative if you want it to give the player points, and the text that will be shown before and after.

        If the 'Show Score?' checkbox is unchecked then the value and text will not show on the choice, in case you want to write it in the text or you want it to be hidden.`
    }, {
        title: 'How do I load and save my proejct?',
        text: `In the left sidebar of the creator, you'll see a button named 'Save/Load Project'. Pressing this button will lead you to a dialog where you can find a button that says 'Save to Disk'.

        Pressing on the button will take you to the explorer where you'll need to choose where to store it and what name to give it.`
    }, {
        title: 'How do I change the design of my project?',
        text: `If you look at the top bar in the image designer you'll see a button named 'Modify Design', click on this and a dialog with a lot of buttons will show itself. Each of these buttons will open another dialog where you can make changes to the design of whatever is written on it.

        An example will be that the 'Manage Filters' button will let you change the look of the deactivated and activated filters, and the 'Text' button will let you change the color, size, and font of the different texts on the page.

        Each row can have different designs if you press the Cog in the right corner of the row and flips the switch 'Use private styling?' in the dialog that pops up. Now the styling of the row will be whatever you change in the buttons that show up under.`
    }, {
        title: 'What is variables used for?',
        text: `At this point, variables can only be used with button rows and can be attached to a button when it is created. Clicking a button with a variable attached to it will push the id of the variable into the array where the ids of selected choices lie. This makes it possible to use the id in requirements for rows and choices.`
    }, {
        title: 'What is allowed choices and selected choices?',
        text: `In the edit-mode of the row, there is a text field that says 'Allowed Choices' and a text field that says 'Selected Choices'. The 'Allowed Choices' decides how many choices that the player can select at one time, write 1 in the text field and the user may only choose one. If there is no limit then let it stay 0.

        The 'Selected Choices' will show how many that is currently selected, and should normally be 0, if it is something else and none is selected then some wonky shit has happened, and you can clear it by changing the value to 0.
        `
    }, {
        title: 'What does the three switches on a row do?',
        text: `The three switches in the row when it is on edit-mode changes how the rows operate when pressed.

        The first one named 'Button?' will switch the image of the row out with a button, which in turn can be used to activate or deactivate variables, whose ids can be used in requirements.

        The second button will make it impossible for a player to change any of the choices, if one is selected then it will stay selected and visa versa. Good to use when the user should be given information or story, and not choices.

        The third button named 'Selected Choices?' can be used to make the row show all choices that have been selected, good to use at the end of the project to let the player see the choices they have made. A private row design should be used to make filters invisible.`
    }, {
        title: 'What is an Addon?',
        text: `An Addon is going to be a smaller choice in the choices but is currently only an under title and undertext of the choice it is attached to.`
    }, {
        title: 'What is the image cropper and compressor?',
        text: `The image cropper and compressor can be found when someone presses the 'Change Image'-button on either a row or a choice and will open up in its own dialog.

        The cropper lets you change the height and width aspect of your image, and cut off parts that you don't need. To change the aspect you'll have to change the value of the two text fields, and then press the 'Change Aspect'-button. To crop the image you need to press the 'Crop Image'-button.

        The compressor cuts down the size of the image at the cost of its quality, which everyone should do to keep the project file small and thus the same with the bandwidth and storage cost. The image quality and the image scale text field shows the percentage to cut down to in quality and scale.

        Cutting down to 40sih percent quality will make little visible difference in most cases, but shave off up to 60-70 percent of the image file size.`
    }];
    const changelogList = [{
        open: true,
        title: `v2.6.4 / ${getDate('2025-10-10T15:00:00Z')}`,
        text: `<span style="color: green">Row</span>
        - Fixed issue where 'Deselect choices if row doesn't meet requirements' option did not deselect multiple selectable choices.

        <span style="color: green">Miscellaneous</span>
        - Fixed issue where some UI elements were not clearly visible in Dark Theme.
        `
    }, {
        open: false,
        title: `v2.6.3 / ${getDate('2025-10-08T15:00:00Z')}`,
        text: `<span style="color: green">Choice</span>
        - Fixed issue where Change Choices Per Row did not work properly.
        `
    }, {
        open: false,
        title: `v2.6.2 / ${getDate('2025-10-06T15:00:00Z')}`,
        text: `<span style="color: green">UI</span>
        - Fixed issue where some tags could not be assigned classes.

        <span style="color: green">Choice</span>
        - Fixed issue where Change Image Template could not be used with Group ID.
        `
    }, {
        open: false,
        title: `v2.6.1 / ${getDate('2025-10-05T16:00:00Z')}`,
        text: `<span style="color: green">Choice</span>
        - Allowed context menu to open on right-click for tooltip-enabled images.
        `
    }, {
        open: false,
        title: `v2.6.0 / ${getDate('2025-10-05T10:00:00Z')}`,
        text: `<span style="color: green">UI</span>
        - Fixed issue where color codes in Text Editor did not display actual applied color.

        <span style="color: green">Row</span>
        - Fixed issue where some Choice Per Row values had inaccurate widths.

        <span style="color: green">Choice</span>
        - Added option to use formulas instead of numbers in Score.
        - Added option to set points to a specific value using formulas in Function. 
        (<i>Note: If you use points in the formula, the score will not update when the point’s value is changed after a choice has been selected.</i>)
        - Fixed issue where inserted player image was not displayed when loading build.
        - Fixed issue where multiple selectable choices activated by another multiple selectable choice did not deselect when that choice was deselected.
        - Fixed issue where random score value changed each time build code was loaded.
        `
    }, {
        open: false,
        title: `v2.5.8 / ${getDate('2025-09-27T04:00:00Z')}`,
        text: `<span style="color: green">Miscellaneous</span>
        - Fixed issue where aspect ratio was locked to 1:1 by default even before clicking Change Aspect.
        `
    }, {
        open: false,
        title: `v2.5.7 / ${getDate('2025-09-26T15:00:00Z')}`,
        text: `<span style="color: green">Save / Load</span>
        - Fixed issue where saving project/build from pages other than page 1 overwrote slot on page 1.
        `
    }, {
        open: false,
        title: `v2.5.6 / ${getDate('2025-09-25T15:00:00Z')}`,
        text: `<span style="color: green">Miscellaneous</span>
        - Added explanation about Requirement to QnA section in Help and Changelog.
        - Fixed compatibility issue with projects created in old vanilla ICC.
        `
    }, {
        open: false,
        title: `v2.5.5 / ${getDate('2025-09-21T13:00:00Z')}`,
        text: `<span style="color: green">Miscellaneous</span>
        - Fixed issue where cropper flickered repeatedly on image upload.
        `
    }, {
        open: false,
        title: `v2.5.4 / ${getDate('2025-09-19T15:00:00Z')}`,
        text: `<span style="color: green">Row</span>
        - Fixed issue where score dropped below 0 via Row Button despite "This score is not allowed to go under 0" enabled.

        <span style="color: green">Choice</span>
        - Fixed issue where random score did not work correctly with score that had "This score is not allowed to go under 0" enabled.

        <span style="color: green">Desktop Version</span>
        - Added close button to update download dialog.
        
        <span style="color: green">Miscellaneous</span>
        - Added context menu option to import/export Row, Choice, Addons, Scores, and Requirements as file.
        - Added button on first screen to download desktop version.
        `
    }, {
        open: false,
        title: `v2.5.3 / ${getDate('2025-09-16T14:00:00Z')}`,
        text: `<span style="color: green">Miscellaneous</span>
        - Fixed issue where minus sign was not preserved when deleting negative number in input field.
        `
    }, {
        open: false,
        title: `v2.5.2 / ${getDate('2025-09-15T14:00:00Z')}`,
        text: `<span style="color: green">Miscellaneous</span>
        - Fixed issue where cursor moved to beginning of input field when deleting decimal point.
        - Fixed issue where project files compressed as ZIP could not be read in some browsers.
        `
    }, {
        open: false,
        title: `v2.5.1 / ${getDate('2025-09-12T14:00:00Z')}`,
        text: `<span style="color: green">Choice</span>
        - Allow copying tooltip text to clipboard by right-clicking on images with tooltips.
        - Fixed issue where discount features and multiple conditional scores did not apply correctly when used together.
        - Fixed issue where counter could not be set to 0 with slider when used with 'Allow First Selection by Clicking' option.
        - Fixed issue where score sign was not displayed correctly when sign was reversed due to discount.

        <span style="color: green">Miscellaneous</span>
        - Fixed typo in 'Create New Requirement' tooltip.
        `
    }, {
        open: false,
        title: `v2.5.0 / ${getDate('2025-09-11T12:00:00Z')}`,
        text: `<span style="color: green">Row</span>
        - Assigned CSS class named 'row-button' to Row Button.

        <span style="color: green">Choice</span>
        - Enabled manual input of selection count for multi-select choices by clicking the number.
        - Fixed issue where enabling the overlay option in filter design caused choice size to shrink.
        - Fixed issue where spacing between score texts was not applied correctly.

        <span style="color: green">Requirement</span>
        - Fixed issue where spacing between requirement texts was not applied correctly.

        <span style="color: green">Point Bar</span>
        - Fixed issue where spacing between point texts was not applied correctly.

        <span style="color: green">Custom CSS</span>
        - Allow inserting tab character in input field using Tab key.
        - Display class names assigned to rows and choices as placeholder text in empty input field.
        `
    }, {
        open: false,
        title: `v2.4.10 / ${getDate('2025-09-09T13:00:00Z')}`,
        text: `<span style="color: green">Row</span>
        - Fixed issue where cloned rows did not function properly until reloading the project.

        <span style="color: green">Choice</span>
        - Added option to completely hide the counter when using the slider feature.
        - Fixed issue where discount feature was not working correctly.

        <span style="color: green">Build Form</span>
        - Fixed issue where selection count for multi-select choices was not displayed.
        
        <span style="color: green">Export Project</span>
        - Fixed issue where background image in choice function was not exported separately when exporting project as ZIP file.
        `
    }, {
        open: false,
        title: `v2.4.9 / ${getDate('2025-09-07T15:00:00Z')}`,
        text: `<span style="color: green">UI</span>
        - Fixed issue where &lt;ruby&gt; tags did not work properly.
        
        <span style="color: green">Viewer</span>
        - Fixed issue where build form could be opened via right-clicking menu button even when Save/Load Build was disabled in Global Settings.
        
        <span style="color: green">Miscellaneous</span>
        - Fixed issue where entering non-numeric value in Color Picker number field caused page to freeze.
        `
    }, {
        open: false,
        title: `v2.4.8 / ${getDate('2025-09-06T15:00:00Z')}`,
        text: `<span style="color: green">Choice</span>
        - Fixed issue where disabling 'Select Individual Choices Instead of Groups' prevented setting groups.
        - Fixed issue where loading a build with a discounted choice and selecting another discount option caused discounts to stack.
        - Fixed issue where a choice activated by multiple other choices was incorrectly deactivated when only one of them was deselected.
        `
    }, {
        open: false,
        title: `v2.4.7 / ${getDate('2025-09-02T15:00:00Z')}`,
        text: `<span style="color: green">UI</span>
        - Fixed issue where text alignment could not be changed after reopening the text editor.
        - Fixed issue where bullet point lists were not functioning correctly in the text editor.

        <span style="color: green">Viewer</span>
        - Added tooltip explaining mouse actions to the menu button in the point bar.
        `
    }, {
        open: false,
        title: `v2.4.6 / ${getDate('2025-09-01T12:00:00Z')}`,
        text: `<span style="color: green">UI</span>
        - Fixed issue where previously applied text styles couldn't be changed when reopening the text editor.
        - Fixed issue where the focused state color of the text editor did not update correctly in dark mode.

        <span style="color: green">Choice</span>
        - Fixed issue where multiple spaces were collapsed into a single space within choice text.
        - Fixed issue where HTML tags in choice title were shown in score update notifications.
        `
    }, {
        open: false,
        title: `v2.4.5 / ${getDate('2025-08-31T09:00:00Z')}`,
        text: `<span style="color: green">UI</span>
        - Fixed issue where line breaks did not render correctly when closing the text editor without making any changes.
        `
    }, {
        open: false,
        title: `v2.4.4 / ${getDate('2025-08-31T01:00:00Z')}`,
        text: `<span style="color: green">UI</span>
        - Fixed issue where &lt;span&gt; tags were being inserted multiple times in the text editor.
        - Fixed issue where text disappeared when the editor contained only line breaks.
        - Fixed issue where multiple spaces were collapsed into one when switching between editor and HTML modes.
        `
    }, {
        open: false,
        title: `v2.4.3 / ${getDate('2025-08-30T03:00:00Z')}`,
        text: `<span style="color: green">UI</span>
        - Fixed issue where unnecessary line breaks were added when switching between editor and HTML view.
        - Fixed issue where copying a choice with no text inserted text from the right-hand choice.

        <span style="color: green">Addon</span>
        - Fixed issue where gradient in Addon Design was not displaying correctly.

        <span style="color: green">Build Form</span>
        - Fixed issue where HTML tags were displayed in Choice Title.
        `
    }, {
        open: false,
        title: `v2.4.1 ~ 2.4.2 / ${getDate('2025-08-28T03:00:00Z')}`,
        text: `<span style="color: green">UI</span>
        - Fixed issue where text editor was removing certain HTML tags and attributes.
        - Fixed issue where text inside text editor remained unchanged when moving Choices or Rows.

        <span style="color: green">Choice</span>
        - Fixed issue where loading a new project left behind some data from the previous one.
        
        <span style="color: green">Global Settings</span>
        - Added option to enable text editor in advanced tab.
        `
    }, {
        open: false,
        title: `v2.4.0 / ${getDate('2025-08-27T10:00:00Z')}`,
        text: `<span style="color: green">UI</span>
        - Added text editor feature.
        
        <span style="color: green">Row</span>
        - Fixed issue where rows that didn't meet requirements still occupied space in Creator Mode.

        <span style="color: green">Choice</span>
        - Added option to show scores in first visible addon.
        - Added option to show requirements in first visible addon.
        - Adjusted to show debug title instead when row title is empty while using "Show title of the row in choice" option.

        <span style="color: green">Addon</span>
        - Added option to hide addon unless its choice is selected.
        
        <span style="color: green">Requirement</span>
        - Added option to set priority for operators in point comparison.
        - Fixed issue where operations in point comparison did not follow the standard order of arithmetic operations.

        <span style="color: green">Viewer</span>
        - Added option to open build form in side menu.
        - Added feature to open build form directly via right-click on side menu button.
        - Added confirmation dialog when clicking Clear Selected Choices button.
        `
    }, {
        open: false,
        title: `v2.3.2 / ${getDate('2025-08-14T16:00:00Z')}`,
        text: `<span style="color: green">Choice</span>
        - Added option to use '= (Assignment)' in discount operator.
        - Added option to reactivate choices after reset when both 'Cannot be Reset' and 'Allow Deselection of Activated Choices' are enabled.
        - Fixed issue where points were not recalculated correctly when canceling non-stackable discount.
        - Fixed issue where discounted score was displayed even when 'Display Discounted Score' option was disabled.
        - Fixed issue where 'Cannot Be Reset' option did not work properly.
        
        <span style="color: green">Filter Design</span>
        - Added option to hide selected and unselected choice completely.
        `
    }, {
        open: false,
        title: `v2.3.1 / ${getDate('2025-08-13T12:00:00Z')}`,
        text: `<span style="color: green">Choice</span>
        - Fixed issue where minimum value of multiple choice was not properly reset when using Clean Selected Choices.
        
        <span style="color: green">Requirement</span>
        - Added option to hide requirement when requirement is not enabled.
        - Fixed issue where incorrect operators were displayed in point comparison.

        <span style="color: green">Miscellaneous</span>
        - Fixed issue where UI elements overlapped in word and variable dialogs.
        `
    }, {
        open: false,
        title: `v2.3.0 / ${getDate('2025-08-12T14:00:00Z')}`,
        text: `<span style="color: green">Row</span>
        - Fixed issue where aspect ratio was not shared within same row.

        <span style="color: green">Row Button</span>
        - Added option to allow activation of unselectable choices.
        
        <span style="color: green">Choice</span>
        - Added option to delay choice selection.
        - Added option to prevent activation of unselectable choices in 'Force Other Choices to Be Active'.
        - Fixed issue where random weight was not displayed when using row button.
        - Fixed issue where unselectable choices could not be activated by 'Force Other Choices to Be Active'.

        <span style="color: green">Addon</span>
        - Fixed issue where addon image was not displaying correctly.

        <span style="color: green">Image Template</span>
        - Fixed issue where image remained visible in image top position on small screens when using image center or bottom.

        <span style="color: green">Design Group</span>
        - Fixed issue where design group titles were misplaced on small screens.

        <span style="color: green">Save / Load</span>
        - Fixed issue where saved data in browser was occupying memory.

        <span style="color: green">Miscellaneous</span>
        - Fixed issue where BGM player was covering top Menu.
        `
    }, {
        open: false,
        title: `v2.2.5 / ${getDate('2025-08-05T17:00:00Z')}`,
        text: `<span style="color: green">Choice</span>
        - Adjusted 'Specify Number of Choices to Be Discounted' to support stacking when 'Allow Stacking Discounts' is enabled.
        - Fixed issue where choice with 'Cannot Be Deselected Manually' enabled in row with Allowed Choices did not work properly.
        - Fixed issue where discount text was not displaying correctly.

        <span style="color: green">Addon</span>
        - Fixed issue where text was cut off in addon.

        <span style="color: green">Build Form</span>
        - Added option to separate choice titles by row.

        <span style="color: green">Global Settings</span>
        - Added option to confirm before select/deselect all items in dropdown.

        <span style="color: green">Viewer</span>
        - Fixed issue where scrollbar was active before loading completed.
        `
    }, {
        open: false,
        title: `v2.2.4 / ${getDate('2025-07-29T15:00:00Z')}`,
        text: `<span style="color: green">Choice</span>
        - Added option to hide score value in discount feature.
        - Added option to hide score icon in discount feature.
        - Fixed issue where multiple select choice did not work properly when allowed choices set.
        - Fixed issue where discount data was not properly initialized.
        - Fixed issue where image template did not switch to image top on small screens.

        <span style="color: green">Point Type</span>
        - Added option to set icon position for choices.

        <span style="color: green">Global Settings</span>
        - Moved option to enable Choice Edit Button from Display tab to General tab.

        <span style="color: green">Viewer Settings</span>
        - Added option to set backpack width.
        `
    }, {
        open: false,
        title: `v2.2.1 ~ v2.2.3 / ${getDate('2025-07-27T07:00:00Z')}`,
        text: `<span style="color: green">Row</span>
        - Fixed issue where bottom margin of images was not applied properly.

        <span style="color: green">Choice</span>
        - Fixed issue where label of score dropdown menu overlapped with content.

        <span style="color: green">Group</span>
        - Fixed issue where all groups removed when loading project.
        `
    }, {
        open: false,
        title: `v2.2.0 / ${getDate('2025-07-25T17:00:00Z')}`,
        text: `<span style="color: green">Row</span>
        - Added option to copy Row.
        - Added context menu to some buttons.
        - Added option to display choices within group. Displayed choices are synchronized with their original counterparts.
        - Fixed issue where cloned rows wouldn't work properly until project reload.
        
        <span style="color: green">Choice</span>
        - Added option to copy Choice.
        - Added context menu to some buttons.
        - Added option to set number of choices discount can be applied to.
        - Fixed issue where dropdown menu was hidden by other dropdowns within group section.
        - Fixed issue where list text wasn't showing in 'Scroll To Choice'.
        - Fixed issue where score update message was not displayed correctly.

        <span style="color: green">Group</span>
        - Added option to clone group.
        - Fixed issue where deleting group left empty group in choices.

        <span style="color: green">Requirement</span>
        - Fixed issue where point wasn't displayed.

        <span style="color: green">Global Settings</span>
        - Added option to show menu on top.
        - Added option to show edit button for choice.

        <span style="color: green">Design Group</span>
        - Fixed issue where border radius was always set to 10 times its value when importing design.

        <span style="color: green">Miscellaneous</span>
        - Fixed issue where some buttons triggered twice on single click in Firefox version 141.0.
        `
    }, {
        open: false,
        title: `v2.1.1 ~ v2.1.7 / ${getDate('2025-07-19T17:00:00Z')}`,
        text: `<span style="color: green">Choice</span>
        - Fixed issue where self-invalidating choices were not deselected upon selection.
        - Fixed issue where Other Choices Function was not rendering properly.
        - Fixed issue where forcibly activated choice didn't reset state when using Clean Selected Choices.
        - Fixed issue where justify didn't work properly.
        - Fixed issue where score was not recalculated.

        <span style="color: green">Addon</span>
        - Fixed issue where text-align didn't apply to short lines.
        - Fixed issue where filter design was not being applied properly.

        <span style="color: green">Backpack</span>
        - Fixed issue where image downloads didn't work properly in some browsers.

        <span style="color: green">Tooltip</span>
        - Fixed issue where applying tooltip caused image size to shrink.
        - Adjust tooltip position to align properly with image.
        - Change default tooltip position to appear above instead of below.
        - Set default tooltip delay for image to 1 second.

        <span style="color: green">Image Compression</span>
        - Fixed issue where quality setting was not being applied.

        <span style="color: green">Global Settings</span>
        - Added option to set tooltip delay for image.

        <span style="color: green">Viewer - Settings</span>
        - Added option to download Backpack image as single file.

        <span style="color: green">Miscellaneous</span>
        - Changed text cursor color to make it more visible in dark mode.
        - Fixed issue where old project with styling field set to an empty string could not be loaded.
        `
    }, {
        open: false,
        title: `v2.1.0 / ${getDate('2025-07-14T16:00:00Z')}`,
        text: `<span style="color: green">Design</span>
        - Fixed issue where gradient was not rendering.
        - Fixed issue where importing private styling didn't work properly.

        <span style="color: green">Choice</span>
        - Added option to confirm dialog before select.
        - Added option to copy Score. To paste, right-click Create button.
        - Added option to copy Addon. To paste, right-click Create button.
        - Fixed issue where score was not recalculated when choice was deselected.

        <span style="color: green">Requirement</span>
        - Added option to add requirements in Score/Addon's requirements.
        - Added option to check Word's text.

        <span style="color: green">UI</span>
        - Fixed issue where initial UI overlapped in some dialogs.

        <span style="color: green">Miscellaneous</span>
        - Extended compatibility with older browser versions.
        `
    }, {
        open: false,
        title: `v2.0.1 ~ v2.0.8 / ${getDate('2025-07-12T12:00:00Z')}`,
        text: `<span style="color: green">Row</span>
        - Fixed issue where whitespace characters in Row's Title occupied space in layout.
        
        <span style="color: green">Choice</span>
        - Fixed issue where score didn't update correctly when lower limit set to negative value in Multiple Select.
        - Fixed issue where score value didn't display if point-type not assigned.
        - Fixed issue where canceling the discount choice caused incorrect score calculation.
        - Fixed issue where choices were sticking together when 'Identical Height' was disabled.
        - Fixed issue where gradient was not rendering.

        <span style="color: green">Requirement</span>
        - Fixed issue where 'X of These is Not Selected' requirement was not working properly.

        <span style="color: green">Global Settings</span>
        - Changed minimum screen width for applying maximum choices per row from 960px to 760px.
        - Added option to toggle adding prefix when generating ID.

        <span style="color: green">Backpack</span>
        - Fixed issue where separate background was not displayed in Viewer mode even when 'Use Separate Design' was enabled for Backpack.

        <span style="color: green">Point Bar</span>
        - Adjusted point position on the point bar to better match the previous settings.

        <span style="color: green">Word</span>
        - Fixed issue where Word didn't work properly when one Word ID was a substring of another.

        <span style="color: green">Miscellaneous</span>
        - Fixed issue where <a> tags with target="_blank" were not working.
        - Extended compatibility with older browser versions.
        `
    }, {
        open: false,
        title: `v2.0.0 / ${getDate('2025-07-08T15:00:00Z')}`,
        text: `<span style="color: green">Framework Migration</span>
        - Rebuilt the entire codebase and migrated from Vue 2.6.11 to Svelte 5.
        - Enhanced overall performance and responsiveness.

        <span style="color: green">Save System</span>
        - Added support for manual project saving via IndexedDB (Up to 99 save slots + 1 autosave slot).
    
        <span style="color: green">Dark Mode</span>
        - Dark mode preference is now stored in IndexedDB.

        <span style="color: green">UI Renewal</span>
        - Added button to insert new Row between existing ones.
        - Added button to add new Choice after the last one within Row.
        - Removed the Alternate Menu option.

        <span style="color: green">Point Type</span>
        - Added option to choose between integer and floating-point values for points.
        - Added option to set custom icon for negative point values.
        - '<i>Id Needed to Show</i>' now also tracks variable IDs.

        <span style="color: green">Point Bar</span>
        - When the number of points increases, the bar becomes scrollable instead of being compressed.

        <span style="color: green">Backpack</span>
        - Moved the enable/disable switch for build save/load to Global Settings.
        - Images are now preloaded automatically for download, even if not yet visible via scroll.
        - Fixed issue where image downloads were forcefully downscaled.
        - Fixed issue with segmented image downloads not working correctly.
        - Fixed issue where image downloads would fail in the Firefox browser.

        <span style="color: green">Manage Design</span>
        - Separated the design management UI into dedicated dialog, instead of displaying it at the top of the page.
        - Added option to use box-shadow instead of drop-shadow.
        - Fixed issue where Border Radius values were applied at 10× the intended value.

        <span style="color: green">Manage Features</span>
        - Improved performance when opening various feature dialogs.

        <span style="color: green">Global Settings</span>
        - Organized settings into categorized groups.
        - Added option to move Row addition buttons into toolbar buttons.
        - Added option to set autosave interval.
        - Added option to disable image rendering in Edit Mode.
        - Added option to inject custom CSS directly into project.
        - Added option to import external CSS via URL for custom fonts (CORS support required — e.g., Neocities requires supporter account to enable CORS).

        <span style="color: green">BGM Player</span>
        - Improved slider responsiveness.
        - YouTube API will no longer load if BGM is not used in CYOA (Prevents memory and data leaks).

        <span style="color: green">Requirement</span>
        - Global Requirements can now reference other Global Requirements.
        - '<i>Hide when Requirement is met</i>' now applies per requirement, not only when all are satisfied.

        <span style="color: green">Choice</span>
        - Organized Choice functions into categories.
        - Added option for Addons to ignore Image Template Left/Right of Choice.
        - Added option to enable slider support when using Multiple Select.
        - Added option to specify Rows for applying discount.
        - Added option to force-show all Addons, ignoring requirements.
        - Added option to change Image Template per Row/Choice/Group.
        - Added option to change Choice Per Row per Row/Choice/Group.
        - Added option to set Fade-in times for screen transitions.
        - Choice selection is delayed, and the cursor is automatically hidden until the fade-in completes.
        - When using 'Force Other Choices to Be Active', choices inactive due to unmet requirements will be automatically activated once the requirements are fulfilled.
        - Fixed issue where overlapping change image/background function would erase default values upon cancel.
        - Fixed issue where point requirements triggered by selecting choice were not properly applied.

        <span style="color: green">Viewer</span>
        - Separated the build save feature into its own dialog.
        - Builds are now saved per CYOA link.
        - Added autosave for builds.
        - Added option to adjust Choices per Row for screens between 960px and 1280px.
        - Added option to allow deselecting choices in the backpack.
        - Displayed the viewer version used for the current CYOA.`
    }, {
        open: false,
        title: getDate('2025-01-25T10:00:00Z'),
        text: `<span style="color: blue">New Features:</span>
        - Added a feature to use group IDs to the 'Forces Active' function.
        - Added a feature to scroll to the corresponding item in the Open Row List.
        - Added a feature to set the Choice ID instead of Row ID in the scroll function.

        <span style="color: red">Fixed:</span>
        - Fixed an issue where the feature to save a project with separate images was not working properly.
        - Fixed an issue where Styling data was being inserted into each row even when Private Styling wasn't used.`
    }, {
        open: false,
        title: getDate('2025-01-18T10:00:00Z'),
        text: `<span style="color: blue">New Features:</span>
        - Added a feature to prevent the generation of duplicate IDs when creating Row or Choice.
        - Added a feature to apply justify to the addons.
        - Added a feature to set tooltip in External URL Image.
        - Added an option in Global Settings to import custom fonts from Google Fonts.
        - Added an option in Global Settings to change the cursor type when hovering over choices.

        <span style="color: red">Fixed:</span>
        - Fixed an issue where lazy load was not applied to the addon image.
        - Fixed an issue where the multi-choice with the 'Select Impossible' function enabled could still be selected.`
    }, {
        open: false,
        title: getDate('2025-01-03T10:00:00Z'),
        text: `<span style="color: blue">New Features:</span>
        - Added an option in Global Settings to enable Music Player.
        - Added a feature to enable Music Player in Viewer.
        - Added a feature to search items in the dropdown menu.

        <span style="color: red">Fixed:</span>
        - Fixed an issue where the default value of the Multi Choice Design was not being set automatically.
        - Fixed an issue where Multi Choice Design could not be set in the Private Styling/Design Group.
        - Fixed an issue where Addon Design/Addon Image Design could not be set in the Design Group.`
    }, {
        open: false,
        title: getDate('2024-12-28T10:00:00Z'),
        text: `<span style="color: blue">New Features:</span>
        - Added a feature to set Addon Design/Addon Image Design.
        - Added a feature to allow uploading .avif format images.
        - Added a feature to allow setting the Global Requirement for the 'Id Needed To Show' of Points.
        - Added a feature to allow setting the Global Requirement for the 'Id Needed To Show' of Design Groups.

        <span style="color: red">Fixed:</span>
        - Fixed an issue where the display of discounted scores was not refreshing.
        - Fixed an issue where the choice with the discount function could not be deselected.
        - Fixed an issue where discounted scores were displayed incorrectly.
        - Fixed an issue where the border-radius was not applied to the Addon Image.`
    }, {
        open: false,
        title: getDate('2024-12-08T10:00:00Z'),
        text: `<span style="color: blue">New Features:</span>
        - Added a feature to set 'Image Center' option in Row/Choice/Addon Templates.
        - Added a feature to set a Debug Title for each Choice. 
        - Added a feature to allow selecting choices directly instead of using groups for the discount function.
        - Added a feature to allow stacking the discount function multiple times.
        - Added an option in Global Settings to preload external images in Viewer.
        - Added a feature to set fade-in and fade-out in the BGM function.

        <span style="color: red">Fixed:</span>
        - Fixed an issue where some UIs in editor mode were not rendering correctly.
        - Fixed an issue where the Debug Title was not displaying in the Row List and ID/Title List.
        - Fixed an issue where discounted scores were displayed incorrectly.
        - Fixed an issue where the 'Fit-in' option of the background did not work in the Viewer.
        - Fixed an issue where the buttons did not work when clicking outside the icon area.`
    }, {
        open: false,
        title: getDate('2024-11-15T10:00:00Z'),
        text: `<span style="color: blue">New Features:</span>
        - Added a feature to remove the space between addons in choice design.
        - Added a feature to remove an image in the external image URL tab of the Change Image window.
        - Updated the UI design for downloading the build as an image.

        <span style="color: red">Fixed:</span>
        - Fixed an issue where the page froze when dragging to reorder objects in the Objects list.
        - Fixed an issue where the requirements could not delete in Manage Global Requirements.
        - Fixed an issue where empty space appeared at the top and right of the downloaded build image.
        - Fixed an issue where the UI in editor mode was not rendering correctly on small screens.
        - Fixed an issue where white space appeared on the right side of the screen in mobile environments.
        - Fixed an issue where other Viewer features were unavailable when Import Choices was disabled.
        - Fixed an issue where the loading screen background color was overlaying the CYOA background color.`
    }, {
        open: false,
        title: getDate('2024-11-05T10:00:00Z'),
        text: `<span style="color: blue">New Features:</span>
        - Added a feature to set the Image template in the Addon.
        - Added a feature to change the file extension before downloading the build as an image.
        - Added a feature to allow the build code generated by Import Choice to save random selections.
        - Added a feature to set the value of the variables by selecting a choice.
        - Added a feature to scroll the Point Bar in a mobile environment.
        - Added a feature to position the Point Bar at the top in the Viewer.
        - Added a feature to save the builds in the Viewer.
        - Added a feature to set dark mode in the Viewer.
        - Added a feature to clean Selected Choices in the Viewer.
        - Added a feature to select multiple PointTypes in the Multiply/Divide functions.

        <span style="color: red">Fixed:</span>
        - Fixed an issue where the padding in Choice Design was not applied to the Addon.
        - Fixed an issue where the BGM did not change when using multiple BGM choices.
        - Fixed an issue where performance dropped when opening the Import Choice window.
        - Fixed an issue where the focus didn't change correctly when typing in a dropdown menu.
        - Fixed an issue where the page froze when dragging to reorder rows in the Rows list.
        - Fixed an issue where the scores did not update when import choices included Multiply/Divide functions.`
    }, {
        open: false,
        title: getDate('2024-10-01T10:00:00Z'),
        text: `<span style="color: blue">New Features:</span>
        - Added an option in Global Settings to hide 'Scores Updated On' Message.
        - Added an option in Global Settings to enable shortcuts for switching between Editor and Viewer modes.
        - Added an option in Global Settings to use vw instead of px for the default font-size.
        - Assigned CSS class names generated from their IDs to each row and choice.
        - Added a feature to create multiple choices at once.
        - Added a feature to move a choice within its row.
        - Added a feature to set Global Requirements.
        - Added a feature to set the background image fit in choice/row/window.
        - Added a feature to set width of image box in 'Manage Rows/Choices Image Design'.
        - Added a feature to set default text of 'Or/Selected From Requirements'.
        - Added a feature to print simple variable of multi-select using Word.

        <span style="color: red">Fixed:</span>
        - Fixed an issue where the 'Half of the screen' option did not work in backpack.
        - Fixed an issue where the 'Object Gradient' did not work properly.
        - Fixed an issue where the point discount feature did not work properly.
        - Fixed an issue where the 'Score Updated On' did not work properly with multi-select choices.
        - Fixed an issue where the multi-select choice did not work properly when decreased below 0.
        - Fixed an issue where the 'Import Choices' feature did not work properly.
        - Fixed an issue where performance degraded when the number of Word variables was high.
        - Fixed an issue where the last Word was always deleted when attempting to remove a Word.`
    }, {
        open: false,
        title: getDate('2024-08-30T10:00:00Z'),
        text: `<span style="color: blue">New Features:</span>
        - Added a feature to choose all items in the dropdown menu at once.
        - Added a feature to set which points to discount.
        - Added a feature to set Design Groups for backpack.
        - Added a feature to hide contents outside of backpack.
        - Added a feature to multiply the score by the number of selections when using multi-select.
        - Added a feature that allows multi-select choices to adjust Allowed Choices.
        - Added a feature to set the size/position of the counter for multi-select choices.
        - Added a feature to hide the counter when the choice is missing requirements.
        - Added a feature to keep the choice selected when the Clean Activated feature is used.
        - Added a feature to disable 'Use Alternate Menu' in Config Global Settings.

        <span style="color: red">Fixed:</span>
        - Fixed an issue where the copy/paste requirement feature was not working correctly in certain situations.
        - Fixed an issue where the Clean Activated feature did not update visual effects correctly.
        - Fixed an issue where scores in multi-select choices were not calculated properly when a simple variable was not used.
        - Fixed an issue where multi-select choices were not being properly canceled.
        - Fixed an issue where choices couldn't be selected after deleting a choice.
        - Fixed an issue where the 'player image upload' function did not work with the other choice functions.`
    }, {
        open: false,
        title: getDate('2024-08-20T10:00:00Z'),
        text: `<span style="color: blue">New Features:</span>
        - Added an option in 'Score' to determine whether the 'Scores Updated On' should be activated.
        - Added a feature to use the modulo operator in 'point comparison' requirements.
        - Added a feature to directly load a project from the 'CYOA.zip' file.
        - Added a feature to copy/paste a requirement.
        - Added a feature to merge duplicate images when exporting a project as a zip file.
        - Added a feature to increase or decrease the 'Number of requirements' for 'X of these'.
        - Added an option in Global Settings to enable or disable automatic image conversion.
        - Added an option in Global Settings to enable image preloading in the backpack.
        - Added a feature to display the discounted score.
        - Added a feature to export ID/Name list as a CSV file.
        - Added a feature to choose the display type in the loading animation (see index.html).

        <span style="color: red">Fixed:</span>
        - Fixed an issue where 'Will make another choice unselected' feature was not working correctly.
        - Fixed an issue where 'Multiply/Divide' features were not working correctly.
        - Fixed an issue where the toggle buttons of 'Show Score/Hide Value' were not working correctly.
        - Fixed an issue where choices activated by 'Forces another choice active' were de-selectable.
        - Fixed an issue where image split downloads do not work correctly in the Firefox browser.`
    }, {
        open: false,
        title: getDate('2024-08-11T10:00:00Z'),
        text: `<span style="color: blue">New Features:</span>
        - Added a feature to set the row background in the row private settings.
        - Added a feature to import/export design settings.
        - Added a feature to hide score value.
        - Added a feature to toggle 'Show Score/Hide Value' for all choices.
        - Added a feature to manage backpack design.
        - Added a feature to change the design of point bar when a choice is selected.
        - Added a feature to set filter designs for unselected choices.
        - Added an option in 'Force Active' to make other choices deselectable.
        - Added a feature to change focus in the dropdown menu based on key inputs.
        - Added a feature to put the font name directly for using custom fonts.

        <span style="color: red">Fixed:</span>
        - Fixed an issue where changing the Group/Design group's ID did not apply to choices.
        - Fixed an issue where problems occurred when conditions were not met due to score changes.
        - Fixed an issue where the score was sometimes not updated correctly after using the Import Choices.`
    }, {
        open: false,
        title: getDate('2024-08-06T10:00:00Z'),
        text: `<span style="color: blue">New Features:</span>
        - Added a feature to change the order of Scores/Requirements/Addons in the choices.
        - Added a feature to set ID to activate the Design Groups.
        - Added an option in 'Force Active' that keeps other choices active when a choice is deselected.
        - Expanded the 'Remove the text of the choices' Feature:
        　- Now can choose which contents to remove from the title, image, text, score, requirement, or addon. 
        - Added a feature to allow users to use the 'Remove the contents of the choices'.
        - Added a feature to mute background music when a choice is selected.
        - Added a feature to hide the requirement when it is met.

        <span style="color: red">Fixed:</span>
        - Fixed an issue where Design Groups were not being properly loaded in the Viewer.
        - Fixed an issue where Scroll feature did not work properly in the Viewer.
        - Fixed an issue where background changes were not reset when 'Clean Activated' was used.
        - Fixed an issue where 'Id Needed To Show' in 'Points' did not work properly.
        - Fixed an issue where choices set to 1 per row were being forced to 2 per row in mobile environments.`
    }, {
        open: false,
        title: getDate('2024-08-01T10:00:00Z'),
        text: `<span style="color: blue">New Features:</span>
        - Added a feature to set whether the background music should loop or not.
        - Added a feature to display titles of Rows/Choices in the Groups/Design Groups settings.
        - Added a feature to import custom words using the import choices feature.
        - Added a feature to set the length of Row/Choice IDs to be generated in global settings.

        <span style="color: red">Fixed:</span>
        - Fixed an issue where points were not properly refunded when choices were canceled.
        - Fixed an issue where Private Styling doesn't work properly.
        - Fixed an issue where Debug Title doesn't be shown in copy rows features.
        - Fixed an issue where hidden rows in Backpack were still occupying space.
        - Fixed an issue in Choice Design Groups where a choice once set was not being canceled.
        - Fixed an issue where choices created in Backpack could not be deleted.
        - Fixed an issue where choices were not canceled when some requirements were not met.
        - Fixed an issue where project file was not being saved.
        - Fixed an issue where Rows/Choices were not being deleted correctly.
        - Fixed an issue where Addons were not affected by Design Groups.
        - Fixed an issue where Design Groups were not being properly loaded in the Viewer.`
    }, {
        open: false,
        title: getDate('2024-07-25T10:00:00Z'),
        text: `<span style="color: blue">New Features:</span>
        - Added a feature to hide choices in the Backpack.
        - Added a feature to hide the button that displays the Backpack.
        - Added a feature where the player can input their own words when selecting choice.
        - Added a feature to check how many choices from groups have been selected.
        - Added a feature to choose whether points will be shown on the points bar/choices.
        - Added a feature to change the scroll position when a choice is selected.
        - Added a feature to set background music when a choice is selected.
        - Added a feature to change the background-color or background-image when a choice is selected.
        - Added a feature to choose whether the filter color will overlay on background-image.
        - Added a feature to manage Private Styles separately for each design feature.
        - Added a feature to manage Private Styles for design groups globally.

        <span style="color: red">Fixed:</span>
        - Fixed an issue where the browser would freeze when saving project with separate images.
        - Fixed issues with 'Clean Activated' feature.
        - Fixed issues with 'Scores Updated On'.`
    }, {
        open: false,
        title: getDate('2024-07-20T10:00:00Z'),
        text: `<span style="color: blue">New Features:</span>
        - Added a feature to Auto-save in local storage.
        - Added requirements to check how many choices have been selected in rows/entire.
        - Added a feature to set Border Color and Text Color in Filter design.
        - Added a feature to apply a discount to all Choices within Groups.
        - Added a feature to set the initial value of points applied when using Clean Activated.
        - Added a feature to customize the color of each point text in the point bar.

        <span style="color: red">Fixed:</span>
        - Fixed an issue where Forces Another Choice couldn't be used with multi-select.
        - Fixed an issue where the choices in hidden rows weren't deselected automatically.
        - Fixed an issue where 'X of these is selected' couldn't be set X to 0.
        - Fixed an issue where words were not resetting with Clean Activated.
        - Fixed an issue where Manage Groups didn't synchronize with the Group settings in Choices.
        - A slight performance improvement.`
    }, {
        open: false,
        title: getDate('2024-07-11T10:00:00Z'),
        text: `<span style="color: red">Fixed:</span>
        - Fixed an issue where multi-selects did not refund points when canceled.
        - Fixed an issue where the position of the point-icon was not displayed correctly.
        - Fixed an issue where the points icon was not being displayed on the points bar.
        - Fixed an issue where tags couldn't be used in Show Score.
        - Fixed an issue where Forces Another Choice couldn't be used with multi-select.`
    }, {
        open: false,
        title: getDate('2024-07-09T10:00:00Z'),
        text: `<span style="color: blue">New Features:</span>
        - Added a feature to change the order of points.
        - Added Global Settings Config: Auto-save, Check before delete, Dark Mode.

        <span style="color: red">Fixed:</span>
        - Fixed an issue where multi-select bypass points were allowed to go negative.
        - Fixed issues with 'Scores Updated On':
        　- Now it only works when all conditions are met.
        　- Instead of canceling choices, scores are recalculated.`
    }, {
        open: false,
        title: getDate('2024-07-05T10:00:00Z'),
        text: `<span style="color: blue">New Features:</span>
        - Added a feature to the choice function where 'Selecting this choice will duplicate a row'
        - Added a feature where change the icon color in the point bar.
        - Added a feature to specify whether the background image should repeat.
        - Added a feature to display the amount of data loaded so far during loading.
        - Added the feature to use multi-select as a requirement (ex. ID/ON#3).

        <span style="color: red">Fixed:</span>
        - Fixed an issue where Clean Activated feature was not working properly.
        - Fixed the issue where multi-select choices were not deselected when losing requirements.
        - Fixed the issue of loading not completing properly when loading a large project.json file.
        - Fixed the issue where the Import Choices feature was not working properly.
        - Fixed the issue where the random choices activation feature would select choices that were already selected.`
    }, {
        open: false,
        title: getDate('2024-07-01T10:00:00Z'),
        text: `<span style="color: blue">New Features:</span>
        - Added a feature that 'X of these is selected' requirement.
        - Added a feature that 'Force another choice active' at random.
        - Added a feature that costs points at random.
        - Added a feature that prevents each choice from being unselected.
        - Added a feature that 'Point Comparison' requirement can reference multiple point-type.`
    }, {
        open: false,
        title: getDate('2024-06-26T10:00:00Z'),
        text: `<span style="color: red">Fixed:</span>
        - Fixed an issue where the highlighting didn't display when multi-select was selected.
        - Fixed an issue where the subtract feature of multi-select was not working properly.
        - Fixed an issue where the Background Image was not visible when downloading Backpack as an image.
        - Fixed an issue where Clean Activated feature was not working properly.`
    }, {
        open: false,
        title: getDate('2024-06-22T10:00:00Z'),
        text: `<span style="color: blue">New Features:</span>
        - Added a feature that automatically converts PNG or JPEG files larger than 500KB to WebP format upon set Choce/Row images.
        - Added a feature to set Border-Image in Manage Choice/Row Design.
        - Added a feature to download images of backpacks by splitting them if the size is too large for successful download.
        - Added a feature to manipulate choices that can be selected multiple times using 'Force another choice active' (e.g., id/ON#3).
        - Added a loading animation to the viewer.

        <span style="color: red">Fixed:</span>
        - Fixed an issue where background images were set for each row, obscuring the overall background image when 'private styling' was not enabled.
        - Fixed an issue where choices would not appear when 'private styling' was enabled and the requirements were not met.
        - Fixed an issue where choices activated by 'Force another choice active' feature could be deselected by clicking on them.
        - Fixed an issue where Addons were not being removed when the 'Remove the text of the choices' feature was activated in Backpack.
        - Fixed an issue where 'Point Comparison Requirements' could not be applied to points and addons.`
    }];

    let active = $state('Changelog');

    let logPageLeng = $derived(Math.ceil(changelogList.length / 6));
    let logCurPage = $state(1);
    let logPageStart = $derived((logCurPage - 1) * 6);
    let logPageEnd = $derived(Math.min(logPageStart + 6 - 1, changelogList.length - 1));
    let logSlots = $derived(changelogList.slice(logPageStart, logPageEnd + 1));

    let qnaPageLeng = $derived(Math.ceil(qnaList.length / 6));
    let qnaCurPage = $state(1);
    let qnaPageStart = $derived((qnaCurPage - 1) * 6);
    let qnaPageEnd = $derived(Math.min(qnaPageStart + 6 - 1, qnaList.length - 1));
    let qnaSlots = $derived(qnaList.slice(qnaPageStart, qnaPageEnd + 1));
    
</script>