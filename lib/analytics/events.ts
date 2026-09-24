/**
 * events.ts — the three-funnel event taxonomy.
 *
 * Instrument BEFORE launch. Retrofitting measurement onto a live community means the first six
 * months of cohort data are permanently lost, and cohort data is exactly what a sponsor and an
 * investor will ask for first.
 *
 * Vendor-agnostic on purpose (REGISTRY R-13). When the analytics decision lands, implement
 * `dispatch()` once and nothing else changes. Do not scatter vendor SDK calls through components.
 *
 * RULE: every event carries a `funnel`. The three audiences never blend in reporting — a
 * sponsor asking "how many technicians" must never receive a number inflated by investor traffic.
 */

export type Funnel = 'practitioner' | 'sponsor' | 'capital';

export type EventName =
  // practitioner
  | 'join_started'
  | 'verification_submitted'
  | 'verification_approved'
  | 'thread_viewed'
  | 'thread_posted'
  | 'state_page_viewed'
  | 'session_registered'
  | 'game_played'
  | 'tournament_entered'
  // sponsor
  | 'partners_viewed'
  | 'audience_data_viewed'
  | 'media_kit_downloaded'
  | 'sponsor_inquiry_started'
  | 'sponsor_inquiry_sent'
  // capital
  | 'investor_thesis_viewed'
  | 'data_room_requested';

const FUNNEL_OF: Record<EventName, Funnel> = {
  join_started: 'practitioner',
  verification_submitted: 'practitioner',
  verification_approved: 'practitioner',
  thread_viewed: 'practitioner',
  thread_posted: 'practitioner',
  state_page_viewed: 'practitioner',
  session_registered: 'practitioner',
  game_played: 'practitioner',
  tournament_entered: 'practitioner',
  partners_viewed: 'sponsor',
  audience_data_viewed: 'sponsor',
  media_kit_downloaded: 'sponsor',
  sponsor_inquiry_started: 'sponsor',
  sponsor_inquiry_sent: 'sponsor',
  investor_thesis_viewed: 'capital',
  data_room_requested: 'capital',
};

export interface EventProps {
  /** Hub the event fired in. Lets you read organic sessions by hub without URL parsing. */
  hub?: string;
  /** Two-letter state code where relevant. The geo layer's whole value is state-level reporting. */
  stateCode?: string;
  /** Forum category, product slug, tournament slug — whatever identifies the object. */
  object?: string;
}

/**
 * Never send anything that identifies a member. Licence numbers, emails, real names and
 * employer names do not belong in an analytics payload — a member handed you a licence number
 * for verification, not for measurement.
 */
const FORBIDDEN = ['email', 'licence', 'license', 'name', 'phone', 'employer'];

export function track(name: EventName, props: EventProps = {}): void {
  if (typeof window === 'undefined') return;

  for (const key of Object.keys(props)) {
    if (FORBIDDEN.some((f) => key.toLowerCase().includes(f))) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`[analytics] refused event "${name}": property "${key}" may identify a member.`);
      }
      return;
    }
  }

  dispatch({ name, funnel: FUNNEL_OF[name], ...props });
}

interface Payload extends EventProps {
  name: EventName;
  funnel: Funnel;
}

/** TODO(R-13): single implementation point. Nothing above this line changes when it lands. */
function dispatch(payload: Payload): void {
  if (process.env.NODE_ENV !== 'production') {
    console.info('[analytics]', payload);
    return;
  }
  // Vendor call goes here, once.
}
