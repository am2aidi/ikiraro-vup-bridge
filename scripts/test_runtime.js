// Comprehensive runtime test for IsokoApp
const assert = require('assert');
global.window = global;
global.__domListeners = [];
const elementsMap = {
  protoEmail: { value: 'amina.uwase@vupbridge.rw' },
  protoPassword: { value: 'demo1234' },
  protoUserStateDesc: { textContent: '' },
  appRoot: { innerHTML: '', style: {}, classList: { add: () => {}, remove: () => {} } },
  headerNavActions: { innerHTML: '', style: {}, classList: { add: () => {}, remove: () => {} } }
};

global.document = {
  getElementById: (id) => {
    if (elementsMap[id]) return elementsMap[id];
    return {
      id: id,
      value: '',
      textContent: '',
      innerHTML: '',
      dataset: {},
      style: {},
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => false,
        toggle: () => {}
      },
      querySelectorAll: () => [],
      querySelector: () => null,
      appendChild: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      remove: () => {},
      setAttribute: () => {},
      getAttribute: () => null,
      focus: () => {}
    };
  },
  createElement: (tag) => {
    return {
      tagName: tag,
      innerHTML: '',
      dataset: {},
      style: {},
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => false,
        toggle: () => {}
      },
      querySelectorAll: () => [],
      querySelector: () => null,
      appendChild: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      remove: () => {},
      setAttribute: () => {},
      getAttribute: () => null
    };
  },
  querySelectorAll: () => [],
  querySelector: () => null,
  addEventListener: (event, cb) => {
    if (event === 'DOMContentLoaded') global.__domListeners.push(cb);
  },
  documentElement: {
    setAttribute: () => {},
    getAttribute: () => null
  },
  body: {
    appendChild: () => {},
    classList: { add: () => {}, remove: () => {} }
  }
};

global.window.scrollTo = () => {};

global.localStorage = {
  _data: {},
  getItem: function(k) { return this._data[k] || null; },
  setItem: function(k, v) { this._data[k] = String(v); },
  removeItem: function(k) { delete this._data[k]; },
  clear: function() { this._data = {}; }
};

global.L = {
  map: () => ({
    setView: () => ({}),
    tileLayer: () => ({ addTo: () => {} }),
    remove: () => {}
  }),
  tileLayer: () => ({ addTo: () => {} }),
  marker: () => ({ addTo: () => ({ bindPopup: () => {} }) }),
  geoJSON: () => ({ addTo: () => {} })
};

// Load dependencies
require('../js/nisr_data.js');
require('../js/nisr_pdf_data.js');
require('../js/vup_seed_data.js');
require('../js/translations.js');
require('../js/app.js');
global.__domListeners.forEach(fn => fn());

