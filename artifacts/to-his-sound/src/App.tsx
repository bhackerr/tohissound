import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDownRight, ArrowUpRight, Check, ChevronRight, Circle, Menu, MoveUpRight, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import logoPath from '@assets/2DFE0C36-0185-4AFC-B451-013994104BDE_1787522511704.jpeg';
import warmPortraitPath from '@assets/2755A009-CDAA-4C82-A947-16A74A1D507B_1789759859525.png';
import intimatePortraitPath from '@assets/F0F98264-4E36-493B-8F32-DB9BC76C3CF1_1789759859525.png';
import movementPath from '@assets/IMG_0150_1789759859525.jpeg';

const queryClient = new QueryClient();

const navItems = [
  { id: 'why', label: 'The why' },
  { id: 'ways', label: 'Ways we serve' },
  { id: 'practice', label: 'The practice' },
  { id: 'connect', label: 'Begin a conversation' },
];

function Mark({ small = false }: { small?: boolean }) {
  return (
    <img
      src={logoPath}
      alt="To His Sound — Where movement becomes obedience"
      className={small ? 'h-12 w-[5.3rem] object-contain' : 'h-24 w-40 object-contain'}
      data-testid={small ? 'img-logo-small' : 'img-logo-primary'}
    />
  );
}

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="eyebrow">{number}</span>
      <span className="h-px w-10 bg-[hsl(var(--primary)/.55)]" />
      <span className="eyebrow text-[hsl(var(--foreground)/.55)]">{children}</span>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('why');

  useEffect(() => {
    const sections = navItems.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-30% 0px -55% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[hsl(var(--border)/.7)] bg-[hsl(var(--background)/.82)] backdrop-blur-xl">
      <div className="mx-auto flex h-[4.6rem] max-w-[1240px] items-center justify-between px-5 lg:px-10">
        <button type="button" onClick={() => goTo('top')} className="focus-ring flex items-center" aria-label="Return to top" data-testid="button-brand-home">
          <Mark small />
        </button>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => goTo(item.id)}
              className={`focus-ring relative py-3 text-[.69rem] uppercase tracking-[.13em] transition-colors ${active === item.id ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--foreground)/.65)] hover:text-[hsl(var(--foreground))]'}`}
              data-testid={`button-nav-${item.id}`}
            >
              {item.label}
              {active === item.id && <span className="absolute inset-x-0 -bottom-[1px] h-px bg-[hsl(var(--primary))]" />}
            </button>
          ))}
        </nav>
        <button type="button" onClick={() => setOpen((value) => !value)} className="focus-ring flex h-10 w-10 items-center justify-center text-[hsl(var(--foreground))] md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} data-testid="button-mobile-menu">
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] px-5 py-5 md:hidden" data-testid="menu-mobile">
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {navItems.map((item, index) => (
              <button type="button" key={item.id} onClick={() => goTo(item.id)} className="focus-ring flex items-center justify-between border-b border-[hsl(var(--border)/.65)] py-4 text-left text-sm text-[hsl(var(--foreground)/.84)]" data-testid={`button-mobile-nav-${item.id}`}>
                <span><span className="mr-4 font-mono text-[.65rem] text-[hsl(var(--primary))]">0{index + 1}</span>{item.label}</span>
                <ChevronRight size={16} className="text-[hsl(var(--primary)/.7)]" />
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100dvh] items-center overflow-hidden border-b border-[hsl(var(--border))] px-5 pt-24 lg:px-10">
      <div className="pointer-events-none absolute -right-32 top-20 h-[35rem] w-[35rem] rounded-full glow-orb opacity-70" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-2/3 bg-gradient-to-r from-[hsl(var(--primary)/.65)] to-transparent" />
      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-14 py-20 lg:grid-cols-[1.02fr_.98fr] lg:gap-20 lg:py-24">
        <div className="relative z-10">
          <p className="eyebrow reveal" data-testid="text-hero-eyebrow">Creative formation · Georgia & beyond</p>
          <h1 className="display reveal reveal-2 mt-7 max-w-[720px] text-[4.2rem] leading-[.94] text-[hsl(var(--foreground))] sm:text-[6.25rem] lg:text-[7.6rem]" data-testid="text-hero-title">
            Make room<br /><em className="text-[hsl(var(--primary))]">for the sound.</em>
          </h1>
          <p className="reveal reveal-3 mt-8 max-w-[30rem] text-[1.02rem] leading-8 text-[hsl(var(--foreground)/.68)]" data-testid="text-hero-description">
            To His Sound is a creative training center and ministering business for artists who want their expression rooted in intimacy with God.
          </p>
          <div className="reveal reveal-4 mt-10 flex flex-wrap items-center gap-6">
            <button type="button" onClick={() => document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })} className="focus-ring group flex items-center gap-3 bg-[hsl(var(--primary))] px-5 py-3.5 text-[.7rem] font-bold uppercase tracking-[.15em] text-[hsl(var(--primary-foreground))] transition-transform hover:-translate-y-1" data-testid="button-hero-connect">
              Start a conversation <ArrowUpRight size={16} strokeWidth={1.8} />
            </button>
            <button type="button" onClick={() => document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' })} className="focus-ring flex items-center gap-3 text-[.7rem] font-bold uppercase tracking-[.15em] text-[hsl(var(--foreground)/.72)] transition-colors hover:text-[hsl(var(--primary))]" data-testid="button-hero-explore">
              Explore the why <ArrowDownRight size={16} strokeWidth={1.8} />
            </button>
          </div>
        </div>
        <div className="relative flex min-h-[25rem] items-center justify-center lg:min-h-[35rem]">
          <div className="absolute right-[7%] top-[5%] h-64 w-64 rounded-full border border-[hsl(var(--primary)/.26)] lg:h-[29rem] lg:w-[29rem]" />
          <div className="absolute right-[15%] top-[13%] h-48 w-48 rounded-full border border-dashed border-[hsl(var(--primary)/.18)] lg:h-[25rem] lg:w-[25rem]" />
          <div className="absolute right-[47%] top-[16%] h-20 w-px bg-gradient-to-b from-transparent via-[hsl(var(--primary))] to-transparent opacity-70" />
          <div className="relative z-10 drift">
            <Mark />
          </div>
          <div className="absolute bottom-4 right-0 flex items-center gap-3 text-[.62rem] uppercase tracking-[.14em] text-[hsl(var(--foreground)/.48)]">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]" /> rooted in obedience
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-5 hidden items-center gap-4 lg:flex lg:left-10">
        <div className="h-12 w-px bg-[hsl(var(--primary)/.65)]" />
        <span className="font-mono text-[.6rem] uppercase tracking-[.2em] text-[hsl(var(--foreground)/.42)] [writing-mode:vertical-rl]">scroll slowly</span>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section id="why" className="section-pad border-b border-[hsl(var(--border))]">
      <div className="mx-auto grid max-w-[1240px] gap-16 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
        <div><SectionLabel number="01">The why</SectionLabel><p className="max-w-[14rem] text-sm leading-7 text-[hsl(var(--foreground)/.53)]">A creative life can be a place of worship. It can also become a place of hiding. We make space to tell the difference.</p></div>
        <div>
          <h2 className="display max-w-[760px] text-5xl leading-[1.04] text-[hsl(var(--foreground))] sm:text-7xl" data-testid="text-why-title">Your gift was never meant to <em className="gold-text">carry you alone.</em></h2>
          <div className="mt-14 grid gap-10 border-t border-[hsl(var(--border))] pt-10 md:grid-cols-2">
            <p className="text-lg leading-8 text-[hsl(var(--foreground)/.72)]" data-testid="text-why-body-one">Performance asks, “How will this be received?” Formation asks, “Who am I becoming as I make it?”</p>
            <p className="text-sm leading-7 text-[hsl(var(--foreground)/.55)]">We believe artists need more than technique. They need biblical discipleship, spiritual formation, leadership development, and the courage to obey what God is saying in the hidden place.</p>
          </div>
          <div className="mt-14 flex items-center gap-5">
            <div className="gold-line h-px w-20 bg-[hsl(var(--primary))]" />
            <p className="serif text-2xl italic text-[hsl(var(--primary))]" data-testid="text-tagline">Where movement becomes obedience.</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-20 grid max-w-[1240px] gap-8 border-t border-[hsl(var(--border))] pt-8 md:grid-cols-[.83fr_1.17fr] md:items-end md:gap-14">
        <figure className="editorial-frame group relative overflow-hidden bg-[hsl(var(--card))]">
          <img
            src={warmPortraitPath}
            alt="Portrait in a black blazer and glasses against a warm neutral studio backdrop."
            className="brand-photo h-[28rem] w-full object-cover object-[center_24%] transition-transform duration-700 ease-out group-hover:scale-[1.025] sm:h-[34rem]"
            data-testid="img-portrait-studio"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[hsl(var(--background)/.58)] via-transparent to-transparent" />
          <figcaption className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
            <span className="eyebrow text-[hsl(var(--foreground)/.78)]">Presence before performance</span>
            <span className="font-mono text-[.58rem] uppercase tracking-[.16em] text-[hsl(var(--foreground)/.5)]">01</span>
          </figcaption>
        </figure>
        <div className="max-w-[25rem] pb-1">
          <p className="eyebrow">A human beginning</p>
          <p className="serif mt-5 text-3xl leading-[1.08] text-[hsl(var(--foreground)/.86)]">The work asks for attention before it asks for an audience.</p>
          <p className="mt-5 text-sm leading-7 text-[hsl(var(--foreground)/.52)]">Room to notice what is stirring, what is honest, and what is ready to be offered.</p>
        </div>
      </div>
    </section>
  );
}

