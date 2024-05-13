import * as dotenv from 'dotenv';
import { existsSync, mkdirSync, writeFile } from 'fs';
import { stripHtml } from 'string-strip-html';

dotenv.config();

const databaseTranslations = process.env.VITE_NOTION_DATABASE_TRANSLATIONS;
const bearer = process.env.VITE_NOTION_SECRET;

async function fetchNotionDatabase(db) {
  if (!bearer || !db) {
    console.log(`Bearer or database id for Notion is missing.`);
    return false;
  }
  const result = await fetch(`https://api.notion.com/v1/databases/${db}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + bearer,
      'Notion-Version': '2021-08-16',
    },
    body: JSON.stringify({ page_size: 100 }), // body data type must match "Content-Type" header
  });

  return await result.json();
}

function exportData(data, file) {
  const path = `./${file}.json`;
  writeFile(path, JSON.stringify(data, null, 2), (err) => {
    if (err) console.log(err);
    else {
      console.log(`${path} written.`);
    }
  });
}

function writeTranslationFile(content, slug) {
  const path = `src/lib/translations/${slug}`;
  if (!existsSync(path)) {
    mkdirSync(path);
  }
  const file = `${path}/index.json`;
  writeFile(file, content, (err) => {
    if (err) console.log(err);
    else {
      console.log(`${file} written.`);
    }
  });
}

function processContent({ text }) {
  const { link, content } = text;
  return (link ? `<a href='${link.url}'>${content}</a>` : content).replace('\n \n', '</p><p>');
}

function getRichText(object, key, usePlainText, wrapParagraph, sanitizeDom = false) {
  const arr = object.properties[key]?.rich_text ?? [];
  const paragraphs = arr.map((d) => {
    return usePlainText ? d.plain_text : processContent(d);
  });
  const content = paragraphs.join('').trim();
  const html = usePlainText || !wrapParagraph ? content : `<p>${content}</p>`;
  return sanitizeDom ? stripHtml(html).result : html;
}

function getSlug(obj) {
  return getRichText(obj, 'Slug', true);
}

const KEY_SLUG = 'SLUG';

const CONTENT_KEYS = [
  ['Slug', KEY_SLUG],
  ['Meta Page Title', 'PAGE_TITLE'],
  ['Meta Page Description', 'PAGE_DESCRIPTION'],
  ['Preview Image', 'PREVIEW_DESCRIPTION'],
  ['Headline', 'HEADLINE'],
  ['Introduction', 'INTRODUCTION', { usePlainText: false }],
  ['Data storage message', 'DATA_STORE_MESSAGE'],
  ['Question Age', 'QUESTION_AGE'],
  ['Question Age Tooltip', 'QUESTION_AGE_TOOLTIP'],
  ['Question Scenario', 'QUESTION_SCENARIO'],
  ['Scenario: 1.5', 'SCENARIO_15'],
  ['Scenario: 1.5 Description', 'SCENARIO_15_DESCRIPTION'],
  ['Scenario: 1.5 Button', 'SCENARIO_15_BUTTON'],
  ['Scenario: NDC', 'SCENARIO_NDC'],
  ['Scenario: NDC Description', 'SCENARIO_NDC_DESCRIPTION'],
  ['Scenario: NDC Button', 'SCENARIO_NDC_BUTTON'],
  ['Scenario: Current', 'SCENARIO_CURRENT'],
  ['Scenario: Current Description', 'SCENARIO_CURRENT_DESCRIPTION'],
  ['Scenario: Current Button', 'SCENARIO_CURRENT_BUTTON'],
  ['Question: Location', 'QUESTION_LOCATION'],
  ['Location: Button World', 'LOCATION_BUTTON_WORLD'],
  ['Location: Button Region', 'LOCATION_BUTTON_REGION'],
  ['Location: World', 'LOCATION_WORLD'],
  ['Location: World Short', 'LOCATION_WORLD_SHORT'],
  ['Location: East Asia + Pacific', 'LOCATION_ASIA_PACIFIC'],
  ['Location: East Asia + Pacific Short', 'LOCATION_ASIA_PACIFIC_SHORT'],
  ['Location: East Asia + Pacific Countries', 'LOCATION_ASIA_PACIFIC_COUNTRIES'],
  ['Location: Europe + Central Asia', 'LOCATION_EUROPE_ASIA'],
  ['Location: Europe + Central Asia Short', 'LOCATION_EUROPE_ASIA_SHORT'],
  ['Location: Europe + Central Asia Countries', 'LOCATION_EUROPE_ASIA_COUNTRIES'],
  ['Location: Latin America + Caribbean', 'LOCATION_AMERICA_CARIBBEAN'],
  ['Location: Latin America + Caribbean Short', 'LOCATION_AMERICA_CARIBBEAN_SHORT'],
  ['Location: Latin America + Caribbean Countries', 'LOCATION_AMERICA_CARIBBEAN_COUNTRIES'],
  ['Location: Middle East + North Africa', 'LOCATION_MIDDLE_EAST_AFRICA'],
  ['Location: Middle East + North Africa Short', 'LOCATION_MIDDLE_EAST_AFRICA_SHORT'],
  ['Location: Middle East + North Africa Countries', 'LOCATION_MIDDLE_EAST_AFRICA_COUNTRIES'],
  ['Location: North America', 'LOCATION_NORTH_AMERICA'],
  ['Location: North America Short', 'LOCATION_NORTH_AMERICA_SHORT'],
  ['Location: North America Countries', 'LOCATION_NORTH_AMERICA_COUNTRIES'],
  ['Location: South Asia', 'LOCATION_SOUTH_ASIA'],
  ['Location: South Asia Short', 'LOCATION_SOUTH_ASIA_SHORT'],
  ['Location: South Asia Countries', 'LOCATION_SOUTH_ASIA_COUNTRIES'],
  ['Location: Sub-Saharan Africa', 'LOCATION_SUB_SAHARAN_AFRICA'],
  ['Location: Sub-Saharan Africa Short', 'LOCATION_SUB_SAHARAN_AFRICA_SHORT'],
  ['Location: Sub-Saharan Africa Countries', 'LOCATION_SUB_SAHARAN_AFRICA_COUNTRIES'],
  ['Section: FAQ', 'SECTION_FAQ'],
  ['Question 1: Question', 'QUESTION_1_QUESTION'],
  ['Question 1: Answer', 'QUESTION_1_ANSWER', { usePlainText: false }],
  ['Question 2: Question', 'QUESTION_2_QUESTION'],
  ['Question 2: Answer', 'QUESTION_2_ANSWER', { usePlainText: false }],
  ['Question 3: Question', 'QUESTION_3_QUESTION'],
  ['Question 3: Answer', 'QUESTION_3_ANSWER', { usePlainText: false }],
  ['Question 4: Question', 'QUESTION_4_QUESTION'],
  ['Question 4: Answer', 'QUESTION_4_ANSWER', { usePlainText: false }],
  ['Question 5: Question', 'QUESTION_5_QUESTION'],
  ['Question 5: Answer', 'QUESTION_5_ANSWER', { usePlainText: false }],
  ['Question 6: Question', 'QUESTION_6_QUESTION'],
  ['Question 6: Answer', 'QUESTION_6_ANSWER', { usePlainText: false }],
  ['Question 7: Question', 'QUESTION_7_QUESTION'],
  ['Question 7: Answer', 'QUESTION_7_ANSWER', { usePlainText: false }],
  ['Section: Study', 'SECTION_STUDY'],
  ['Study Text', 'STUDY_TEXT', { usePlainText: false }],
  ['Section: Board', 'SECTION_BOARD'],
  ['Text Wim', 'TEXT_WIM'],
  ['Text Carl', 'TEXT_CARL'],
  ['Text Joeri', 'TEXT_JOERI'],
  ['Text Sonia', 'TEXT_SONIA'],
  ['Text Marina', 'TEXT_MARINA'],
  ['Text Matthias', 'TEXT_MATTHIAS'],
  ['Share Twitter', 'SHARE_TWITTER'],
  ['Share Facebook', 'SHARE_FACEBOOK'],
  ['Share Telegram', 'SHARE_TELEGRAM'],
  ['Share Whatsapp', 'SHARE_WHATSAPP'],
  ['Share Mail', 'SHARE_MAIL'],
  ['Button Download', 'BUTTON_DOWNLOAD'],
  ['Button Download Title', 'BUTTON_DOWNLOAD_TITLE'],
  ['Button Copy', 'BUTTON_COPY'],
  ['Graphic Graphic Link', 'GRAPHIC_LINK'],
  ['Text Graphic', 'GRAPHIC_DESCRIPTION'],
  ['Interest VUB', 'VUB_INTEREST'],
  ['Interest VUB Link', 'VUB_INTEREST_LINK'],
  ['Copyright', 'COPYRIGHT'],
  ['Author Design', 'AUTHOR_DESIGN'],
  ['Source', 'SOURCE_CODE'],
  ['Type: Wildfire', 'TYPE_WILDFIRE'],
  ['Type: River floods', 'TYPE_RIVER_FLOODS'],
  ['Type: Crop failures', 'TYPE_CROP_FAILURES'],
  ['Text: Tropical cyclones', 'TYPE_TROPICAL_CYCLONES'],
  ['Type: Droughts', 'TYPE_DROUGHTS'],
  ['Type: Heatwaves', 'TYPE_HEATWAVES'],
  ['Graphic Text 1', 'GRAPHIC_TEXT_1', { usePlainText: false, wrapParagraph: false }],
  ['Graphic Text 1 Region', 'GRAPHIC_TEXT_1_REGION', { usePlainText: false, wrapParagraph: false }],
  ['Graphic Text 1', 'GRAPHIC_TEXT_1_CLEAN', { usePlainText: false, wrapParagraph: false, sanitizeDom: true }],
  ['Graphic Text 1 Region', 'GRAPHIC_TEXT_1_REGION_CLEAN', { usePlainText: false, wrapParagraph: false, sanitizeDom: true }],
  ['Graphic Text 2', 'GRAPHIC_TEXT_2'],
  ['Graphic Text 3', 'GRAPHIC_TEXT_3'],
  ['Graphic Text 4', 'GRAPHIC_TEXT_4'],
  ['Graphic Graphic Text', 'GRAPHIC_GRAPHIC_TEXT', { usePlainText: false, wrapParagraph: false }],
  ['Graphic Graphic Text Region', 'GRAPHIC_GRAPHIC_TEXT_REGION', { usePlainText: false, wrapParagraph: false }],
];

function processSingleObject(obj, defaultTranslation) {
  const arr = CONTENT_KEYS.map(([keySource, keyTarget, { usePlainText = true, wrapParagraph = true, sanitizeDom = false } = {}]) => {
    let translation = getRichText(obj, keySource, usePlainText, wrapParagraph, sanitizeDom);
    if (!translation) {
      console.log(`Missing translation for “${keySource}” in language “${getSlug(obj)}”`);
      translation = getRichText(defaultTranslation, keySource, usePlainText, wrapParagraph, sanitizeDom);
    }
    return [keyTarget, translation];
  });
  return Object.fromEntries(arr);
}

function processResults(results) {
  const content = results.filter((d) => getSlug(d));
  const defaultTranslation = content.find((d) => getSlug(d) === 'en');
  return content.map((obj) => processSingleObject(obj, defaultTranslation));
}

async function getTranslations() {
  const content = await fetchNotionDatabase(databaseTranslations);
  console.log(`Total items: ${content.results.length}`);
  const relevant = processResults(content.results);
  console.log(`Relevenant items: ${relevant.length}`);
  relevant.map((translation) => {
    const slug = translation[KEY_SLUG];
    const content = JSON.stringify(translation, null, 2);
    writeTranslationFile(content, slug);
  });
}

getTranslations();
