import fs from 'fs/promises';
import path from 'path';

const CWD = process.cwd();

async function generateLanguageFiles() {
  console.log('🌐 Starting language files generation...');
  const startTime = Date.now();

  try {
    // 1. Read the central language endonyms file
    console.log('📥 Reading language endonyms...');
    const endonymsPath = path.join(CWD, 'language-endonyms.json');
    const endonymsContent = await fs.readFile(endonymsPath, 'utf-8');
    console.log(`   ✅ Loaded ${Object.keys(JSON.parse(endonymsContent)).length} language endonyms`);

    // 2. Read site.locale.json to get the list of active locales
    console.log('📥 Reading active locales...');
    const siteLocalePath = path.join(CWD, 'site.locale.json');
    const siteLocaleContent = await fs.readFile(siteLocalePath, 'utf-8');
    const activeLocales = JSON.parse(siteLocaleContent).localeList;
    console.log(`   ✅ Found ${activeLocales.length} active locales: ${activeLocales.join(', ')}`);

    // 3. Write the endonyms to each active locale's languages.json
    console.log('💾 Writing language files...');
    for (const locale of activeLocales) {
      const localeDirPath = path.join(CWD, 'public', 'locales', locale);
      const outputFilePath = path.join(localeDirPath, 'languages.json');

      // Ensure the directory exists
      await fs.mkdir(localeDirPath, { recursive: true });

      // Write the file
      await fs.writeFile(outputFilePath, endonymsContent);
      console.log(`   ✅ Cached languages.json for locale: ${locale}`);
    }

    const totalTime = Date.now() - startTime;
    console.log(`✅ Language files generated successfully in ${Math.round(totalTime/1000)}s`);
    console.log(`   - Total locales processed: ${activeLocales.length}`);
    console.log(`   - Languages per locale: ${Object.keys(JSON.parse(endonymsContent)).length}`);
  } catch (error) {
    console.error('❌ Error generating language files:', error);
    process.exit(1);
  }
}

generateLanguageFiles();
