import {fontFamily as kalam, loadFont as loadKalam} from '@remotion/google-fonts/Kalam';
import {fontFamily as caveat, loadFont as loadCaveat} from '@remotion/google-fonts/Caveat';
import {fontFamily as patrickHand, loadFont as loadPatrickHand} from '@remotion/google-fonts/PatrickHand';
import {fontFamily as architectsDaughter, loadFont as loadArchitectsDaughter} from '@remotion/google-fonts/ArchitectsDaughter';
import {fontFamily as delius, loadFont as loadDelius} from '@remotion/google-fonts/Delius';
import {fontFamily as fredoka, loadFont as loadFredoka} from '@remotion/google-fonts/Fredoka';
import {fontFamily as comfortaa, loadFont as loadComfortaa} from '@remotion/google-fonts/Comfortaa';
import {fontFamily as shadowsIntoLight, loadFont as loadShadowsIntoLight} from '@remotion/google-fonts/ShadowsIntoLight';
import {fontFamily as amaticSC, loadFont as loadAmaticSC} from '@remotion/google-fonts/AmaticSC';
import {fontFamily as permanentMarker, loadFont as loadPermanentMarker} from '@remotion/google-fonts/PermanentMarker';
import {fontFamily as indieFlower, loadFont as loadIndieFlower} from '@remotion/google-fonts/IndieFlower';
import {fontFamily as justAnotherHand, loadFont as loadJustAnotherHand} from '@remotion/google-fonts/JustAnotherHand';
import {fontFamily as rockSalt, loadFont as loadRockSalt} from '@remotion/google-fonts/RockSalt';
import {fontFamily as quicksand, loadFont as loadQuicksand} from '@remotion/google-fonts/Quicksand';
import {fontFamily as pangolin, loadFont as loadPangolin} from '@remotion/google-fonts/Pangolin';

const latin = ['latin'];

loadKalam('normal', {weights: ['400', '700'], subsets: latin});
loadCaveat('normal', {weights: ['400', '700'], subsets: latin});
loadPatrickHand('normal', {weights: ['400'], subsets: latin});
loadArchitectsDaughter('normal', {weights: ['400'], subsets: latin});
loadDelius('normal', {weights: ['400'], subsets: latin});
loadFredoka('normal', {weights: ['400', '700'], subsets: latin});
loadComfortaa('normal', {weights: ['400', '700'], subsets: latin});
loadShadowsIntoLight('normal', {weights: ['400'], subsets: latin});
loadAmaticSC('normal', {weights: ['400', '700'], subsets: latin});
loadPermanentMarker('normal', {weights: ['400'], subsets: latin});
loadIndieFlower('normal', {weights: ['400'], subsets: latin});
loadJustAnotherHand('normal', {weights: ['400'], subsets: latin});
loadRockSalt('normal', {weights: ['400'], subsets: latin});
loadQuicksand('normal', {weights: ['400', '700'], subsets: latin});
loadPangolin('normal', {weights: ['400'], subsets: latin});

export const FONT_FAMILIES = {
  kalam,
  caveat,
  patrickHand,
  architectsDaughter,
  delius,
  fredoka,
  comfortaa,
  shadowsIntoLight,
  amaticSC,
  permanentMarker,
  indieFlower,
  justAnotherHand,
  rockSalt,
  quicksand,
  pangolin,
};

export const FONT_CLASS_FAMILIES = {
  'font-kalam': kalam,
  'font-caveat': caveat,
  'font-patrick': patrickHand,
  'font-architect': architectsDaughter,
  'font-delius': delius,
  'font-fredoka': fredoka,
  'font-comfortaa': comfortaa,
  'font-shadow': shadowsIntoLight,
  'font-amatic': amaticSC,
  'font-marker': permanentMarker,
  'font-indie': indieFlower,
  'font-another-hand': justAnotherHand,
  'font-rock-salt': rockSalt,
  'font-quicksand': quicksand,
  'font-pangolin': pangolin,
};

const getClassList = (className = '') => className.split(/\s+/).filter(Boolean);

export const resolveFontStyles = ({style = {}, className = ''}) => {
  const classes = getClassList(className);
  const familyFromClass = classes.find((name) => FONT_CLASS_FAMILIES[name]);

  return {
    fontFamily:
      style.fontFamily ||
      (familyFromClass ? `'${FONT_CLASS_FAMILIES[familyFromClass]}', cursive, sans-serif` : `'${kalam}', cursive, sans-serif`),
    fontStyle: style.fontStyle || (classes.includes('italic') ? 'italic' : 'normal'),
    fontWeight:
      style.fontWeight ||
      (classes.includes('bold') || classes.includes('font-bold') ? 700 : 400),
  };
};
