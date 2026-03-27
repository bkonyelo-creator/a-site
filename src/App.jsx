import { useState, useEffect, useRef } from "react";
import "./App.css";


const PETAL_DATA = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${(i * 4.5 + Math.sin(i) * 8) % 100}%`,
  size: 10 + (i % 7) * 3,
  delay: `${(i * 0.9) % 12}s`,
  duration: `${10 + (i % 5) * 2}s`,
  sway: `${-60 + (i % 5) * 30}px`,
  opacity: 0.45 + (i % 4) * 0.12,
  color:
    i % 3 === 0
      ? "linear-gradient(135deg,#ffb3c6,#ff85a1)"
      : i % 3 === 1
        ? "linear-gradient(135deg,#ffc8d8,#e07a9b)"
        : "linear-gradient(135deg,#ffd6e7,#ffb3c6)",
}));

const BLOOM_COLORS = [
  "rgba(255,0,150,0.6)",
  "rgba(0,255,150,0.6)",
  "rgba(150,0,255,0.6)",
  "rgba(255,255,0,0.6)",
];

const BG_FLOWERS = ["🌸", "🌷", "💐", "🌺", "🌹", "💗", "✨", "🌼"];

const PHOTOS = [
  {
    id: 1,
    src: "/images/img1.jpg",
    shape: "tall",
    tilt: "-3deg",
  },
  {
    id: 2,
    src: "/images/img2.jpg",
    shape: "square",
    tilt: "2deg",
  },
  {
    id: 3,
    src: "/images/img3.jpg",
    shape: "wide",
    tilt: "-1.5deg",
  },
  {
    id: 4,
    src: "/images/img4.jpg",
    shape: "square",
    tilt: "3.5deg",
  },
  {
    id: 5,
    src: "/images/img5.jpg",
    caption: "ang cute mo here 🥹",
    shape: "tall",
    tilt: "-2deg",
  },
  {
    id: 6,
    src: "/images/img6.jpg",
    shape: "wide",
    tilt: "1deg",
  },
  {
    id: 7,
    src: "/images/img7.jpg",
    shape: "square",
    tilt: "-3.5deg",
  },
  {
    id: 8,
    src: "/images/img8.jpg",
    shape: "tall",
    tilt: "2.5deg",
  },
];

// ─── PETALS ───────────────────────────────────────────────────────────────────

function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {PETAL_DATA.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 0.85,
            background: p.color,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
            "--sway": p.sway,
          }}
        />
      ))}
    </div>
  );
}


function FlowerStem({ variant }) {
  const fallClass =
    variant === "f-wrapper--2"
      ? "flower__fall-down--pink"
      : variant === "f-wrapper--3"
        ? "flower__fall-down--purple"
        : "flower__fall-down--yellow";

  return (
    <div className={`f-wrapper${variant ? ` ${variant}` : ""}`}>
      <div className="flower__line" />
      <div className="f">
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <div key={n} className={`flower__leaf flower__leaf--${n}`} />
        ))}
        <div className={`flower__leaf flower__leaf--8 ${fallClass}`} />
      </div>
    </div>
  );
}


function PageFlower({ isActive, onNext }) {
  const [stars, setStars] = useState([]);
  const [blooms, setBlooms] = useState([]);
  const starId = useRef(0);
  const bloomId = useRef(0);

  useEffect(() => {
    if (!isActive) return;

    const starInterval = setInterval(() => {
      const id = starId.current++;
      setStars((prev) => [
        ...prev,
        { id, x: Math.random() * 100, y: Math.random() * 100 },
      ]);
      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== id));
      }, 4000);
    }, 700);

    const bloomInterval = setInterval(() => {
      const id = bloomId.current++;
      const color =
        BLOOM_COLORS[Math.floor(Math.random() * BLOOM_COLORS.length)];
      const dur = Math.random() * 3 + 2;
      setBlooms((prev) => [
        ...prev,
        { id, x: Math.random() * 100, y: Math.random() * 100, color, dur },
      ]);
      setTimeout(() => {
        setBlooms((prev) => prev.filter((b) => b.id !== id));
      }, 18000);
    }, 500);

    return () => {
      clearInterval(starInterval);
      clearInterval(bloomInterval);
    };
  }, [isActive]);

  return (
    <div className={`page page-flower${isActive ? " active" : ""}`}>
      {/* <h1 className="flower-title">
        For You, <em>My Love</em> 🌸
      </h1> */}

      {stars.map((s) => (
        <div
          key={s.id}
          className="flower-star"
          style={{ left: `${s.x}vw`, top: `${s.y}vh` }}
        />
      ))}

      {blooms.map((b) => (
        <div
          key={b.id}
          className="bloom-particle"
          style={{
            left: `${b.x}vw`,
            top: `${b.y}vh`,
            background: `radial-gradient(circle, rgba(255,255,255,0.8) 10%, ${b.color} 50%, rgba(0,0,0,0) 80%)`,
            animationDuration: `${b.dur}s`,
          }}
        />
      ))}

      <div className="flower-group">
        <FlowerStem variant="" />
        <FlowerStem variant="f-wrapper--2" />
        <FlowerStem variant="f-wrapper--3" />
        <div className="flower__glass" />
      </div>

      <div className="flower-btn-wrap">
        <button className="btn-main" onClick={onNext}>
          Click me 💌
        </button>
      </div>
    </div>
  );
}


const LETTER_BG_ITEMS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  emoji: BG_FLOWERS[i % BG_FLOWERS.length],
  left: `${(i * 6.3) % 100}%`,
  size: `${1.4 + (i % 4) * 0.5}rem`,
  delay: `${(i * 1.1) % 14}s`,
  duration: `${14 + (i % 6) * 2}s`,
}));

function PageLetter({ isActive, onNext }) {
  return (
    <div className={`page page-letter${isActive ? " active" : ""}`}>
      {/* Floating flowers in background */}
      {LETTER_BG_ITEMS.map((f) => (
        <span
          key={f.id}
          className="letter-bg-flower"
          aria-hidden="true"
          style={{
            left: f.left,
            fontSize: f.size,
            animationDelay: f.delay,
            animationDuration: f.duration,
          }}
        >
          {f.emoji}
        </span>
      ))}

      <div className="letter-wrap">
        <div className="letter-eyebrow">to my pretty wife</div>

        <div className="letter-card">
          <div className="letter-text">
            <p>
              hi my love! I know I’m not really good at things like this, and sound so cringe, 
              but I still wanted to do this for you. I
              know I hurt you, and I’m really sorry for what I did. I broke my
              promise, and I understand why you felt disappointed in me. I knew
              from the very beginning that you were already uncomfortable when I
              talked to that person, and I was wrong for not respecting that.
            </p>

            <p>
              tbh, sobra akong nahihiya mahal. hindi ko na talaga uulitin yun.
              it was my fault for not considering your feelings before I did
              that, and mali rin na hindi ako naging maingat sa actions ko. I
              should’ve thought about you first. intentional man or not, I still
              hurt you and I take full responsibility for that. I have no excuse
              for what I did, and ik na hindi ko na maitatama yun. I just want
              you to know that your feelings are valid mahal, and you have every
              right to feel that way.
            </p>

            <p>
              I’m really sorry po, mahal… truly and deeply sorry. hindi ko
              ginustong saktan ka but it still happened because of my actions,
              and I regret that so much.
            </p>

            <p>
              I just want you to know na proud ako sayo sa lahat ng ginagawa mo.
              the way you handle things, the way you stay strong, and the way
              you care, I’m really, really proud of you my love.
            </p>

            <p>
              always remember that I’m on your side. hindi ako kalaban mahal ha?
              kasama mo ako. I want to be someone who supports you, understands
              you, and makes you feel safe po.
            </p>

            <p>
              yung mga plano po natin after we graduate, sabay nating tutuparin
              lahat yun. basta we keep praying and trusting Him po ha? and ik
              darating yung time na magiging worth it lahat. habang tumatagal,
              mas lalo akong sure na ikaw yung gusto kong makasama. ikaw yung
              dahilan kung bakit gusto kong mag-grow at ayusin yung future ko
              not just for myself, but for us.
            </p>

            <p>
              I love you so much, and I’ll be better po mahal not just for you,
              but for us.
            </p>
          </div>

          <div className="letter-sig">
            <span className="sig-label">- Ris </span>
            <span className="sig-name"> Ilysm 💗</span>
          </div>
        </div>

        <button className="btn-main" onClick={onNext}>
          Open me
        </button>
      </div>
    </div>
  );
}

// ─── PAGE 3: GALLERY ──────────────────────────────────────────────────────────

function PolaroidCard({ photo, index }) {
  return (
    <div
      className="masonry-item"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="polaroid" style={{ "--tilt": photo.tilt }}>
        <div className={`polaroid-img-wrap ${photo.shape}`}>
          {photo.src ? (
            <img src={photo.src} alt={photo.caption} />
          ) : (
            <div className="polaroid-placeholder">
              <span className="polaroid-placeholder-icon">🌸</span>
              <span className="polaroid-placeholder-text">
                Add your photo here
              </span>
            </div>
          )}
        </div>
        <div className="polaroid-caption">{photo.caption}</div>
      </div>
    </div>
  );
}

function PageGallery({ isActive }) {
  return (
    <div className={`page page-gallery${isActive ? " active" : ""}`}>
      <div className="gallery-header">
        <h2 className="gallery-title">Us, In Every Moment </h2>
      </div>

      <div className="masonry-grid">
        {PHOTOS.map((photo, i) => (
          <PolaroidCard key={photo.id} photo={photo} index={i} />
        ))}
      </div>

      <div className="gallery-footer-msg">
        <p>
          Every moment with you is something I never want to lose.
          <br />
          I love you so much my ris ♡
        </p>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("flower");
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <div className="app">
      <Petals />
      {showPrompt && (
        <div className="prompt-overlay">
          <div className="prompt-box">
            <h3>Please enter your fav. number po </h3>
            <input
              type="number"
              className="prompt-input"
              placeholder="Enter number..."
              id="favNumber"
            />
            <button
              className="btn-main"
              onClick={() => {
                const value = document.getElementById("favNumber").value;

                if (value === "13") {
                  setShowPrompt(false);
                  setPage("letter");
                } else {
                  alert("Favorite number mo ngani mahal ko :p ");
                }
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      <PageFlower
        isActive={page === "flower"}
        onNext={() => setShowPrompt(true)}
      />

      <PageLetter
        isActive={page === "letter"}
        onNext={() => setPage("gallery")}
      />

      <PageGallery isActive={page === "gallery"} />
    </div>
  );
}