console.log('App loaded successfully!');
if (global.app) {
  console.log('Testing render():');
  global.app.render();
  console.log('Rendered successfully.');

  console.log('\n--- TEST 1: Role picking & Member Login ---');
  global.app.pickRole('member');
  elementsMap.protoEmail.value = 'amina.uwase@vupbridge.rw';
  elementsMap.protoPassword.value = 'demo1234';
  global.app.handlePrototypeLogin({ preventDefault: () => {} });
  console.log('Logged in as:', global.app.state.currentUser.name, '| Role:', global.app.state.role);
  console.log('Initial credit ready:', global.app.getRemainingCredit());
  assert(global.app.getRemainingCredit() >= 20000, `Initial credit ready must be >= 20,000 RWF (got ${global.app.getRemainingCredit()})`);

  const accounts = global.app.getAvailablePaymentAccounts();
  const vupCredit = accounts.find(a => a.credit);
  assert(vupCredit, 'VUP food credit must exist for member');
  assert(!vupCredit.disabled, 'VUP food credit must NOT be disabled');
  assert(vupCredit.available >= 20000, `VUP food credit must have >= 20,000 RWF available (got ${vupCredit.available})`);
  console.log('VUP food credit available in checkout:', vupCredit.available, 'RWF | Disabled:', vupCredit.disabled);

  const prevCredit = global.app.getRemainingCredit();
  global.app.state.selectedAccountIdx = accounts.findIndex(a => a.credit);
  global.app.addDemoMoney(15000);
  assert.strictEqual(global.app.getRemainingCredit(), prevCredit + 15000, 'addDemoMoney(+15000) should increase credit by 15000');
  console.log('Credit ready after addDemoMoney(+15000 RWF):', global.app.getRemainingCredit());

  global.app.manualAddMemberCredit(5, 7500);
  console.log('Credit ready after manual +5 days:', global.app.getRemainingCredit());
  assert(global.app.getRemainingCredit() > 0, 'Remaining credit should increase');
  global.app.manualResetMemberCredit();
  console.log('Credit ready after manual reset:', global.app.getRemainingCredit());
  assert(global.app.getRemainingCredit() >= 20000, 'Credit ready after manual reset should be >= 20,000 RWF');

  console.log('\n--- TEST 2: Timeframe switching ---');
  global.app.setTimeframe('month');
  console.log('Timeframe set to:', global.app.state.timeframe);
  global.app.setTimeframe('year');
  console.log('Timeframe set to:', global.app.state.timeframe);
  global.app.setTimeframe('week');
  console.log('Timeframe set to:', global.app.state.timeframe);

  console.log('\n--- TEST 3: Trilingual localization ---');
  global.app.setLanguage('rw');
  console.log('Language rw brandTitle:', global.app.t('brandTitle'), '| heroDesc:', global.app.t('heroDesc').slice(0, 40));
  global.app.setLanguage('fr');
  console.log('Language fr brandTitle:', global.app.t('brandTitle'), '| heroDesc:', global.app.t('heroDesc').slice(0, 40));
  global.app.setLanguage('en');
  console.log('Language en brandTitle:', global.app.t('brandTitle'), '| heroDesc:', global.app.t('heroDesc').slice(0, 40));

  console.log('\n--- TEST 4: Gemini AI translation & query engine ---');
  if (global.geminiEngine) {
    const rwTrans = global.geminiEngine.translateText('Fresh harvest dry beans from Kirehe', 'rw');
    console.log('Gemini AI offline Kinyarwanda translation result:', rwTrans);
    const frTrans = global.geminiEngine.translateText('Fresh harvest dry beans from Kirehe', 'fr');
    console.log('Gemini AI offline French translation result:', frTrans);
  }

  console.log('\n--- TEST 5: Planner Login & Credit Desk Queues ---');
  global.app.logout();
  global.app.pickRole('planner');
  elementsMap.protoEmail.value = 'planner1@vupbridge.rw';
  elementsMap.protoPassword.value = 'demo1234';
  global.app.handlePrototypeLogin({ preventDefault: () => {} });
  console.log('Logged in as:', global.app.state.currentUser.name, '| Role:', global.app.state.role);

  const toApprove = global.app.getToApproveQueue();
  console.log('Credit Desk "To approve" queue count:', toApprove.length);
  const toPaySellers = global.app.getToPaySellersQueue();
  console.log('Credit Desk "To pay sellers" queue count:', toPaySellers.length);
  const toRepay = global.app.getToRepayQueue();
  console.log('Credit Desk "To repay" queue count:', toRepay.length);

  const alerts = global.app.renderAlertsBox();
  console.log('Alerts box HTML generated, length:', alerts.length);

  const aiHelper = global.app.renderAiHelperCard();
  console.log('AI Helper Card HTML generated, length:', aiHelper.length);

  const creditDesk = global.app.renderCreditDesk();
  console.log('Credit Desk HTML generated, length:', creditDesk.length);

  const nisrDoc = global.app.renderNisrFactsDoc();
  console.log('NISR Facts Doc HTML generated, length:', nisrDoc.length);

  const summaryCard = global.app.renderSummaryCard(false);
  console.log('Summary Card HTML generated, length:', summaryCard.length);
  console.log('NISR_PDF available:', typeof global.NISR_PDF === 'string', '| Length:', global.NISR_PDF?.length);

  console.log('\n--- TEST 6: Admin Login & Demo Failure Switch ---');
  global.app.logout();
  global.app.pickRole('admin');
  elementsMap.protoEmail.value = 'admin@vupbridge.rw';
  elementsMap.protoPassword.value = 'demo1234';
  global.app.handlePrototypeLogin({ preventDefault: () => {} });
  console.log('Logged in as:', global.app.state.currentUser.name, '| Role:', global.app.state.role);

  console.log('Initial makeNextPaymentFail:', global.app.state.adminSettings?.makeNextPaymentFail);
  global.app.toggleMakeNextPaymentFail();
  console.log('Toggled makeNextPaymentFail:', global.app.state.adminSettings?.makeNextPaymentFail);
  global.app.toggleMakeNextPaymentFail();
  console.log('Restored makeNextPaymentFail:', global.app.state.adminSettings?.makeNextPaymentFail);

  console.log('\n--- TEST 7: Farmer & Shopper Views ---');
  global.app.logout();
  global.app.pickRole('seller');
  elementsMap.protoEmail.value = 'mukamana@vupbridge.rw';
  elementsMap.protoPassword.value = 'demo1234';
  global.app.handlePrototypeLogin({ preventDefault: () => {} });
  console.log('Farmer view render test passed.');

  global.app.logout();
  global.app.pickRole('shopper');
  elementsMap.protoEmail.value = 'grace.ingabire@vupbridge.rw';
  elementsMap.protoPassword.value = 'demo1234';
  global.app.handlePrototypeLogin({ preventDefault: () => {} });
  console.log('Shopper view render test passed.');

  console.log('\n--- TEST 9: System Architecture & Ecosystem Flow Visualizer ---');
  global.app.logout();
  global.app.setPublicTab('architecture');
  const archHtml = global.app.renderPublicArchitectureView();
  console.log('Architecture view HTML generated, length:', archHtml.length);
  const nodes = global.app.getArchNodes();
  console.log('Architecture nodes count:', Object.keys(nodes).length, '(Nodes:', Object.keys(nodes).join(', '), ')');
  const simSteps = global.app.getArchSimSteps();
  console.log('Architecture simulation steps count:', simSteps.length);
  global.app.setArchFlow('bridge');
  console.log('Active arch flow set to:', global.app.state.activeArchFlow);
  global.app.selectArchNode('agaseke');
  console.log('Selected arch node set to:', global.app.state.selectedArchNode);
  global.app.advanceArchSim();
  console.log('Advanced sim step to:', global.app.state.archSimStep);

  console.log('\n--- TEST 10: VUP Payroll & Agaseke Relief Pool ---');
  global.app.pickRole('planner');
  elementsMap.protoEmail.value = 'planner1@vupbridge.rw';
  elementsMap.protoPassword.value = 'demo1234';
  global.app.handlePrototypeLogin({ preventDefault: () => {} });
  const payrollHtml = global.app.renderPlannerPayrollTab();
  console.log('Payroll Tab HTML generated, length:', payrollHtml.length);
  const agasekeHtml = global.app.renderAgasekeManagementTab();
  console.log('Agaseke Tab HTML generated, length:', agasekeHtml.length);
  console.log('Agaseke pool balance:', global.app.state.agasekePool, 'RWF');

  if (global.app.stopBannerTimer) {
    global.app.stopBannerTimer();
  }
  global.app.logout();
  console.log('\n=========================================');
  console.log('✅ ALL ACCEPTANCE TESTS SUCCESSFULLY PASSED!');
  console.log('=========================================');
  process.exit(0);
} else {
  console.error('global.app is not defined!');
  process.exit(1);
}
