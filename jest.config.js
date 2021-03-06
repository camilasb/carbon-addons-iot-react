module.exports = {
  collectCoverageFrom: ['src/components/**/*.js?(x)', '!src/**/*.story.js?(x)'],
  coveragePathIgnorePatterns: ['/node_modules/', '/lib/', '/coverage/'],
  coverageReporters: ['html', 'text-summary', 'lcov'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
    './src/components/**/!(ColumnHeaderSelect|FilterHeaderRow|TableToolbar|RowActionsCell|RowActionsError|StatefulTable|StatefulTableDetailWizard|CatalogContent|FileDrop|HeaderMenu|Dashboard|CardRenderer|Attribute|UnitRenderer|ImageHotspots|ImageControls|TimeSeriesCard|PageHero|PageTitle|EditPage|AsyncTable|ImageCard|WizardHeader|HierarchyList|TableHead|ColumnResize).jsx': {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
    './src/components/Table/TableHead/TableHead.jsx': {
      statements: 73,
      branches: 77,
      lines: 73,
      functions: 57,
    },
    './src/components/Table/TableHead/ColumnResize.jsx': {
      statements: 36,
      branches: 11,
      lines: 36,
      functions: 20,
    },
    './src/components/Table/TableHead/FilterHeaderRow/FilterHeaderRow.jsx': { branches: 70 },
    './src/components/Table/TableToolbar/TableToolbar.jsx': { functions: 66 },
    './src/components/Table/TableBody/RowActionsCell/RowActionsCell.jsx': {
      statements: 79,
      branches: 70,
      lines: 78,
      functions: 75,
    },
    './src/components/Table/TableBody/RowActionsCell/RowActionsError.jsx': { functions: 66 },
    './src/components/Table/StatefulTable.jsx': { branches: 66 },
    './src/components/TileCatalog/CatalogContent.jsx': { branches: 50 },
    './src/components/FileDrop/FileDrop.jsx': { branches: 53, functions: 75 },
    './src/components/Dashboard/Dashboard.jsx': { statements: 79, branches: 50, lines: 78 },
    './src/components/Dashboard/CardRenderer.jsx': {
      statements: 51,
      branches: 38,
      lines: 51,
      functions: 66,
    },
    './src/components/ValueCard/Attribute.jsx': { branches: 64, functions: 66 },
    './src/components/ValueCard/UnitRenderer.jsx': {
      statements: 70,
      branches: 8,
      lines: 70,
      functions: 25,
    },
    './src/components/ImageCard/ImageHotspots.jsx': {
      statements: 78,
      branches: 61,
      lines: 78,
      functions: 50,
    },
    './src/components/ImageCard/ImageControls.jsx': { branches: 66 },
    './src/components/TimeSeriesCard/TimeSeriesCard.jsx': {
      statements: 70,
      branches: 50,
      lines: 69,
      functions: 77,
    },
    './src/components/Page/EditPage.jsx': {
      statements: 63,
      branches: 50,
      lines: 63,
      functions: 50,
    },
    './src/components/Table/AsyncTable/AsyncTable.jsx': {
      statements: 56,
      branches: 50,
      lines: 60,
      functions: 13,
    },
    './src/components/Table/TableHead/ColumnHeaderSelect/ColumnHeaderSelect.jsx': { branches: 75 },
    './src/components/Page/PageHero.jsx': { branches: 77 },
    './src/components/Page/PageTitle.jsx': { branches: 75 },
    './src/components/ImageCard/ImageCard.jsx': { branches: 76 },
    './src/components/Table/TableDetailWizard/StatefulTableDetailWizard.jsx': { branches: 76 },
  },
  globals: {
    __DEV__: false,
  },
  setupFiles: ['<rootDir>/config/jest/setup.js'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTest.js'],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.js?(x)',
    '<rootDir>/**/?(*.)(spec|test).js?(x)',
    '<rootDir>/**/?(*.)test.a11y.js?(x)',
  ],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.story\\.jsx?$': '@storybook/addon-storyshots/injectFileName',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.s?css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  testPathIgnorePatterns: ['/config/', '/lib/'],
  transformIgnorePatterns: ['/node_modules/(?!(@carbon/charts)).+(.jsx?)'],
  watchPathIgnorePatterns: ['/coverage/', '/results/', '/.git/'],
  moduleFileExtensions: ['js', 'json', 'jsx'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    // this fixes an error present due to the esm import when updating to storybook 5.3.13
    // https://github.com/storybookjs/storybook/issues/9470#issuecomment-576022225
    // this has a fix in v6, but is currently in alpha, it's possible a patch for 5.3 could be released
    // https://github.com/storybookjs/storybook/pull/9795#issuecomment-587808019
    // either way, this can be removed in the future
    'react-syntax-highlighter/dist/esm/(.*)': 'react-syntax-highlighter/dist/cjs/$1',
  },
};
