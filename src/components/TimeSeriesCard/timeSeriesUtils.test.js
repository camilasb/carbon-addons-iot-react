import every from 'lodash/every';

import {
  generateSampleValues,
  generateTableSampleValues,
  isValuesEmpty,
  formatGraphTick,
  findMatchingAlertRange,
} from './timeSeriesUtils';

describe('timeSeriesUtils', () => {
  test('isValuesEmpty', () => {
    const sampleValues = [
      { timestamp: 1571162400000, sound_db: null },
      { timestamp: 1571166000000, sound_db: null },
      { timestamp: 1571169600000, sound_db: null },
      { timestamp: 1571173200000, sound_db: null },
      { timestamp: 1571176800000, sound_db: null },
      { timestamp: 1571180400000, sound_db: null },
      { timestamp: 1571184000000, sound_db: null },
      { timestamp: 1571187600000, sound_db: null },
      { timestamp: 1571191200000, sound_db: null },
      { timestamp: 1571194800000, sound_db: null },
      { timestamp: 1571198400000, sound_db: null },
      { timestamp: 1571202000000, sound_db: null },
      { timestamp: 1571205600000, sound_db: null },
      { timestamp: 1571209200000, sound_db: null },
      { timestamp: 1571212800000, sound_db: null },
      { timestamp: 1571216400000, sound_db: null },
      { timestamp: 1571220000000, sound_db: null },
      { timestamp: 1571223600000, sound_db: null },
      { timestamp: 1571227200000, sound_db: null },
      { timestamp: 1571230800000, sound_db: null },
      { timestamp: 1571234400000, sound_db: null },
      { timestamp: 1571238000000, sound_db: null },
      { timestamp: 1571241600000, sound_db: null },
      { timestamp: 1571245200000, sound_db: null },
      { timestamp: 1571248800000, sound_db: null },
    ];
    expect(isValuesEmpty(sampleValues, 'timestamp')).toEqual(true);
    expect(
      isValuesEmpty([...sampleValues, { timestamp: 1571162400000, sound_db: 10 }], 'timestamp')
    ).toEqual(false);
  });
  test('generateSampleValues', () => {
    const sampleValues = generateSampleValues(
      [{ dataSourceId: 'temperature' }, { dataSourceId: 'pressure' }],
      'timestamp'
    );
    expect(sampleValues).toHaveLength(7);
    expect(sampleValues[0].temperature).toBeDefined();
    expect(sampleValues[0].pressure).toBeDefined();
  });
  test('generateSampleValues with data Filters', () => {
    const sampleValues = generateSampleValues(
      [
        { dataSourceId: 'temperature', dataFilter: { severity: 5 } },
        { dataSourceId: 'temperature', dataFilter: { severity: 3 } },
      ],
      'timestamp'
    );
    expect(sampleValues).toHaveLength(14);
    expect(sampleValues[0].temperature).toBeDefined();
    expect(sampleValues[0].severity).toEqual(5);
    expect(sampleValues[7].temperature).toBeDefined();
    expect(sampleValues[7].severity).toEqual(3);
  });
  test('generateSampleValues hour', () => {
    const sampleValues = generateSampleValues(
      [{ dataSourceId: 'temperature' }, { dataSourceId: 'pressure' }],
      'timestamp',
      'hour'
    );

    expect(sampleValues).toHaveLength(24);
    expect(sampleValues[0].temperature).toBeDefined();
    expect(sampleValues[0].pressure).toBeDefined();

    const sampleValues2 = generateSampleValues(
      [{ dataSourceId: 'temperature' }, { dataSourceId: 'pressure' }],
      'timestamp',
      'week'
    );
    expect(sampleValues2).toHaveLength(4);

    const sampleValues3 = generateSampleValues(
      [{ dataSourceId: 'temperature' }, { dataSourceId: 'pressure' }],
      'timestamp',
      'month'
    );
    expect(sampleValues3).toHaveLength(12);

    const sampleValues4 = generateSampleValues(
      [{ dataSourceId: 'temperature' }, { dataSourceId: 'pressure' }],
      'timestamp',
      'year'
    );
    expect(sampleValues4).toHaveLength(5);

    const sampleValues5 = generateSampleValues(
      [{ dataSourceId: 'temperature' }, { dataSourceId: 'pressure' }],
      'timestamp',
      'day'
    );
    expect(sampleValues5).toHaveLength(7);
  });
  test('generateTableSampleValues', () => {
    const tableSampleValues = generateTableSampleValues('test', [
      { dataSourceId: 'column1' },
      { dataSourceId: 'column2' },
      { dataSourceId: 'column3', type: 'TIMESTAMP' },
    ]);
    expect(tableSampleValues).toHaveLength(10);
    expect(every(tableSampleValues, 'id')).toEqual(true); // every row should have its own id
    expect(every(tableSampleValues, 'values')).toEqual(true); // every row should have its own values
    expect(tableSampleValues[0].values).toHaveProperty('column1');
    expect(tableSampleValues[0].values).toHaveProperty('column2');
    expect(tableSampleValues[0].values).toHaveProperty('column3');
  });
  test('formatGraphTick', () => {
    // hour different day
    expect(
      formatGraphTick(1572933600000, 1, [1, 2, 3, 4, 5, 6], 'hour', 'en', 1572912000000)
    ).toContain('Nov 05');
    // hour same day
    expect(
      formatGraphTick(1572933600000, 1, [1, 2, 3, 4, 5, 6], 'hour', 'en', 1572933600000)
    ).toContain('00:00');
    // day same day should skip
    expect(
      formatGraphTick(1572933600000, 1, [1, 2, 3, 4, 5, 6], 'day', 'en', 1572933600000)
    ).toEqual('');
    // month different year
    expect(
      formatGraphTick(1546322400000, 1, [1, 2, 3, 4, 5, 6], 'month', 'en', 1522558800000)
    ).toContain('Jan 2019');
    // month same year
    expect(
      formatGraphTick(1561957200000, 1, [1, 2, 3, 4, 5, 6], 'month', 'en', 1572584400000)
    ).toContain('Jul');
    // week shouldn't show year
    expect(
      formatGraphTick(1572933600000, 1, [1, 2, 3, 4, 5, 6], 'week', 'en', 1572912000000)
    ).toContain('Nov 05');
    expect(
      formatGraphTick(1572933600000, 1, [1, 2, 3, 4, 5, 6], 'week', 'en', 1572912000000)
    ).not.toContain('Nov 05 2019');
    // same year should not repeat
    expect(
      formatGraphTick(1572933600000, 1, [1, 2, 3, 4, 5, 6], 'year', 'en', 1572933600000)
    ).toEqual('');
    expect(
      formatGraphTick(1572933600000, 1, [1, 2, 3, 4, 5, 6], 'year', 'en', 872912000000)
    ).toContain('2019');

    // same month should not repeat
    expect(
      formatGraphTick(1572933600000, 1, [1, 2, 3, 4, 5, 6], 'month', 'en', 1572933600000)
    ).toEqual('');
  });
  test('findMatchingAlertRange', () => {
    const data = {
      date: new Date(1573073951),
    };
    const alertRange = [
      {
        startTimestamp: 1573073950,
        endTimestamp: 1573073951,
        color: '#FF0000',
        details: 'Alert details',
      },
    ];
    const matchingAlertRange = findMatchingAlertRange(alertRange, data);
    expect(matchingAlertRange).toHaveLength(1);
    expect(matchingAlertRange[0].color).toEqual('#FF0000');
    expect(matchingAlertRange[0].details).toEqual('Alert details');
  });
});
