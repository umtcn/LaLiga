var express = require('express');
var router = express.Router();
const Club = require('../models/Club');
const Power = require('../models/Power');
const Game = require('../models/Game');

var clubs = [];
var games = [];
var olasiliklar = {};
var weekCount = 0;

bootstrap();

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(games);
  if(weekCount>=2*(clubs.length-2)&&weekCount!=2*clubs.length-2) {
    kazanmaHesaplama(games.slice(weekCount*(clubs.length/2)));
  } else {
    olasiliklar = {};
  }
  clubs.sort(function(a,b){
    if(a.points<b.points)
      return true;
    if(a.points==b.points)
      return a.GDCount<b.GDCount;
  });
  res.render('index', { title: 'LaLiga', weekCount: weekCount, clubs: clubs, games: games, olasiliklar: olasiliklar });
});

/* GET fixture page. */
router.get('/fixture', function(req, res, next) {
  //console.log(games);
  res.render('fixture', { title: 'LaLiga', weekCount: weekCount, clubs: clubs, games: games, olasiliklar: olasiliklar });
});

/* POST Next Week */
router.post('/next', function(req, res, next) {
  nextWeek();
  res.redirect('/');
});

/* POST Finish league */
router.post('/finish', function(req, res, next) {
  finishLeague();
  res.redirect('/');
});

/* POST New league */
router.post('/new', function(req, res, next) {
  clubs=[];
  games=[];
  bootstrap();
  res.redirect('/');
});

/* POST Save Scores */
router.post('/save', function(req, res, next) {
  for (var i=0;i<weekCount*(clubs.length/2);i++) {
    games[i].club1.removeGame(games[i].c1gc,games[i].c2gc);
    games[i].club2.removeGame(games[i].c2gc,games[i].c1gc);
    games[i].club1.addGame(parseInt(req.body['yeniSkor['+i+'].club1']),parseInt(req.body['yeniSkor['+i+'].club2']));
    games[i].club2.addGame(parseInt(req.body['yeniSkor['+i+'].club2']),parseInt(req.body['yeniSkor['+i+'].club1']));
    games[i].c1gc = parseInt(req.body['yeniSkor['+i+'].club1']);
    games[i].c2gc = parseInt(req.body['yeniSkor['+i+'].club2']);
  }
  res.redirect('/');
});

function playGame(game) {
  for (var i=0;i<game.gp;i++) {
    var tmp = Math.random()*(game.c1op+game.c2op);
    if(tmp<game.c1op) {
      tmp = Math.random()*(game.c1op+game.c2dp);
      if(tmp<game.c1op) {
        game.c1gc++;
      }
    }
    else {
      tmp = Math.random()*(game.c1dp+game.c2op);
      if(tmp>=game.c1dp) {
        game.c2gc++;
      }
    }
  }
  game.club1.addGame(game.c1gc, game.c2gc);
  game.club2.addGame(game.c2gc, game.c1gc);
  return game;
}

function bootstrap() {
  weekCount = 0;
  clubs = [
    new Club("Fenerbahce"),
    new Club("Barcelona"),
    new Club("Real Madrid"),
    new Club("Valencia"),
    new Club("Club Athletic"),
    new Club("Sivas Spor"),
    new Club("Beşiktaş"),
    new Club("Galatasaray")
  ];
  games = createFixture(clubs.slice(0));
}

function createFixture(clubs) {
  var tmpClub = clubs[0];
  var rovanslar = [];
  clubs = clubs.splice(1,clubs.length);
  for (var i=0;i<clubs.length;i++) {
    games.push(new Game(tmpClub, clubs[0]));
    rovanslar.push(new Game(clubs[0], tmpClub));
    for (var j=1;j<=clubs.length/2;j++) {
      games.push(new Game(clubs[j], clubs[clubs.length-j]));
      rovanslar.push(new Game(clubs[clubs.length-j], clubs[j]));
    }
    clubs = clubs.splice(1, clubs.length).concat(clubs[0]);
  }
  clubs.push(tmpClub);
  clubs = [clubs[clubs.length-1]].concat(clubs.splice(0, clubs.length-1));
  //console.log(clubs);
  games = games.concat(rovanslar);
  return games;
}

function nextWeek() {
  if(weekCount==(clubs.length-1)*2)
    return;
  var a=weekCount*(clubs.length/2);
  var b=a+clubs.length/2;
  for (var i=a;i<b;i++) {
    games[i]=playGame(games[i]);
  }
  weekCount++;
}

function finishLeague() {
  var a=weekCount*(clubs.length/2);
  for (var i=a;i<games.length;i++) {
    games[i]=playGame(games[i]);
  }
  weekCount=2*(clubs.length-1);
}

function kazanmaHesaplama(kalanMaclar) {
  var puanlar = {};
  var maclar = [];
  for (var i=0;i<kalanMaclar.length;i++) {
    puanlar[kalanMaclar[i].club1.name]=kalanMaclar[i].club1.points;
    puanlar[kalanMaclar[i].club2.name]=kalanMaclar[i].club2.points;
    maclar.push({
      club1: kalanMaclar[i].club1.name,
      club2: kalanMaclar[i].club2.name
    });
    olasiliklar[kalanMaclar[i].club1.name]=0;
    olasiliklar[kalanMaclar[i].club2.name]=0;
  }
  tahminet(puanlar, maclar, 0);
  var toplamOlasilik = Math.pow(3, maclar.length);
  for (var i=0;i<clubs.length;i++) {
    olasiliklar[clubs[i].name]=Math.round(olasiliklar[clubs[i].name]/toplamOlasilik*100);
  }
}

function tahminet(puanlar, maclar, macInd) {
  if(macInd==maclar.length) {
    var tmpPuanlar = [];
    for (var i=0;i<clubs.length;i++) {
      tmpPuanlar.push({
        name: clubs[i].name,
        puan: puanlar[clubs[i].name]
      });
    }
    tmpPuanlar.sort(function(a,b){
      return a.puan<b.puan;
    });
    olasiliklar[tmpPuanlar[0].name]++;
    return;
  }
  puanlar[maclar[macInd].club1]+=3;
  tahminet(puanlar, maclar, macInd+1);
  puanlar[maclar[macInd].club1]-=3;
  puanlar[maclar[macInd].club2]+=3;
  tahminet(puanlar, maclar, macInd+1);
  puanlar[maclar[macInd].club1]+=1;
  puanlar[maclar[macInd].club2]-=2;
  tahminet(puanlar, maclar, macInd+1);
  puanlar[maclar[macInd].club1]-=1;
  puanlar[maclar[macInd].club2]-=1;
}

module.exports = router;
