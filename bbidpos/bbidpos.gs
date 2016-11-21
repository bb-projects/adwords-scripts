/** To do:
    labels bij dure zoekwoorden?
    conversies
    ctr gebruiken?
 */

// Hi pos / min pos == 3

// Lo pos / max pos == 1

// ********* Settings *********
var MIN_POS_BROAD = 3.0;
var MIN_POS_EXACT = 2.5;
var MAX_POS_BROAD = 1.6;
var MAX_POS_EXACT = 1.2;

var MIN_CPC_BROAD = 0.1;
var MIN_CPC_EXACT = 0.4;
var MAX_CPC_BROAD = 2.0;
var MAX_CPC_EXACT = 3.0;

// E.g. 0.1 = 10% changes €2.00 to €2.20
var BID_ADD_BROAD = 0.1;
var BID_ADD_EXACT = 0.1;
var BID_SUB_BROAD = 0.05;
var BID_SUB_EXACT = 0.07;

// ********* Advanced settings *********
var IMPRESSIONS_TRESHOLD = 3;
    // separate treshold for broad/exact?
var CLICKS_TRESHOLD = 0;

// Functions, do not alter
function main() {
  // E.g. keyword has pos 3.1 cpc €2 maxcpc €3
  posBidHi(MIN_POS_BROAD, MAX_CPC_BROAD, BID_ADD_BROAD, 'BROAD');
  posBidHi(MIN_POS_EXACT, MAX_CPC_EXACT, BID_ADD_EXACT, 'EXACT');
  // E.g. keywords has pos 1.1 cpc €0.30 mincpc €0,25
  posBidLo(MAX_POS_BROAD, MIN_CPC_BROAD, BID_SUB_BROAD, 'BROAD');
  posBidLo(MAX_POS_EXACT, MIN_CPC_EXACT, BID_SUB_EXACT, 'EXACT');
}

function posBidHi(minPos, maxCpc, bidAdj, matchType) { // verbeteren positie
  var keyRaise = AdWordsApp.keywords()
    // add matchtype
    .withCondition('Impressions > ' + IMPRESSIONS_TRESHOLD)
    .withCondition('AveragePosition > ' + minPos) //e.g. x > 3
    .withCondition('MaxCpc < ' + maxCpc)
    .withCondition('KeywordMatchType = ' + matchType)
    .orderBy('AveragePosition ASC')
    .forDateRange('LAST_MONTH')
    .get();
  
  var changer = 0;
  
  while (keyRaise.hasNext()) {
    var keyword = keyRaise.next();
    keyword.setMaxCpc(keyword.getMaxCpc() * (1 + bidAdj));
    var changer = changer + 1;
  }
  Logger.log(changer + ' ' + matchType + ' CPCs raised');
}

function posBidLo(maxPos, minCpc, bidAdj, matchType) { // 'verslechteren' positie
  var keyLower = AdWordsApp.keywords()
    // add matchtype
    .withCondition('Impressions > ' + IMPRESSIONS_TRESHOLD)
    .withCondition('AveragePosition < ' + maxPos) //e.g. x < 1.3
    .withCondition('MaxCpc > ' + minCpc) // e.g. x > €0.10 (niks aan doen als hij lager is)
    .withCondition('KeywordMatchType = ' + matchType)
    .orderBy('AveragePosition ASC')
    .forDateRange('LAST_MONTH')
    .get();
  
  var changer = 0;
  
  while (keyLower.hasNext()) {
    var keyword = keyLower.next();
    keyword.setMaxCpc(keyword.getMaxCpc() * (1 - bidAdj));
    var changer = changer + 1;
  }
  Logger.log(changer + ' ' + matchType + ' CPCs lowered');
}