function OriginSection() {
  return (
    <section className="relative overflow-hidden border-b border-[hsl(var(--border))] bg-[hsl(29_20%_9%)]">
      <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[hsl(var(--primary)/.07)] to-transparent" />
      <div className="section-pad relative z-10 mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1fr_.85fr] lg:items-center">
        <div>
          <SectionLabel number="02">The beginning</SectionLabel>
          <p className="font-mono text-7xl text-[hsl(var(--primary)/.24)] sm:text-9xl" data-testid="text-origin-year">2019</p>
          <h2 className="display -mt-4 max-w-[32rem] text-5xl leading-none sm:text-6xl" data-testid="text-origin-title">A phrase in motion became a place to <em className="gold-text">belong.</em></h2>
        </div>
        <div className="border-l border-[hsl(var(--primary)/.45)] pl-7 lg:pl-12">
          <figure className="editorial-frame group relative mb-10 overflow-hidden">
            <img
              src={intimatePortraitPath}
              alt="Intimate close-up portrait with locs and glasses against a dark background."
              className="brand-photo h-[21rem] w-full object-cover object-[center_34%] transition-transform duration-700 ease-out group-hover:scale-[1.025] sm:h-[25rem]"
              data-testid="img-portrait-intimate"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[hsl(29_20%_9%)/.72] via-transparent to-transparent" />
            <figcaption className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
              <span className="eyebrow text-[hsl(var(--foreground)/.72)]">Still listening</span>
              <span className="font-mono text-[.58rem] uppercase tracking-[.16em] text-[hsl(var(--foreground)/.45)]">02</span>
            </figcaption>
          </figure>
          <p className="text-lg leading-8 text-[hsl(var(--foreground)/.76)]">In 2019, while commuting through Covington, Georgia, a phrase was spoken during prayer: <span className="serif text-2xl italic text-[hsl(var(--primary))]">To His Sound.</span></p>
          <p className="mt-7 text-sm leading-7 text-[hsl(var(--foreground)/.55)]">It became an invitation — to create from closeness, to lead from surrender, and to build creative spaces covered by wise community.</p>
          <div className="mt-10 flex items-center gap-3 font-mono text-[.65rem] uppercase tracking-[.15em] text-[hsl(var(--foreground)/.45)]"><Circle size={8} fill="currentColor" className="text-[hsl(var(--primary))]" /> still listening</div>
        </div>
      </div>
    </section>
  );
}

