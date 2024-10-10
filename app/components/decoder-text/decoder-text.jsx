import { VisuallyHidden } from '~/components/visually-hidden';
import { useReducedMotion, useSpring } from 'framer-motion';
import { memo, useEffect, useRef } from 'react';
import { delay } from '~/utils/delay';
import { classes } from '~/utils/style';
import styles from './decoder-text.module.css';

// prettier-ignore
const glyphs = [
  // 'A', 'I', 'U', 'E', 'O',
  // 'ka', 'ki', 'ku', 'ke', 'ko',
  // 'sa', 'shi', 'su', 'se', 'so',
  // 'ta', 'chi', 'tsu', 'te', 'to',
  // 'NA', 'NI', 'NU', 'NE', 'NO',
  // 'Ha', 'Hee', 'Fu', 'He', 'Ho',
  // 'Ma', 'Mi', 'Mu', 'Me', 'Mo',
  // 'Ya', 'Yu', 'Yo', 'ー',
  // 'Ra', 'Ri', 'Ru', 'Re', 'Ro',
  // 'wa', 'WG', 'EK', 'wo', 'n',
  // 'ga', 'gi', 'gu', 'ge', 'go',
  // 'The', 'J', 'Z', 'Z', 'Z',
  // 'da', 'ji', 'zu', 'de', 'do',
  // 'Ba', 'Bi', 'Bu', 'Be', 'Bo',
  // 'pa', 'pi', 'pu', 'pe', 'po',
  'अ', 'अहं', 'उ', 'ई', 'ओ',
  'क', 'कि', 'कु', 'के', 'को', 
  'सा', 'शि', 'सु', 'से', 'सो', 
  'त', 'चि', 'त्सु', 'ते', 'तो',
  'न', 'नि', 'नू', 'ने', 'न', 
  'हा', 'ही', 'फू', 'हे', 'हो', 
  'मा', 'मि', 'मु', 'मे', 'मो',
  'या', 'यु', 'यो', 'ー', 
  'रा', 'ऋ', 'रु', 'रे', 'रो',
  'वा', 'न', 'वा', 'वो', 'न',
  'ग', 'गी', 'गु', 'गे', 'गो',
  'द', 'ज', 'झ', 'झ', 'झ',
  'दा', 'जी', 'जु', 'दे', 'दो',
  'बा', 'बि', 'बु', 'बे', 'बो',
  'पा', 'पि', 'पु', 'पे', 'पो',
];

const CharType = {
  Glyph: 'glyph',
  Value: 'value',
};

function shuffle(content, output, position) {
  return content.map((value, index) => {
    if (index < position) {
      return { type: CharType.Value, value };
    }

    if (position % 1 < 0.5) {
      const rand = Math.floor(Math.random() * glyphs.length);
      return { type: CharType.Glyph, value: glyphs[rand] };
    }

    return { type: CharType.Glyph, value: output[index].value };
  });
}

export const DecoderText = memo(
  ({ text, start = true, delay: startDelay = 0, className, ...rest }) => {
    const output = useRef([{ type: CharType.Glyph, value: '' }]);
    const container = useRef();
    const reduceMotion = useReducedMotion();
    const decoderSpring = useSpring(0, { stiffness: 8, damping: 5 });

    useEffect(() => {
      const containerInstance = container.current;
      const content = text.split('');
      let animation;

      const renderOutput = () => {
        const characterMap = output.current.map(item => {
          return `<span class="${styles[item.type]}">${item.value}</span>`;
        });

        containerInstance.innerHTML = characterMap.join('');
      };

      const unsubscribeSpring = decoderSpring.on('change', value => {
        output.current = shuffle(content, output.current, value);
        renderOutput();
      });

      const startSpring = async () => {
        await delay(startDelay);
        decoderSpring.set(content.length);
      };

      if (start && !animation && !reduceMotion) {
        startSpring();
      }

      if (reduceMotion) {
        output.current = content.map((value, index) => ({
          type: CharType.Value,
          value: content[index],
        }));
        renderOutput();
      }

      return () => {
        unsubscribeSpring?.();
      };
    }, [decoderSpring, reduceMotion, start, startDelay, text]);

    return (
      <span className={classes(styles.text, className)} {...rest}>
        <VisuallyHidden className={styles.label}>{text}</VisuallyHidden>
        <span aria-hidden className={styles.content} ref={container} />
      </span>
    );
  }
);
