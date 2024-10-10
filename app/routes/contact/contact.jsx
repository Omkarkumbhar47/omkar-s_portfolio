import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Input } from '~/components/input';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { useFormInput } from '~/hooks';
import { useRef, useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import styles from './contact.module.css';

export const meta = () => {
  return [
    {
      title: 'Contact',
      description: 'Send me a message if you’re interested in discussing a project or if you just want to say hi',
    },
  ];
};

// Utility to convert '100ms' to 100 (number)
function msToNum(msString) {
  return Number(msString.replace('ms', ''));
}

// Utility to convert 100 (number) to '100ms' (string)
function numToMs(num) {
  return `${num}ms`;
}

// Utility to generate CSS properties dynamically
function cssProps(props) {
  return Object.entries(props).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
}

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;

export const Contact = () => {
  const errorRef = useRef();
  const email = useFormInput('');
  const message = useFormInput('');
  const initDelay = tokens.base.durationS;
  const [state, handleSubmit] = useForm("myzygqyd"); // Update with your Formspree ID
  const sending = state.submitting;

  // State to manage success message visibility
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form submission success
  useEffect(() => {
    if (state.succeeded) {
      setIsSubmitted(true); // Set submitted state to true
    }
  }, [state.succeeded]);

  return (
    <Section className={styles.contact}>
      {/* Transition for the success message */}
      <Transition unmount in={isSubmitted}>
        {({ status, nodeRef }) => (
          <div className={styles.complete} aria-live="polite" ref={nodeRef}>
            <Heading level={3} as="h3" className={styles.completeTitle} data-status={status}>
              Message Sent
            </Heading>
            <Text size="l" as="p" className={styles.completeText} data-status={status} style={getDelay(tokens.base.durationXS)}>
              I’ll get back to you within a couple days, sit tight.
            </Text>
            <Button
              secondary
              iconHoverShift
              className={styles.completeButton}
              data-status={status}
              style={getDelay(tokens.base.durationM)}
              href="/"
              icon="chevron-right"
            >
              Back to homepage
            </Button>
          </div>
        )}
      </Transition>

      {/* Transition for the form */}
      <Transition unmount in={!isSubmitted} timeout={1600}>
        {({ status, nodeRef }) => (
          <form onSubmit={handleSubmit} className={styles.form} ref={nodeRef}>
            <Heading
              className={styles.title}
              data-status={status}
              level={3}
              as="h1"
              style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
            >
              <DecoderText text="Say hello" start={status !== 'exited'} delay={300} />
            </Heading>
            <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
            />
            {/* Hidden honeypot field to identify bots */}
            <Input
              className={styles.botkiller}
              label="Name"
              name="name"
              maxLength={MAX_EMAIL_LENGTH}
            />
            <Input
              required
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay)}
              autoComplete="email"
              label="Your email"
              type="email"
              name="email"
              maxLength={MAX_EMAIL_LENGTH}
              {...email}
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
            <Input
              required
              multiline
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationS, initDelay)}
              autoComplete="off"
              label="Message"
              name="message"
              maxLength={MAX_MESSAGE_LENGTH}
              {...message}
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
            <Button
              className={styles.button}
              data-status={status}
              data-sending={sending}
              style={getDelay(tokens.base.durationM, initDelay)}
              disabled={sending}
              loading={sending}
              loadingText="Sending..."
              icon="send"
              type="submit"
            >
              Send message
            </Button>
          </form>
        )}
      </Transition>
      <Footer className={styles.footer} />
    </Section>
  );
};

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
