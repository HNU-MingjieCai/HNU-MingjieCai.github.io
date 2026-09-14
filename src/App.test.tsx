import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';

import App from './App';

const EXPECTED_ONLINE_DATES = [
  ['10.1016/j.patcog.2026.114879', '2026-09-09'],
  ['10.1016/j.ins.2026.124102', '2026-09-03'],
  ['10.1016/j.ijar.2026.109811', '2026-08-25'],
  ['10.1016/j.ipm.2026.104853', '2026-04-29'],
  ['10.1016/j.ipm.2026.104757', '2026-03-19'],
  ['10.1016/j.knosys.2026.115717', '2026-03-06'],
  ['10.1016/j.inffus.2025.103460', '2025-07-04'],
  ['10.1109/TFUZZ.2025.3608935', '2025-09-12'],
  ['10.1109/TFUZZ.2025.3596689', '2025-08-07'],
  ['10.1016/j.neucom.2025.131152', '2025-08-07'],
  ['10.1016/j.asoc.2025.113464', '2025-06-21'],
  ['10.1016/j.fss.2025.109460', '2025-05-15'],
  ['10.1016/j.knosys.2025.113498', '2025-04-19'],
  ['10.1016/j.fss.2025.109368', '2025-03-12'],
  ['10.1109/TFUZZ.2024.3494864', '2024-11-08'],
  ['10.1016/j.eswa.2024.125705', '2024-11-10'],
  ['10.1016/j.ijar.2024.109320', '2024-11-06'],
  ['10.1016/j.ijar.2024.109271', '2024-08-22'],
  ['10.1016/j.asoc.2024.112111', '2024-08-14'],
  ['10.1016/j.asoc.2024.111779', '2024-05-19'],
  ['10.1016/j.fss.2024.108993', '2024-04-30'],
  ['10.1007/s10489-024-05368-3', '2024-03-13'],
  ['10.1016/j.ijar.2024.109149', '2024-02-22'],
  ['10.1109/TFUZZ.2024.3397808', '2024-05-07'],
  ['10.1016/j.topol.2024.108829', '2024-01-17'],
  ['10.1016/j.fss.2024.108860', '2024-01-11'],
  ['10.1016/j.eswa.2023.122965', '2023-12-16'],
  ['10.1016/j.inffus.2023.102137', '2023-11-10'],
  ['10.1016/j.asoc.2023.111066', '2023-11-18'],
  ['10.1016/j.ijar.2023.109075', '2023-10-31'],
  ['10.1109/TETCI.2023.3300303', '2023-08-11'],
  ['10.1016/j.engappai.2023.106509', '2023-06-07'],
  ['10.1016/j.ins.2022.11.154', '2022-12-05'],
  ['10.1016/j.ins.2021.10.080', '2021-11-15'],
  ['10.1016/j.ijar.2022.03.002', '2022-03-14'],
  ['10.1007/s10489-022-03371-0', '2022-04-04'],
] as const;

const extractPublication = (html: string, doi: string) => {
  const start = html.indexOf(`<article data-publication-doi="${doi}"`);
  assert.notEqual(start, -1, `missing publication ${doi}`);

  const end = html.indexOf('</article>', start);
  assert.notEqual(end, -1, `publication ${doi} is not wrapped in an article`);
  return html.slice(start, end);
};

const extractPublicationOrder = (html: string) =>
  Array.from(
    html.matchAll(
      /<article data-publication-doi="([^"]+)"[^>]*>([\s\S]*?)<\/article>/g,
    ),
  ).map(([, doi, publication]) => {
    const year = publication.match(/\((\d{4})\)/)?.[1];
    const onlineDate = publication.match(
      /data-online-date="(\d{4}-\d{2}-\d{2})"/,
    )?.[1];

    assert.ok(year, `${doi} is missing its publication year`);
    assert.ok(onlineDate, `${doi} is missing its online date`);
    return { doi, year, onlineDate };
  });

test('renders all newly requested publications', () => {
  const html = renderToStaticMarkup(<App />);

  const patternRecognition = extractPublication(
    html,
    '10.1016/j.patcog.2026.114879',
  );
  assert.match(patternRecognition, /Liangzhou Chen, Mingjie Cai\*, Chaoqun Huang/);
  assert.match(patternRecognition, /Contrastive label enhancement-based multi-label feature selection/);
  assert.match(patternRecognition, /Pattern Recognition/);
  assert.match(patternRecognition, /183 \(2027\) 114879/);

  const informationSciences = extractPublication(
    html,
    '10.1016/j.ins.2026.124102',
  );
  assert.match(informationSciences, /Yangchun Yin, Ruihui Xu\*, Chaoqun Huang\*, Mingjie Cai/);
  assert.match(informationSciences, /Self-representation discriminative graph learning for supervised feature selection/);
  assert.match(informationSciences, /Information Sciences/);
  assert.match(informationSciences, /760 \(2027\) 124102/);

  const approximateReasoning = extractPublication(
    html,
    '10.1016/j.ijar.2026.109811',
  );
  assert.match(approximateReasoning, /Jiaxin Zhan, Chaoqun Huang, Mingjie Cai\*, Hamido Fujita/);
  assert.match(approximateReasoning, /Granular ball-based evolutionary game consensus for large-scale data with fuzzy social networks/);
  assert.match(approximateReasoning, /International Journal of Approximate Reasoning/);
  assert.match(approximateReasoning, /199 \(2026\) 109811/);
  assert.match(approximateReasoning, /github\.com\/JustinaZhan\/GBLSGDM/);

  const informationProcessing = extractPublication(
    html,
    '10.1016/j.ipm.2026.104853',
  );
  assert.match(informationProcessing, /Gongao Qi, Xiangnan Zhou\*, Chaoqun Huang/);
  assert.match(informationProcessing, /Label distribution-driven semantic discrimination enhanced hashing for cross-modal retrieval/);
  assert.match(informationProcessing, /Information Processing &amp; Management/);
  assert.match(informationProcessing, /63 \(2026\) 104853/);
  assert.match(informationProcessing, /github\.com\/GongaoQi\/L3DEH/);
});