const services = [
  { number: '01', title: 'For individuals', copy: 'For the artist in process — navigating calling, craft, identity, and the quiet work of becoming.', prompt: 'I am an individual creative' },
  { number: '02', title: 'For churches', copy: 'For churches cultivating healthy creative culture, faithful leadership, and ministry that sounds like the house.', prompt: 'We are a church' },
  { number: '03', title: 'For creative ministries', copy: 'For teams ready to move beyond output into shared language, spiritual covering, and obedient practice.', prompt: 'We are a creative ministry' },
];

function WaysSection() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <section id="ways" className="section-pad border-b border-[hsl(var(--border))]">
      <div className="mx-auto max-w-[1240px]">
        <SectionLabel number="03">Ways we serve</SectionLabel>
        <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="display max-w-[650px] text-5xl leading-[.98] sm:text-7xl" data-testid="text-ways-title">No two callings sound <em className="gold-text">the same.</em></h2>
          <p className="max-w-[21rem] text-sm leading-7 text-[hsl(var(--foreground)/.55)]">Our starting point is always listening. Bring the real question, the unfinished idea, the thing you cannot shake.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {services.map((service) => (
            <button type="button" key={service.number} onClick={() => setSelected(service.prompt)} className="service-card focus-ring group relative min-h-[23rem] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-7 text-left" data-testid={`card-service-${service.number}`}>
              <div className="flex items-start justify-between"><span className="font-mono text-[.68rem] text-[hsl(var(--primary))]">{service.number}</span><MoveUpRight size={19} strokeWidth={1.3} className="text-[hsl(var(--foreground)/.35)] transition-colors group-hover:text-[hsl(var(--primary))]" /></div>
              <div className="absolute inset-x-7 bottom-7"><h3 className="display text-4xl leading-none text-[hsl(var(--foreground))]">{service.title}</h3><p className="mt-5 max-w-[19rem] text-sm leading-6 text-[hsl(var(--foreground)/.55)]">{service.copy}</p><span className="arrow-link mt-6 inline-flex items-center gap-2 text-[.65rem] font-bold uppercase tracking-[.15em] text-[hsl(var(--primary))]">Tell us more <ArrowUpRight size={14} /></span></div>
            </button>
          ))}
        </div>
        {selected && <div className="mt-6 flex items-center justify-between border border-[hsl(var(--primary)/.45)] bg-[hsl(var(--primary)/.07)] px-5 py-4 text-sm text-[hsl(var(--foreground)/.8)]" role="status" data-testid="status-service-selection"><span>Your starting point is noted. Continue below to begin a conversation.</span><button type="button" onClick={() => document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })} className="focus-ring ml-4 shrink-0 font-mono text-[.65rem] uppercase tracking-[.13em] text-[hsl(var(--primary))]" data-testid="button-service-continue">Continue <ChevronRight size={14} className="inline" /></button></div>}
      </div>
    </section>
  );
}

function PracticeSection() {
  const practices = ['Intimacy before output', 'Discipleship that tells the truth', 'Leadership that covers'];
  return (
    <section id="practice" className="section-pad border-b border-[hsl(var(--border))] bg-[hsl(8_12%_7%)]">
      <div className="mx-auto grid max-w-[1240px] gap-16 lg:grid-cols-[.72fr_1.28fr]">
        <div><SectionLabel number="04">The practice</SectionLabel><p className="max-w-[16rem] text-sm leading-7 text-[hsl(var(--foreground)/.53)]">A framework for making work without losing yourself inside it.</p></div>
        <div>
          <h2 className="display max-w-[690px] text-5xl leading-[.98] sm:text-7xl" data-testid="text-practice-title">You shouldn’t just produce — <em className="gold-text">you should be covered.</em></h2>
          <div className="mt-14">
            {practices.map((practice, index) => (
              <div className="group flex items-center gap-5 border-t border-[hsl(var(--border))] py-6 last:border-b" key={practice} data-testid={`row-practice-${index}`}>
                <span className="font-mono text-[.65rem] text-[hsl(var(--primary))]">0{index + 1}</span><span className="text-xl text-[hsl(var(--foreground)/.84)] transition-transform group-hover:translate-x-2 sm:text-2xl">{practice}</span><ArrowUpRight size={17} className="ml-auto text-[hsl(var(--primary)/.7)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MovementSection() {
  return (
    <section className="border-b border-[hsl(var(--border))] bg-[hsl(29_20%_9%)] px-5 py-10 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-[1240px]">
        <figure className="editorial-frame group relative overflow-hidden">
          <img
            src={movementPath}
            alt="Movement ministry by the water: a dancer in bright blue raises flowing red-orange fabric into the air."
            className="brand-photo h-[30rem] w-full object-cover object-[center_46%] transition-transform duration-1000 ease-out group-hover:scale-[1.018] sm:h-[39rem] lg:h-[44rem]"
            data-testid="img-movement-ministry"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[hsl(8_12%_7%)/.9] via-[hsl(8_12%_7%)/.08] to-transparent" />
          <div className="absolute inset-x-6 bottom-6 flex flex-col gap-4 sm:inset-x-10 sm:bottom-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-[hsl(var(--foreground)/.78)]">A visible offering</p>
              <p className="serif mt-3 max-w-[28rem] text-3xl leading-[1.02] text-[hsl(var(--foreground))] sm:text-5xl">Where movement becomes obedience.</p>
            </div>
            <figcaption className="max-w-[14rem] border-l border-[hsl(var(--primary)/.7)] pl-4 text-xs leading-6 text-[hsl(var(--foreground)/.65)]">A body in motion, making room for what cannot stay still.</figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}

function Invitation() {
  return (
    <section className="relative overflow-hidden border-b border-[hsl(var(--border))] px-5 py-28 text-center lg:px-10 lg:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full glow-orb opacity-60" />
      <div className="relative mx-auto max-w-[800px]">
        <p className="eyebrow">A gentle but direct invitation</p>
        <h2 className="display mt-7 text-6xl leading-[.9] sm:text-8xl" data-testid="text-invitation-title">What has God been <em className="gold-text">saying</em> in your movement?</h2>
        <button type="button" onClick={() => document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })} className="focus-ring mt-12 inline-flex items-center gap-3 border border-[hsl(var(--primary)/.7)] px-6 py-4 text-[.7rem] font-bold uppercase tracking-[.15em] text-[hsl(var(--primary))] transition-colors hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]" data-testid="button-invitation-connect">Bring it into the light <ArrowUpRight size={16} /></button>
      </div>
    </section>
  );
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const message = String(form.get('message') || '').trim();
    if (!name || !email || !message) {
      setError('Please share your name, email, and a little about what you are carrying.');
      return;
    }
    setError('');
    setSubmitted(true);
    formRef.current?.reset();
  };

  return (
    <section id="connect" className="section-pad bg-[hsl(29_20%_9%)]">
      <div className="mx-auto grid max-w-[1240px] gap-16 lg:grid-cols-[.8fr_1.2fr] lg:gap-28">
        <div>
          <SectionLabel number="05">Begin a conversation</SectionLabel>
          <h2 className="display text-6xl leading-[.92] sm:text-8xl" data-testid="text-contact-title">Start where<br /><em className="gold-text">you are.</em></h2>
          <p className="mt-8 max-w-[20rem] text-sm leading-7 text-[hsl(var(--foreground)/.58)]">No polished pitch required. Tell us what you are making, leading, or discerning — and we will take the next step from there.</p>
          <div className="mt-12 border-l border-[hsl(var(--primary)/.55)] pl-5"><p className="serif text-2xl italic text-[hsl(var(--primary))]">Come as you are. Come ready to listen.</p></div>
        </div>
        <div>
          {submitted ? (
            <div className="flex min-h-[22rem] flex-col justify-center border border-[hsl(var(--primary)/.45)] bg-[hsl(var(--primary)/.06)] p-8" role="status" data-testid="status-contact-success"><Check size={26} className="text-[hsl(var(--primary))]" /><h3 className="display mt-6 text-4xl">Received with care.</h3><p className="mt-4 max-w-[25rem] text-sm leading-7 text-[hsl(var(--foreground)/.62)]">Your note is ready for the next faithful step. We look forward to continuing the conversation.</p><button type="button" onClick={() => setSubmitted(false)} className="focus-ring mt-8 w-fit font-mono text-[.65rem] uppercase tracking-[.15em] text-[hsl(var(--primary))]" data-testid="button-contact-reset">Send another note <ChevronRight size={14} className="inline" /></button></div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="border-t border-[hsl(var(--border))]" noValidate>
              <label className="block border-b border-[hsl(var(--border))] py-5"><span className="eyebrow block mb-3 text-[hsl(var(--foreground)/.47)]">01 / your name</span><input name="name" type="text" autoComplete="name" className="input-line w-full py-2 text-lg text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--foreground)/.25)]" placeholder="What should we call you?" data-testid="input-contact-name" /></label>
              <label className="block border-b border-[hsl(var(--border))] py-5"><span className="eyebrow block mb-3 text-[hsl(var(--foreground)/.47)]">02 / your email</span><input name="email" type="email" autoComplete="email" className="input-line w-full py-2 text-lg text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--foreground)/.25)]" placeholder="Where can we reach you?" data-testid="input-contact-email" /></label>
              <label className="block border-b border-[hsl(var(--border))] py-5"><span className="eyebrow block mb-3 text-[hsl(var(--foreground)/.47)]">03 / your movement</span><textarea name="message" rows={4} className="input-line w-full resize-none py-2 text-lg text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--foreground)/.25)]" placeholder="Tell us what you're making, leading, or discerning." data-testid="input-contact-message" /></label>
              {error && <p className="mt-4 text-sm text-[hsl(var(--accent))]" role="alert" data-testid="status-contact-error">{error}</p>}
              <button type="submit" className="focus-ring mt-8 flex items-center gap-3 bg-[hsl(var(--primary))] px-6 py-4 text-[.7rem] font-bold uppercase tracking-[.15em] text-[hsl(var(--primary-foreground))] transition-transform hover:-translate-y-1" data-testid="button-contact-submit">Send the note <ArrowUpRight size={16} /></button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] px-5 py-10 lg:px-10">
      <div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
        <div><Mark small /><p className="mt-4 max-w-[15rem] text-[.68rem] leading-5 text-[hsl(var(--foreground)/.4)]">Creative formation for lives that sound like obedience.</p></div>
        <div className="flex flex-col items-start gap-4 sm:items-end"><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="focus-ring arrow-link flex items-center gap-2 text-[.65rem] uppercase tracking-[.16em] text-[hsl(var(--primary))]" data-testid="button-back-to-top">Back to the beginning <ArrowUpRight size={14} /></button><p className="font-mono text-[.58rem] uppercase tracking-[.13em] text-[hsl(var(--foreground)/.35)]">To His Sound · 2019 — present</p></div>
      </div>
    </footer>
  );
}

function Home() {
  return <div id="page" className="grain min-h-[100dvh] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"><Header /><main><Hero /><WhySection /><OriginSection /><WaysSection /><PracticeSection /><MovementSection /><Invitation /><ContactSection /></main><Footer /></div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;