test('renders a small online date after the links for every displayed publication', () => {
  const html = renderToStaticMarkup(<App />);

  assert.equal(
    (html.match(/data-online-date=/g) ?? []).length,
    EXPECTED_ONLINE_DATES.length,
  );

  for (const [doi, onlineDate] of EXPECTED_ONLINE_DATES) {
    const publication = extractPublication(html, doi);
    const dateAttributePosition = publication.indexOf(
      `data-online-date="${onlineDate}"`,
    );
    const datePosition = publication.lastIndexOf(
      '<time ',
      dateAttributePosition,
    );
    const finalLinkPosition = Math.max(
      publication.lastIndexOf('</a>'),
      publication.lastIndexOf('</button>'),
    );

    assert.notEqual(datePosition, -1, `${doi} has the wrong online date`);
    assert.ok(
      datePosition > finalLinkPosition,
      `${doi} must show its online date after its final link`,
    );
    assert.match(
      publication.slice(datePosition),
      new RegExp(`class="[^"]*text-\\[11px\\][^"]*text-slate-500[^"]*"[^>]*>Online: ${onlineDate}`),
      `${doi} must render its online date as accessible muted small text`,
    );
  }
});

test('sorts publication years descending and online dates descending within each year', () => {
  const publications = extractPublicationOrder(renderToStaticMarkup(<App />));

  for (let index = 1; index < publications.length; index += 1) {
    const previous = publications[index - 1];
    const current = publications[index];

    assert.ok(
      previous.year >= current.year,
      `${current.doi} (${current.year}) must not appear after an older publication year`,
    );

    if (previous.year === current.year) {
      assert.ok(
        previous.onlineDate >= current.onlineDate,
        `${current.doi} must appear after later online dates in ${current.year}`,
      );
    }
  }
});

test('shows the CBCG paper as a 2024 publication', () => {
  const html = renderToStaticMarkup(<App />);
  const publication = extractPublication(
    html,
    '10.1109/TFUZZ.2024.3397808',
  );

  assert.match(publication, /32 \(2024\) 4388-4400/);
});

test('renders the verified page ranges from the published papers', () => {
  const html = renderToStaticMarkup(<App />);

  assert.match(
    extractPublication(html, '10.1109/TETCI.2023.3300303'),
    /8 \(2024\) 288-299/,
  );
  assert.match(
    extractPublication(html, '10.1016/j.ins.2022.11.154'),
    /622 \(2023\) 710-731/,
  );
  assert.match(
    extractPublication(html, '10.1016/j.ins.2021.10.080'),
    /583 \(2022\) 33-55/,
  );
});

test('keeps corrected publication years aligned with their BibTeX years', async () => {
  const html = renderToStaticMarkup(<App />);
  const engineeringApplications = extractPublication(
    html,
    '10.1016/j.engappai.2023.106509',
  );
  assert.match(engineeringApplications, /124 \(2023\) 106509/);

  const appModule = (await import('./App')) as unknown as {
    PUBLICATIONS?: ReadonlyArray<{
      authors: string;
      bib?: string;
      doi: string;
      pages?: string;
      title: string;
      venue: string;
      volume?: string;
      year: string;
    }>;
    generateBib?: (publication: {
      authors: string;
      bib?: string;
      pages?: string;
      title: string;
      venue: string;
      volume?: string;
      year: string;
    }) => string;
  };

  assert.ok(appModule.PUBLICATIONS, 'publication data must be reusable');
  assert.equal(typeof appModule.generateBib, 'function');

  for (const [doi, expectedYear] of [
    ['10.1109/TFUZZ.2024.3397808', '2024'],
    ['10.1016/j.engappai.2023.106509', '2023'],
  ] as const) {
    const publication = appModule.PUBLICATIONS.find((item) => item.doi === doi);
    assert.ok(publication, `missing publication ${doi}`);
    assert.equal(publication.year, expectedYear);
    assert.match(
      appModule.generateBib(publication),
      new RegExp(`year\\s*=\\s*\\{${expectedYear}\\}`),
      `${doi} must copy the same year shown on the page`,
    );
  }
});
